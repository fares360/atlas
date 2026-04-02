import { createClient } from "@/lib/supabase/server";
import ArticleCard from "@/components/articles/article-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المقالات والتدوين | أكاديمية مودة",
  description: "مقالات تربوية وأسرية ونفسية تهم كل أسرة.",
};

// تفعيل ISR لتحديث الصفحة كل 60 ثانية لضمان السرعة
export const revalidate = 60;

export default async function ArticlesPage() {
  const supabase = await createClient();

  // جلب المقالات المنشورة فقط
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, cover_image_url, category, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* هيدر الصفحة */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2A5B68] font-amiri mb-4">
            واحة المعرفة
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            مجموعة مختارة من المقالات التربوية والأسرية والنفسية، نكتبها لكم بحب ومسؤولية لبناء وعي متزن.
          </p>
          <div className="h-1 w-24 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* الشبكة */}
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium text-lg">لا توجد مقالات منشورة حالياً.</p>
            <p className="text-sm text-gray-400 mt-2">ترقبوا جديدنا قريباً!</p>
          </div>
        )}
      </div>
    </div>
  );
}