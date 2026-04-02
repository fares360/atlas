"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; 

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 1. رقم الهاتف والرسالة
  const phoneNumber = "201xxxxxxxxx"; 
  const defaultMessage = "السلام عليكم، تفاصيل أكثر عن الخدمات المتاحة؟";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-2 md:bottom-8 md:right-4 z-[9999] flex flex-col items-end group font-sans">
      
      {/* Tooltip: يظهر فقط عند الوقوف عليه بالماوس */}
      <div
        className={cn(
          "absolute bottom-full mb-3 right-0 w-max bg-white text-slate-800 px-3 py-1.5 rounded-lg shadow-md border border-[#D4AF37]/20 text-xs font-bold transition-all duration-300 origin-bottom-right",
          isHovered 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-90 translate-y-2 pointer-events-none"
        )}
      >
        تواصل معنا
        {/* السهم الصغير */}
        <div className="absolute -bottom-1.5 right-3 w-2.5 h-2.5 bg-white border-b border-r border-[#D4AF37]/20 rotate-45"></div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // 2. التعديلات على الحجم والشكل:
        // w-12 h-12: تصغير الحجم للموبايل (48px)
        // md:w-14 md:h-14: حجم متوسط للديسك توب (56px)
        // right-2 / md:right-4: ملاصق لليمين
        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* 3. تأثير هالة خفيفة جداً (اختياري ليعطي حياة للزر دون إزعاج) 
            إذا أردته ثابت تماماً يمكنك حذف هذا السطر
        */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-10 animate-ping duration-[3000ms]"></span>
        
        {/* أيقونة واتساب الرسمية (تم تصغيرها قليلاً لتتناسب مع الزر) */}
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 md:w-8 md:h-8 text-white fill-current relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.64 4.796 1.766 6.815L2.1 28.5l5.855-1.536A13.924 13.924 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.665c-2.28 0-4.436-.673-6.26-1.84l-.448-.287-3.725.977 1.002-3.626-.296-.47A11.626 11.626 0 0 1 4.335 16c0-6.434 5.234-11.665 11.665-11.665 6.434 0 11.665 5.23 11.665 11.665S22.434 27.665 16 27.665zm6.36-8.73c-.35-.175-2.067-1.02-2.387-1.136-.32-.117-.553-.175-.786.175-.233.35-1.02 1.283-1.25 1.545-.234.263-.467.292-.817.117-.35-.175-1.476-.544-2.812-1.735-1.03-.92-1.724-2.055-1.928-2.405-.204-.35-.022-.54.153-.715.158-.158.35-.408.525-.612.175-.204.233-.35.35-.583.117-.233.058-.437-.03-.612-.087-.175-.786-1.894-1.078-2.594-.284-.68-.574-.587-.786-.598-.204-.012-.438-.012-.67-.012-.234 0-.613.088-.934.438-.32.35-1.225 1.196-1.225 2.917 0 1.72 1.254 3.383 1.428 3.617.175.233 2.468 3.768 5.98 5.284 2.333 1.007 2.805.807 3.3.757.495-.05 2.067-.845 2.36-1.66.29-.816.29-1.516.204-1.66-.088-.146-.32-.234-.67-.409z" />
        </svg>

        {/* تم حذف النقطة الحمراء نهائياً */}
      </a>
    </div>
  );
};