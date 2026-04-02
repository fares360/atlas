import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 1. إعداد عميل Supabase بصلاحيات الآدمن
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, paymentMethod, fullName, phone } = body;

    // التحقق من البيانات
    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "بيانات الطلب غير مكتملة" },
        { status: 400 }
      );
    }

    let totalAmount = 0;
    const orderItemsData = [];

    // 2. معالجة العناصر وحساب السعر
    for (const item of items) {
      let realPrice = 0;
      let bookId = null;
      let consultationId = null;

      // أ) لو المنتج كتاب
      if (item.type === "book") {
        const { data: book } = await supabaseAdmin
          .from("books")
          .select("price")
          .eq("id", item.id)
          .single();

        if (book) {
          realPrice = book.price;
          bookId = item.id;
        }
      }
      // ب) لو المنتج استشارة
      else if (item.type === "consultation") {
        const { data: cons } = await supabaseAdmin
          .from("consultation_types")
          .select("price")
          .eq("id", item.id)
          .single();

        if (cons) {
          realPrice = cons.price;
          consultationId = item.id;
        }
      }

      totalAmount += Number(realPrice);

      // تجهيز الصف حسب الهيكلة الجديدة
      orderItemsData.push({
        price: realPrice,
        item_type: item.type, // ✅ ضروري عشان الفلترة في الفرونت إند
        book_id: bookId, // يا إما ID أو null
        consultation_id: consultationId, // يا إما ID أو null
      });
    }

    // 3. إنشاء الطلب في جدول orders
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
        total_amount: totalAmount,
        payment_method: paymentMethod,
        // يمكننا تخزين الاسم والرقم مؤقتاً هنا لو مفيش مكان في البروفايل،
        // أو الاعتماد على تحديث البروفايل بشكل منفصل.
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order Create Error:", orderError);
      throw new Error("فشل إنشاء الطلب");
    }

    // 4. ربط العناصر بالطلب (Bulk Insert)
    const itemsWithOrderId = orderItemsData.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(itemsWithOrderId);

    if (itemsError) {
      console.error("Items Create Error:", itemsError);
      // في السيناريو الحقيقي، هنا ممكن نعمل حذف للطلب (Rollback)
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      throw new Error("فشل تسجيل تفاصيل الطلب");
    }

    // 5. النجاح
    return NextResponse.json({
      success: true,
      orderId: order.id,
      totalAmount: totalAmount,
    });
  } catch (error: any) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: error.message || "حدث خطأ في المعالجة" },
      { status: 500 }
    );
  }
}
