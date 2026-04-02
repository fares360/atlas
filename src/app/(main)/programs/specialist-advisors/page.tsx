"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Award, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { diplomasData } from "@/lib/diplomas-data"; // ✅ استيراد البيانات من الملف الجديد

export default function SpecialistAdvisorsPage() {
  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-[#FDFBF7]" dir="rtl">
      {/* زر العودة */}
      <div className="container mx-auto max-w-7xl mb-8">
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 text-[#2A5B68] font-bold hover:underline opacity-80 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة للبرامج الرئيسية
        </Link>
      </div>

      {/* العنوان الرئيسي */}
      <div className="container mx-auto max-w-4xl text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#3E2723] text-sm font-bold mb-6 border border-[#D4AF37]/20">
          <Award className="w-4 h-4 text-[#D4AF37]" />
          <span>المجموعة الأولى للمتخصصين</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2A5B68] mb-8 leading-tight">
          برنامج تأهيل المستشارين الأسريين
        </h1>

        {/* ============ تصميم مدة الدبلوم (نفس الشكل الذي أعجبك) ============ */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {/* الساعات */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F3F6] text-[#2A5B68]">
              <Clock className="h-5 w-5" />
            </div>
            <div className="text-right leading-tight">
              <span className="block font-bold text-[#3E2723] text-lg">
                60 ساعة
              </span>
              <span className="text-xs text-muted-foreground">
                تدريبية معتمدة
              </span>
            </div>
          </div>

          {/* الأيام */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBF6E6] text-[#D4AF37]">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div className="text-right leading-tight">
              <span className="block font-bold text-[#3E2723] text-lg">
                15 يوم
              </span>
              <span className="text-xs text-muted-foreground">مدة الدبلوم</span>
            </div>
          </div>
        </div>
        {/* ============================================================== */}
      </div>

      {/* شبكة الدبلومات */}
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {diplomasData.map((dip, index) => (
          <Link
            key={dip.slug} // ✅ استخدام المعرف الفريد
            href={`/programs/specialist-advisors/${dip.slug}`} // ✅ الربط بالصفحة الديناميكية
            className="group relative bg-white p-6 md:p-8 rounded-[2rem] border border-[#E6E2D3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
          >
            {/* الأيقونة والرقم */}
            <div className="flex justify-between items-start mb-6">
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform",
                  dip.bgColor,
                  dip.color
                )}
              >
                <dip.icon className="w-7 h-7" />
              </div>
              <span className="text-4xl font-bold text-[#E6E2D3]/40 font-serif group-hover:text-[#D4AF37]/20 transition-colors select-none">
                0{index + 1}
              </span>
            </div>

            {/* النصوص */}
            <h3 className="text-xl font-bold font-serif text-[#3E2723] mb-3 group-hover:text-[#2A5B68] transition-colors">
              {dip.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {dip.shortDesc} {/* ✅ استخدام الوصف القصير من ملف البيانات */}
            </p>

            {/* الشريط السفلي الجمالي */}
            <div
              className={cn(
                "absolute bottom-0 right-0 h-1.5 w-0 group-hover:w-full transition-all duration-500 ease-out",
                dip.barColor
              )}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
