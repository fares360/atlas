import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// إعداد Supabase Admin (للكتابة في الداتابيز)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { orderId, success } = await request.json();

    if (!orderId || !success) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    // إذا كانت العملية ناجحة من Paymob
    if (success === "true") {
      // تحديث حالة الطلب إلى 'paid'
      const { error } = await supabaseAdmin
        .from("orders")
        .update({ status: "paid" })
        .eq("id", orderId);

      if (error) throw error;

      return NextResponse.json({ message: "تم تحديث الطلب بنجاح" });
    } else {
      // لو العملية فشلت، ممكن نحدثه لـ cancelled (اختياري)
      await supabaseAdmin
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", orderId);

      return NextResponse.json({ message: "تم إلغاء الطلب" });
    }
  } catch (error) {
    console.error("Confirm Error:", error);
    return NextResponse.json({ error: "فشل التحديث" }, { status: 500 });
  }
}
