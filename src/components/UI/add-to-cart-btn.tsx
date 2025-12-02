"use client";

import { useCart, CartItem } from "@/components/providers/cart-provider";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AddToCartBtn({ item }: { item: CartItem }) {
  const { addItem, items } = useCart();

  // 1. حل مشكلة الـ Hydration (التأكد من تحميل الصفحة بالكامل)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // التحقق هل المنتج موجود بالفعل؟
  const isInCart = items.some((i) => i.id === item.id);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isInCart) return;

    setIsAnimating(true);
    addItem(item);

    // تأثير بسيط لإظهار التفاعل
    setTimeout(() => setIsAnimating(false), 600);
  };

  // عرض زر تحميل مؤقت حتى يتم تحميل حالة السلة (لمنع الوميض)
  if (!mounted) {
    return (
      <div className="w-full h-[56px] bg-muted/20 rounded-xl animate-pulse" />
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isInCart || isAnimating}
      className={cn(
        "w-full h-[56px] font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md",
        isInCart
          ? "bg-green-600 text-white cursor-default hover:bg-green-700 border-2 border-green-600" // حالة النجاح
          : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 hover:shadow-lg" // الحالة العادية (استخدام متغيرات الثيم)
      )}
    >
      {isInCart ? (
        <div className="flex items-center gap-2 animate-in zoom-in spin-in-1">
          <span>موجود بالسلة</span>
          <Check className="w-6 h-6" />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span>{isAnimating ? "جاري الإضافة..." : "إضافة للسلة"}</span>
          {isAnimating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          )}
        </div>
      )}
    </button>
  );
}
