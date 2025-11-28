import type { Metadata } from "next";
import "./globals.css";
import BottomDock from "@/components/layout/BottomDock";

// يمكنك استبدال هذا الخط بخط "Cairo" أو "Tajawal" من Google Fonts لاحقاً
export const metadata: Metadata = {
  title: "الأطلس التربوي",
  description: "الدليل الأطلسي للتوجيه والإرشاد الأسري",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased min-h-screen relative overflow-hidden bg-[#Fdfbf6]">
        {/* خلفية عامة مزخرفة (اختياري) - يمكن إزالتها إذا كانت موجودة في globals.css */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

        {/* حاوية المحتوى الرئيسية - Main Scrollable Area */}
        {/* قمنا بترك مساحة للشريط العلوي والسفلي */}
        <main className="relative z-10 h-screen overflow-y-auto pb-32 pt-24 px-4 sm:px-6">
          <div className="max-w-md mx-auto h-full">{children}</div>
        </main>

        {/* القائمة السفلية الثابتة */}
        <BottomDock />
      </body>
    </html>
  );
}
