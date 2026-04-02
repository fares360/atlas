'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, CheckCircle2, Globe, MapPin, MessageCircle, ScrollText, BrainCircuit } from 'lucide-react';

export default function TalentDiscoveryPage() {
  
  // !!! هام: قم بتغيير رقم الهاتف هنا لرقم الواتساب الخاص بالمركز !!!
  const whatsappNumber = "201000000000"; 

  return (
    <main className="min-h-screen bg-[#EEEBE2] text-[#3E2723] font-sans overflow-x-hidden">
      
      {/* ================= 1. مقدمة الصفحة ================= */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-12">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#2A5B68]">
               اكتشاف ورعاية <span className="text-[#D4AF37]">الموهوبين</span>
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-8">
              صمم برنامج قياس الذكاءات وإرشاد الموهوبين
              من أجل اكتشاف الموهوبين في المجالات المتنوعة
              ومن ثم ؛ إرشاد ورعاية هؤلاء الموهوبين نفسيا ومهاريا .
              وذلك من خلال توجيه هذه القدرات والمواهب توجيها صحيحا ؛ متمثلا في:
              ( التعريف الأمثل بالمسار المهني، والرؤية العالمية للموهوب)
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= 1.5 القسم الجديد (المرجعية العلمية) ================= */}
      <section className="pb-16 relative">
        <div className="container mx-auto px-4 relative z-10">
            
            {/* العنوان الجديد */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-[#2A5B68] mb-4">المرجعية العلمية للبرنامج</h2>
                <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                
                {/* الكارت الأخضر (التركواز) */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow border-r-8 border-[#2A5B68] flex items-start gap-4"
                >
                    <div className="bg-[#2A5B68]/10 p-3 rounded-full shrink-0">
                        <ScrollText className="w-8 h-8 text-[#2A5B68]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-[#2A5B68] mb-2">ابن سينا</h3>
                        <p className="text-[#3E2723] leading-relaxed font-medium">
                            خريطة ابن سينا التربوية في تنشئة وارشاد الموهوبين، والذي -قام بصياغة تلك المنهجية الفريدة في رسالته 980 - 1037 م 
                        </p>
                    </div>
                </motion.div>

                {/* الكارت البرتقالي (الذهبي) */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow border-r-8 border-[#D4AF37] flex items-start gap-4"
                >
                    <div className="bg-[#D4AF37]/10 p-3 rounded-full shrink-0">
                        <BrainCircuit className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-[#D4AF37] mb-2">Howard Gardner</h3>
                        <p className="text-[#3E2723] leading-relaxed font-medium">
                            نظرية الذكاءات المتعددة لـ (Howard Gardner) والذي صاغ نظريته في كتاب أطر العقل عام 1983 م 
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
      </section>

      {/* ================= 2. قسم خريطة الموهوب ================= */}
      <section className="py-8 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            
            {/* النص */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 pt-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                   <Quote className="w-5 h-5 text-[#3E2723]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2A5B68]">فلسفة الخريطة</h2>
              </div>

              <div className="prose prose-lg text-[#3E2723] leading-8 text-justify max-w-none">
                <p className="mb-4">
                  تقوم فكرة <span className="font-bold text-[#2A5B68]">خريطة الموهوب</span> على إعطاء المربي صورة واضحة حول أبنائه؛ 
                  بحيث تساعده هذه الصورة على فهم شخصياتهم وطرق التعامل معهم بشكل أفضل.
                </p>
                <p className="mb-6">
                  هذا الفهم العميق يسهم في تطوير الشخصية والنهوض بها؛ نحو وضع نفسي وذاتي وعالمي أفضل بإذن الله.
                </p>
                <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#2A5B68]" />
                        <span className="font-medium">تحليل دقيق للشخصية والميول.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#2A5B68]" />
                        <span className="font-medium">إرشادات عملية للتعامل مع الموهوب.</span>
                    </div>
                </div>
                <p className="text-base font-bold text-[#3E2723] border-r-4 border-[#D4AF37] pr-4">
                  كما توجد اختبارات متخصصة للراشدين لاختيار أو تغيير المهن والمسارات الحياتية.
                </p>
              </div>
            </motion.div>

            {/* الصورة */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#2A5B68] opacity-20 blur-[60px] -z-10 rounded-full" />
              <div className="relative w-full h-auto bg-[#EEEBE2] rounded-[2.5rem] overflow-hidden isolation-auto">
                  <Image 
                    src="/images/talent-map.png" 
                    alt="خريطة الموهوب"
                    width={1000}
                    height={1400}
                    className="w-full h-auto mix-blend-darken relative z-10" 
                  />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= 3. قسم الفيديوهات ================= */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#2A5B68] mb-4">مرئيات البرنامج</h2>
                <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* الكارت الأول */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-lg border border-[#D4AF37]/10 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-[#3E2723] mb-4 border-r-4 border-[#2A5B68] pr-3">
                            حلقة بعنوان (مستقبل أولادنا)
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            تتناول الحلقة شرح لخريطة ابن سينا ، مع توضيح الطريقة الاختبار، وأثر الاختبار على مستقبل الأبناء من ناحية التعليم والمهن والضبط التربوي.
                        </p>
                    </div>
                    <div className="mt-auto w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-black relative">
                        <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/VIDEO_ID_1" 
                            title="Video 1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </motion.div>

                {/* الكارت الثاني */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-lg border border-[#D4AF37]/10 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-[#3E2723] mb-4 border-r-4 border-[#2A5B68] pr-3">
                            نموذج لنتيجة اختبار الذكاءات
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            يشمل النموذج تخطيط بياني بالذكاءات، مع التعريف بها ، وخريطة كاملة للموهوب؛ تشمل الفرص المهنية وطرق التحصيل الدراسي والضبط التربوي
                        </p>
                    </div>
                    <div className="mt-auto w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-black relative">
                        <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/VIDEO_ID_2" 
                            title="Video 2"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* ================= 4. قسم الحجز ================= */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2A5B68] opacity-5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A5B68]">
              ابدأ رحلة اكتشاف الموهبة الآن
            </h2>
            <p className="text-[#3E2723]/80 text-lg max-w-2xl mx-auto">
              اختر الطريقة الأنسب لك ولأسرتك، ونحن مستعدون لتقديم أفضل خدمة استشارية لتنمية مهاراتكم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* === خيار الحجز الأونلاين === */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] p-8 text-center border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 shadow-xl"
            >
              <div className="w-20 h-20 bg-[#2A5B68]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#2A5B68]">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#3E2723] mb-3">حجز أونلاين</h3>
              <p className="text-muted-foreground mb-8 min-h-[3rem]">
                جلسات استشارية تفاعلية عبر الإنترنت (Zoom) من أي مكان في العالم.
              </p>
              
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحباً، أرغب في حجز موعد لاختبار كشف الموهوبين (أونلاين).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#b89628] text-white py-4 px-6 rounded-xl font-bold text-lg transition-colors w-full group"
              >
                <MessageCircle className="w-5 h-5" />
                احجز موعدك الآن
              </a>
            </motion.div>

            {/* === خيار الحضور المباشر === */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] p-8 text-center border border-[#2A5B68]/20 hover:border-[#2A5B68] transition-all duration-300 shadow-xl"
            >
              <div className="w-20 h-20 bg-[#2A5B68]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#2A5B68]">
                <MapPin className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#3E2723] mb-3">حضور مباشر</h3>
              <p className="text-muted-foreground mb-8 min-h-[3rem]">
                تشرفنا زيارتكم في مقر المركز لإجراء الاختبارات والجلسات وجهاً لوجه.
              </p>
              
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحباً، أرغب في حجز موعد لاختبار كشف الموهوبين (حضور مباشر بالمقر).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#2A5B68] hover:bg-[#1f444e] text-white py-4 px-6 rounded-xl font-bold text-lg transition-colors w-full"
              >
                 <MessageCircle className="w-5 h-5" />
                احجز موعدك الآن
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      <div className="h-12 bg-[#2A5B68]/10"></div> 
    </main>
  );
}