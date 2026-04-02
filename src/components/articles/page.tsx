import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import ArticleListTable from "@/components/articles/article-list-table";
import { ArticleSummary } from "@/types/article";

export const metadata = {
  title: "إدارة المقالات | أكاديمية مودة",
};

export default async function AdminArticlesPage() {
  // ✅ التصحيح هنا: إضافة await قبل createClient()
  const supabase = await createClient();
  
  // الآن يمكننا استخدام .from() بشكل طبيعي
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, cover_image_url, category, is_published, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    return (
      <div className="p-8 text-center text-red-500 border border-red-200 bg-red-50 rounded-xl m-4">
        <p className="font-bold">حدث خطأ أثناء تحميل البيانات</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  // تحويل البيانات (Casting) لضمان توافق الأنواع
  const safeArticles = (articles || []) as ArticleSummary[];

  return (
    <div className="container mx-auto py-8 space-y-8 px-4 bg-[#FDFBF7] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2A5B68] font-amiri">المقالات والتدوين</h1>
          <p className="text-muted-foreground mt-1 text-sm">إدارة المحتوى المعرفي للأكاديمية</p>
        </div>
        
        <Button asChild className="bg-[#D4AF37] hover:bg-[#b8962e] text-white shadow-md transition-all font-bold">
          <Link href="/admin/articles/new">
            <Plus className="ml-2 w-4 h-4" />
            كتابة مقال جديد
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E6E2D3] shadow-sm">
          <p className="text-sm text-gray-500 mb-1">إجمالي المقالات</p>
          <p className="text-2xl font-bold text-[#2A5B68]">{safeArticles.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E6E2D3] shadow-sm">
          <p className="text-sm text-gray-500 mb-1">المنشورة</p>
          <p className="text-2xl font-bold text-teal-600">
            {safeArticles.filter(a => a.is_published).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E6E2D3] shadow-sm">
          <p className="text-sm text-gray-500 mb-1">المسودات</p>
          <p className="text-2xl font-bold text-amber-600">
            {safeArticles.filter(a => !a.is_published).length}
          </p>
        </div>
      </div>

      {/* Main Table */}
      <ArticleListTable articles={safeArticles} />
    </div>
  );
}