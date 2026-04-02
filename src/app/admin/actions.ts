"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// 1. تعديل كتاب (تم الإصلاح: يحافظ على البيانات الداخلية ولا يمسحها)
export async function updateBook(id: string, formData: FormData) {
  const supabase = await createClient();
  
  // التحقق من الصلاحية
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("غير مصرح لك بالقيام بهذا الإجراء");
  }

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const is_available = formData.get("is_available") === "on"; 

  // ✅ الخطوة 1: جلب الميتاداتا الحالية قبل التعديل
  // هذا يمنع حذف التفاصيل (مثل الأقسام الفرعية، عدد الدروس، الأيقونات)
  const { data: currentBook } = await supabase
    .from("books")
    .select("metadata")
    .eq("id", id)
    .single();

  // تحويل البيانات لضمان وجود أوبجكت
  const currentMeta = (currentBook?.metadata as any) || {};

  // ✅ الخطوة 2: دمج البيانات القديمة مع التغيير الجديد
  const updatedMetadata = {
    ...currentMeta,        // احتفظ بكل البيانات القديمة كما هي
    is_available: is_available // عدل فقط حالة التوفر
  };

  // ✅ الخطوة 3: إرسال التحديث الآمن
  const { error } = await supabase
    .from("books")
    .update({ 
      title, 
      price, 
      description,
      metadata: updatedMetadata 
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/books"); 
  revalidatePath("/atlas");
}

// 2. تعديل استشارة
export async function updateConsultation(id: string, formData: FormData) {
  const supabase = await createClient();
  
  // التحقق من الصلاحية
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("غير مصرح لك بالقيام بهذا الإجراء");
  }
  
  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const duration = formData.get("duration") as string;
  
  // استلام الوصف والمميزات
  const description = formData.get("description") as string;
  const featuresText = formData.get("features") as string;

  // تحويل نص المميزات (سطر بسطر) إلى مصفوفة
  const features = featuresText
    ? featuresText
        .split("\n")          // تقسيم النص عند كل سطر جديد
        .map(f => f.trim())   // إزالة المسافات الزائدة
        .filter(f => f !== "") // إزالة السطور الفارغة
    : [];

  // يفضل أيضاً هنا تطبيق نفس منطق الدمج إذا كان هناك بيانات أخرى في الميتاداتا
  // لكن حالياً سنقوم بالتحديث المباشر كما هو، لأن الاستشارات غالباً تعتمد على الوصف والمميزات فقط
  const { error } = await supabase
    .from("consultation_types")
    .update({ 
      title, 
      price, 
      duration,
      metadata: {
        description,
        features
      }
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/consultations");
  revalidatePath("/consultations");
}