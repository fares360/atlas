"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Mic2,
  Clock,
  CalendarClock,
  Unlock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sessionsData } from "@/lib/sessions-data"; // ✅ استيراد البيانات الجديدة

export default function SessionsPage() {
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
          <Mic2 className="w-4 h-4 text-[#D4AF37]" />
          <span>المجموعة الثانية من البرامج</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2A5B68] mb-8 leading-tight">
          جلسات فردية ومحاضرات عامة
        </h1>

        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          باقة متنوعة من الخدمات الاستشارية المتخصصة والجلسات الفردية لترميم
          الذات والعلاقات، بالإضافة إلى محاضرات عامة لنشر الوعي.
        </p>

        {/* احصائيات سريعة */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {/* الخصوصية */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F3F6] text-[#2A5B68]">
              <Clock className="h-5 w-5" />
            </div>
            <div className="text-right leading-tight">
              <span className="block font-bold text-[#3E2723] text-lg">
                60 دقيقة
              </span>
              <span className="text-xs text-muted-foreground">
                للجلسات الفردية
              </span>
            </div>
          </div>

          {/* المواعيد */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBF6E6] text-[#D4AF37]">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div className="text-right leading-tight">
              <span className="block font-bold text-[#3E2723] text-lg">
                مواعيد مرنة
              </span>
              <span className="text-xs text-muted-foreground">
                حسب الاتفاق المسبق
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* شبكة الكروت */}
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {sessionsData.map((session, index) => (
          <Link
            key={session.id}
            href={`/programs/sessions/${session.id}`}
            className="group relative bg-white p-6 md:p-8 rounded-[2rem] border border-[#E6E2D3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* الأيقونة والرقم */}
            <div className="flex justify-between items-start mb-6">
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform",
                  session.bgColor,
                  session.color
                )}
              >
                <session.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <span className="text-4xl font-bold text-[#E6E2D3]/40 font-serif group-hover:text-[#D4AF37]/20 transition-colors select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* العنوان والوصف */}
            <div className="mb-2">
              <h3 className="text-xl font-bold font-serif text-[#3E2723] mb-3 group-hover:text-[#2A5B68] transition-colors leading-relaxed">
                {session.title}
              </h3>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              {session.description}
            </p>

            {/* الشريط السفلي الملون */}
            <div
              className={cn(
                "absolute bottom-0 right-0 h-1.5 w-0 group-hover:w-full transition-all duration-500 ease-out",
                session.barColor
              )}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
}