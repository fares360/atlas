import Link from "next/link";
import { BookOpen, Star, ArrowLeft, Download, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// بيانات تجريبية للكتب (سنربطها بـ Supabase لاحقاً)
const books = [
  {
    id: 1,
    title: "المجلد الأول: مقاصد الفكر الإرشادي",
    price: 150,
    color: "bg-[#2A5B68]",
  },
  {
    id: 2,
    title: "المجلد الثاني: القارة الزواجية",
    price: 180,
    color: "bg-[#D4AF37]",
  },
  {
    id: 3,
    title: "المجلد الثالث: القارة التربوية",
    price: 200,
    color: "bg-[#3E2723]",
  },
  {
    id: 4,
    title: "المجلد الرابع: القارة النفسية",
    price: 160,
    color: "bg-[#8C6B28]",
  },
  {
    id: 5,
    title: "المجلد الخامس: إرشاد الموهوبين",
    price: 170,
    color: "bg-[#568EA3]",
  },
  {
    id: 6,
    title: "المجلد السادس: الإرشاد المدرسي",
    price: 140,
    color: "bg-[#7DB546]",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      {/* 1. Hero Section: واجهة فخمة للترحيب */}
      <section className="relative bg-[#EEEBE2] border-b border-[#D6D3C9] py-20 overflow-hidden">
        {/* زخرفة خلفية خفيفة */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3E2723_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-[#D4AF37]/30 text-[#3E2723] mb-6 animate-in slide-in-from-bottom-4">
            <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
            <span className="text-sm font-medium">
              المرجع الأول للأسرة العربية
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-serif text-[#3E2723] mb-6 leading-tight">
            موسوعة الأطلس التربوي
            <br />
            <span className="text-[#2A5B68]">للتوجيه والإرشاد الأسري</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            موسوعة شاملة تضم 10 مجلدات تغطي كافة جوانب الحياة الأسرية والتربوية
            والنفسية، مدعمة بشروحات مرئية واستشارات متخصصة.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#books-grid"
              className="px-8 py-3 bg-[#2A5B68] text-white rounded-lg font-bold hover:bg-[#1f4a56] transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              تصفح الموسوعة
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 bg-white border-2 border-[#D6D3C9] text-[#3E2723] rounded-lg font-bold hover:bg-[#F9F7F0] transition-colors"
            >
              اعرف المزيد
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Products Grid: شبكة عرض الكتب */}
      <section id="books-grid" className="container py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold font-serif text-[#3E2723]">
            مجلدات الموسوعة
          </h2>
          <span className="text-muted-foreground font-sans">
            {books.length} مجلدات متوفرة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="group bg-white rounded-xl border border-[#E6E2D3] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* غلاف الكتاب (Placeholder) */}
              <div
                className={cn(
                  "h-48 flex items-center justify-center relative overflow-hidden",
                  book.color
                )}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <BookOpen className="w-16 h-16 text-white/90 drop-shadow-md" />
                <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-white/30">
                  PDF + فيديو
                </div>
              </div>

              {/* تفاصيل الكتاب */}
              <div className="p-6">
                <h3 className="text-xl font-bold font-serif text-[#3E2723] mb-2 group-hover:text-[#2A5B68] transition-colors line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  دليل شامل يتناول أصول وقواعد هذا العلم بأسلوب عصري ومبسط...
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">السعر</span>
                    <span className="text-lg font-bold text-[#2A5B68]">
                      {book.price} ج.م
                    </span>
                  </div>

                  <Link
                    href={`/books/${book.id}`}
                    className="px-4 py-2 bg-[#FDFBF7] border border-[#D4AF37] text-[#3E2723] rounded-lg text-sm font-bold hover:bg-[#D4AF37] hover:text-white transition-all"
                  >
                    التفاصيل
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Features Banner: ميزات إضافية */}
      <section className="bg-[#2A5B68] text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-2">تحميل فوري</h3>
              <p className="text-white/80 text-sm">
                احصل على نسخة PDF عالية الجودة فور إتمام عملية الشراء.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-2">شرح مرئي</h3>
              <p className="text-white/80 text-sm">
                فيديوهات حصرية تشرح محتوى كل مجلد لتعميق الفهم.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-2">
                استشارات خاصة
              </h3>
              <p className="text-white/80 text-sm">
                إمكانية حجز جلسة استشارية مع مختصين حول موضوع الكتاب.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
