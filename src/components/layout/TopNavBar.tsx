import { Menu, Lightbulb } from "lucide-react";

interface TopNavBarProps {
  title?: string;
  showIcon?: boolean;
}

export default function TopNavBar({
  title = "الدليل الأطلسي",
  showIcon = true,
}: TopNavBarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-transparent"
      dir="rtl"
    >
      {/* زر القائمة الجانبية */}
      <button className="p-2 text-slate-800 hover:bg-black/5 rounded-lg transition-colors">
        <Menu className="w-8 h-8 stroke-[3]" />
      </button>

      {/* عنوان الصفحة - داخل الشكل البيضاوي الذهبي كما في الصور */}
      <div className="flex-1 mx-4">
        <div className="bg-[#C5A049] shadow-md border-2 border-[#8C6B28] rounded-full py-2 px-6 text-center relative overflow-hidden">
          {/* تأثير اللمعة الخفيفة داخل الزر */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-full"></div>
          <h1 className="text-xl font-bold text-slate-900 font-serif tracking-wide truncate">
            {title}
          </h1>
        </div>
      </div>

      {/* أيقونة الشعار/اللمبة (اختياري) */}
      <div className="w-10 flex justify-center">
        {showIcon && (
          <Lightbulb className="w-8 h-8 text-slate-700 stroke-[2.5]" />
        )}
      </div>
    </header>
  );
}
