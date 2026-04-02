export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen w-full bg-[#FDFBF7] flex items-center justify-center p-4 md:p-8"
      dir="rtl"
    >
      {/* زخرفة خلفية خفيفة جداً */}
      <div className="fixed inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#D4AF37_0.5px,transparent_0.5px)] [background-size:24px_24px]"></div>

      <div className="w-full max-w-md relative z-10">{children}</div>
    </div>
  );
}
