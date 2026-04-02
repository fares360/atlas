// import Link from "next/link";
// import { LucideIcon, ArrowLeft } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface ServiceCardProps {
//   title: string;
//   description: string;
//   href: string;
//   icon: LucideIcon;
//   colorClass: string;
// }

// export default function ServiceCard({
//   title,
//   description,
//   href,
//   icon: Icon,
//   colorClass,
// }: ServiceCardProps) {
//   return (
//     <Link
//       href={href}
//       className="group relative flex flex-col bg-white p-6 md:p-8 rounded-xl border border-[#E6E2D3] transition-all duration-200 ease-out hover:border-[#D4AF37] hover:shadow-md hover:-translate-y-1"
//     >
//       {/* --- زخرفة الزوايا (تظهر بسرعة عند التحويم) --- */}
//       {/* الزاوية العلوية اليمنى */}
//       <div className="absolute top-0 right-0 w-0 h-0 border-t-[3px] border-r-[3px] border-[#D4AF37] opacity-0 group-hover:w-6 group-hover:h-6 group-hover:opacity-100 transition-all duration-200 ease-out rounded-tr-lg" />
//       {/* الزاوية السفلية اليسرى */}
//       <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[3px] border-l-[3px] border-[#D4AF37] opacity-0 group-hover:w-6 group-hover:h-6 group-hover:opacity-100 transition-all duration-200 ease-out rounded-bl-lg" />

//       {/* 1. Header: Icon */}
//       <div className="mb-5 flex justify-between items-start">
//         <div
//           className={cn(
//             "w-12 h-12 rounded-lg flex items-center justify-center border transition-colors duration-200",
//             "bg-[#F9F7F0] border-[#E6E2D3]", // الوضع العادي: هادئ وتراثي
//             "group-hover:bg-white group-hover:border-[#D4AF37]" // عند التحويم: يلمع
//           )}
//         >
//           <Icon
//             className={cn(
//               "w-6 h-6 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-200"
//             )}
//             strokeWidth={1.5}
//           />
//         </div>

//         {/* سهم صغير يظهر في الأعلى */}
//         <ArrowLeft className="w-5 h-5 text-[#D4AF37] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
//       </div>

//       {/* 2. Content */}
//       <div className="flex-1">
//         <h3 className="text-xl md:text-2xl font-bold font-serif text-[#3E2723] mb-3 group-hover:text-[#2A5B68] transition-colors duration-200">
//           {title}
//         </h3>
//         <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
//           {description}
//         </p>
//       </div>

//       {/* 3. Footer: Decorative Line */}
//       <div className="w-12 h-0.5 bg-[#E6E2D3] group-hover:w-full group-hover:bg-[#D4AF37]/50 transition-all duration-300 ease-out mt-auto" />
//     </Link>
//   );
// }

//=================================================================

//// src/components/shared/service-card.tsx

import Link from "next/link";
import { LucideIcon, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  colorClass: string;
}

export default function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  colorClass,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      // تقليل الـ padding في الموبايل (p-5 بدل p-6)
      // تحسين الظل عند الضغط (active:scale)
      className="group relative flex flex-col bg-white p-5 md:p-8 rounded-xl border border-[#E6E2D3] transition-all duration-300 ease-out hover:border-[#D4AF37] hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
    >
      {/* --- زخرفة الزوايا (مخفية في الموبايل عشان النظافة) --- */}
      <div className="hidden md:block absolute top-0 right-0 w-0 h-0 border-t-[3px] border-r-[3px] border-[#D4AF37] opacity-0 group-hover:w-6 group-hover:h-6 group-hover:opacity-100 transition-all duration-200 ease-out rounded-tr-lg" />
      <div className="hidden md:block absolute bottom-0 left-0 w-0 h-0 border-b-[3px] border-l-[3px] border-[#D4AF37] opacity-0 group-hover:w-6 group-hover:h-6 group-hover:opacity-100 transition-all duration-200 ease-out rounded-bl-lg" />

      {/* 1. Header: Icon */}
      <div className="mb-4 md:mb-5 flex justify-between items-start">
        <div
          className={cn(
            "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center border transition-colors duration-200",
            "bg-[#F9F7F0] border-[#E6E2D3]",
            "group-hover:bg-white group-hover:border-[#D4AF37]"
          )}
        >
          <Icon
            className={cn(
              "w-5 h-5 md:w-6 md:h-6 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-200"
            )}
            strokeWidth={1.5}
          />
        </div>

        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </div>

      {/* 2. Content */}
      <div className="flex-1">
        <h3 className="text-lg md:text-2xl font-bold font-serif text-[#3E2723] mb-2 md:mb-3 group-hover:text-[#2A5B68] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
      </div>

      {/* 3. Footer: Decorative Line */}
      <div className="w-8 md:w-12 h-0.5 bg-[#E6E2D3] group-hover:w-full group-hover:bg-[#D4AF37]/50 transition-all duration-300 ease-out mt-auto" />
    </Link>
  );
}
