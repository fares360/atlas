"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/components/providers/cart-provider";
import {
  ShoppingCart,
  Loader2,
  BookOpen,
  Check,
  Clock,
} from "lucide-react";

interface ProductActionsProps {
  productId: string;
  productData: {
    id: string;
    title: string;
    price: number;
    type: "book" | "consultation";
  };
}

export default function ProductActions({
  productId,
  productData,
}: ProductActionsProps) {
  const [isOwned, setIsOwned] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false); // ✅ البداية دائماً false للأمان
  const [isLoading, setIsLoading] = useState(true);
  const { addItem, items } = useCart();
  const supabase = createClient();

  useEffect(() => {
    async function checkStatus() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        // 1. التحقق من توفر الكتاب (من جدول الكتب)
        const { data: bookData } = await supabase
          .from("books")
          .select("metadata")
          .eq("id", productId)
          .single();

        if (bookData?.metadata) {
          // @ts-ignore
          const val = bookData.metadata.is_available;
          
          // ✅ منطق فحص صارم: نقبل فقط القيم التي تعني "متاح" صراحة
          // هذا يمنع اعتبار النص "false" على أنه true
          if (val === true || val === "true" || val === "on") {
            setIsAvailable(true);
          } else {
            setIsAvailable(false);
          }
        } else {
            // إذا لم توجد بيانات، نعتبره غير متاح
            setIsAvailable(false);
        }

        // 2. التحقق من الملكية (لو المستخدم مسجل دخول)
        if (user) {
          const { data } = await supabase
            .from("order_items")
            .select("orders!inner(status, user_id)")
            .eq("book_id", productId)
            .eq("orders.user_id", user.id)
            .eq("orders.status", "paid")
            .maybeSingle();

          if (data) {
            setIsOwned(true);
          }
        }
      } catch (error) {
        console.error("Error checking status:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkStatus();
  }, [productId, supabase]);

  const isInCart = items.some((item) => item.id === productId);

  // حالة التحميل
  if (isLoading) {
    return (
      <button
        disabled
        className="w-full py-3 bg-[#F9F7F0] text-muted-foreground rounded-xl flex items-center justify-center gap-2"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>جاري التحقق...</span>
      </button>
    );
  }

  // الحالة 0: الكتاب غير متوفر (Coming Soon)
  if (!isAvailable) {
    return (
      <button
        disabled
        className="w-full py-3 bg-gray-100 border border-gray-200 text-gray-400 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <Clock className="w-5 h-5" />
        <span>قريباً (غير متاح حالياً)</span>
      </button>
    );
  }

  // الحالة 1: المستخدم يمتلك الكتاب
  if (isOwned) {
    return (
      <Link
        href="/library"
        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
      >
        <BookOpen className="w-5 h-5" />
        <span>أنت تمتلك هذا المجلد</span>
      </Link>
    );
  }

  // الحالة 2: الكتاب في السلة
  if (isInCart) {
    return (
      <div className="w-full py-3 bg-[#F9F7F0] border border-green-200 text-green-700 rounded-xl font-bold flex items-center justify-center gap-2">
        <Check className="w-5 h-5" />
        <span>تمت الإضافة للسلة</span>
      </div>
    );
  }

  // الحالة 3: زر الشراء العادي (متاح للشراء)
  return (
    <button
      onClick={() => addItem(productData)}
      className="w-full py-3 bg-[#2A5B68] hover:bg-[#1a3d47] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      <span>إضافة للسلة - {productData.price} ج.م</span>
    </button>
  );
}