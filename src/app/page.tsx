import TopNavBar from "@/components/layout/TopNavBar";

export default function Home() {
  return (
    <>
      <TopNavBar title="القائمة الرئيسية" />

      {/* محتوى الصفحة - الكارت الكبير */}
      <div className="bg-[#EAE5D8] rounded-[40px] shadow-inner p-6 min-h-[500px] border border-white/40 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-[#3E525E] mb-4">
          أهلاً بك في الدليل الأطلسي
        </h2>
        <p className="text-[#666] mb-8">اختر أحد الأقسام من القائمة أدناه</p>

        {/* سنضيف محتوى الشبكة (Grid) هنا لاحقاً */}
        <div className="w-full h-32 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center opacity-50">
          مساحة لمحتوى القائمة
        </div>
      </div>
    </>
  );
}
