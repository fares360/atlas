import {
  Users,
  Brain,
  Heart,
  Mic2,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Lightbulb,
} from "lucide-react";

export const sessionsData = [
  {
    id: "consultations",
    title: "استشارات زواجية وتربوية",
    description:
      "جلسات فردية تمتاز بالسرية والمنهجية في الحل لجميع مشكلات الزواج والطلاق وفترة الخطوبة والعقد، والمشكلات التربوية وبيوت العائلات وكبار السن.",
    icon: Users,
    target: "أفراد وأسر",
    bgColor: "bg-cyan-100",
    color: "text-cyan-700",
    barColor: "bg-cyan-600",
  },
  {
    id: "talent-discovery",
    title: "اختبارات ذكاء واكتشاف موهوبين",
    description:
      "جلسات خاصة لاكتشاف الموهوبين من خلال اختبارات يجب عليها الأبناء وأولياء الأمور، وأخرى يجب عليها الأكبر سناً دون ولي أمره، مع توجيه النتيجة نحو المهن المستقبلية.",
    icon: Lightbulb,
    target: "الأبناء والطلاب",
    bgColor: "bg-amber-100",
    color: "text-amber-700",
    barColor: "bg-amber-600",
  },
  {
    id: "rehabilitation",
    title: "جلسات تأهيل وجداني ومهاري",
    description:
      "جلسات فردية سرية لتأهيل الوجداني والمهاري وعلاج جوانب الضعف مثل الثقة بالنفس والدافعية والاعتمادية والأمن والرضا والانتماء والعاطفة والتقدير.",
    icon: Heart,
    target: "جلسات فردية",
    bgColor: "bg-emerald-100",
    color: "text-emerald-700",
    barColor: "bg-emerald-600",
  },
  {
    id: "workshops",
    title: "محاضرات وورش عمل تنموية",
    description:
      "محاضرات عامة وورش عمل جماعية (ما بين يومين إلى ثلاثة) لاكتساب المهارات الزواجية والتربوية (مثل: الأب الصديق، تنمية الحب، متعة الحوار العائلي).",
    icon: Mic2,
    target: "الجمهور العام",
    bgColor: "bg-violet-100",
    color: "text-violet-700",
    barColor: "bg-violet-600",
  },
];