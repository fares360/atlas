import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// بيانات الكروت (المشكاة)
const mishkatItems = [
  {
    id: "quran",
    title: "المشكاة القرآنية",
    description: "نصوص قرآنية حول موضوعات الإرشاد الأسري",

    image: "/images/mishkat/quran.png",
    color: "bg-[#D4AF37]", // ذهبي
    href: "/mishkat/quran",
  },
  {
    id: "nabawi",
    title: "المشكاة النبوية",
    description: "نصوص نبوية حول موضوعات الإرشاد الأسري",
    image: "/images/mishkat/nabawi.png",
    color: "bg-[#5C8D77]", // أخضر زيتي (تقريبي من الصورة)
    href: "/mishkat/nabawi",
  },
  {
    id: "lataif",
    title: "مشكاة اللطائف",
    description: "لطائف ومقتطفات مقاصدية من كتب المقاصد",
    image: "/images/mishkat/lataif.png",
    color: "bg-[#7FB3C9]", // أزرق سماوي (تقريبي)
    href: "/mishkat/lataif",
  },
  {
    id: "namazeg",
    title: "مشكاة النماذج",
    description: "نماذج من التوجيه والإرشاد بين الماضي والحاضر",
    image: "/images/mishkat/namazeg.png",
    color: "bg-[#8B9EB7]", // رمادي مزرق (تقريبي)
    href: "/mishkat/namazeg",
  },
];

export default function MishkatPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16 px-4" dir="rtl">
      {/* 1. Header Section */}
      <div className="container mx-auto max-w-6xl mb-16 text-center">
        {/* العنوان داخل كبسولة ذهبية كبيرة كما في الصورة الأصلية */}
        <div className="inline-block bg-[#FFC107] px-12 py-3 rounded-full shadow-md border-b-4 border-[#E0A800] mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#3E2723]">
            المشكاة
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          نافذة تربوية تطل على نصوص الوحيين، وتستلهم من تراثنا التربوي ما ينير
          طريق المربي في العصر الحديث.
        </p>
      </div>

      {/* 2. Grid Section */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* الكروت */}
          {mishkatItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
            >
              {/* الإطار البيضاوي الكبير (الكبسولة) */}
              <div className="w-full bg-white rounded-[100px] border-4 border-[#E6E2D3] shadow-lg overflow-hidden flex flex-col h-[450px] relative hover:border-[#D4AF37]/50 hover:shadow-xl transition-all">
                {/* الجزء العلوي: الصورة (دائرة مدمجة) */}
                <div className="h-[280px] w-full relative flex items-center justify-center pt-6 bg-gradient-to-b from-[#FFF] to-[#F5F5F5]">
                  <div className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-white shadow-inner">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* الشريط الفاصل (العنوان) */}
                <div
                  className={`${item.color} w-full py-3 px-2 flex items-center justify-center relative z-10 shadow-md`}
                >
                  <h3 className="text-white font-bold font-serif text-lg md:text-xl drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>

                {/* الجزء السفلي: الوصف */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#FDFBF7]">
                  <p className="text-[#3E2723] font-medium text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* سهم صغير يظهر عند التحويم */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <ArrowLeft className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
