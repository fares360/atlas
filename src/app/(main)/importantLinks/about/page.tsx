"use client";

import Image from "next/link";
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  Users,
  ScrollText,
  Star,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

// بيانات الكاتب كما في الصورة
const credentials = [
  {
    text: "الإجازة العالية في التربية جامعة الأزهر",
    icon: GraduationCap,
    color: "text-[#2A5B68]", // فيروزي
    bg: "bg-[#2A5B68]/10",
  },
  {
    text: "إجازة في قراءة عاصم بروايتي شعبة وحفص",
    icon: ScrollText,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    text: "المستشار الأسري والمدرب الدولي لعلم الإرشاد",
    icon: Users,
    color: "text-[#3E2723]", // بني
    bg: "bg-[#3E2723]/10",
  },
  {
    text: "مؤلف سلسلة أطلس التوجيه والإرشاد الأسري",
    icon: BookOpen,
    color: "text-[#D9534F]", // أحمر قرميدي
    bg: "bg-[#D9534F]/10",
  },
  {
    text: "مؤسس ومدير أكاديمية مودة لعلوم الأسرة",
    icon: Star,
    color: "text-[#D4AF37]", // ذهبي
    bg: "bg-[#D4AF37]/10",
  },
  {
    text: "مدير فني لعدد من مؤسسات المجال الأسري",
    icon: Briefcase,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    text: "معد مناهج وبرامج خاصة بالإرشاد الأسري",
    icon: ScrollText,
    color: "text-[#2A5B68]",
    bg: "bg-[#2A5B68]/10",
  },
  {
    text: "معد مناهج خاصة باكتشاف الموهوبين",
    icon: Award,
    color: "text-[#8C6B28]",
    bg: "bg-[#8C6B28]/10",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4" dir="rtl">
      {/* 1. Header Section */}
      <div className="container max-w-3xl mx-auto mb-12 text-center">
        <div className="relative inline-block">
          <h1 className="text-4xl font-bold font-serif text-[#3E2723] mb-2 relative z-10">
            عن الكاتب
          </h1>
          {/* زخرفة بسيطة تحت العنوان */}
          <div className="absolute -bottom-2 right-0 w-full h-3 bg-[#D4AF37]/20 -skew-x-12"></div>
        </div>
        <p className="text-muted-foreground mt-4 text-lg">
          تعرف على مؤلف الموسوعة وخبراته العلمية والعملية
        </p>
      </div>

      {/* 2. Profile Card */}
      <div className="container max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-[#E6E2D3] overflow-hidden relative">
          {/* خلفية زخرفية علوية */}
          <div className="h-32 bg-gradient-to-r from-[#2A5B68] to-[#1f4a56] relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_50%)]"></div>
          </div>

          <div className="px-6 pb-8 text-center relative">
            {/* صورة البروفايل */}
            <div className="relative -mt-16 mb-6 inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 mx-auto relative group">
                <img
                  src="/images/PPp.png"
                  alt="عمر محمود"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* أيقونة توثيق صغيرة */}
              <div className="absolute bottom-2 right-2 bg-[#D4AF37] text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                <CheckCircleIcon className="w-4 h-4" />
              </div>
            </div>

            {/* الاسم والمسمى */}
            <h2 className="text-3xl font-bold font-serif text-[#3E2723] mb-1">
              أ. عمر محمود
            </h2>
            <div className="flex items-center justify-center gap-2 text-[#2A5B68] font-medium mb-8">
              <Quote className="w-4 h-4 fill-current opacity-50" />
              <span>مستشار أسري وتربوي</span>
              <Quote className="w-4 h-4 fill-current opacity-50" />
            </div>

            {/* قائمة الخبرات */}
            <div className="grid grid-cols-1 gap-4 text-right">
              {credentials.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#F9F7F0] border border-[#E6E2D3] hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300 group"
                >
                  {/* الأيقونة */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      item.bg,
                    )}
                  >
                    <item.icon className={cn("w-6 h-6", item.color)} />
                  </div>

                  {/* النص */}
                  <span className="text-[#3E2723] font-medium text-sm md:text-base leading-relaxed group-hover:text-[#2A5B68] transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#E6E2D3] text-[#3E2723] text-sm font-bold opacity-80">
            <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
            <span>خبرة تمتد لأكثر من 15 عاماً</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// مكون أيقونة بسيط داخلي
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
