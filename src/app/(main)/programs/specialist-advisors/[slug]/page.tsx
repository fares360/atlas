"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { diplomasData } from "@/lib/diplomas-data";
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  Clock,
  MapPin,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { use } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DiplomaDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const diploma = diplomasData.find((d) => d.slug === slug);

  if (!diploma) {
    return notFound();
  }

  // ✅ رابط Google Form. يجب على العميل إعطاؤك رابط مخصص لكل دبلوم أو رابط عام!
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScV-zaG7xahi4mqEm-OQhQgMhUk8lS_OoSYBdXH-adoee8RlA/viewform?usp=dialog";

  // ✅ بيانات وهمية للمواعيد والرسوم (يجب أن تظهر في صفحة التفاصيل)
  const DIPLOMA_DETAILS = [
    { icon: Clock, label: "60 ساعة تدريبية", value: "مدة الدبلوم" },
    { icon: MapPin, label: "Online", value: "المكان الحالي" },
    { icon: DollarSign, label: "5,000 ج.م", value: "رسوم البرنامج" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 md:px-8" dir="rtl">
      {/* Header & Navigation */}
      <div className="container mx-auto max-w-6xl mb-10">
        <Link
          href="/programs/specialist-advisors"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#2A5B68] transition-colors mb-8 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للقائمة
        </Link>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#E6E2D3] relative overflow-hidden">
          <div
            className={cn(
              "absolute top-0 right-0 w-full h-2",
              diploma.barColor
            )}
          ></div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div
              className={cn(
                "w-20 h-20 rounded-3xl flex items-center justify-center shrink-0",
                diploma.bgColor,
                diploma.color
              )}
            >
              <diploma.icon className="w-10 h-10" />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#3E2723] mb-4 leading-tight">
                {diploma.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {diploma.fullDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. Details Section (تم توسيعه ليحتل 8/12) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-[#E6E2D3] shadow-sm">
            <h3 className="text-xl font-bold font-serif text-[#2A5B68] mb-6">
              ماذا ستحصل عليه؟
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>شهادة معتمدة بعد إتمام الساعات التدريبية.</span>
              </li>
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>حقيبة تدريبية شاملة ومراجع علمية.</span>
              </li>
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>ورش عمل تطبيقية عملية على دراسات حالة.</span>
              </li>
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>متابعة وإشراف مهني مباشر من المختصين.</span>
              </li>
            </ul>
          </div>

          {/* ✅ عرض معلومات المواعيد والرسوم هنا بجوار المميزات */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#E6E2D3] shadow-sm">
            <h3 className="text-xl font-bold font-serif text-[#2A5B68] mb-6">
              معلومات الدبلوم
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DIPLOMA_DETAILS.map((detail, index) => (
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

        {/* 3. Booking Form (الخيار الأسهل: زر يفتح Google Form) */}
        <div className="lg:col-span-4">
          <div className="bg-[#2A5B68] text-white p-8 rounded-[2rem] shadow-xl sticky top-8 text-center">
            <h3 className="text-2xl font-bold font-serif mb-4">هل أنت مهتم؟</h3>
            <p className="text-white/80 mb-8 text-sm leading-relaxed">
              المقاعد محدودة. اضغط على الزر أدناه لتسجيل بياناتك والحصول على
              المواعيد النهائية للدورة.
            </p>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#D4AF37] hover:bg-[#c4a030] text-[#3E2723] font-bold rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
            >
              تسجيل طلب الحجز الآن
              <Send className="w-4 h-4" />
            </a>

            <p className="mt-4 text-xs text-white/50">
              سيتم فتح نموذج التسجيل الخارجي (Google Forms) في نافذة جديدة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
