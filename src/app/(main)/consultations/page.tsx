import { createClient } from "@/lib/supabase/server";
import BookingButton from "@/components/consultations/booking-button";
import {
  Users,
  HeartHandshake,
  BrainCircuit,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowDown,
  Star,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// هذا السطر يضمن تحديث الصفحة فوراً عند تعديل الأسعار في الأدمن
export const dynamic = "force-dynamic";

// دالة مساعدة لتحديد الشكل (الأيقونة واللون) بناءً على عنوان الاستشارة
const getServiceStyle = (title: string) => {
  if (title.includes("زوجية")) {
    return {
      icon: HeartHandshake,
      themeColor: "#D4AF37", // ذهبي
      bgClass: "bg-[#D4AF37]/5",
      borderClass: "border-[#D4AF37]/20",
    };
  } else if (title.includes("تربوية") || title.includes("أطفال")) {
    return {
      icon: Users,
      themeColor: "#2A5B68", // فيروزي
      bgClass: "bg-[#2A5B68]/5",
      borderClass: "border-[#2A5B68]/20",
    };
  } else {
    return {
      icon: BrainCircuit, // الافتراضي (للنفسي وغيره)
      themeColor: "#3E2723", // بني
      bgClass: "bg-[#3E2723]/5",
      borderClass: "border-[#3E2723]/20",
    };
  }
};

export default async function ConsultationsPage() {
  const supabase = await createClient();

  // 1. جلب البيانات من قاعدة البيانات
  const { data: consultations } = await supabase
    .from("consultation_types")
    .select("*")
    .order("price", { ascending: true });

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 relative font-sans" dir="rtl">
      
      {/* ================= 1. Hero Section ================= */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-[#D4AF37]/10">
        <div className="absolute inset-0 bg-[#EEEBE2] opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#3E2723_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="container relative z-10 text-center max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4AF37]/30 text-[#3E2723] text-sm font-bold mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>مساحة آمنة وسرية تامة</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-serif text-[#3E2723] mb-6 leading-tight">
            استشر{" "}
            <span className="text-[#2A5B68] relative inline-block">
              الخبراء
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#D4AF37] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>{" "}
            لبناء مستقبل أسري أفضل
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            نقدم لك جلسات استشارية متخصصة تجمع بين التأصيل العلمي والخبرة العملية، 
            لتجاوز العقبات بثقة وبناء حياة مستقرة.
          </p>

          <div className="flex justify-center gap-6 text-sm font-medium text-[#5C6B73]">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#E6E2D3] shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#2A5B68]" />
              <span>خبراء معتمدون</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#E6E2D3] shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#2A5B68]" />
              <span>متاح أونلاين</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. Services Cards (Dynamic from DB) ================= */}
      <section className="container max-w-6xl mx-auto -mt-12 relative z-20 px-4">
        {(!consultations || consultations.length === 0) ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[2rem] border border-dashed border-[#E6E2D3] text-center shadow-sm">
                <AlertCircle className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold text-[#3E2723]">لا توجد استشارات متاحة حالياً</h3>
                <p className="text-muted-foreground mt-2">يرجى العودة لاحقاً أو التواصل مع الإدارة.</p>
            </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {consultations.map((service) => {
            // تحديد الستايل بناءً على الاسم
            const style = getServiceStyle(service.title);
            
            // استخراج الوصف والمميزات من الميتاداتا
            // @ts-ignore
            const description = service.metadata?.description || "جلسة استشارية متخصصة.";
            
            // ✅ تصحيح: التأكد من أن المميزات مصفوفة لتجنب الأخطاء
            // @ts-ignore
            let features = service.metadata?.features;
            if (!Array.isArray(features)) {
                features = ["سرية تامة", "خطة علاجية", "متابعة دورية"]; // Fallback
            }

            return (
              <div
                key={service.id}
                className={cn(
                  "group relative bg-white rounded-[2rem] border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col",
                  style.borderClass
                )}
              >
                {/* شريط ملون علوي */}
                <div className="h-2 w-full" style={{ backgroundColor: style.themeColor }}></div>

                <div className="p-8 flex-1 flex flex-col">
                  {/* الأيقونة */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${style.themeColor}15`,
                      color: style.themeColor,
                    }}
                  >
                    <style.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>

                  {/* العنوان */}
                  <h3 className="text-2xl font-bold font-serif text-[#3E2723] mb-3 group-hover:text-[#2A5B68] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[60px]">
                    {description}
                  </p>

                  {/* ✅ المميزات: الآن تعرض البيانات الحقيقية */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#5C6B73]">
                            <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] mt-0.5 shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                  </ul>

                  {/* السعر والمدة */}
                  <div className={cn("rounded-xl p-4 mb-6 flex justify-between items-center", style.bgClass)}>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground mb-1">المدة</span>
                      <div className="flex items-center gap-1 font-bold text-[#3E2723]">
                        <Clock className="w-3.5 h-3.5 opacity-70" />
                        {service.duration || "--"}
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-muted-foreground mb-1">الاستثمار</span>
                      <div className="text-xl font-bold" style={{ color: style.themeColor }}>
                        {service.price} <span className="text-xs text-black/60">ج.م</span>
                      </div>
                    </div>
                  </div>

                  {/* زر الحجز (Client Component) */}
                  <BookingButton 
                    service={{
                        title: service.title,
                        price: service.price,
                        duration: service.duration || ""
                    }} 
                    themeColor={style.themeColor} 
                  />
                </div>
              </div>
            );
          })}
        </div>
        )}
      </section>

      {/* ================= 3. How it Works ================= */}
      <section className="container max-w-5xl mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-bold text-sm tracking-wide uppercase mb-2 block">
            خطوات الحجز
          </span>
          <h2 className="text-3xl font-bold font-serif text-[#3E2723]">
            ابدأ رحلة الوعي الآن
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dashed border-[#E6E2D3] z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {[
              { title: "اختر الخدمة", desc: "حدد نوع الاستشارة المناسبة" },
              { title: "تواصل معنا", desc: "اضغط زر الحجز للانتقال للواتساب" },
              { title: "تنسيق الموعد", desc: "سيتم الاتفاق على الموعد وطريقة الدفع" },
              { title: "ابدأ الجلسة", desc: "لقاء مباشر عبر Zoom في الموعد المحدد" },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-[#FDFBF7] shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                  <span className="text-3xl font-serif font-bold text-[#2A5B68]">
                    {idx + 1}
                  </span>
                  {idx < 3 && (
                    <ArrowDown className="md:hidden w-6 h-6 text-[#E6E2D3] absolute -bottom-10" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-[#3E2723] mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}