"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { Lock, MessageCircle } from "lucide-react";

// رقم الواتساب الخاص بالأدمن
const ADMIN_WHATSAPP_NUMBER = "201000000000";

interface BookingButtonProps {
  service: {
    title: string;
    price: number;
    duration: string;
  };
  themeColor: string;
}

export default function BookingButton({ service, themeColor }: BookingButtonProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleBooking = () => {
    // 1. التحقق من تسجيل الدخول
    if (!user) {
      // توجيه لصفحة الدخول مع العودة لهذه الصفحة
      router.push("/auth/login?next=/consultations");
      return;
    }

    // 2. تجهيز رسالة الواتساب
    const message = `مرحباً، أرغب في حجز استشارة جديدة 🎓
    
📌 *نوع الاستشارة:* ${service.title}
💰 *السعر:* ${service.price} ج.م
⏱️ *المدة:* ${service.duration}

يرجى تزويدي بالمواعيد المتاحة وتفاصيل الدفع.`;

    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleBooking}
      className="w-full py-4 rounded-xl font-bold text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 hover:brightness-110"
      style={{ backgroundColor: themeColor }}
    >
      {!user ? <Lock className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      {!user ? "سجل دخول للحجز" : "حجز عبر واتساب"}
    </button>
  );
}