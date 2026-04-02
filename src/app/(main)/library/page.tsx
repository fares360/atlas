"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
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
  FileText,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. Types ---
type Book = {
  id: string;
  title: string;
  author: string;
  cover_image?: string; // أو نستخدم لون كما في التصميم السابق
  purchaseDate: string;
  r2_file_key: string;
  // يمكن إضافة حقول إضافية في الداتابيز للفيديو وحجم الملف
  hasVideo?: boolean;
  videoUrl?: string;
  fileSize?: string;
};

// --- 2. Components ---

const DownloadButton = ({ bookId }: { bookId: string }) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const supabase = createClient();

  const handleDownload = async () => {
    if (status === "loading") return;
    setStatus("loading");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert("يرجى تسجيل الدخول");
        setStatus("idle");
        return;
      }

      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, bookId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const link = document.createElement("a");
      link.href = data.url;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error: any) {
      console.error(error);
      alert("فشل التحميل: " + error.message);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={status === "loading"}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm active:scale-95 border",
        status === "idle" &&
          "bg-white border-[#E6E2D3] text-[#3E2723] hover:border-[#D4AF37] hover:bg-[#F9F7F0]",
        status === "loading" &&
          "bg-[#F9F7F0] border-[#E6E2D3] text-muted-foreground cursor-wait",
        status === "success" &&
          "bg-green-50 border-green-200 text-green-700 cursor-default",
        status === "error" && "bg-red-50 border-red-200 text-red-600"
      )}
    >
      {status === "idle" && (
        <>
          <Download className="w-4 h-4" />
          <span>تحميل الكتاب</span>
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
          <span>بدأ التحميل</span>
        </>
      )}
      {status === "error" && (
        <>
          <AlertCircle className="w-4 h-4" />
          <span>فشل</span>
        </>
      )}
    </button>
  );
};

// --- 3. Main Page ---

export default function LibraryPage() {
  const [loading, setLoading] = useState(true);
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const supabase = createClient();

  // جلب البيانات الحقيقية من Supabase
  useEffect(() => {
    async function fetchMyBooks() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        // الاستعلام المعقد: هات الكتب اللي في الاوردرات المدفوعة لليوزر ده
        const { data, error } = await supabase
          .from("order_items")
          .select(
            `
            price,
            created_at,
            orders!inner(status, user_id),
            books!inner(id, title, description, r2_file_key, cover_image)
          `
          )
          .eq("orders.user_id", user.id)
          .eq("orders.status", "paid") // ✅ الشرط الأهم: لازم يكون مدفوع
          .eq("item_type", "book");

        if (error) {
          console.error("Error fetching books:", error);
        } else if (data) {
          // تنسيق البيانات للعرض
          const formattedBooks: Book[] = data.map((item: any) => ({
            id: item.books.id,
            title: item.books.title,
            author: "أكاديمية مودة", // يمكن إضافته في جدول الكتب لاحقاً
            cover_image: item.books.cover_image,
            r2_file_key: item.books.r2_file_key,
            purchaseDate: new Date(item.created_at).toLocaleDateString("ar-EG"),
            fileSize: "PDF", // قيمة افتراضية حتى نضيفها للداتابيز
            hasVideo: false, // قيمة افتراضية
            coverColor: "bg-[#2A5B68]", // لون افتراضي
          }));
          setMyBooks(formattedBooks);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMyBooks();
  }, []);

  const openVideo = (url: string) => {
    setCurrentVideoUrl(url);
    setIsVideoOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#2A5B68] animate-spin" />
      </div>
    );
  }

  // --- Empty State ---
  if (myBooks.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#FDFBF7] flex flex-col items-center justify-center text-center p-6">
        <div className="w-24 h-24 bg-[#E6E2D3] rounded-full flex items-center justify-center mb-6 shadow-inner animate-in zoom-in">
          <Library className="w-10 h-10 text-[#3E2723]/60" />
        </div>
        <h2 className="text-3xl font-bold font-serif text-[#3E2723] mb-3">
          مكتبتك فارغة
        </h2>
        <p className="text-muted-foreground text-lg max-w-sm mb-8 leading-relaxed mx-auto">
          لم تقم بشراء أي مجلدات حتى الآن، أو أن طلبك ما زال قيد المراجعة.
        </p>
        <Link
          href="/atlas"
          className="px-8 py-3.5 bg-[#2A5B68] text-white rounded-xl font-bold hover:bg-[#1f4a56] transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
          <span>تصفح الموسوعة</span>
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  // --- Populated State ---
  return (
    <div
      className="min-h-screen bg-[#FDFBF7] pb-24 pt-10 px-4 sm:px-6"
      dir="rtl"
    >
      {/* Header */}
      <div className="container max-w-6xl mb-12 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1.5 h-8 bg-[#D4AF37] rounded-full block"></span>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#3E2723]">
                مكتبتي الخاصة
              </h1>
            </div>
            <p className="text-muted-foreground text-lg pr-5">
              لديك{" "}
              <span className="font-bold text-[#2A5B68]">{myBooks.length}</span>{" "}
              مواد تعليمية متاحة
            </p>
          </div>
          <Link
            href="/atlas"
            className="group flex items-center gap-2 text-[#2A5B68] font-bold hover:bg-[#2A5B68]/5 px-4 py-2 rounded-lg transition-colors"
          >
            <span>تصفح المزيد</span>
            <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {myBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-white rounded-3xl border border-[#E6E2D3] p-6 hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col sm:flex-row gap-6"
            >
              {/* Image Section - Static Color for consistency */}
              <div className="w-full sm:w-40 h-48 sm:h-auto rounded-2xl relative flex items-center justify-center shrink-0 overflow-hidden shadow-inner bg-[#2A5B68]">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]"></div>
                <BookOpen className="w-12 h-12 text-white/90 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-[10px] font-bold">
                  PDF
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#3E2723] mb-2 leading-snug group-hover:text-[#2A5B68] transition-colors">
                    {book.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                      {book.author}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#5C6B73]">
                      <div className="flex items-center gap-1.5 bg-[#F9F7F0] px-2 py-1 rounded-md border border-[#E6E2D3]">
                        <Calendar className="w-3 h-3" />
                        <span>{book.purchaseDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <DownloadButton bookId={book.id} />
                  {book.hasVideo && (
                    <button
                      onClick={() => openVideo(book.videoUrl || "")}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2A5B68] text-white font-bold text-sm hover:bg-[#1f4a56] transition-all active:scale-95 shadow-md"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>شاهد الشرح</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal (نفس الكود السابق) */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-[#3E2723]/90 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          ></div>
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-6 py-4 bg-[#111] border-b border-[#333]">
              <span className="text-white">فيديو</span>
              <button onClick={() => setIsVideoOpen(false)}>
                <X className="text-white w-6 h-6" />
              </button>
            </div>
            <div className="relative pt-[56.25%] bg-black">
              <iframe
                src={currentVideoUrl}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
