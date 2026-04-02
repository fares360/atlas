"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2, Save, UploadCloud, X } from "lucide-react"; // ✅ أضفت X للحذف
import { createArticle, updateArticle } from "@/app/actions/article-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// @ts-ignore
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import TiptapEditor from "./tiptap-editor";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, "العنوان مطلوب"),
  slug: z.string().min(2, "الرابط مطلوب"),
  excerpt: z.any(),
  category: z.string().min(1, "اختر التصنيف"),
  content: z.any(),
  cover_image_url: z.any(),
  is_published: z.boolean().default(false),
});

export default function ArticleForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(initialData?.cover_image_url || null); // ✅ للمعاينة الفورية

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      category: initialData?.category || "general",
      content: initialData?.content || "",
      cover_image_url: initialData?.cover_image_url || "",
      is_published: initialData?.is_published || false,
    },
  });

  const generateSlug = (value: string) => {
    return value.trim().toLowerCase().replace(/[^\u0600-\u06FFa-z0-9\s-]/g, "").replace(/\s+/g, "-");
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. معاينة فورية (Local Preview) - هذا سيحل مشكلة أن الصورة لا تظهر
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl); 

    try {
      setIsUploading(true);
      
      // 2. طلب رابط الرفع من السيرفر
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ filename: file.name, contentType: file.type, folder: "articles/covers" }),
      });

      if (!res.ok) throw new Error("فشل الاتصال بالسيرفر");
      
      const data = await res.json();

      // 3. التحقق هل نحن في وضع المحاكاة (بدون R2)؟
      if (data.isMock) {
         toast.warning("وضع التطوير: تم محاكاة الرفع (لم يتم حفظ الصورة فعلياً)");
         // نحفظ رابط المعاينة المحلي مؤقتاً في الفورم لكي لا يعترض الـ Validation
         // ملحوظة: في الوضع الحقيقي، هذا الرابط لن يعمل عند أشخاص آخرين، لكنه ممتاز للتطوير
         form.setValue("cover_image_url", data.publicUrl); 
      } else {
         // 4. الوضع الحقيقي: رفع الملف إلى Cloudflare
         await fetch(data.uploadUrl, { 
             method: "PUT", 
             body: file, 
             headers: { "Content-Type": file.type } 
         });
         form.setValue("cover_image_url", data.publicUrl);
         toast.success("تم رفع الغلاف بنجاح");
      }

    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ، تأكد من إعدادات التخزين");
      setLocalPreview(null); // إلغاء المعاينة في حال الفشل الذريع
    } finally {
      setIsUploading(false);
    }
  };

  // زر لحذف الصورة
  const removeImage = () => {
      setLocalPreview(null);
      form.setValue("cover_image_url", "");
  };

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        excerpt: values.excerpt || "",
        content: values.content || "",
        cover_image_url: values.cover_image_url || null,
      };

      let result;
      if (initialData?.id) {
        result = await updateArticle(initialData.id, payload);
      } else {
        result = await createArticle(payload);
      }

      if (result.success) {
        toast.success(initialData ? "تم التحديث" : "تم النشر");
        router.refresh();
        if (!initialData) router.push("/admin/articles");
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ");
    }
  };

  return (
    <Form {...(form as any)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center border-b pb-6">
          <h1 className="text-2xl font-bold text-[#2A5B68]">{initialData ? "تعديل المقال" : "جديد"}</h1>
          <div className="flex gap-3 items-center">
             <FormField control={form.control} name="is_published" render={({ field }: any) => (
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border">
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                  <span className="text-sm">{field.value ? "منشور" : "مسودة"}</span>
                </div>
             )} />
            <Button type="submit" disabled={isUploading} className="bg-[#D4AF37] text-white">
              {isUploading ? <Loader2 className="animate-spin" /> : <Save className="ml-2 w-4" />} حفظ
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <FormField control={form.control} name="title" render={({ field }: any) => (
              <FormItem>
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input {...field} onChange={(e) => {
                    field.onChange(e);
                    if (!initialData && !form.getValues("slug")) form.setValue("slug", generateSlug(e.target.value));
                  }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="slug" render={({ field }: any) => (
              <FormItem>
                <FormLabel>الرابط</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="content" render={({ field }: any) => (
              <FormItem>
                <FormLabel>المحتوى</FormLabel>
                <FormControl>
                  <TiptapEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="space-y-6">
             <div className="bg-white p-4 rounded border shadow-sm">
                <p className="text-sm font-medium mb-3">صورة الغلاف</p>
                
                <div className="mt-2 border-2 border-dashed p-6 text-center relative hover:bg-gray-50 transition-colors">
                    {/* Input مخفي يغطي المساحة */}
                    <Input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20" 
                        onChange={handleImageUpload} 
                        disabled={isUploading}
                    />

                    {localPreview ? (
                        <div className="relative group z-10">
                            {/* عرض الصورة المختارة محلياً */}
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={localPreview} 
                                className="w-full h-48 object-cover rounded shadow-sm" 
                                alt="cover preview" 
                            />
                            {/* زر حذف الصورة */}
                            <button 
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault(); // منع فتح نافذة اختيار الملفات
                                    removeImage();
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-auto"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="py-8 z-10">
                            {isUploading ? (
                                <Loader2 className="mx-auto text-[#2A5B68] animate-spin w-10 h-10" />
                            ) : (
                                <>
                                    <UploadCloud className="mx-auto text-gray-400 w-10 h-10 mb-2" />
                                    <p className="text-sm text-gray-500">اضغط لرفع صورة</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG (Mock Mode)</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
             </div>

            <FormField control={form.control} name="category" render={({ field }: any) => (
              <FormItem>
                <FormLabel>التصنيف</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="general">عام</SelectItem>
                    <SelectItem value="academic">أكاديمي</SelectItem>
                    <SelectItem value="news">أخبار</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="excerpt" render={({ field }: any) => (
              <FormItem>
                <FormLabel>مقتطف</FormLabel>
                <FormControl><Textarea {...field} className="h-32" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>
      </form>
    </Form>
  );
}