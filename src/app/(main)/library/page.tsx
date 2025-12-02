"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Download,
  PlayCircle,
  CheckCircle2,
  Loader2,
  Library,
  Calendar,
  X,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. Types & Dummy Data ---

type Book = {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  purchaseDate: string;
  hasVideo: boolean;
  videoUrl?: string;
};

const myBooks: Book[] = [
  {
    id: "b1",
    title: "المجلد الأول: مقاصد الفكر الإرشادي",
    author: "د. عبد الرحمن ذاكر",
    coverColor: "bg-[#2A5B68]",
    purchaseDate: "2024-01-15",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "b2",
    title: "المجلد الثاني: القارة الزواجية",
    author: "فريق أطلس التربوي",
    coverColor: "bg-[#D4AF37]",
    purchaseDate: "2024-02-10",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "b3",
    title: "المجلد الثالث: القارة التربوية",
    author: "نخبة من المستشارين",
    coverColor: "bg-[#3E2723]",
    purchaseDate: "2024-03-05",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

// --- 2. Components ---

const DownloadButton = ({ bookId }: { bookId: string }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleDownload = () => {
    if (status === "loading" || status === "success") return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      alert("تم تحميل الكتاب بنجاح! سيتم فتح الملف الآن.");
    }, 3000);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={status === "loading"}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm active:scale-95",
        status === "idle" &&
          "bg-white border-2 border-[#2A5B68] text-[#2A5B68] hover:bg-[#2A5B68] hover:text-white",
        status === "loading" &&
          "bg-[#F9F7F0] border-2 border-[#D4AF37] text-[#D4AF37] cursor-wait",
        status === "success" &&
          "bg-green-600 border-2 border-green-600 text-white cursor-default"
      )}
    >
      {status === "idle" && (
        <>
          <Download className="w-4 h-4" />
          <span>تحميل PDF</span>
        </>
      )}
      {status === "loading" && (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>جاري التجهيز...</span>
        </>
      )}
      {status === "success" && (
        <>
          <CheckCircle2 className="w-4 h-4" />
          <span>تم التحميل</span>
        </>
      )}
    </button>
  );
};

// --- 3. Main Page Component ---

export default function LibraryPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");

  const openVideo = (url: string) => {
    setCurrentVideoUrl(url);
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setCurrentVideoUrl("");
  };

  // --- Empty State (Mobile Optimized) ---
  if (myBooks.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#FDFBF7] flex flex-col items-center justify-center text-center p-6">
        <div className="w-20 h-20 bg-[#E6E2D3] rounded-full flex items-center justify-center mb-6 shadow-inner animate-in zoom-in">
          <Library className="w-10 h-10 text-[#3E2723]/60" />
        </div>
        <h2 className="text-2xl font-bold font-serif text-[#3E2723] mb-3">
          مكتبتك فارغة
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs mb-8 leading-relaxed mx-auto">
          لم تقم بشراء أي مجلدات حتى الآن. ابدأ رحلتك المعرفية وتصفح موسوعة
          الأطلس التربوي.
        </p>
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#2A5B68] text-white rounded-xl font-bold hover:bg-[#1f4a56] transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
          <span>تصفح المتجر</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  // --- Populated State ---
  return (
    <div
      className="min-h-screen bg-[#FDFBF7] pb-24 pt-6 px-4 sm:px-6"
      dir="rtl"
    >
      {/* Header */}
      <div className="container max-w-6xl mb-8 mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1.5 h-6 sm:h-8 bg-[#D4AF37] rounded-full block"></span>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#3E2723]">
                مكتبتي الخاصة
              </h1>
            </div>
            <p className="text-sm text-muted-foreground mr-4">
              لديك {myBooks.length} كتب في مكتبتك
            </p>
          </div>

          <Link
            href="/"
            className="text-sm font-bold text-[#2A5B68] hover:underline flex items-center gap-1 self-end sm:self-auto"
          >
            تصفح المزيد
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-white rounded-2xl border border-[#E6E2D3] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Card Header / Image */}
              <div
                className={cn(
                  "h-40 sm:h-48 relative flex items-center justify-center overflow-hidden shrink-0",
                  book.coverColor
                )}
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]"></div>
                <BookOpen className="w-14 h-14 sm:w-16 sm:h-16 text-white/90 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-3 right-3 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-[10px] sm:text-xs font-medium border border-white/20">
                  نسخة رقمية
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-[#3E2723] mb-1 leading-snug line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {book.author}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#8C6B28] bg-[#F9F7F0] w-fit px-3 py-1.5 rounded-lg mb-6 border border-[#E6E2D3]">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>تم الشراء: {book.purchaseDate}</span>
                </div>

                {/* Actions: Mobile (Column), Desktop (Row) */}
                <div className="mt-auto pt-4 border-t border-dashed border-[#E6E2D3]">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* زر التحميل */}
                    <DownloadButton bookId={book.id} />

                    {/* زر الفيديو */}
                    {book.hasVideo && (
                      <button
                        onClick={() => openVideo(book.videoUrl || "")}
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-[#E6E2D3] text-[#3E2723] font-bold text-sm hover:bg-[#F9F7F0] hover:border-[#D4AF37] transition-all active:scale-95 sm:w-auto"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span className="sm:hidden">شاهد الشرح</span>{" "}
                        {/* نص يظهر فقط في الموبايل */}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Video Modal --- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-[#3E2723]/80 backdrop-blur-sm"
            onClick={closeVideo}
          ></div>

          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/50 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#333]">
              <span className="text-white font-serif text-sm">
                شرح مرئي للكتاب
              </span>
              <button
                onClick={closeVideo}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative pt-[56.25%] bg-black">
              <iframe
                src={currentVideoUrl}
                title="Video Explanation"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
