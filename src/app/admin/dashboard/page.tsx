"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Users, ShoppingBag, DollarSign, BookOpen, 
  CheckCircle2, Clock, AlertCircle, ArrowUpRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    totalSales: 0,
    ordersCount: 0,
    usersCount: 0,
    paidOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // 1. جلب عدد المستخدمين
        const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        
        // 2. جلب إجمالي المبيعات والطلبات
        const { data: orders } = await supabase.from('orders').select('total_amount, status');
        
        const paidOrders = orders?.filter(o => o.status === 'paid') || [];
        const totalSales = paidOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

        setStats({
          totalSales,
          ordersCount: orders?.length || 0,
          usersCount: usersCount || 0,
          paidOrders: paidOrders.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    { title: "إجمالي المبيعات", value: `${stats.totalSales} ج.م`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
    { title: "الطلبات المكتملة", value: stats.paidOrders, icon: CheckCircle2, color: "text-[#2A5B68]", bg: "bg-[#2A5B68]/10" },
    { title: "إجمالي الطلبات", value: stats.ordersCount, icon: ShoppingBag, color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10" },
    { title: "المستخدمين", value: stats.usersCount, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-serif text-[#3E2723]">لوحة التحكم</h1>
          <p className="text-muted-foreground mt-1">مرحباً بك في إدارة أكاديمية مودة</p>
        </header>

        {/* كروت الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-[#E6E2D3] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", card.bg)}>
                  <card.icon className={cn("w-6 h-6", card.color)} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              <h3 className="text-2xl font-bold text-[#3E2723] mt-1">{loading ? "..." : card.value}</h3>
            </div>
          ))}
        </div>

        {/* قسم إدارة الكتب (مثال للتحكم في التوفر) */}
        <div className="bg-white rounded-3xl border border-[#E6E2D3] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#E6E2D3] bg-[#F9F7F0]">
            <h2 className="text-xl font-bold font-serif text-[#3E2723]">إدارة المجلدات</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-[#F9F7F0]/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-6 py-4">المجلد</th>
                  <th className="px-6 py-4">السعر</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E2D3]">
                {/* هنا سيتم عمل Map للكتب من الداتابيز */}
                <tr className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="px-6 py-4 font-bold text-sm text-[#3E2723]">الجزء الأول: مقاصد الفكر</td>
                  <td className="px-6 py-4 text-sm">150 ج.م</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">متاح</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#2A5B68] text-xs font-bold hover:underline">تعديل</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}