import { createClient } from "@/lib/supabase/server";
import EncyclopediaCard from "@/components/shared/encyclopedia-card";
import {
  BookOpen,
  Quote,
  Sparkles,
  Heart,
  Users,
  Home,
  Baby,
  GraduationCap,
  Brain,
  Activity,
  Globe,
  Calendar
} from "lucide-react";

// ✅ 1. منع الكاش
export const dynamic = "force-dynamic";
export const revalidate = 0;

const iconMap: any = {
  Heart, Users, Home, Baby, GraduationCap, Brain, Activity, Globe, Sparkles, Calendar
};

// ✅ 2. تعريف قواعد الترتيب (ID أولاً، ثم كلمات مفتاحية كبديل)
const ORDER_RULES = [
  { id: 'a0000001-0000-0000-0000-000000000001', keyword: 'الأول' },
  { id: 'a0000002-0000-0000-0000-000000000002', keyword: 'الثاني' },
  { id: 'a0000003-0000-0000-0000-000000000003', keyword: 'الثالث' },
  { id: 'a0000004-0000-0000-0000-000000000004', keyword: 'الرابع' }
];

const checkAvailability = (val: any): boolean => {
  if (val === true) return true;
  if (val === "true") return true;
  if (val === "on") return true;
  return false;
};

async function getBooks() {
  const supabase = await createClient();
  const { data: books, error } = await supabase.from("books").select("*");

  if (error || !books) {
    console.error("Error fetching books:", error);
    return [];
  }
  return books;
}

export default async function AtlasPage() {
  const rawBooks = await getBooks();

  // ✅ 3. خوارزمية الترتيب الذكية (The Smart Sorter)
  const sortedBooks = new Array(4).fill(null); // أماكن محجوزة للأجزاء الأربعة
  const remainingBooks: any[] = [];

  // تصنيف الكتب
  rawBooks.forEach(book => {
    // حاول تلاقي مكانه بناءً على الـ ID
    let index = ORDER_RULES.findIndex(rule => rule.id === book.id);
    
    // لو ملقاش الـ ID، حاول تلاقي مكانه بناءً على العنوان (احتياطي)
    if (index === -1) {
      index = ORDER_RULES.findIndex(rule => book.title.includes(rule.keyword));
    }

    if (index !== -1 && sortedBooks[index] === null) {
      sortedBooks[index] = book; // حط الكتاب في مكانه الصح
    } else {
      remainingBooks.push(book); // كتب إضافية أو مكررة
    }
  });

  // دمج الكتب المرتبة مع الكتب الزيادة (بدون ما نخفي حاجة)
  // بنشيل الـ null لو فيه جزء ناقص لسه مضفناهوش للداتابيز
  const finalDisplayList = [...sortedBooks.filter(b => b !== null), ...remainingBooks];

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16 px-4" dir="rtl">
      {/* Hero Section */}
      <section className="container mx-auto max-w-5xl mb-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6E2D3] border border-[#D4AF37]/30 text-[#3E2723] text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37] fill-current" />
            <span>المرجع الأول للأسرة العربية</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-[#2A5B68] mb-2">
            أطلس التوجيه والإرشاد الأسري
          </h1>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-[#3E2723]/5 border border-[#E6E2D3] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-br-full -translate-x-10 -translate-y-10"></div>
             <div className="relative z-10 text-lg md:text-xl leading-[2] text-[#3E2723]/90 font-medium text-justify">
            <p className="mb-6">
              إذا كان الكثير من الناس يقومون بالفعل بدور النصح والتوجيه لمن
              حولهم بشكل فطري تلقائي، وإذا كانت عملية التوجيه والإرشاد صارت
              اليوم ركيزة أساسية ومقوم أصيل داخل المؤسسات.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-10 border-b border-[#E6E2D3] pb-4">
          <div className="w-12 h-12 bg-[#2A5B68] rounded-2xl flex items-center justify-center text-white shadow-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#3E2723]">
            محتويات الموسوعة
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {finalDisplayList.length > 0 ? (
            finalDisplayList.map((book: any, index) => {
              const meta = book.metadata || {};
              const rawSubSections = Array.isArray(meta.sub_sections) ? meta.sub_sections : [];
              
              const subSections = rawSubSections.map((sub: any) => ({
                title: sub.title,
                icon: iconMap[sub.icon] || Sparkles,
              }));

              const isAvailable = checkAvailability(meta.is_available);

              return (
                <EncyclopediaCard
                  key={book.id}
                  // بنحاول نستنتج رقم الجزء من الترتيب، أو نستخدم الاندكس + 1
                  partNumber={index + 1} 
                  title={book.title}
                  description={book.description}
                  // نستخدم الـ ID الفعلي للرابط عشان ميحصلش خطأ 404
                  href={`/atlas/part/${index + 1}`} 
                  isAvailable={isAvailable}
                  subSections={subSections}
                  disabled={false}
                />
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12 text-muted-foreground">
              لا توجد كتب متاحة حالياً للعرض. تأكد من قاعدة البيانات.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}