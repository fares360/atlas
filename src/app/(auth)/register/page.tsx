"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterForm } from "@/lib/schemas";
import { Mail, Lock, User, ArrowLeft, Loader2, Phone } from "lucide-react";
import { useState } from "react";
import PhoneInputPro from "@/components/ui/phone-input"; // استدعاء المكون اليدوي الذي بنيناه

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control, // مهم جداً للتحكم في PhoneInput
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "", // قيمة ابتدائية
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    console.log("Register Data:", data);
    // هنا استدعاء API التسجيل
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 py-10">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-[#E6E2D3]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-[#3E2723] mb-2">
            إنشاء حساب جديد
          </h1>
          <p className="text-muted-foreground">
            انضم إلينا واستمتع بمحتوى الموسوعة كاملاً
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* الاسم الكامل */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#3E2723]">
              الاسم الكامل
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                {...register("fullName")}
                type="text"
                placeholder="الاسم الثلاثي"
                className="w-full h-[50px] pr-10 pl-4 bg-[#F9F7F0] border border-[#E6E2D3] rounded-xl focus:border-[#2A5B68] focus:ring-2 focus:ring-[#2A5B68]/20 outline-none transition-all"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#3E2723]">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                {...register("email")}
                type="email"
                placeholder="example@mail.com"
                className="w-full h-[50px] pr-10 pl-4 bg-[#F9F7F0] border border-[#E6E2D3] rounded-xl focus:border-[#2A5B68] focus:ring-2 focus:ring-[#2A5B68]/20 outline-none transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* رقم الهاتف (Integration with Custom Component) */}
          <div className="space-y-1">
            {/* استخدام Controller لربط المكون الخارجي بنظام التحقق */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInputPro
                  value={field.value || ""}
                  onChange={field.onChange}
                  // onValidChange يمكن استخدامه لتحديث حالة محلية لو أردت، لكن Zod يكفي هنا
                />
              )}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* كلمة المرور */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#3E2723]">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full h-[50px] pr-10 pl-4 bg-[#F9F7F0] border border-[#E6E2D3] rounded-xl focus:border-[#2A5B68] focus:ring-2 focus:ring-[#2A5B68]/20 outline-none transition-all"
              />
            </div>
            {/* عرض شروط كلمة المرور كمساعدة */}
            <p className="text-[10px] text-muted-foreground mt-1">
              يجب أن تحتوي على 8 أحرف، حرف كبير، حرف صغير، رقم، ورمز.
            </p>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#3E2723]">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                className="w-full h-[50px] pr-10 pl-4 bg-[#F9F7F0] border border-[#E6E2D3] rounded-xl focus:border-[#2A5B68] focus:ring-2 focus:ring-[#2A5B68]/20 outline-none transition-all"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* زر التسجيل */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] mt-4 bg-[#D4AF37] hover:bg-[#b8962e] text-[#3E2723] font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "إنشاء الحساب"
            )}
            {!isLoading && <User className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/login"
            className="text-[#2A5B68] font-bold hover:underline"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
