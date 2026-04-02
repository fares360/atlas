import ServiceCard from "@/components/shared/service-card";
import {
  Users,
  Sparkles,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Eye,
  ScrollText,
  Layers,
  PenTool,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    // ✅ إضافة overflow-x-hidden لمنع الميلان والسكرول العرضي
    <main className="min-h-screen bg-[#FDFBF7] overflow-x-hidden w-full">
      {/* ================= القسم الأول: التعريف (Hero) ================= */}
      <section className="relative bg-[#EEEBE2] border-b border-[#D6D3C9] py-16 md:py-24 overflow-hidden">
        {/* زخرفة خلفية ناعمة */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#3E2723_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl px-4 md:px-6">
          {/* اللوجو */}
          <div className="mx-auto mb-10 md:mb-10 w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center">
            <img
              src="/images/logo-removebg-preview.png"
              alt="شعار الأكاديمية"
              className="w-full h-full object-contain rounded-full opacity-100 hover:opacity-90 transition-opacity"
            />
          </div>

          {/* العناوين - تم تصغير الخطوط للموبايل */}
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            <h1 className="text-3xl md:text-6xl font-bold font-serif text-[#2A5B68] leading-tight">
              أكاديمية مودة لعلوم الأسرة
            </h1>

            <h2 className="text-xl md:text-4xl font-bold font-serif text-[#3E2723] mb-6 leading-snug">
              أكاديمية متخصصة في تقديم <br className="hidden md:block" /> برامج
              الإرشاد الأسري
            </h2>
          </div>

          {/* الوصف */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10 px-2">
            أكاديمية متخصصة في تأهيل المستشارين واكتشاف الموهوبين، تحمل رؤية
            طموحة لبناء الإنسان. نهدف إلى تطوير المؤسسات المهنية للوصول إلى أعلى
            مستويات الاحترافية.
          </p>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full sm:w-auto animate-in slide-in-from-bottom-4 duration-500">
            <Link
              href="#services-grid"
              className="group w-full sm:w-auto min-w-[200px] px-8 py-3.5 bg-[#2A5B68] text-white rounded-xl font-bold hover:bg-[#1f4a56] transition-all shadow-lg hover:shadow-[#2A5B68]/20 flex items-center justify-center gap-2 active:scale-95"
            >
              تصفح الخدمات
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/atlas"
              className="group w-full sm:w-auto min-w-[200px] px-8 py-3.5 bg-white border-2 border-[#D6D3C9] text-[#3E2723] rounded-xl font-bold hover:bg-[#F9F7F0] hover:border-[#2A5B68]/30 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              تصفح الموسوعة
              <BookOpen className="w-5 h-5 text-[#2A5B68] opacity-70 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= القسم الثاني: الخدمات الأساسية ================= */}
      <section
        id="services-grid"
        className="container mx-auto py-16 md:py-20 px-4 relative z-20"
      >
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#D4AF37] font-bold text-xs md:text-sm tracking-wide uppercase mb-2 block">
            خدماتنا
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#3E2723]">
            مسارات التميز في الأكاديمية
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 max-w-7xl mx-auto">
          {/* الكروت */}
          <ServiceCard
            title="أطلس التوجيه والإرشاد"
            description="الموسوعة العربية الشاملة (10 مجلدات) التي تغطي كافة جوانب الحياة الأسرية والتربوية والنفسية."
            href="/atlas"
            icon={BookOpen}
            colorClass="text-[#1F618D]"
          />
          <ServiceCard
            title="برامج الأكاديمية"
            description="مصفوفة متكاملة من الدورات التدريبية وورش العمل لبناء المهارات التربوية وتأصيل الوعي الأسري."
            href="/programs"
            icon={Layers}
            colorClass="text-[#5C8D77]"
          />
          <ServiceCard
            title="حجز استشارة"
            description="بوابة شاملة للخدمات الاستشارية (الزوجية، التربوية، والنفسية) على يد نخبة من الخبراء المتخصصين."
            href="/consultations"
            icon={Users}
            colorClass="text-[#2A5B68]"
          />
          <ServiceCard
            title="اكتشاف ورعاية الموهوبين"
            description="برامج نوعية ومقاييس عالمية لاكتشاف نقاط القوة ومكامن الإبداع لدى الأبناء وتنميتها."
            href="/talent-discovery"
            icon={Sparkles}
            colorClass="text-[#D4AF37]"
          />
          <ServiceCard
            title="تأهيل المراكز والمختصين"
            description="برامج اعتماد مهني وتطوير مؤسسي لمراكز الاستشارات الأسرية والممارسين في المجال التربوي."
            href="/centers"
            icon={GraduationCap}
            colorClass="text-[#3E2723]"
          />
          <ServiceCard
            title="مقالات الأكاديمية"
            description="مكتبة معرفية تضم مقالات متجددة ورؤى تحليلية لقضايا الأسرة والمجتمع بأقلام نخبة من المتخصصين."
            href="/articles"
            icon={PenTool}
            colorClass="text-[#6C3483]"
          />
        </div>
      </section>

      {/* ================= قسم الرؤية والرسالة ================= */}
      <section className="py-16 md:py-20 bg-white border-y border-[#E6E2D3] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-[#F9F7F0] skew-x-12 translate-x-32 hidden lg:block"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-5xl mx-auto">
            <div className="flex gap-4 md:gap-5 items-start p-5 md:p-6 rounded-2xl hover:bg-[#F9F7F0] transition-colors duration-300 border border-transparent hover:border-[#E6E2D3]">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#2A5B68]/10 rounded-2xl flex items-center justify-center shrink-0 text-[#2A5B68]">
                <Eye className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-[#3E2723] mb-2 md:mb-3">
                  رؤيتنا
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                  نحو أسرة رائدة، وإنسان ذو أثر صالح، ومجتمع متماسك يبنى على
                  الوعي والقيم.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-5 items-start p-5 md:p-6 rounded-2xl hover:bg-[#F9F7F0] transition-colors duration-300 border border-transparent hover:border-[#E6E2D3]">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center shrink-0 text-[#D4AF37]">
                <ScrollText className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-[#3E2723] mb-2 md:mb-3">
                  رسالتنا
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                  من أجل الآباء والأبناء، من أجل حياة أسرية هادئة هادفة، نقدم
                  العلم والمشورة بأعلى معايير المهنية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= نص الفريق (الختام) ================= */}
      <div className="bg-[#EEEBE2] py-8 md:py-12 text-center border-b-4 border-[#D4AF37]">
        <div className="container mx-auto px-4">
          <div className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-3 px-6 md:px-8 py-3 bg-white border border-[#D6D3C9] rounded-2xl md:rounded-full shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2A5B68] animate-pulse"></span>
              <span className="text-sm md:text-base font-medium text-muted-foreground">
                بقيادة وتوجيه المستشار الأسري
              </span>
            </div>
            <span className="text-[#3E2723] font-bold text-base md:text-lg">
              أ. عمر محمود
            </span>
            <span className="text-xs md:text-sm text-muted-foreground hidden md:inline">
              ونخبة من المختصين
            </span>
            <span className="text-xs md:text-sm text-muted-foreground md:hidden">
              ونخبة من المختصين
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
