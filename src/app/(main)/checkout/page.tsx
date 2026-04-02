"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/components/providers/cart-provider";
import {
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneInputPro from "@/components/ui/phone-input";

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const { items, removeItem, totalAmount } = useCart();

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // حالة النموذج (بيانات العميل المطلوبة لـ Paymob)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setMounted(true);
    // محاولة جلب بيانات المستخدم المسجل لتعبئة الحقول تلقائياً
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // محاولة استخراج الاسم الأول والأخير من الاسم الكامل
        const fullNameParts = user.user_metadata?.full_name?.split(" ") || [];
        const first = fullNameParts[0] || "";
        const last = fullNameParts.slice(1).join(" ") || "User";

        setFormData({
          firstName: first,
          lastName: last,
          email: user.email || "",
          phone: user.user_metadata?.phone || "",
        });

        // إذا كان الرقم موجوداً، نعتبره صحيحاً مبدئياً
        if (user.user_metadata?.phone) setIsPhoneValid(true);
      }
    };
    fetchUserData();
  }, []);

  // ✅ إضافة: التحقق من العناصر المملوكة وحذفها من السلة
  useEffect(() => {
    async function removeOwnedItems() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && items.length > 0) {
        // 1. جلب الكتب المملوكة لهذا المستخدم
        // نبحث في المشتريات المدفوعة فقط
        const { data: ownedItems } = await supabase
          .from("order_items")
          .select("book_id, orders!inner(status, user_id)")
          .eq("orders.user_id", user.id)
          .eq("orders.status", "paid");

        if (ownedItems && ownedItems.length > 0) {
          // استخراج الـ IDs الخاصة بالكتب المملوكة
          const ownedBookIds = ownedItems.map((i) => i.book_id).filter(Boolean);

          // 2. التحقق مما إذا كانت السلة تحتوي على أي منها
          items.forEach((item) => {
            // نتأكد أنه كتاب (أو نوعه غير محدد فنعتبره كتاب) وأنه موجود في المشتريات
            const isOwnedBook =
              (item.type === "book" || !item.type) &&
              ownedBookIds.includes(item.id);

            if (isOwnedBook) {
              // 3. حذف العنصر من السلة تلقائياً
              removeItem(item.id);
              // alert(`تم حذف "${item.title}" من السلة لأنك تمتلكه بالفعل.`);
            }
          });
        }
      }
    }

    // لا ننفذ الفحص إلا بعد تحميل الصفحة والتأكد من وجود عناصر في السلة
    if (mounted) {
      removeOwnedItems();
    }
  }, [mounted, items, supabase, removeItem]);

  const isNameValid = (name: string) => name.trim().length >= 2;
  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // 1. التحقق من تسجيل الدخول
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setErrorMsg("يرجى تسجيل الدخول أولاً لإتمام الطلب.");
        // حفظ الرابط الحالي للعودة إليه بعد الدخول
        setTimeout(() => router.push("/auth/login?next=/checkout"), 2000);
        setIsSubmitting(false);
        return;
      }

      // 2. تجهيز العناصر للـ API
      const apiItems = items.map((item) => ({
        id: item.id,
        // @ts-ignore (لتجنب أخطاء التايب سكريبت إذا لم تكن الخاصية معرفة في الواجهة)
        type: item.type || "book",
      }));

      // 3. استدعاء API الدفع (Paymob)
      const response = await fetch("/api/payment/paymob-initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items: apiItems,
          billingData: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phone,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "حدث خطأ أثناء الاتصال ببوابة الدفع");
      }

      // 4. التوجيه لصفحة الدفع
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        throw new Error("لم يتم استلام رابط الدفع من المزود");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "فشل الاتصال بالخادم. حاول مرة أخرى.");
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  // --- سلة فارغة ---
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center text-center p-4">
        <div className="w-24 h-24 bg-[#E6E2D3] rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <ShoppingBag className="w-10 h-10 text-[#3E2723]/50" />
        </div>
        <h2 className="text-2xl font-bold font-serif text-[#3E2723] mb-2">
          سلة المشتريات فارغة
        </h2>
        <p className="text-muted-foreground mb-8">
          لم تقم بإضافة أي كتب أو خدمات للسلة بعد.
        </p>
        <Link
          href="/atlas"
          className="px-8 py-3 bg-[#D4AF37] text-[#3E2723] rounded-xl font-bold hover:bg-[#c4a030] transition-colors shadow-lg active:scale-95"
        >
          تصفح الأكاديمية
        </Link>
      </div>
    );
  }

  const isFormValid =
    isNameValid(formData.firstName) &&
    isNameValid(formData.lastName) &&
    isPhoneValid &&
    isEmailValid(formData.email);

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4" dir="rtl">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#3E2723] mb-3">
            إتمام الطلب والدفع الآمن
          </h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
            <Lock className="w-4 h-4 text-green-600" />
            جميع المعاملات مشفرة ومؤمنة بالكامل
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* العمود الأيمن: بيانات الفاتورة */}
          <div className="lg:col-span-7 space-y-6">
            {/* رسائل الخطأ */}
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-200 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-bold">{errorMsg}</p>
              </div>
            )}

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6E2D3] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#2A5B68]"></div>

              <h2 className="text-xl font-bold font-serif text-[#3E2723] mb-6 flex items-center gap-3 border-b border-[#E6E2D3] pb-4">
                <div className="w-8 h-8 rounded-full bg-[#2A5B68]/10 flex items-center justify-center text-[#2A5B68]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                بيانات الفاتورة
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#3E2723]">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 rounded-xl border-2 border-[#E6E2D3] bg-[#F9F7F0] focus:border-[#2A5B68] focus:bg-white outline-none transition-all"
                      placeholder="مثال: محمد"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#3E2723]">
                      اسم العائلة
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 rounded-xl border-2 border-[#E6E2D3] bg-[#F9F7F0] focus:border-[#2A5B68] focus:bg-white outline-none transition-all"
                      placeholder="مثال: أحمد"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3E2723]">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full p-3 rounded-xl border-2 border-[#E6E2D3] bg-[#F9F7F0] focus:border-[#2A5B68] focus:bg-white outline-none transition-all text-left placeholder:text-right"
                    dir="ltr"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3E2723]">
                    رقم الهاتف
                  </label>
                  {/* استخدام مكون الهاتف المحدث */}
                  <PhoneInputPro
                    value={formData.phone}
                    onChange={(val) => setFormData({ ...formData, phone: val })}
                    onValidChange={(valid: boolean) => setIsPhoneValid(valid)}
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    * سنرسل لك تفاصيل الطلب على هذا الرقم
                  </p>
                </div>
              </div>
            </div>

            {/* بطاقة توضيح وسيلة الدفع */}
            <div className="bg-[#F9F7F0] p-6 rounded-2xl border border-[#E6E2D3] flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                <CreditCard className="w-5 h-5 text-[#2A5B68]" />
              </div>
              <div>
                <h3 className="font-bold text-[#3E2723] mb-1 text-sm">
                  الدفع الإلكتروني الآمن
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  سيتم تحويلك إلى بوابة Paymob لإتمام عملية الدفع.
                  <br />
                  نقبل البطاقات البنكية (Visa / Mastercard) والمحافظ
                  الإلكترونية.
                </p>
              </div>
            </div>
          </div>

          {/* العمود الأيسر: ملخص الطلب */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-3xl border border-[#E6E2D3] shadow-lg sticky top-24">
              <h3 className="text-lg font-bold font-serif text-[#3E2723] mb-6 flex items-center justify-between border-b border-dashed border-[#E6E2D3] pb-4">
                <span>ملخص الطلب</span>
                <span className="text-xs font-sans bg-[#2A5B68]/10 text-[#2A5B68] px-2 py-1 rounded-lg">
                  {items.length} منتجات
                </span>
              </h3>

              <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 items-center p-2 rounded-xl hover:bg-[#F9F7F0] transition-colors group"
                  >
                    <div className="w-14 h-14 bg-[#F9F7F0] group-hover:bg-white rounded-lg flex items-center justify-center shrink-0 border border-[#E6E2D3] transition-colors">
                      <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-[#3E2723] line-clamp-2 leading-relaxed mb-1">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-[#2A5B68] font-bold text-xs">
                          {item.price} ج.م
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-all"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-[#E6E2D3] pt-6 space-y-3">
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>المجموع الفرعي</span>
                  <span>{totalAmount} ج.م</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#3E2723] font-bold text-lg">
                    الإجمالي
                  </span>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-[#2A5B68]">
                      {totalAmount} ج.م
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      شامل الضريبة
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className={cn(
                  "w-full mt-8 py-4 rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2",
                  isSubmitting || !isFormValid
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#2A5B68] hover:bg-[#1f4a56] text-white hover:shadow-xl active:scale-[0.98]"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري التحويل...
                  </>
                ) : (
                  <>
                    تأكيد والدفع الآن
                    <CheckCircle2 className="w-5 h-5" />
                  </>
                )}
              </button>

              {!isFormValid && (
                <div className="mt-4 p-2 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center gap-2 text-amber-700 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>يرجى ملء جميع البيانات لتفعيل الزر</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}