import Link from "next/link";
import { Info, Globe, Library } from "lucide-react";

export default function BottomDock() {
  // تعريف الأزرار لتسهيل التعديل
  const navItems = [
    { label: "نبذة", icon: Info, href: "/about" },
    { label: "الرئيسية", icon: Globe, href: "/" }, // الأيقونة الوسطى أكبر عادة
    { label: "الجزء (١)", icon: Library, href: "/part1" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2"
      dir="rtl"
    >
      <div className="flex justify-between items-end gap-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          // تمييز الزر الأوسط (الرئيسية) بحجم مختلف إذا رغبت، هنا جعلتهم متساوين حسب الصورة
          return (
            <Link
              key={index}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center bg-[#E6E2D3] border-2 border-[#A8A290] rounded-xl py-3 px-1 shadow-[0_4px_6px_rgba(0,0,0,0.15)] active:scale-95 transition-transform"
            >
              {/* أيقونة دائرية غامقة */}
              <div className="bg-[#5C6B73] rounded-full p-2 mb-1">
                <item.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[#5C6B73] font-bold text-sm sm:text-base">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
