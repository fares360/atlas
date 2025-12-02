"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import {
  Trash2,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  CheckCircle,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneInput from "@/components/ui/phone-input";

export default function CheckoutPage() {
  const { items, removeItem, totalAmount, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // حالة النموذج
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    paymentMethod: "instapay",
  });

  // حالة: هل الرقم صحيح؟
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ دالة التحقق من الاسم الثلاثي (للتحقق من الاكتمال)
  const isNameValid = (name: string) => {
    const parts = name.trim().split(/\s+/); // تقسيم الاسم حسب المسافات
    return parts.length >= 3; // يجب أن يكون 3 مقاطع أو أكثر
  };

  // ✅ دالة تحديث الاسم (تمنع الأرقام)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // هذا التعبير النمطي يسمح فقط:
    // 1. الحروف العربية (\u0600-\u06FF)
    // 2. الحروف الإنجليزية (a-zA-Z)
    // 3. المسافات (\s)
    // ^ و $ لضمان تطابق النص بالكامل
    // * تعني صفر أو أكثر (للسماح بالحقل الفارغ عند المسح)
    const regex = /^[\u0600-\u06FFa-zA-Z\s]*$/;

    // إذا كانت القيمة تطابق النمط (حروف فقط) أو فارغة، نقوم بالتحديث
    // إذا حاول المستخدم كتابة رقم، الشرط لن يتحقق ولن يكتب شيئاً
    if (regex.test(val)) {
      setFormData({ ...formData, fullName: val });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-[#2A5B68] text-center max-w-md w-full animate-in zoom-in-95">
          <div className="w-20 h-20 bg-[#2A5B68]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#2A5B68]" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-[#3E2723] mb-2">
            تم استلام طلبك بنجاح!
          </h1>
          <p className="text-muted-foreground mb-8">
            شكراً لك {formData.fullName}. سيتم التواصل معك عبر واتساب على الرقم{" "}
            {formData.phone} لتأكيد الدفع.
          </p>
          <Link
            href="/"
            className="block w-full py-3 bg-[#2A5B68] text-white rounded-xl font-bold hover:bg-[#1f4a56] transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center text-center p-4">
        <div className="w-24 h-24 bg-[#E6E2D3] rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-[#3E2723]/50" />
        </div>
        <h2 className="text-2xl font-bold font-serif text-[#3E2723] mb-2">
          سلة المشتريات فارغة
        </h2>
        <Link
          href="/"
          className="px-8 py-3 bg-[#D4AF37] text-[#3E2723] rounded-xl font-bold hover:bg-[#c4a030] transition-colors"
        >
          تصفح الموسوعة
        </Link>
      </div>
    );
  }

  const isFormValid = isNameValid(formData.fullName) && isPhoneValid;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="container max-w-6xl">
        <h1 className="text-3xl font-bold font-serif text-[#3E2723] mb-8 flex items-center gap-3">
          <span className="bg-[#2A5B68] w-2 h-8 rounded-full block"></span>
          إتمام الطلب
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-7 space-y-8">
            {/* بيانات العميل */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D3] shadow-sm">
              <h2 className="text-xl font-bold font-serif text-[#3E2723] mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                بيانات التواصل
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    الاسم الثلاثي
                  </label>
                  <input
                    type="text"
                    required
                    className={cn(
                      "w-full p-3 rounded-xl border-2 outline-none transition-all",
                      // تلوين الحدود
                      formData.fullName.length > 0 &&
                        !isNameValid(formData.fullName)
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : isNameValid(formData.fullName)
                        ? "border-green-300 bg-green-50"
                        : "border-[#E6E2D3] bg-[#F9F7F0] focus:border-[#2A5B68]"
                    )}
                    placeholder="مثال: أحمد محمد علي"
                    value={formData.fullName}
                    onChange={handleNameChange} // ✅ هنا تم استخدام الدالة الجديدة
                  />
                  {formData.fullName.length > 0 &&
                    !isNameValid(formData.fullName) && (
                      <p className="text-xs text-red-500 mt-1">
                        يرجى كتابة الاسم الثلاثي (حروف فقط)
                      </p>
                    )}
                </div>

                <div>
                  <PhoneInput
                    value={formData.phone}
                    onChange={(val) => setFormData({ ...formData, phone: val })}
                    onValidChange={(valid) => setIsPhoneValid(valid)}
                  />
                </div>
              </div>
            </div>

            {/* طريقة الدفع */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D3] shadow-sm">
              <h2 className="text-xl font-bold font-serif text-[#3E2723] mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                اختر وسيلة الدفع
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label
                  className={cn(
                    "cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-slate-50",
                    formData.paymentMethod === "instapay"
                      ? "border-[#2A5B68] bg-[#2A5B68]/5"
                      : "border-transparent bg-[#F9F7F0]"
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="instapay"
                    className="hidden"
                    checked={formData.paymentMethod === "instapay"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value,
                      })
                    }
                  />
                  <Smartphone
                    className={cn(
                      "w-8 h-8",
                      formData.paymentMethod === "instapay"
                        ? "text-[#2A5B68]"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="font-bold text-sm">InstaPay</span>
                </label>
                <label
                  className={cn(
                    "cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-slate-50",
                    formData.paymentMethod === "wallet"
                      ? "border-[#2A5B68] bg-[#2A5B68]/5"
                      : "border-transparent bg-[#F9F7F0]"
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    className="hidden"
                    checked={formData.paymentMethod === "wallet"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value,
                      })
                    }
                  />
                  <Wallet
                    className={cn(
                      "w-8 h-8",
                      formData.paymentMethod === "wallet"
                        ? "text-[#2A5B68]"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="font-bold text-sm">Vodafone Cash</span>
                </label>
              </div>

              <div className="mt-6 p-4 bg-[#FFFDE7] border border-[#FBC02D]/30 rounded-lg text-sm text-[#3E2723]">
                <p className="font-bold mb-1">تعليمات الدفع:</p>
                {formData.paymentMethod === "instapay" && (
                  <p>
                    حول إلى:{" "}
                    <span className="font-bold font-mono">
                      username@instapay
                    </span>
                  </p>
                )}
                {formData.paymentMethod === "wallet" && (
                  <p>
                    حول إلى:{" "}
                    <span className="font-bold font-mono">010xxxxxxxx</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ملخص الطلب */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl border-2 border-[#E6E2D3] shadow-lg sticky top-24">
              <h3 className="text-lg font-bold font-serif text-[#3E2723] mb-4 border-b border-dashed pb-4">
                ملخص الطلب ({items.length})
              </h3>

              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="w-16 h-16 bg-[#F9F7F0] rounded-lg flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-[#3E2723] line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[#2A5B68] font-bold text-sm">
                          {item.price} ج.م
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-[#E6E2D3] pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>المجموع الفرعي</span>
                  <span>{totalAmount} ج.م</span>
                </div>
                <div className="flex justify-between text-[#2A5B68] font-bold text-xl pt-2">
                  <span>الإجمالي</span>
                  <span>{totalAmount} ج.م</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className={cn(
                  "w-full mt-6 py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2",
                  isSubmitting || !isFormValid
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                    : "bg-[#2A5B68] hover:bg-[#1f4a56] text-white active:scale-95"
                )}
              >
                {isSubmitting ? "جاري التأكيد..." : "تأكيد الطلب"}
                {!isSubmitting && <ArrowLeft className="w-5 h-5" />}
              </button>

              {!isFormValid && (
                <p className="text-xs text-center text-red-400 mt-3 animate-pulse">
                  يرجى استكمال الاسم الثلاثي ورقم الهاتف الصحيح لتفعيل الزر
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
