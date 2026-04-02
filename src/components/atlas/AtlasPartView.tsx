import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductActions from "@/components/atlas/product-actions";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  Download,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { Book } from "@/types/atlas";

interface AtlasPartViewProps {
  bookId: string;
  partNumber: number;
}

export default async function AtlasPartView({
  bookId,
  partNumber,
}: AtlasPartViewProps) {
  const supabase = await createClient();

  // 1. جلب البيانات من الداتابيز
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

  if (error || !data) {
    console.error(`Error fetching book ${bookId}:`, error);
    return notFound();
  }

  // 2. تنسيق البيانات
  const meta = data.metadata as any;
  const book: Book = { ...data, metadata: meta };

  // التحقق من التوفر
  const isAvailable =
    meta.is_available === true ||
    meta.is_available === "true" ||
    meta.is_available === "on";

  const productDataForActions = {
    id: book.id,
    title: book.title,
    price: book.price,
    type: "book" as const,
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#3E2723]" dir="rtl">
      {/* Header Section */}
      <header className="relative pt-16 pb-20 px-4 overflow-hidden border-b border-[#D4AF37]/20">
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link
            href="/atlas"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-[#2A5B68] transition-all mb-8 group"
          >
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            العودة للموسوعة
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="default" className="mb-6 px-4 py-1.5 text-xs">
              <Sparkles className="w-3 h-3 ml-2" />
              الإصدار{" "}
              {partNumber === 1
                ? "الأول"
                : partNumber === 2
                  ? "الثاني"
                  : partNumber === 3
                    ? "الثالث"
                    : "الرابع"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight text-[#3E2723]">
              {book.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              {book.description}
            </p>

            <div className="flex flex-wrap justify-center gap-8 pb-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 rounded-full bg-[#2A5B68]/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#2A5B68]" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#3E2723]">
                    {meta.lessons || 0} درس
                  </p>
                  <p className="text-xs text-muted-foreground">شاملة الفروع</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#3E2723]">
                    {meta.duration || "غير محدد"}
                  </p>
                  <p className="text-xs text-muted-foreground">وقت القراءة</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#3E2723]">PDF</p>
                  <p className="text-xs text-muted-foreground">تحميل فوري</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#3E2723_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </header>

      <div className="container mx-auto max-w-6xl py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* العمود الأيمن: المحتوى التفصيلي */}
          <div className="lg:col-span-7">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-gradient-to-b from-[#D4AF37] to-[#2A5B68] rounded-full"></div>
                <h2 className="text-3xl font-bold font-serif text-[#3E2723]">
                  محتويات الكتاب
                </h2>
              </div>

              {/* القائمة الطولية (بدون أيقونات) */}
              <div className="flex flex-col gap-3">
                {meta.sub_sections?.map((section: any, idx: number) => {
                  // تنسيق الرقم (01, 02, ...)
                  const number = String(idx + 1).padStart(2, "0");

                  return (
                    <div
                      key={idx}
                      className="group relative bg-white rounded-2xl border border-[#E6E2D3] p-5 flex items-center gap-6 transition-all duration-300 hover:shadow-lg hover:border-[#D4AF37]/50 hover:-translate-x-1 overflow-hidden"
                    >
                      {/* الشريط الجانبي الذهبي عند التحويم */}
                      <div className="absolute right-0 top-0 h-full w-1.5 bg-[#F9F7F0] group-hover:bg-[#D4AF37] transition-colors duration-300"></div>

                      {/* الرقم المتسلسل الكبير */}
                      <div className="relative z-10 flex-shrink-0 w-14 text-center">
                        <span className="text-4xl font-bold font-serif text-[#E6E2D3] group-hover:text-[#D4AF37]/20 transition-colors duration-300 select-none block">
                          {number}
                        </span>
                      </div>

                      {/* النصوص */}
                      <div className="flex-1 relative z-10 py-1">
                        <h3 className="text-lg font-bold text-[#3E2723] mb-1 group-hover:text-[#2A5B68] transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          فصل أساسي من فصول الكتاب
                        </p>
                      </div>

                      {/* سهم صغير في النهاية */}
                      <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0 pl-2">
                        <ChevronLeft className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* العمود الأيسر: كارت الشراء (لم يتغير) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#E6E2D3]">
              <div className="bg-gradient-to-r from-[#2A5B68] to-[#3E2723] px-5 py-2.5">
                <p className="text-white text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isAvailable ? "متاح للتحميل الفوري" : "قريباً"}
                </p>
              </div>

              <div className="p-6">
                <div className="text-center mb-5">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-4xl font-bold text-[#2A5B68] font-sans">
                      {book.price}
                    </span>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">ج.م</p>
                      <p className="text-[10px] text-green-600 font-bold">
                        شامل الضريبة
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 mb-5 bg-[#F9F7F0] rounded-2xl p-4">
                  {[
                    "نسخة PDF عالية الجودة",
                    "وصول مدى الحياة",
                    "تحديثات مجانية",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2A5B68]" />
                      <span className="text-xs text-[#3E2723]">{feat}</span>
                    </div>
                  ))}
                </div>

                <ProductActions
                  productId={book.id}
                  productData={productDataForActions}
                />

                <div className="mt-5 pt-5 border-t border-[#E6E2D3] flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    دفع آمن
                  </span>
                  <span className="text-[#E6E2D3]">•</span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    تحميل فوري
                  </span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[#3E2723] p-6 text-white text-center">
              <h3 className="font-bold mb-2">هل تحتاج مساعدة؟</h3>
              <p className="text-xs opacity-80 mb-4">
                احجز استشارة خاصة لمناقشة محتوى الكتاب
              </p>
              <Link
                href="/consultations"
                className="inline-block w-full py-2 bg-[#D4AF37] text-[#3E2723] rounded-xl font-bold text-sm hover:bg-[#c4a030] transition-colors"
              >
                حجز استشارة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
