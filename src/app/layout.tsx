import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google"; // استيراد الخطوط المناسبة
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
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
        className={`${cairo.variable} ${amiri.variable} font-sans antialiased bg-[#FDFBF7] text-foreground min-h-screen flex flex-col relative`}
      >
        {/* ================= زخرفة الخلفية العامة (ثابتة لكل الموقع) ================= */}

        {/* 1. نمط النقاط (Dots Pattern) */}
        <div className="fixed inset-0 z-[-1] opacity-5 pointer-events-none bg-[radial-gradient(#3E2723_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* 2. الإضاءة العلوية (Light Glow) */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/20 blur-[100px] rounded-full pointer-events-none z-[-1]"></div>

        {/* ========================================================================= */}

        <AuthProvider>
          <CartProvider>
            {/* 1. Web Header (Sticky) */}
            <Header />

            {/* 2. Main Content (Flexible Height) */}
            <main className="flex-1 w-full">{children}</main>

            {/* 3. Footer */}
            <Footer />
            <Toaster richColors position="top-center" />
          </CartProvider>
        </AuthProvider>
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
