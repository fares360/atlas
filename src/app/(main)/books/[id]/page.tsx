import Link from "next/link";
import {
  Check,
  BookOpen,
  PlayCircle,
  ShieldCheck,
  Calendar,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AddToCartBtn from "@/components/ui/add-to-cart-btn";

// محاكاة لجلب البيانات
const getBookDetails = (id: string) => {
  return {
    id,
    title: "المجلد الأول: مقاصد الفكر الإرشادي",
    subtitle: "تأسيس القواعد الفكرية للتوجيه الأسري في ضوء المقاصد الشرعية",
    price: 150,
    description: `
      يعتبر هذا المجلد حجر الأساس في فهم المنظومة الإرشادية. يتناول بالتفصيل القواعد الكلية التي تحكم العملية الإرشادية، 
      مستمدًا أصوله من مقاصد الشريعة الإسلامية وفهم الواقع المعاصر.
      
      ستتعلم في هذا الكتاب كيف توازن بين الأصالة والمعاصرة في حل المشكلات الأسرية، وكيف تبني منهجية تفكير سليمة قبل البدء في الممارسة العملية.
    `,
    features: [
      "نسخة PDF عالية الجودة (قابلة للطباعة)",
      "شرح فيديو حصري (3 ساعات)",
      "خرائط ذهنية للمفاهيم المعقدة",
      "حقيبة أدوات المربي (نماذج عمل)",
    ],
    color: "bg-[#2A5B68]",
  };
};

export default async function BookPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const book = getBookDetails(resolvedParams.id);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* 1. Breadcrumb */}
      <div className="container py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-[#2A5B68] transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-[#3E2723] font-bold">تفاصيل الكتاب</span>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 2. Right Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E6E2D3] shadow-sm flex flex-col md:flex-row gap-8">
              <div
                className={cn(
                  "w-full md:w-48 h-64 rounded-lg shadow-inner flex items-center justify-center shrink-0",
                  book.color
                )}
              >
                <BookOpen className="w-20 h-20 text-white/90" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#D4AF37]/10 text-[#8C6B28] px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37]/20">
                    الأكثر مبيعاً
                  </span>
                </div>
                <h1 className="text-3xl font-bold font-serif text-[#3E2723] mb-2 leading-snug">
                  {book.title}
                </h1>
                <h2 className="text-lg text-muted-foreground mb-6 font-medium">
                  {book.subtitle}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm text-[#5C6B73]">
                  <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-md border">
                    <BookOpen className="w-4 h-4" />
                    <span>320 صفحة</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-md border">
                    <PlayCircle className="w-4 h-4" />
                    <span>فيديو شرح</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-md border">
                    <ShieldCheck className="w-4 h-4" />
                    <span>ضمان الجودة</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground leading-loose">
              <h3 className="text-2xl font-bold font-serif text-[#3E2723] mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-[#D4AF37] fill-current" />
                نبذة عن الكتاب
              </h3>
              <p className="whitespace-pre-line text-lg">{book.description}</p>

              <div className="mt-8 bg-[#F9F7F0] p-6 rounded-xl border border-[#E6E2D3]">
                <h4 className="font-bold text-[#3E2723] mb-4">
                  ماذا ستتعلم في هذا المجلد؟
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
                  {book.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="bg-[#7DB546]/20 p-1 rounded-full">
                        <Check className="w-4 h-4 text-[#7DB546]" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Left Column: Sticky Cart Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* كارت السعر والشراء */}
              <div className="bg-white p-6 rounded-2xl border-2 border-[#E6E2D3] shadow-lg">
                <div className="flex items-end justify-between mb-6 border-b border-dashed pb-4">
                  <span className="text-muted-foreground font-medium">
                    سعر النسخة
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#2A5B68]">
                      {book.price}
                    </span>
                    <span className="text-sm text-muted-foreground">ج.م</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* ✅ هنا وضعنا الزر المبرمج فقط */}
                  <AddToCartBtn
                    item={{
                      id: book.id,
                      title: book.title,
                      price: book.price,
                      type: "book",
                    }}
                  />
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    دفع آمن 100% • استلام فوري
                  </p>
                </div>
              </div>

              {/* كارت حجز الاستشارة (Upsell) */}
              <div className="bg-[#3E2723] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
                <h3 className="text-lg font-bold font-serif mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  تحتاج مساعدة خاصة؟
                </h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  يمكنك حجز جلسة استشارية خاصة مدتها 45 دقيقة لمناقشة محتوى هذا
                  الكتاب مع خبير تربوي.
                </p>
                <button className="w-full bg-[#D4AF37] hover:bg-[#b8962e] text-[#3E2723] font-bold py-3 rounded-lg text-sm transition-colors">
                  حجز استشارة (+250 ج.م)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
