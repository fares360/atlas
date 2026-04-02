import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, billingData } = body;

    console.log("🚀 1. بدء عملية الدفع لليوزر:", userId);

    // 1. إنشاء الطلب الرئيسي
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
        total_amount: 0,
        payment_method: "paymob_card",
      })
      .select()
      .single();

    if (orderError) {
      console.error("❌ خطأ أثناء إنشاء الطلب (Orders Table):", orderError);
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // 2. تجهيز وإدخال العناصر (Order Items)
    // نستخدم مصفوفة لمعالجة أي أخطاء في الـ IDs القادمة من السلة
    const orderItems = items.map((item: any) => {
      // التحقق من نوع المنتج وتوجيهه للعمود الصحيح
      const isBook = item.type === "book";

      return {
        order_id: order.id,
        item_type: isBook ? "book" : "consultation",
        book_id: isBook ? item.id : null,
        consultation_id: !isBook ? item.id : null,
        price: 0, // سيتم تحديثه بواسطة تريجر sanitize_item_price
      };
    });

    console.log(
      "📦 محاولة إدخال العناصر:",
      JSON.stringify(orderItems, null, 2)
    );

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      // طباعة تفاصيل الخطأ كاملة لمعرفة أي سطر فشل ولماذا (مثلاً: UUID invalid)
      console.error("❌ تفاصيل خطأ إدخال العناصر (Order_Items Table):", {
        message: itemsError.message,
        details: itemsError.details,
        hint: itemsError.hint,
        code: itemsError.code,
      });

      // حذف الطلب الرئيسي لضمان عدم وجود بيانات معلقة (Rollback)
      await supabaseAdmin.from("orders").delete().eq("id", order.id);

      throw new Error(`Failed to insert order items: ${itemsError.message}`);
    }

    // 3. جلب الإجمالي بعد حسابات التريجرز
    const { data: finalOrder, error: fetchError } = await supabaseAdmin
      .from("orders")
      .select("total_amount")
      .eq("id", order.id)
      .single();

    const realTotalAmount = finalOrder?.total_amount || 0;

    if (realTotalAmount === 0) {
      console.error(
        "⚠️ الإجمالي صفر! قد يكون هناك مشكلة في الـ IDs المرسلة أو أسعار المنتجات في DB."
      );
      throw new Error("Invalid order total (0)");
    }

    console.log(`💰 الإجمالي الحقيقي المحسوب: ${realTotalAmount}`);

    // 4. الربط مع Paymob
    const amountCents = Math.round(Number(realTotalAmount) * 100);

    // Auth Token
    const authResponse = await fetch(
      "https://accept.paymob.com/api/auth/tokens",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: process.env.PAYMOB_API_KEY }),
      }
    );
    const authData = await authResponse.json();

    // Order Registration
    const orderResponse = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: authData.token,
          delivery_needed: "false",
          amount_cents: amountCents.toString(),
          currency: "EGP",
          merchant_order_id: order.id,
          items: [],
        }),
      }
    );
    const paymobOrderData = await orderResponse.json();

    // Payment Key
    const keyResponse = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: authData.token,
          amount_cents: amountCents.toString(),
          expiration: 3600,
          order_id: paymobOrderData.id,
          billing_data: {
            apartment: "NA",
            email: billingData.email,
            floor: "NA",
            first_name: billingData.first_name || "Guest",
            street: "NA",
            building: "NA",
            phone_number: billingData.phone_number,
            shipping_method: "NA",
            postal_code: "NA",
            city: "Cairo",
            country: "EG",
            last_name: billingData.last_name || "User",
            state: "NA",
          },
          currency: "EGP",
          integration_id: process.env.PAYMOB_INTEGRATION_ID,
          redirection_url: "http://localhost:3000/payment/success",
          lock_order_when_paid: "false",
        }),
      }
    );
    const keyData = await keyResponse.json();

    return NextResponse.json({
      paymentUrl: `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${keyData.token}`,
    });
  } catch (error: any) {
    console.error("🔥 خطأ نهائي في الـ API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
