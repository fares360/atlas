// src/app/(main)/programs/page.tsx

"use client";

import Link from "next/link";
import {
  Layers,
  GraduationCap,
  Users,
  Mic2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const programs = [
  {
    id: 1,
    title: "برنامج تأهيل المستشارين الأسريين",
    description:
      "برنامج تدريبي مكثف لإعداد كوادر مهنية قادرة على تقديم الاستشارات الأسرية والتربوية بمنهجية علمية وتأصيل شرعي.",
    icon: GraduationCap,
    features: [
      "شهادة معتمدة من الأكاديمية",
      "تدريب عملي على دراسات الحالة",
      "إشراف مهني مباشر",
    ],
    // ✅ تصحيح الرابط ليشير للصفحة الجديدة
    href: "/programs/specialist-advisors",
    isFlagship: true,
  },
  {
    id: 2,
    title: "برنامج متكامل لأفراد الأسرة",
    description:
      "حقيبة تدريبية شاملة تستهدف جميع أفراد الأسرة لرفع الوعي وبناء المهارات الحياتية.",
    icon: Users,
    features: [
      "ورش عمل تفاعلية",
      "أدوات تقييم العلاقات الأسرية",
      "خطط تربوية للمنزل",
    ],
    href: "/programs/family-integrated",
    isFlagship: false,
  },
  {
    id: 3,
    title: "جلسات فردية ومحاضرات عامة",
    description:
      "سلسلة من اللقاءات المفتوحة والجلسات المصغرة لمناقشة قضايا الساعة وحلول سريعة.",
    icon: Mic2,
    features: [
      "ندوات أسبوعية وشهرية",
      "جلسات سؤال وجواب",
      "مكتبة مسجلة للمشتركين",
    ],
    href: "/programs/sessions", 
    isFlagship: false,
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#3E2723]" dir="rtl">
      {/* Header */}
      <header className="relative pt-16 pb-20 px-4 border-b border-[#5C8D77]/20 overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5C8D77]/10 rounded-2xl mb-6 border border-[#5C8D77]/20">
            <Layers className="w-8 h-8 text-[#5C8D77]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-[#3E2723]">
            برامج الإرشاد والتوجيه الأسري
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مصفوفة متكاملة من المسارات التعليمية والتدريبية لتلبي احتياجات
            المختصين والأسر.
          </p>
        </div>
      </header>

      {/* Grid */}
      <section className="container mx-auto max-w-7xl px-4 -mt-12 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className={cn(
                "group relative flex flex-col bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden hover:-translate-y-2",
                program.isFlagship
                  ? "border-[#5C8D77] shadow-xl shadow-[#5C8D77]/10"
                  : "border-[#E6E2D3] shadow-lg hover:shadow-xl hover:border-[#5C8D77]/50"
              )}
            >
              {/* Colored Top Bar */}
              <div
                className={cn(
                  "h-2 w-full",
                  program.isFlagship
                    ? "bg-[#5C8D77]"
                    : "bg-[#E6E2D3] group-hover:bg-[#5C8D77]/50 transition-colors"
                )}
              ></div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110",
                      program.isFlagship
                        ? "bg-[#5C8D77] text-white"
                        : "bg-[#F9F7F0] text-[#5C8D77]"
                    )}
                  >
                    <program.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>

                  {program.isFlagship && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#5C8D77]/10 text-[#5C8D77] text-xs font-bold mb-3">
                      <Sparkles className="w-3 h-3" />
                      البرنامج الرائد
                    </span>
                  )}

                  <h3 className="text-2xl font-bold font-serif text-[#3E2723] group-hover:text-[#5C8D77] transition-colors">
                    {program.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm mb-8 border-b border-[#E6E2D3]/50 pb-6 min-h-[80px]">
                  {program.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {program.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#3E2723]/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#5C8D77] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={program.href}
                  className={cn(
                    "mt-auto w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95",
                    program.isFlagship
                      ? "bg-[#5C8D77] text-white hover:bg-[#4a7260]"
                      : "bg-[#F9F7F0] text-[#3E2723] hover:bg-[#5C8D77] hover:text-white"
                  )}
                >
                  تفاصيل البرنامج
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
