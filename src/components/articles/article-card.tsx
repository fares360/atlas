import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  article: {
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image_url: string | null;
    category: string;
    created_at: string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E6E2D3] hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* صورة الغلاف */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {article.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover_image_url}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#2A5B68]/10 text-[#2A5B68]">
            <span className="font-amiri text-lg opacity-50">أكاديمية مودة</span>
          </div>
        )}
        <Badge className="absolute top-4 right-4 bg-white/90 text-[#2A5B68] hover:bg-white border-0 shadow-sm backdrop-blur-sm">
          {article.category}
        </Badge>
      </div>

      {/* المحتوى */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar className="w-3 h-3 text-[#D4AF37]" />
          <span>{format(new Date(article.created_at), "d MMMM yyyy", { locale: ar })}</span>
        </div>

        <h3 className="text-xl font-bold text-[#2A5B68] font-amiri mb-3 line-clamp-2 leading-relaxed group-hover:text-[#D4AF37] transition-colors">
          <Link href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {article.excerpt || "اقرأ المزيد حول هذا الموضوع الشيق..."}
        </p>

        <Link 
          href={`/articles/${article.slug}`}
          className="inline-flex items-center text-[#D4AF37] font-bold text-sm hover:underline underline-offset-4 mt-auto"
        >
          قراءة المقال
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}