import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, FileText, CheckCircle, CircleDashed } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleListTable from "@/components/articles/article-list-table";
import { ArticleSummary } from "@/types/article";

// منع التخزين المؤقت لضمان رؤية أحدث البيانات دائماً
export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const supabase = await createClient();

  // جلب البيانات مع ترتيب الأحدث أولاً
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, cover_image_url, category, is_published, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">حدث خطأ في جلب البيانات: {error.message}</div>;
  }

  const safeArticles = (articles || []) as ArticleSummary[];
  
  // حساب الإحصائيات
  const total = safeArticles.length;
  const published = safeArticles.filter((a) => a.is_published).length;
  const drafts = total - published;

  return (
    <div className="space-y-8">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2A5B68] font-amiri">إدارة المقالات</h1>
          <p className="text-muted-foreground mt-1">نظرة عامة على المحتوى المعرفي</p>
        </div>
        <Button asChild className="bg-[#D4AF37] hover:bg-[#b8962e] text-white shadow-sm font-bold">
          <Link href="/admin/articles/new">
            <Plus className="w-5 h-5 ml-2" />
            كتابة مقال جديد
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard icon={<FileText className="text-blue-500" />} label="إجمالي المقالات" value={total} />
        <StatsCard icon={<CheckCircle className="text-green-500" />} label="منشور" value={published} />
        <StatsCard icon={<CircleDashed className="text-orange-500" />} label="مسودة" value={drafts} />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <ArticleListTable articles={safeArticles} />
      </div>
    </div>
  );
}

// مكون صغير لبطاقات الإحصائيات
function StatsCard({ icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
      <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-[#2A5B68]">{value}</p>
      </div>
    </div>
  );
}