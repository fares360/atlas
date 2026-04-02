import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// 1. إعداد Supabase Admin (للتحقق من الشراء)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 2. إعداد R2 Client (لإنشاء الروابط)
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const { userId, bookId } = await request.json();

    if (!userId || !bookId) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    // 3. التحقق الأمني: هل هذا المستخدم اشترى هذا الكتاب وحالة الطلب "paid"؟
    // نقوم بالبحث في جدول العناصر المرتبط بجدول الطلبات
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from("order_items")
      .select("orders!inner(status, user_id)")
      .eq("item_id", bookId)
      .eq("item_type", "book")
      .eq("orders.user_id", userId)
      .eq("orders.status", "paid") // شرط أساسي: الدفع تم
      .limit(1)
      .maybeSingle(); // نستخدم maybeSingle لتجنب الخطأ لو لم يجد سجل

    if (purchaseError) {
      console.error("Check purchase error:", purchaseError);
      return NextResponse.json(
        { error: "حدث خطأ أثناء التحقق" },
        { status: 500 }
      );
    }

    if (!purchase) {
      return NextResponse.json(
        { error: "عذراً، يجب شراء الكتاب أولاً." },
        { status: 403 }
      );
    }

    // 4. جلب اسم الملف (Key) من جدول الكتب
    const { data: book, error: bookError } = await supabaseAdmin
      .from("books")
      .select("r2_file_key")
      .eq("id", bookId)
      .single();

    if (bookError || !book?.r2_file_key) {
      return NextResponse.json(
        { error: "ملف الكتاب غير موجود" },
        { status: 404 }
      );
    }

    // 5. توليد رابط موقع (Signed URL) صالح لمدة 60 دقيقة
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: book.r2_file_key,
      // يمكن إضافة ContentDisposition لجعل المتصفح يحمله باسم معين
      ResponseContentDisposition: `attachment; filename="mawaddah-book-${bookId}.pdf"`,
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 }); // 3600 ثانية = 1 ساعة

    // 6. (اختياري) تسجيل عملية التحميل في الـ Log
    await supabaseAdmin.from("downloads_log").insert({
      user_id: userId,
      book_id: bookId,
      // ip_address: ... يمكن جلبه من الـ headers
    });

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Download API Error:", error);
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
