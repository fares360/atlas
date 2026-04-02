"use client";
import { familyLicensesData } from "@/lib/family-data";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Users,
  CalendarCheck,
  Baby,
  Sparkles,
  UserCheck,
  Heart,
  GraduationCap,
  Home,
  Smile,
  Brain,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// بيانات الرخص مع إضافة ألوان مميزة لكل كارت لتطابق التصميم الجديد
const modules = [
  {
    title: "رخصة التربية الهادفة",
    description:
      "تدريب الوالدين على تعريفهم بهدف التربية، وهدم إشكاليات التربية الخاطئة وبناء مفاهيم صحيحة.",
    icon: Baby,
    target: "الوالدين",
    bgColor: "bg-blue-100",
    color: "text-blue-700",
    barColor: "bg-blue-600",
  },
  {
    title: "رخصة التربية بالموهبة",
    description:
      "اكتشاف موهبة الأبناء، وتطوير لغة الحوار، ووضع أطر للضبط التربوي وفقاً لتنوع ذكائهم.",
    icon: Sparkles,
    target: "الوالدين",
    bgColor: "bg-purple-100",
    color: "text-purple-700",
    barColor: "bg-purple-600",
  },
  {
    title: "رخصة تربويات الطلاق والأرامل",
    description:
      "طرق التوجيه والإرشاد وفقاً لطبيعة النمط القائم (طلاق أو وفاة)، وضبط مفهوم القوامة والوالدية.",
    icon: UserCheck,
    target: "حالات خاصة",
    bgColor: "bg-rose-100",
    color: "text-rose-700",
    barColor: "bg-rose-600",
  },
  {
    title: "رخصة التوجيه الوجداني",
    description:
      "إعادة الاتزان الوجداني للأسرة (التقدير، الثقة، الأمان، الانتماء) وعلاج آثار الضغوط النفسية.",
    icon: Heart,
    target: "الأسرة",
    bgColor: "bg-pink-100",
    color: "text-pink-700",
    barColor: "bg-pink-600",
  },
  {
    title: "رخصة التعليم بالموهبة",
    description:
      "تدريب المعلمين والوالدين على التدريس بالذكاءات المتعددة وإثراء البيئة التعليمية.",
    icon: GraduationCap,
    target: "المعلمين",
    bgColor: "bg-emerald-100",
    color: "text-emerald-700",
    barColor: "bg-emerald-600",
  },
  {
    title: "رخصة المقبلين على الزواج",
    description:
      "فهم طبيعة المرحلة وأحكامها الشرعية، والتعامل مع مشكلات الخطوبة وتجهيزات الزفاف.",
    icon: Users,
    target: "الخاطبين",
    bgColor: "bg-orange-100",
    color: "text-orange-700",
    barColor: "bg-orange-600",
  },
  {
    title: "رخصة بيت العائلة وكبار السن",
    description:
      "تجديد مفهوم بيت العائلة، وتجنب مشكلات التطفل، ومهارات التعامل بذكاء مع كبار السن.",
    icon: Home,
    target: "العائلة",
    bgColor: "bg-amber-100",
    color: "text-amber-700",
    barColor: "bg-amber-600",
  },
  {
    title: "رخصة الزواج السعيد",
    description:
      "إيضاح الفرق بين المودة والرحمة والواجب، ومهارات تجديد الحياة الزوجية وفهم طبيعة الشريك.",
    icon: Smile,
    target: "الزوجين",
    bgColor: "bg-cyan-100",
    color: "text-cyan-700",
    barColor: "bg-cyan-600",
  },
  {
    title: "رخصة هندسة المشاعر",
    description:
      "طرق توجيه وصيانة المشاعر، وغرس الإيجابية، وحماية النفس من المشاعر السلبية والاضطراب.",
    icon: Brain,
    target: "الجميع",
    bgColor: "bg-indigo-100",
    color: "text-indigo-700",
    barColor: "bg-indigo-600",
  },
  {
    title: "رخصة هندسة القيم",
    description:
      "كيف نكتسب منظومة قيم عليا ونعكسها لأبنائنا؟ (مستويات: البناء، الانطلاق، الحماية).",
    icon: Scale,
    target: "الوالدين",
    bgColor: "bg-teal-100",
    color: "text-teal-700",
    barColor: "bg-teal-600",
  },
  {
    title: "رخصة هندسة النفس البشرية",
    description:
      "حقيقة النفس في القرآن والسنة وعلم النفس، وإدارة الأنماط الشخصية وتهذيب النفس.",
    icon: ShieldCheck,
    target: "الجميع",
    bgColor: "bg-slate-100",
    color: "text-slate-700",
    barColor: "bg-slate-600",
  },
];

export default function FamilyIntegratedPage() {
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
          <Users className="w-4 h-4 text-[#D4AF37]" />
          <span>المجموعة الثالثة للأسرة والأفراد</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2A5B68] mb-8 leading-tight">
          برنامج متكامل لأفراد الأسرة
        </h1>

        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          منهجية شاملة تضم 11 رخصة تربوية ونفسية تغطي كافة احتياجات الأسرة، من
          التربية والتعليم إلى العلاقات الزوجية وفهم النفس.
        </p>

        {/* احصائيات المدة (نفس التصميم) */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {/* الساعات */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F3F6] text-[#2A5B68]">
              <Clock className="h-5 w-5" />
            </div>
            <div className="text-right leading-tight">
              <span className="block font-bold text-[#3E2723] text-lg">
                40 ساعة
              </span>
              <span className="text-xs text-muted-foreground">
                تدريبية مكثفة
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
                10 أيام
              </span>
              <span className="text-xs text-muted-foreground">
                مدة البرنامج
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* شبكة الكروت (نفس الستايل) */}
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {familyLicensesData.map((module, index) => (
          <Link
            key={index}
            href={`/programs/family-integrated/${module.slug}`}
            className="group relative bg-white p-6 md:p-8 rounded-[2rem] border border-[#E6E2D3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* الأيقونة والرقم */}
            <div className="flex justify-between items-start mb-6">
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform",
                  module.bgColor,
                  module.color
                )}
              >
                <module.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <span className="text-4xl font-bold text-[#E6E2D3]/40 font-serif group-hover:text-[#D4AF37]/20 transition-colors select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* العنوان والوصف */}
            <div className="mb-2">
              <h3 className="text-xl font-bold font-serif text-[#3E2723] mb-3 group-hover:text-[#2A5B68] transition-colors leading-relaxed">
                {module.title}
              </h3>
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              {module.description}
            </p>
            {/* الشريط السفلي الملون */}
            <div
              className={cn(
                "absolute bottom-0 right-0 h-1.5 w-0 group-hover:w-full transition-all duration-500 ease-out",
                module.barColor
              )}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
}