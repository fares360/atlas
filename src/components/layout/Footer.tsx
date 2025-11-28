export default function Footer() {
  return (
    <footer className="bg-[#EEEBE2] border-t border-[#D6D3C9] py-12 mt-auto">
      <div className="container text-center text-muted-foreground text-sm">
        <p className="font-serif text-lg text-primary mb-4">موسوعة الأسرة</p>
        <p>© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
