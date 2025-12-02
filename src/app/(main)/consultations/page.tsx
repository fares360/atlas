"use client";

import { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";
import {
  Users,
  HeartHandshake,
  BrainCircuit,
  CalendarCheck,
  Clock,
  CheckCircle2,
  Star,
  X,
} from "lucide-react";

// بيانات الخدمات
const services = [
  {
    id: "marital",
    title: "استشارات زوجية",
    description: "جلسات خاصة لحل الخلافات الزوجية وتحقيق التوافق الأسري.",
    icon: HeartHandshake,
    price: "450 ج.م",
    duration: "60 دقيقة",
    color: "bg-[#D4AF37]",
    features: ["جلسة سرية تامة", "خطة عمل عملية", "متابعة بعد أسبوع"],
    calendlyUrl: "https://calendly.com/fareshaitham-fh3/30min", // رابط تجريبي
  },
  {
    id: "educational",
    title: "استشارات تربوية",
    description: "توجيه للآباء والأمهات للتعامل مع مشكلات الأبناء.",
    icon: Users,
    price: "400 ج.م",
    duration: "45 دقيقة",
    color: "bg-[#2A5B68]",
    features: ["تحليل سلوك الطفل", "أدوات تربوية مساعدة", "تعديل سلوك"],
    calendlyUrl: "https://calendly.com/fareshaitham-fh3/30min", // رابط تجريبي
  },
  {
    id: "psychological",
    title: "دعم نفسي ومقاييس",
    description: "جلسات للدعم النفسي وتطبيق مقاييس الذكاء والميول.",
    icon: BrainCircuit,
    price: "500 ج.م",
    duration: "60 دقيقة",
    color: "bg-[#3E2723]",
    features: ["تطبيق اختبارات معتمدة", "تقرير تفصيلي", "خطة علاجية"],
    calendlyUrl: "https://calendly.com/fareshaitham-fh3/30min", // رابط تجريبي
  },
];

export default function ConsultationsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  // الحل السحري للإيرور: نقوم بتحويل المكون لـ any لإرضاء TypeScript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CalendlyWidget = InlineWidget as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBooking = (url: string) => {
    setSelectedUrl(url);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 relative">
      {/* --- Custom Professional Modal --- */}
      {mounted && isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-[#3E2723]/60 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-3xl shadow-2xl overflow-hidden border-2 border-[#D4AF37] animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E6E2D3]">
              <div className="flex items-center gap-2">
                <CalendarCheck className="https://calendly.com/fareshaitham-fh3/30min" />
                <span className="font-bold font-serif text-[#3E2723]">
                  حجز موعد استشارة
                </span>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-muted-foreground hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
              {/* استخدمنا المتغير الجديد هنا بدلاً من InlineWidget مباشرة */}
              <CalendlyWidget
                url={selectedUrl}
                styles={{
                  height: "650px",
                  width: "100%",
                  minWidth: "320px",
                }}
                pageSettings={{
                  backgroundColor: "ffffff",
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: "2A5B68",
                  textColor: "3E2723",
                }}
              />
            </div>

            <div className="bg-[#F9F7F0] px-6 py-3 text-center text-xs text-muted-foreground border-t border-[#E6E2D3]">
              جميع المواعيد بتوقيت القاهرة المحلي
            </div>
          </div>
        </div>
      )}

      {/* ... باقي الكود كما هو بدون تغيير ... */}
      {/* تأكد من إبقاء باقي أقسام الصفحة (Hero, Services Grid, How it works) كما هي */}
      <section className="bg-[#3E2723] text-white py-20 relative overflow-hidden">
        {/* ... نفس الكود السابق ... */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            مساحة آمنة.. لمستقبل أسري أفضل
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            نقدم لك استشارات متخصصة على يد نخبة من الخبراء التربويين والنفسيين.
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium text-[#D4AF37]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>خبراء معتمدون</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>سرية تامة</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-xl border border-[#E6E2D3] overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
            >
              <div
                className={`${service.color} p-6 text-white flex justify-between items-start`}
              >
                <service.icon className="w-10 h-10 opacity-90" />
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                  متاح أونلاين
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold font-serif text-[#3E2723] mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[60px]">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-[#5C6B73]"
                    >
                      <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-dashed pt-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="font-bold text-xl text-[#2A5B68]">
                      {service.price}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBooking(service.calendlyUrl)}
                  className="w-full py-3 rounded-lg border-2 border-[#3E2723] text-[#3E2723] font-bold hover:bg-[#3E2723] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-5 h-5" />
                  حجز موعد الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-20 mt-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif text-[#3E2723]">
            كيف تحجز استشارتك؟
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {[
            {
              step: "1",
              title: "اختر نوع الاستشارة",
              desc: "حدد المجال الذي تحتاج فيه للمساعدة",
            },
            {
              step: "2",
              title: "اختر الموعد المناسب",
              desc: "جدول مواعيد مرن يناسب وقتك",
            },
            {
              step: "3",
              title: "أكمل الدفع",
              desc: "دفع آمن عبر البطاقة أو المحفظة",
            },
            {
              step: "4",
              title: "ابدأ الجلسة",
              desc: "رابط مباشر عبر Zoom أو Google Meet",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-[#E6E2D3]"
            >
              <div className="w-10 h-10 bg-[#F9F7F0] rounded-full flex items-center justify-center text-[#2A5B68] font-bold text-xl mx-auto mb-4 border border-[#2A5B68]/20">
                {item.step}
              </div>
              <h3 className="font-bold text-[#3E2723] mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
