"use server";

import { createClient } from "@/lib/supabase/server";
import { ArticleFormData } from "@/types/article";
import { revalidatePath } from "next/cache";

// Helper to validate Admin access
async function checkAdmin() {
  const supabase = await createClient(); // ✅ تم إضافة await هنا
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) throw new Error("Forbidden: Admins only");
  return user.id;
}

export async function createArticle(data: ArticleFormData) {
  try {
    const authorId = await checkAdmin();
    const supabase = await createClient(); // ✅ تم إضافة await هنا

    const { error } = await supabase.from("articles").insert({
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      cover_image_url: data.cover_image_url,
      category: data.category,
      is_published: data.is_published,
      author_id: authorId,
    });

    if (error) {
        if (error.code === '23505') throw new Error("هذا الرابط (Slug) مستخدم بالفعل، الرجاء تغييره.");
        throw error;
    }

    revalidatePath("/admin/articles");
    revalidatePath("/articles");
    return { success: true };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateArticle(id: string, data: ArticleFormData) {
  try {
    await checkAdmin();
    const supabase = await createClient(); // ✅ تم إضافة await هنا

    const { error } = await supabase
      .from("articles")
      .update({
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        cover_image_url: data.cover_image_url,
        category: data.category,
        is_published: data.is_published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/admin/articles");
    revalidatePath(`/articles/${data.slug}`);
    revalidatePath("/articles");
    return { success: true };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteArticle(id: string) {
  try {
    await checkAdmin();
    const supabase = await createClient(); // ✅ تم إضافة await هنا

    const { error } = await supabase.from("articles").delete().eq("id", id);

    if (error) throw error;

    revalidatePath("/admin/articles");
    revalidatePath("/articles");
    return { success: true };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}