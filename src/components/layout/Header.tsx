"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, User, Search, BookOpen } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/shared/search-modal";

const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "مكتبتي", href: "/library" },
  { name: "الاستشارات", href: "/consultations" },
  { name: "من نحن", href: "/about" },
];

export default function Header() {
  const { itemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-serif text-primary tracking-wide hidden sm:block">
                موسوعة الأسرة
              </span>
              <span className="text-xl font-bold font-serif text-primary tracking-wide sm:hidden">
                الأطلس
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
            {/* ✅ زر البحث (تم تعديله ليطابق السلة) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-primary transition-colors group"
              aria-label="بحث"
            >
              {/* تكبير الأيقونة قليلاً لتطابق السلة + إضافة تأثير التكبير */}
              <Search className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* زر السلة */}
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

            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors shadow-sm"
            >
              <User className="h-4 w-4" />
              <span>تسجيل الدخول</span>
            </Link>

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
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white bg-primary rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>تسجيل الدخول</span>
              </Link>
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
