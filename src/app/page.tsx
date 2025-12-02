import ServiceCard from "@/components/shared/service-card";
import { GraduationCap } from "lucide-react";

export default function AcademyHome() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* القسم الأول: التعريف (Hero) */}
      <section className="pt-8 pb-4 text-center px-4">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <GraduationCap className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3 font-serif">
          أكاديمية مودة لعلوم الأسرة
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
          أكاديمية متخصصة في تقديم برامج الإرشاد الأسري وبناء الكفاءات التربوية
          وفق منهجية علمية أصيلة.
        </p>
      </section>

      {/* القسم الثاني: الخدمات الأساسية (Grid) */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Block 1: الاستشارات */}
          <ServiceCard
            title="الاستشارات الأسرية والنفسية"
            description="جلسات خاصة لحل المشكلات الزوجية والتربوية والنفسية في سرية تامة."
            href="/consultations"
          />

          {/* Block 2: الموهوبين */}
          <ServiceCard
            title="اكتشاف ورعاية الموهوبين"
            description="برامج متخصصة واختبارات لاكتشاف نقاط القوة والإبداع لدى الأبناء."
            href="/talents"
          />

          {/* Block 3: تأهيل المراكز */}
          <ServiceCard
            title="تأهيل المراكز والمستشارين"
            description="برامج اعتماد وتطوير للمراكز التدريبية والمستشارين التربويين."
            href="/centers"
          />

          {/* Block 4: البودكاست (آخر واحد) */}
          <ServiceCard
            title="بودكاست الأكاديمية"
            description="حوارات صوتية ومرئية تثري الوعي التربوي والأسري."
            href="/podcast"
          />
        </div>
      </section>

      {/* نص الفريق (بسيط في النهاية) */}
      <section className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          تعرف على فريق عمل الأكاديمية ونخبة المستشارين
        </p>
      </section>
    </div>
  );
}
