"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  X,
  BookOpen,
  ArrowRight,
  Clock,
  ChevronRight,
  GraduationCap,
  Users,
  Mic2,
  FileText,
} from "lucide-react";

// ✅ 1. تحديث بيانات البحث لتعكس هيكل الموقع الحقيقي
const SEARCH_ITEMS = [
  // --- الأطلس ---
  {
    id: "atlas-1",
    title: "المجلد الأول: مقاصد الفكر الإرشادي",
    type: "الأطلس التربوي",
    href: "/atlas/part/1",
    icon: BookOpen,
  },
  
  // --- البرامج الرئيسية ---
  {
    id: "prog-specialist",
    title: "برنامج تأهيل المستشارين الأسريين",
    type: "دبلوم متخصص",
    href: "/programs/specialist-advisors",
    icon: GraduationCap,
  },
  {
    id: "prog-family",
    title: "برنامج متكامل لأفراد الأسرة",
    type: "برنامج عام",
    href: "/programs/family-integrated",
    icon: Users,
  },
  {
    id: "prog-sessions",
    title: "جلسات فردية ومحاضرات عامة",
    type: "استشارات",
    href: "/programs/sessions",
    icon: Mic2,
  },

  // --- أمثلة للرخص (لجعل البحث ذكياً) ---
  {
    id: "license-parenting",
    title: "رخصة التربية الهادفة",
    type: "رخصة تربوية",
    href: "/programs/family-integrated/purposeful-parenting",
    icon: FileText,
  },
  {
    id: "license-marriage",
    title: "رخصة المقبلين على الزواج",
    type: "رخصة زواجية",
    href: "/programs/family-integrated/pre-marriage",
    icon: FileText,
  },

  // --- خدمات أخرى ---
  {
    id: "consultation",
    title: "حجز استشارة خاصة",
    type: "خدمة",
    href: "/consultations",
    icon: Users,
  },
  {
    id: "my-library",
    title: "مكتبتي (الكتب المشتراة)",
    type: "حسابي",
    href: "/my-library",
    icon: BookOpen,
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(SEARCH_ITEMS);

  // منطق الفلترة
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const filtered = SEARCH_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  // إغلاق عند ضغط ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
      style={{ direction: "rtl" }}
    >
      {/* الخلفية معتمة */}
      <div
        className="absolute inset-0 bg-[#3E2723]/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* صندوق البحث */}
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/30 animate-in zoom-in-95 slide-in-from-top-5 duration-300">
        
        {/* الحقل العلوي */}
        <div className="flex items-center gap-4 p-5 border-b border-[#E6E2D3] bg-[#FDFBF7]">
          <Search className="w-6 h-6 text-[#2A5B68]" />
          <input
            type="text"
            className="flex-1 text-xl bg-transparent outline-none text-[#3E2723] placeholder:text-muted-foreground/40 font-sans font-medium"
            placeholder="عَم تبحث؟ (كتاب، رخصة، استشارة...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E6E2D3] text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* منطقة النتائج */}
        <div className="max-h-[50vh] overflow-y-auto custom-scrollbar p-3">
          
          {/* الحالة 1: اقتراحات سريعة (عندما يكون الحقل فارغاً) */}
          {query === "" && (
            <div className="p-2">
              <h3 className="text-xs font-bold text-[#D4AF37] mb-4 flex items-center gap-2 px-2">
                <Clock className="w-3.5 h-3.5" />
                الأكثر بحثاً
              </h3>
              <div className="flex flex-wrap gap-2 px-2">
                {[
                  "الأطلس التربوي",
                  "المقبلين على الزواج",
                  "تربية الموهوبين",
                  "استشارة خاصة",
                  "المشكاة",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 bg-white border border-[#E6E2D3] text-[#3E2723] text-sm rounded-full transition-all hover:border-[#2A5B68] hover:text-[#2A5B68] hover:shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* الحالة 2: عرض النتائج */}
          {query !== "" && results.length > 0 && (
            <div className="space-y-1">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group hover:bg-[#2A5B68]/5 border border-transparent hover:border-[#2A5B68]/10"
                >
                  {/* الأيقونة الديناميكية */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-[#E6E2D3] group-hover:border-[#2A5B68] group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-[#3E2723] group-hover:text-[#2A5B68]" />
                  </div>

                  {/* النصوص */}
                  <div className="flex-1">
                    <h4 className="font-bold text-[#3E2723] text-base group-hover:text-[#2A5B68] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs text-muted-foreground group-hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                      {item.type}
                    </span>
                  </div>

                  {/* سهم التوجيه */}
                  <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              ))}
            </div>
          )}

          {/* الحالة 3: لا توجد نتائج */}
          {query !== "" && results.length === 0 && (
            <div className="py-16 text-center text-muted-foreground/50">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-10" />
              <p className="text-lg font-medium">
                عذراً، لم نجد نتائج لـ "{query}"
              </p>
            </div>
          )}
        </div>

        {/* الفوتر */}
        <div className="bg-[#F9F7F0] px-6 py-3 border-t border-[#E6E2D3] flex justify-between items-center text-[11px] text-muted-foreground font-medium">
          <div className="flex gap-4">
            <span className="hidden sm:inline">
              للتنقل{" "}
              <kbd className="font-sans bg-white px-1 rounded border border-[#D6D3C9]">
                TAB
              </kbd>
            </span>
            <span className="hidden sm:inline">
              للاختيار{" "}
              <kbd className="font-sans bg-white px-1 rounded border border-[#D6D3C9]">
                ENTER
              </kbd>
            </span>
          </div>
          <span>ESC للإغلاق</span>
        </div>
      </div>
    </div>
  );
}