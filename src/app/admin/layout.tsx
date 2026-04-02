"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  LogOut,
  Library,
  FileText,
  MessageSquare  
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "لوحة المعلومات", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "إدارة المجلدات والكتب", href: "/admin/books", icon: BookOpen },
  { name: "إدارة الاستشارات", href: "/admin/consultations", icon: Users },
  { name: "إدارة المقالات", href: "/admin/articles", icon: FileText },
  { name: "إدارة المحادثات", href: "/admin/chat", icon: MessageSquare },
  { name: "إدارة الدبلومات", href: "/admin/diplomas", icon: Library },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex" dir="rtl">
      {/* Sidebar - القائمة الجانبية */}
      <aside className="w-64 bg-white border-l border-[#E6E2D3] hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-[#E6E2D3] flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2A5B68] rounded-lg flex items-center justify-center text-white font-bold">
                A
            </div>
            <h1 className="font-bold text-[#3E2723] text-lg">لوحة الإدارة</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`); // تحسين بسيط ليظل الزر نشطاً داخل الصفحات الفرعية
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive 
                    ? "bg-[#2A5B68] text-white shadow-md" 
                    : "text-muted-foreground hover:bg-[#F9F7F0] hover:text-[#3E2723]"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E6E2D3]">
           <Link href="/" className="flex items-center gap-2 text-sm text-red-500 font-bold hover:bg-red-50 p-3 rounded-xl transition-colors">
             <LogOut className="w-4 h-4" />
             عودة للموقع
           </Link>
        </div>
      </aside>

      {/* Main Content - المحتوى المتغير */}
      <main className="flex-1 md:mr-64 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}