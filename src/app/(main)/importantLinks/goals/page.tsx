"use client";

import { Target, HeartHandshake, Users, Star, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const goalsList = [
  {
    text: "إعادة روح البر داخل الأسرة.",
    icon: HeartHandshake,
    color: "text-[#2A5B68]",
    bg: "bg-[#2A5B68]/10",
  },
  {
    text: "إعادة صياغة أهداف الأسرة.",
    icon: Compass,
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10",
  },
  {
    text: "إعداد وتأهيل المقبلين على الزواج.",
    icon: Users,
    color: "text-[#3E2723]",
    bg: "bg-[#3E2723]/10",
  },
  {
    text: "إعداد أزواج وزوجات ذوي رؤية واضحة.",
    icon: Star,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    text: "إعداد وتأهيل الأبناء لتحمل المسئولية.",
    icon: Target,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    text: "إعداد كوادر للعمل في مجال الإرشاد الأسري.",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-100",
  },
];

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4" dir="rtl">
      {/* 1. Header Section */}
      <div className="container max-w-3xl mx-auto mb-12 text-center">
        <div className="relative inline-block">
          <h1 className="text-4xl font-bold font-serif text-[#3E2723] mb-2 relative z-10">
            الأهداف
          </h1>
          {/* زخرفة تحت العنوان */}
          <div className="absolute -bottom-2 right-0 w-full h-3 bg-[#D4AF37]/20 -skew-x-12"></div>
        </div>
        <p className="text-muted-foreground mt-4 text-lg">
          رسالتنا التي نعمل لأجل تحقيقها داخل الأسرة والمجتمع
        </p>
      </div>

      {/* 2. Goals Cards */}
      <div className="container max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-[#E6E2D3] overflow-hidden relative">
          {/* خلفية زخرفية */}
          {/* <div className="h-20 bg-gradient-to-r from-[#D4AF37] to-[#B8952F]">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_50%)]"></div>
          </div> */}

          <div className="px-6 pb-10 text-center relative -mt-10">
            <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
              نحو بناء أسرة قوية ذات رؤية واضحة
            </h2>

            <div className="grid grid-cols-1 gap-4 text-right">
              {goalsList.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#F9F7F0] border border-[#E6E2D3] hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300 group"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      item.bg
                    )}
                  >
                    <item.icon className={cn("w-6 h-6", item.color)} />
                  </div>

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
            <span>أسرة متوازنة = مجتمع قوي</span>
          </div>
        </div>
      </div>
    </div>
  );
}
