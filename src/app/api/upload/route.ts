import { createClient } from "@/lib/supabase/server";
import { getPresignedUploadUrl } from "@/lib/r2-upload";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. التحقق من الأدمن
    const supabase = await createClient(); // ✅ Added await
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Mock Mode (للتطوير المحلي بدون R2)
    // إذا لم تكن مفاتيح R2 موجودة في ملف .env، سنقوم بمحاكاة الرفع
    if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
      console.warn("⚠️ R2 Keys missing. Running in Mock Mode.");
      return NextResponse.json({ 
        isMock: true, // علامة لنخبر الفرونت إند أننا في وضع المحاكاة
        uploadUrl: null, 
        publicUrl: "https://placehold.co/600x400/2A5B68/ffffff?text=Mock+Image+Uploaded", // صورة مؤقتة
        fileKey: "mock-key"
      });
    }

    // 3. الوضع الحقيقي (Production)
    const body = await request.json();
    const { filename, contentType, folder } = body;

    if (!filename || !contentType) {
      return NextResponse.json({ error: "Missing filename or contentType" }, { status: 400 });
    }

    const { uploadUrl, fileKey, publicUrl } = await getPresignedUploadUrl(
      filename, 
      contentType, 
      folder || 'articles'
    );

    return NextResponse.json({ 
      isMock: false,
      uploadUrl, 
      fileKey, 
      publicUrl 
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}