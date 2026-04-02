"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Download } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider"; // ✅ تأكد إن المسار ده بيشاور على الملف اللي أنت بعتهولي

export default function PaymentSuccessPage() {
  // هنا بننادي على الدالة الجاهزة من الملف بتاعك
  const { clearCart } = useCart();

  useEffect(() => {
    // استخدمنا setTimeout عشان نضمن ان الرندر خلص
    const timer = setTimeout(() => {
      clearCart();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-[#E6E2D3] text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-[#3E2723] mb-2 font-serif">
          تم الدفع بنجاح!
        </h1>

        <p className="text-muted-foreground mb-8">
          شكراً لك. تم تأكيد طلبك بنجاح، ويمكنك الآن تحميل الكتب من مكتبتك.
        </p>

        <div className="space-y-3">
          <Link
            href="/library"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#2A5B68] hover:bg-[#1a3d47] text-white rounded-xl font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            الذهاب لمكتبتي (للتحميل)
          </Link>

          <Link
            href="/atlas"
            className="flex items-center justify-center gap-2 w-full py-3 bg-transparent hover:bg-[#F9F7F0] text-[#3E2723] border border-[#E6E2D3] rounded-xl font-bold transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للموسوعة
          </Link>
        </div>
      </div>
    </main>
  );
}
