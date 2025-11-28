"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, User, Search, BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "مكتبتي", href: "/library" },
  { name: "الاستشارات", href: "/consultations" },
  { name: "من نحن", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-serif text-primary tracking-wide">
              موسوعة الأسرة
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Actions (Search, Cart, User) */}
        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/checkout"
            className="text-muted-foreground hover:text-primary transition-colors relative"
          >
            <ShoppingBag className="h-5 w-5" />
            {/* Cart Badge example */}
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-secondary"></span>
          </Link>

          <Link
            href="/login"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors shadow-sm"
          >
            <User className="h-4 w-4" />
            <span>تسجيل الدخول</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
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
  );
}
