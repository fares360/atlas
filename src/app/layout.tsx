import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google"; // استيراد الخطوط المناسبة
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/auth-provider";
import { CartProvider } from "@/components/providers/cart-provider";

// خط للنصوص العامة والواجهة UI
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-cairo",
  display: "swap",
});

// خط للعناوين والكتب (تراثي)
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "موسوعة الأسرة | الدليل الشامل",
  description: "المرجع الأول للأسرة المسلمة - كتب واستشارات تربوية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${amiri.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <CartProvider>
            {/* 1. Web Header (Sticky) */}
            <Header />

            {/* 2. Main Content (Flexible Height) */}
            <main className="flex-1 w-full">{children}</main>

            {/* 3. Footer */}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
