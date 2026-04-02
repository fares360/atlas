"use client";

import { useCheckAccess } from "@/hooks/use-check-access";
import AddToCartBtn from "@/components/ui/add-to-cart-btn";
import { Download, Loader2 } from "lucide-react";
import { CartItem } from "@/components/providers/cart-provider";

export default function BookActions({ item }: { item: CartItem }) {
  // استخدام الـ Hook الجديد للتحقق من الداتابيز مباشرة
  const { hasAccess, loading } = useCheckAccess(String(item.id));

  if (loading) {
    return <div className="h-14 w-full bg-gray-100 animate-pulse rounded-xl" />;
  }

  // إذا كان يمتلك الكتاب، اعرض زر التحميل
  if (hasAccess) {
    return (
      <button className="w-full h-[56px] bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 transition-all">
        <Download className="w-5 h-5" />
        تحميل الكتاب
      </button>
    );
  }

  // إذا لم يمتلكه، اعرض زر الشراء
  return <AddToCartBtn item={item} />;
}
