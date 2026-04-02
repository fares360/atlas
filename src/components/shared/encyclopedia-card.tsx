import Link from "next/link";
import { BookOpen, Lock, ArrowLeft, Clock, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubSection {
  title: string;
  icon: LucideIcon;
}

interface EncyclopediaCardProps {
  title: string;
  description?: string;
  href?: string;
  disabled?: boolean;
  partNumber: number;
  subSections?: SubSection[];
  isAvailable?: boolean;
}

export default function EncyclopediaCard({
  title,
  description,
  href,
  disabled = false,
  partNumber,
  subSections = [],
  isAvailable = false, // القيمة الافتراضية
}: EncyclopediaCardProps) {
  const cardClasses = cn(
    "relative flex flex-col p-6 rounded-[2.5rem] border transition-all duration-300 group overflow-hidden h-full",
    disabled
      ? "bg-[#F9F7F0]/50 border-[#E6E2D3] cursor-not-allowed opacity-70 grayscale-[0.8]"
      : "bg-white border-[#E6E2D3] hover:border-[#D4AF37] hover:shadow-xl hover:-translate-y-1 cursor-pointer"
  );

  const CardContent = (
    <>
      <div className="absolute -top-6 -left-6 text-[12rem] font-serif text-[#E6E2D3]/20 select-none pointer-events-none z-0 rotate-12 transition-transform group-hover:rotate-6">
        {partNumber}
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-sm",
              disabled
                ? "bg-[#E6E2D3] text-[#A8A290]"
                : "bg-[#2A5B68] text-white group-hover:bg-[#1f4a56]"
            )}
          >
            {disabled ? (
              <Lock className="w-6 h-6" />
            ) : (
              <BookOpen className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3
              className={cn(
                "text-xl font-bold font-serif mb-1 leading-tight",
                disabled ? "text-[#8C8C8C]" : "text-[#3E2723]"
              )}
            >
              {title}
            </h3>

            {/* ✅ الشارة الذهبية: متاح الآن */}
            {isAvailable && !disabled && (
              <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold border border-[#D4AF37]/20 inline-block">
                متاح الآن
              </span>
            )}

            {/* ✅ الشارة الرصاصية: غير متاح الآن (التعديل الجديد) */}
            {!isAvailable && !disabled && (
              <span className="text-[10px] bg-[#E6E2D3]/50 text-[#8C8C8C] px-2 py-0.5 rounded-full font-bold border border-[#E6E2D3] inline-block">
                غير متاح الآن
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6 pl-2">
          {description}
        </p>

        {subSections && subSections.length > 0 && (
          <div className="mt-auto bg-[#F9F7F0] rounded-2xl p-4 border border-[#E6E2D3]/50 mb-4">
            <p className="text-[10px] font-bold text-[#D4AF37] mb-3 border-b border-[#E6E2D3] pb-2 w-fit">
              يحتوي هذا المجلد على:
            </p>
            <div className="space-y-2.5">
              {subSections.map((sub, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-[#3E2723]/80 group/item"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2A5B68]"></div>
                  <span>{sub.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-dashed border-[#E6E2D3] flex items-center justify-between">
          {disabled ? (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> قريباً
            </span>
          ) : (
            <>
              <span className="text-xs font-bold text-[#2A5B68] group-hover:underline">
                عرض التفاصيل
              </span>
              <div className="w-8 h-8 rounded-full bg-[#F9F7F0] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );

  if (disabled) {
    return <div className={cardClasses}>{CardContent}</div>;
  }

  return (
    <Link href={href || "#"} className={cardClasses}>
      {CardContent}
    </Link>
  );
}
