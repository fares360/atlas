"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { familyLicensesData } from "@/lib/family-data";
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  Clock,
  CalendarCheck,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { use } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LicenseDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  // البحث عن الرخصة باستخدام الـ Slug
  const license = familyLicensesData.find((d) => d.slug === slug);

  if (!license) {
    return notFound();
  }

  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScV-zaG7xahi4mqEm-OQhQgMhUk8lS_OoSYBdXH-adoee8RlA/viewform?usp=dialog";

  // تفاصيل ثابتة لكل الرخص (أو يمكن تخصيصها في ملف البيانات لو حبيت)
  const LICENSE_DETAILS = [
    { icon: Clock, label: "4-5 ساعات", value: "مدة الرخصة" },
    { icon: CalendarCheck, label: "يوم واحد", value: "الأيام التدريبية" },
    { icon: Award, label: "شهادة حضور", value: "نوع الشهادة" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 md:px-8" dir="rtl">
      {/* Header & Navigation */}
      <div className="container mx-auto max-w-6xl mb-10">
        <Link
          href="/programs/family-integrated"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#2A5B68] transition-colors mb-8 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة لقائمة الرخص
        </Link>

        {/* الكارت الرئيسي الملون بالألوان الديناميكية */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#E6E2D3] relative overflow-hidden">
          <div
            className={cn(
              "absolute top-0 right-0 w-full h-2",
              license.barColor
            )}
          ></div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div
              className={cn(
                "w-20 h-20 rounded-3xl flex items-center justify-center shrink-0",
                license.bgColor,
                license.color
              )}
            >
              <license.icon className="w-10 h-10" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                  الفئة المستهدفة: {license.target}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#3E2723] mb-4 leading-tight">
                {license.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {license.fullDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* تفاصيل المحتوى (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-[#E6E2D3] shadow-sm">
            <h3 className="text-xl font-bold font-serif text-[#2A5B68] mb-6">
              مخرجات التعلم
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>إتقان المهارات الأساسية لموضوع الرخصة.</span>
              </li>
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>الحصول على تطبيقات عملية قابلة للتنفيذ.</span>
              </li>
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>المشاركة في ورش عمل تفاعلية أثناء التدريب.</span>
              </li>
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>مادة علمية مرجعية للموضوع.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-[#E6E2D3] shadow-sm">
            <h3 className="text-xl font-bold font-serif text-[#2A5B68] mb-6">
              تفاصيل التدريب
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LICENSE_DETAILS.map((detail, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <detail.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {detail.value}
                    </p>
                    <p className="text-lg font-bold text-[#3E2723] leading-snug">
                      {detail.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* نموذج الحجز (4/12) */}
        <div className="lg:col-span-4">
          <div className="bg-[#2A5B68] text-white p-8 rounded-[2rem] shadow-xl sticky top-8 text-center">
            <h3 className="text-2xl font-bold font-serif mb-4">
              حجز الرخصة
            </h3>
            <p className="text-white/80 mb-8 text-sm leading-relaxed">
              يمكنك حجز هذه الرخصة بشكل منفرد، أو كجزء من البرنامج المتكامل للأسرة.
            </p>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#D4AF37] hover:bg-[#c4a030] text-[#3E2723] font-bold rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
            >
              سجل اهتمامك الآن
              <Send className="w-4 h-4" />
            </a>

            <p className="mt-4 text-xs text-white/50">
              سيتم التواصل معك لتحديد أقرب موعد لانعقاد الدورة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}