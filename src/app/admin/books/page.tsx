import { createClient } from "@/lib/supabase/server";
import { updateBook } from "../actions";
import { Save, Book as BookIcon } from "lucide-react";

export default async function AdminBooksPage() {
  // ✅ إصلاح: إضافة await
  const supabase = await createClient();
  
  const { data: books } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-serif text-[#3E2723]">إدارة الكتب والمجلدات</h1>
        <p className="text-muted-foreground">تعديل الأسعار والوصف وحالة التوفر</p>
      </header>

      <div className="grid gap-6">
        {books?.map((book) => {
            // استخراج حالة التوفر من الميتاداتا
            // @ts-ignore
            const isAvailable = book.metadata?.is_available; 

            return (
            <form key={book.id} action={updateBook.bind(null, book.id)} className="bg-white p-6 rounded-2xl border border-[#E6E2D3] shadow-sm flex flex-col md:flex-row gap-6 items-start">
                
                {/* صورة أو أيقونة للكتاب */}
                <div className="w-24 h-32 bg-[#F9F7F0] rounded-lg shrink-0 flex items-center justify-center border border-[#E6E2D3]">
                    <BookIcon className="w-8 h-8 text-[#2A5B68]/50" />
                </div>

                {/* حقول التعديل */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                
                <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground block mb-1">عنوان الكتاب</label>
                    <input 
                    type="text" 
                    name="title" 
                    defaultValue={book.title} 
                    className="w-full p-2 border rounded-lg font-bold text-[#3E2723] focus:ring-2 ring-[#2A5B68] outline-none"
                    />
                </div>

                <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">السعر (ج.م)</label>
                    <input 
                    type="number" 
                    name="price" 
                    defaultValue={book.price} 
                    className="w-full p-2 border rounded-lg font-mono text-[#2A5B68] font-bold"
                    />
                </div>

                <div className="flex items-center gap-2 h-full pt-6">
                    <input 
                        type="checkbox" 
                        name="is_available" 
                        defaultChecked={isAvailable !== false} // Default to true if undefined
                        className="w-5 h-5 accent-[#2A5B68]"
                        id={`avail-${book.id}`}
                    />
                    <label htmlFor={`avail-${book.id}`} className="text-sm font-bold cursor-pointer select-none">
                        متاح للبيع؟
                    </label>
                </div>

                <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground block mb-1">الوصف</label>
                    <textarea 
                    name="description" 
                    defaultValue={book.description || ""} 
                    rows={3}
                    className="w-full p-2 border rounded-lg text-sm text-gray-600 focus:ring-2 ring-[#2A5B68] outline-none resize-none"
                    />
                </div>

                {/* زر الحفظ */}
                <div className="col-span-2 flex justify-end">
                    <button 
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 bg-[#2A5B68] text-white rounded-xl hover:bg-[#1f4a56] transition-colors font-bold shadow-md active:scale-95"
                    >
                        <Save className="w-4 h-4" />
                        حفظ التعديلات
                    </button>
                </div>
                </div>
            </form>
            );
        })}
      </div>
    </div>
  );
}