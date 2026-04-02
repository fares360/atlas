"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  User as UserIcon,
  Search,
  LogOut,
  ChevronDown,
  LayoutDashboard, // ✅ تم استخدام الأيقونة هنا
} from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useAuth } from "@/components/providers/auth-provider"; 
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/shared/search-modal";

const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "مكتبتي", href: "/library" },
  { name: "أطلس", href: "/atlas" },
  { name: "الاستشارات", href: "/consultations" },
  { name: "المشكاة", href: "/mishkat" },
  { name: "من نحن", href: "/importantLinks/about" },
];

export default function Header() {
  const { itemsCount } = useCart();
  const { user, signOut, isAdmin } = useAuth(); // ✅ استدعاء حالة الأدمن
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // الحصول على اسم المستخدم أو أول حرف من الايميل
  const userName = user?.user_metadata?.full_name || "مستخدم";
  const userInitial = user?.email ? user.email[0].toUpperCase() : "U";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full shadow-sm flex items-center justify-center">
                <img
                  src="/images/logo-removebg-preview.png"
                  alt="شعار الأكاديمية"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="text-2xl font-bold font-serif text-primary tracking-wide hidden sm:block">
                أكاديمية مودة لعلوم الأسرة
              </span>
              <span className="text-xl font-bold font-serif text-primary tracking-wide sm:hidden">
                أكاديمية مودة
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary font-bold border-b-2 border-secondary pb-1"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            
            {/* ✅ إضافة: زر الأدمن (يظهر فقط للأدمن) */}
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-200 hover:bg-red-100 transition-all"
                title="لوحة تحكم الإدارة"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>الإدارة</span>
              </Link>
            )}

            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-primary transition-colors group"
              aria-label="بحث"
            >
              <Search className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>

            <Link
              href="/checkout"
              className="text-muted-foreground hover:text-primary transition-colors relative group"
            >
              <div className="relative">
                <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {itemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#D4AF37] text-[#3E2723] text-xs font-bold flex items-center justify-center border-2 border-white animate-in zoom-in">
                    {itemsCount}
                  </span>
                )}
              </div>
            </Link>

            {/* --- منطق المستخدم (Login vs User Menu) --- */}
            {user ? (
              // 1. حالة تسجيل الدخول: عرض القائمة
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E6E2D3] hover:bg-[#F9F7F0] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {userInitial}
                  </div>
                  <span className="text-sm font-medium text-[#3E2723] max-w-[100px] truncate">
                    {userName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {/* القائمة المنسدلة */}
                {isUserMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E6E2D3] py-2 animate-in fade-in zoom-in-95 z-50">
                    <div className="px-4 py-3 border-b border-[#F9F7F0]">
                      <p className="text-sm font-bold text-[#3E2723]">
                        {userName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/library"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#3E2723] hover:bg-[#F9F7F0] transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>الملف الشخصي / مكتبتي</span>
                    </Link>

                    {/* ✅ رابط الأدمن داخل القائمة المنسدلة أيضاً (اختياري) */}
                    {isAdmin && (
                       <Link
                       href="/admin/dashboard"
                       className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                       onClick={() => setIsUserMenuOpen(false)}
                     >
                       <LayoutDashboard className="w-4 h-4" />
                       <span>لوحة التحكم</span>
                     </Link>
                    )}

                    <button
                      onClick={() => {
                        signOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-[#F9F7F0] mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // 2. حالة عدم التسجيل: زر الدخول
              <Link
                href="/auth/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors shadow-sm"
              >
                <UserIcon className="h-4 w-4" />
                <span>تسجيل الدخول</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 space-y-4 shadow-lg animate-in slide-in-from-top-5">
            
            {/* ✅ إضافة: رابط الأدمن في قائمة الموبايل */}
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-base font-bold text-red-600 bg-red-50 p-3 rounded-md border border-red-100 mb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>لوحة التحكم (Admin)</span>
              </Link>
            )}

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 p-2 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 border-t">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-2 mb-2 bg-[#F9F7F0] rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      {userInitial}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#3E2723]">
                        {userName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-600 border border-red-200 rounded-md hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </>
              ) : (
                <Link
                  href="auth/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white bg-primary rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon className="h-4 w-4" />
                  <span>تسجيل الدخول</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}