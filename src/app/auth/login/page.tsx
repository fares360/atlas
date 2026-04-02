"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/lib/schemas";
import { Mail, Lock, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// مكون أيقونة جوجل
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // دالة الدخول بالبريد
  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setErrorMsg("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        setIsLoading(false);
        return;
      }

      router.refresh();
      router.push("/atlas");
    } catch (error) {
      setErrorMsg("حدث خطأ غير متوقع");
      setIsLoading(false);
    }
  };

  // دالة الدخول بجوجل
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // نوجه المستخدم لصفحة الـ callback مع تحديد الوجهة النهائية للأطلس
          redirectTo: `${location.origin}/auth/callback?next=/`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message || "فشل الاتصال بجوجل");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-[#E6E2D3]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-[#3E2723] mb-2">
            مرحباً بك مجدداً
          </h1>
          <p className="text-muted-foreground">
            سجل الدخول لمتابعة رحلتك في موسوعة الأسرة
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 flex items-center gap-2 border border-red-100">
            <AlertCircle className="w-4 h-4" />
            {errorMsg}
          </div>
        )}

        {/* زر جوجل الجديد */}
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isLoading}
          className="w-full h-[50px] bg-white text-[#3E2723] font-bold rounded-xl flex items-center justify-center gap-3 border-2 border-[#E6E2D3] hover:bg-[#F9F7F0] hover:border-[#D4AF37] transition-all mb-6 active:scale-95 disabled:opacity-70"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#3E2723]" />
          ) : (
            <>
              <GoogleIcon />
              <span>المتابعة باستخدام Google</span>
            </>
          )}
        </button>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-[#E6E2D3]"></div>
          <span className="flex-shrink mx-4 text-xs text-muted-foreground bg-white px-2">
            أو بالبريد الإلكتروني
          </span>
          <div className="flex-grow border-t border-[#E6E2D3]"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
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

        <div className="mt-6 text-center text-sm text-muted-foreground">
          ليس لديك حساب؟{" "}
          <Link
            href="/auth/register"
            className="text-[#D4AF37] font-bold hover:underline"
          >
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}
