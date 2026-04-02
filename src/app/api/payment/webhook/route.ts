import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// إعداد Supabase Admin
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    // 1. استقبال البيانات (Query Params for GET / JSON Body for POST)
    // Paymob Webhook usually sends a POST request with the transaction object
    const data = await request.json();
    const { obj } = data; // obj هو كائن العملية (Transaction Object)

    // 2. التحقق من المصدر (HMAC Security Check) 🛡️
    // ده أهم جزء عشان نتأكد إن الريكويست جاي من Paymob مش من هاكر
    const hmacReceived = request.headers.get("x-paymob-hmac-hex");
    const hmacSecret = process.env.PAYMOB_HMAC_SECRET; // هاته من Paymob Dashboard

    if (!hmacSecret || !hmacReceived) {
      console.error("❌ Missing HMAC data");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ترتيب الحقول حسب توثيق Paymob لإنشاء الـ String
    const concatenatedString = [
      obj.amount_cents,
      obj.created_at,
      obj.currency,
      obj.error_occured,
      obj.has_parent_transaction,
      obj.id,
      obj.integration_id,
      obj.is_3d_secure,
      obj.is_auth,
      obj.is_capture,
      obj.is_refunded,
      obj.is_standalone_payment,
      obj.is_voided,
      obj.order.id, // Paymob Order ID
      obj.owner,
      obj.pending,
      obj.source_data.pan,
      obj.source_data.sub_type,
      obj.source_data.type,
      obj.success,
    ].join("");

    // تشفير الـ String ومقارنته باللي وصل من Paymob
    const calculatedHmac = crypto
      .createHmac("sha512", hmacSecret)
      .update(concatenatedString)
      .digest("hex");

    if (calculatedHmac !== hmacReceived) {
      console.error("❌ HMAC Validation Failed!");
      return NextResponse.json({ error: "Invalid HMAC" }, { status: 403 });
    }

    // 3. معالجة حالة الدفع
    // merchant_order_id هو الـ ID بتاعنا (Supabase Order UUID) اللي بعتناه في الأول
    const supabaseOrderId = obj.order.merchant_order_id;
    const isSuccess = obj.success === true;

    console.log(
      `🔔 Webhook received for Order: ${supabaseOrderId}, Success: ${isSuccess}`
    );

    if (isSuccess) {
      // ✅ دفع ناجح: تحديث الحالة لـ paid
      const { error } = await supabaseAdmin
        .from("orders")
        .update({
          status: "paid",
          payment_ref: String(obj.id), // رقم العملية في Paymob للمرجعية
          payment_method: obj.source_data.sub_type || "card",
        })
        .eq("id", supabaseOrderId); // البحث بالـ ID بتاعنا

      if (error) {
        console.error("❌ Database Update Error:", error);
        throw error;
      }

      console.log("✅ Order marked as PAID in Database.");
    } else {
      // ❌ دفع فاشل: تحديث الحالة لـ failed أو cancelled
      await supabaseAdmin
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", supabaseOrderId);

      console.log("❌ Order marked as CANCELLED.");
    }

    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error: any) {
    console.error("🔥 Webhook Fatal Error:", error);
    // نرجع 200 عشان Paymob ميفضلش يبعت الريكويست تاني وتالت
    // (حتى لو حصل خطأ عندنا، احنا سجلناه في الكونسول خلاص)
    return NextResponse.json({ message: "Error handled" }, { status: 200 });
  }
}
