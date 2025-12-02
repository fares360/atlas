"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/lib/schemas";
import { Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  // إعداد النموذج
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    // محاكاة الاتصال بالسيرفر
    console.log("Login Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // هنا يتم التوجيه للرئيسية router.push('/')
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      {/* بطاقة تسجيل الدخول */}
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-[#E6E2D3]">
        {/* العناوين */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-[#3E2723] mb-2">
            مرحباً بك مجدداً
          </h1>
          <p className="text-muted-foreground">
            سجل الدخول لمتابعة رحلتك في موسوعة الأسرة
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* حقل البريد الإلكتروني */}
          <div className="space-y-2">
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

          {/* حقل كلمة المرور */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[#3E2723]">
                كلمة المرور
              </label>
              <Link href="#" className="text-xs text-[#2A5B68] hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full h-[50px] pr-10 pl-4 bg-[#F9F7F0] border border-[#E6E2D3] rounded-xl focus:border-[#2A5B68] focus:ring-2 focus:ring-[#2A5B68]/20 outline-none transition-all"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* زر الدخول */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] bg-[#2A5B68] hover:bg-[#1f4a56] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "تسجيل الدخول"
            )}
            {!isLoading && <ArrowLeft className="w-5 h-5" />}
          </button>
        </form>

        {/* الفوتر */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          ليس لديك حساب؟{" "}
          <Link
            href="/register"
            className="text-[#D4AF37] font-bold hover:underline"
          >
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}
