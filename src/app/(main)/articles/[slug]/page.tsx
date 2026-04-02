import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

// 1. تعريف النوع كـ Promise (إجباري في Next.js 15)
type Props = {
  params: Promise<{ slug: string }>;
};

// إصلاح الـ Metadata أيضاً
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params; // ✅ انتظار الباراميترز
  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("title, excerpt").eq("slug", params.slug).single();
  
  if (!article) return { title: "مقال غير موجود" };

  return {
    title: `${article.title} | أكاديمية مودة`,
    description: article.excerpt,
  };
}

export default async function SingleArticlePage(props: Props) {
  // 2. فك الـ Promise قبل الاستخدام (الحل السحري)
  const params = await props.params;
  const { slug } = params;

  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select(`
      *,
      author: profiles!author_id(full_name)
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#FDFBF7]">
      {/* صورة الغلاف والهيدر */}
      <div className="w-full h-[400px] relative bg-[#2A5B68]">
        {article.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={article.cover_image_url} 
            alt={article.title} 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        ) : (
          <div className="w-full h-full opacity-60 mix-blend-overlay bg-[#2A5B68]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A5B68] to-transparent"></div>
        
        <div className="absolute bottom-0 w-full pb-12 pt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white space-y-4">
              <span className="inline-block px-4 py-1 rounded-full bg-[#D4AF37]/90 text-black text-sm font-bold mb-2">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold font-amiri leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-sm md:text-base opacity-90">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <span>{article.author?.full_name || "فريق التحرير"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>{format(new Date(article.created_at), "d MMMM yyyy", { locale: ar })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* محتوى المقال */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#E6E2D3] relative -mt-20 z-10">
          
          <div 
            className="prose prose-lg prose-stone max-w-none 
            prose-headings:font-amiri prose-headings:text-[#2A5B68] 
            prose-p:text-gray-700 prose-p:leading-loose 
            prose-li:text-gray-700 prose-strong:text-[#2A5B68] 
            prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <hr className="my-10 border-gray-200" />

          {/* مشاركة المقال */}
          <div className="flex items-center justify-between">
            <p className="font-bold text-[#2A5B68]">شارك المقال:</p>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full hover:text-[#2A5B68]">
                    <Share2 className="w-4 h-4" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}