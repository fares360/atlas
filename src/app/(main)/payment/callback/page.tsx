"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );

  useEffect(() => {
    // 1. استخراج البيانات من رابط Paymob
    const success = searchParams.get("success");
    const orderId = searchParams.get("merchant_order_id"); // هذا هو الـ ID بتاعنا في Supabase

    async function confirmPayment() {
      if (success === "true" && orderId) {
        try {
          // 2. استدعاء الـ API لتحديث الداتابيز
          const res = await fetch("/api/payment/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, success }),
          });

          if (res.ok) {
            setStatus("success");
            clearCart();
          } else {
            setStatus("failed");
          }
        } catch (error) {
          console.error(error);
          setStatus("failed");
        }
      } else {
        setStatus("failed");
      }
    }

    confirmPayment();
  }, [searchParams, clearCart]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 text-[#2A5B68] animate-spin mb-4" />
        <p className="text-[#3E2723] font-bold">
          جاري تأكيد الدفع وتفعيل الكتب...
        </p>
      </div>
    );
  }

  // ... (باقي كود التصميم للنجاح والفشل كما هو في ملفك السابق)
  if (status === "success") {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-200 text-center max-w-md w-full animate-in zoom-in-95">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold font-serif text-[#3E2723] mb-2">
          تم الدفع بنجاح!
        </h1>
        <p className="text-muted-foreground mb-8">
          شكراً لك. تم تأكيد طلبك وإتاحة المحتوى في مكتبتك.
        </p>
        <Link
          href="/library"
          className="block w-full py-3 bg-[#2A5B68] text-white rounded-xl font-bold hover:bg-[#1f4a56] transition-colors"
        >
          الذهاب إلى مكتبتي
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-200 text-center max-w-md w-full animate-in zoom-in-95">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <XCircle className="w-10 h-10 text-red-600" />
      </div>
      <h1 className="text-2xl font-bold font-serif text-[#3E2723] mb-2">
        فشل عملية الدفع
      </h1>
      <p className="text-muted-foreground mb-8">
        عذراً، لم تكتمل عملية الدفع. يرجى المحاولة مرة أخرى أو التواصل معنا.
      </p>
      <div className="space-y-3">
        <Link
          href="/checkout"
          className="block w-full py-3 bg-[#2A5B68] text-white rounded-xl font-bold hover:bg-[#1f4a56] transition-colors"
        >
          إعادة المحاولة
        </Link>
        <Link
          href="/"
          className="block w-full py-3 text-muted-foreground hover:bg-slate-50 rounded-xl font-bold transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentCallbackContent />
      </Suspense>
    </div>
  );
}
