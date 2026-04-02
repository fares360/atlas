import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Send,
  BookOpen,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";

// 1. أيقونة X (Twitter سابقاً) - Custom SVG
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// 2. أيقونة WhatsApp الطبيعية (الهاتف داخل الفقاعة) - Custom SVG
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  // روابط السوشيال ميديا
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:bg-blue-600 hover:border-blue-600",
    },

    // استخدام أيقونة X الجديدة
    {
      name: "X (Twitter)",
      icon: XIcon,
      href: "#",
      color: "hover:bg-black hover:border-black",
    },

    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:bg-pink-600 hover:border-pink-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "hover:bg-blue-700 hover:border-blue-700",
    },

    {
      name: "Telegram",
      icon: Send,
      href: "#",
      color: "hover:bg-sky-500 hover:border-sky-500",
    },

    // استخدام أيقونة واتساب الطبيعية
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      href: "#",
      color: "hover:bg-[#25D366] hover:border-[#25D366]",
    },
  ];

  // الروابط المهمة
  const importantLinks = [
    { name: "من نحن", href: "/importantLinks/about" },
    { name: "الأهداف", href: "/importantLinks/goals" },
    { name: "سياسة الخصوصية", href: "/importantLinks/privacy" },
    { name: "شروط الاستخدام", href: "/importantLinks/terms" },
    { name: "الأسئلة الشائعة", href: "/importantLinks/faq" },
  ];

  return (
    <footer className="bg-[#EEEBE2] text-[#3E2723] border-t-4 border-[#D4AF37] pt-16 pb-8 relative overflow-hidden">
      {/* زخرفة خلفية خفيفة جداً */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#3E2723_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* العمود الأول: التعريف بالموقع */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#2A5B68] p-2.5 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold font-serif tracking-wide text-[#2A5B68]">
                موسوعة الأسرة
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-sm">
              المرجع الأول للأسرة المسلمة، نقدم محتوى تربوياً وإرشادياً يجمع بين
              أصالة التراث ومستجدات العصر، لبناء جيل واعد ومستقبل مشرق.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-medium">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>القاهرة، جمهورية مصر العربية</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span dir="ltr">info@atlas-family.com</span>
              </div>
            </div>
          </div>

          {/* العمود الثاني: روابط تهمك */}
          <div>
            <h3 className="text-lg font-bold font-serif mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full block"></span>
              روابط تهمك
            </h3>
            <ul className="space-y-4">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#2A5B68] hover:translate-x-[-5px] transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: تابعنا وتواصل معنا */}
          <div>
            <h3 className="text-lg font-bold font-serif mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full block"></span>
              تابعنا على
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              كن على اطلاع دائم بأحدث الإصدارات والمقالات التربوية عبر منصاتنا
              المختلفة.
            </p>

            {/* شبكة الأيقونات */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`
                    w-10 h-10 flex items-center justify-center rounded-full 
                    bg-white border border-[#E6E2D3] text-[#3E2723] shadow-sm
                    transition-all duration-300 hover:text-white hover:scale-110 hover:shadow-md
                    ${social.color}
                  `}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* الفاصل وحقوق النشر */}
        <div className="mt-16 pt-8 border-t border-[#D6D3C9] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} موسوعة الأسرة. جميع الحقوق محفوظة.
          </p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground/70">
            <span>صنع بكل</span>
            <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
            <span>لخدمة الأسرة العربية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
