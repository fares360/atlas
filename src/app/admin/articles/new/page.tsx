import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleForm from "@/components/articles/article-form"; // ✅ المسار الجديد

export default function NewArticlePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/admin/articles" className="hover:text-[#2A5B68] flex items-center gap-1 transition-colors">
          <ArrowRight className="w-4 h-4" />
          عودة للقائمة
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">مقال جديد</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
        <ArticleForm />
      </div>
    </div>
  );
}