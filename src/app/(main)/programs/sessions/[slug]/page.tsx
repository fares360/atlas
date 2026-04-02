"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { sessionsData } from "@/lib/sessions-data"; // ✅ استيراد بيانات الجلسات
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  Clock,
  CalendarCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { use } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SessionDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  
  // 1. البحث عن الجلسة باستخدام الـ ID (اللي هو الـ slug هنا)
  const session = sessionsData.find((s) => s.id === slug);

  if (!session) {
    return notFound();
  }

  const GOOGLE_FORM_URL ="https://docs.google.com/forms/d/e/1FAIpQLScV-zaG7xahi4mqEm-OQhQgMhUk8lS_OoSYBdXH-adoee8RlA/viewform?usp=dialog";


  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 md:px-8" dir="rtl">
      {/* Header & Navigation */}
      <div className="container mx-auto max-w-6xl mb-10">
        <Link
          href="/programs/sessions"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#2A5B68] transition-colors mb-8 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة لقائمة الجلسات
        </Link>

        {/* الكارت الرئيسي الملون */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#E6E2D3] relative overflow-hidden">
          {/* الشريط الملون العلوي */}
          <div
            className={cn(
              "absolute top-0 right-0 w-full h-2",
              session.barColor
            )}
          ></div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* الأيقونة */}
            <div
              className={cn(
                "w-20 h-20 rounded-3xl flex items-center justify-center shrink-0",
                session.bgColor,
                session.color
              )}
            >
              <session.icon className="w-10 h-10" />
            </div>

            {/* المحتوى النصي */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#3E2723] mb-4 leading-tight">
                {session.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {session.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* العمود الأيمن: التفاصيل (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* المميزات */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#E6E2D3] shadow-sm">
            <h3 className="text-xl font-bold font-serif text-[#2A5B68] mb-6">
              ماذا يقدم هذا البرنامج؟
            </h3>
            <ul className="grid grid-cols-1 gap-y-4">
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>تحليل دقيق للمشكلة أو الاحتياج (سواء فردي أو جماعي).</span>
              </li>
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>خطة عمل عملية وواقعية قابلة للتطبيق.</span>
              </li>
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>متابعة دورية لضمان الوصول للنتائج المرجوة.</span>
              </li>
              <li className="flex items-start gap-3 text-[#3E2723]/80">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                <span>سرية تامة وخصوصية في التعامل مع البيانات.</span>
              </li>
            </ul>
          </div>

          {/* تفاصيل إضافية */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#E6E2D3] shadow-sm">
            <h3 className="text-xl font-bold font-serif text-[#2A5B68] mb-6">
              معلومات الحجز
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المدة</p>
                  <p className="text-lg font-bold text-[#3E2723]">حسب الاتفاق</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">السعر</p>
                  <p className="text-lg font-bold text-[#3E2723]">500ج.م</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">النوع</p>
                  <p className="text-lg font-bold text-[#3E2723]">{session.target}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* العمود الأيسر: الحجز (4/12) */}
        <div className="lg:col-span-4">
          <div className="bg-[#2A5B68] text-white p-8 rounded-[2rem] shadow-xl sticky top-8 text-center">
            <h3 className="text-2xl font-bold font-serif mb-4">
              طلب حجز موعد
            </h3>
            <p className="text-white/80 mb-8 text-sm leading-relaxed">
              للحجز والاستفسار عن المواعيد المتاحة والرسوم، يرجى ملء النموذج أدناه وسيتم التواصل معك.
            </p>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#D4AF37] hover:bg-[#c4a030] text-[#3E2723] font-bold rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
            >
              احجز الآن
              <Send className="w-4 h-4" />
            </a>

            <p className="mt-4 text-xs text-white/50">
              سيتم تحويلك لنموذج خارجي لإكمال البيانات.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}