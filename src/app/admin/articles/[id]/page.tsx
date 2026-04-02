import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleForm from "@/components/articles/article-form";

// 1. تعريف النوع بشكل صحيح (Promise)
type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage(props: Props) {
  // 2. فك الـ Promise باستخدام await (هذا هو السطر الذي سيحل المشكلة)
  const params = await props.params;
  const { id } = params;

  const supabase = await createClient();

  // جلب المقال
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id) // استخدام id بعد فكه من الـ params
    .single();

  if (error || !article) {
    notFound();
  }

  // تجهيز البيانات
  const initialData = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    content: article.content || "",
    excerpt: article.excerpt || "",
    category: article.category || "general",
    cover_image_url: article.cover_image_url || "",
    is_published: article.is_published,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/admin/articles" className="hover:text-[#2A5B68] flex items-center gap-1 transition-colors">
          <ArrowRight className="w-4 h-4" />
          عودة للقائمة
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">تعديل: {article.title}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
        <ArticleForm initialData={initialData} />
      </div>
    </div>
  );
}