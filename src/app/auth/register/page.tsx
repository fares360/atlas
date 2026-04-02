"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import {
  Loader2,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Mail,
  Lock,
  User,
} from "lucide-react";
import PhoneInputPro, { isValidPhoneNumber } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";

// --- أيقونة جوجل ---
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

// 1. مخطط التحقق (Validation Schema)
const registerSchema = z
  .object({
    fullName: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    phone: z.string().refine((val) => val && isValidPhoneNumber(val), {
      message: "رقم الهاتف غير صحيح",
    }),
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "يرجى تأكيد كلمة المرور"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // حالة تحميل جوجل
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2. إعداد React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const phoneValue = watch("phone");

  // --- دالة التسجيل بالبريد ---
  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setServerError("");

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          // المسار الصحيح للـ Callback
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: data.fullName,
            phone: data.phone,
          },
        },
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      setServerError(err.message || "حدث خطأ غير متوقع أثناء التسجيل");
    } finally {
      setLoading(false);
    }
  };

  // --- دالة التسجيل بجوجل ---
  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setServerError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // التوجيه للصفحة الرئسيسة بعد العودة من جوجل
          redirectTo: `${window.location.origin}/auth/callback?next=/`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setServerError(error.message || "فشل الاتصال بجوجل");
      setIsGoogleLoading(false);
    }
  };

  // --- واجهة النجاح ---
  if (success) {
    return (
      <div className="bg-white rounded-[2rem] shadow-2xl border border-[#E6E2D3] p-8 md:p-12 text-center max-w-md w-full mx-auto animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold font-serif text-[#3E2723] mb-4">
          تم إنشاء الحساب!
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          شكراً لانضمامك إلى أكاديمية مودة. لقد أرسلنا رابط تفعيل إلى بريدك
          الإلكتروني.
          <br />
          <span className="font-bold text-[#2A5B68]">
            يرجى التفعيل لتتمكن من الدخول.
          </span>
        </p>
        <Link
          href="/auth/login"
          className="block w-full py-4 bg-[#2A5B68] text-white rounded-xl font-bold hover:bg-[#1f4a56] transition-all shadow-lg hover:shadow-[#2A5B68]/20"
        >
          العودة لصفحة الدخول
        </Link>
      </div>
    );
  }

  // --- واجهة النموذج ---
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-[#E6E2D3] overflow-hidden w-full max-w-md mx-auto">
      {/* الهيدر المتناسق */}
      <div className="bg-[#2A5B68] p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <h1 className="text-3xl font-bold font-serif text-white mb-2 relative z-10">
          حساب جديد
        </h1>
        <p className="text-white/80 text-sm relative z-10 font-medium">
          ابدأ رحلتك المعرفية مع أكاديمية مودة
        </p>
      </div>

      <div className="p-8 md:p-10">
        {/* زر جوجل */}
        <button
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading || loading}
          className="w-full py-3.5 bg-white text-[#3E2723] font-bold rounded-xl flex items-center justify-center gap-3 border-2 border-[#E6E2D3] hover:bg-[#F9F7F0] hover:border-[#D4AF37] transition-all mb-6 active:scale-95 disabled:opacity-70 shadow-sm"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#3E2723]" />
          ) : (
            <>
              <GoogleIcon />
              <span>التسجيل باستخدام Google</span>
            </>
          )}
        </button>

        {/* فاصل جمالي */}
        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-[#E6E2D3]"></div>
          <span className="flex-shrink mx-4 text-xs font-bold text-muted-foreground bg-white px-2">
            أو عبر البريد الإلكتروني
          </span>
          <div className="flex-grow border-t border-[#E6E2D3]"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {serverError && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3 border border-red-100 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="font-medium">{serverError}</span>
            </div>
          )}

          {/* الاسم الكامل */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3E2723] mr-1">
              الاسم الكامل
            </label>
            <div className="relative">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
              <input
                {...register("fullName")}
                type="text"
                className={cn(
                  "w-full h-12 pr-12 pl-4 rounded-xl border bg-[#F9F7F0] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all",
                  errors.fullName
                    ? "border-red-500 bg-red-50"
                    : "border-[#E6E2D3]"
                )}
                placeholder="مثال: أحمد محمد"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-500 mr-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* رقم الهاتف */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3E2723] mr-1">
              رقم الهاتف
            </label>
            <PhoneInputPro
              value={phoneValue}
              onChange={(val) =>
                setValue("phone", val, { shouldValidate: true })
              }
              error={errors.phone?.message}
            />
          </div>

          {/* البريد الإلكتروني */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3E2723] mr-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
              <input
                {...register("email")}
                type="email"
                className={cn(
                  "w-full h-12 pr-12 pl-4 rounded-xl border bg-[#F9F7F0] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all",
                  errors.email ? "border-red-500 bg-red-50" : "border-[#E6E2D3]"
                )}
                placeholder="name@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mr-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* كلمة المرور */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3E2723] mr-1">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className={cn(
                  "w-full h-12 pr-12 pl-12 rounded-xl border bg-[#F9F7F0] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all",
                  errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-[#E6E2D3]"
                )}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2A5B68] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mr-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3E2723] mr-1">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                className={cn(
                  "w-full h-12 pr-12 pl-12 rounded-xl border bg-[#F9F7F0] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all",
                  errors.confirmPassword
                    ? "border-red-500 bg-red-50"
                    : "border-[#E6E2D3]"
                )}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2A5B68] transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mr-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || isGoogleLoading}
            className="w-full py-4 bg-[#D4AF37] hover:bg-[#c4a030] text-[#3E2723] rounded-xl font-bold transition-all shadow-lg hover:shadow-[#D4AF37]/30 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                إنشاء الحساب
                <UserPlus className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-[#E6E2D3]">
          <p className="text-sm text-muted-foreground mb-2">
            لديك حساب بالفعل؟
          </p>
          <Link
            href="/auth/login"
            className="text-[#2A5B68] font-bold hover:underline inline-flex items-center gap-1 transition-colors"
          >
            سجل دخولك الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
