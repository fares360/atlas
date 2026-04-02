import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // إذا لم يتم تحديد وجهة "next"، نوجهه للصفحة الرئيسية أو الأطلس
  const next = searchParams.get("next") ?? "/atlas";

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {
              // يتم تجاهل الخطأ في Server Components
            }
          },
        },
      },
    );

    // تبادل الكود للحصول على جلسة المستخدم
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // التحقق من وجود Forwarded Host (مهم عند الرفع على Vercel لضمان الدومين الصحيح)
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // في السيرفر المحلي
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // عند الرفع (Production)
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        // احتياطي
        return NextResponse.redirect(`${origin}${next}`);
      }
    } else {
      console.error("Auth Callback Error:", error.message);
    }
  }

  // في حالة حدوث خطأ، أعد المستخدم لصفحة الدخول مع رسالة خطأ
  return NextResponse.redirect(`${origin}/login?error=auth_code_error`);
}
