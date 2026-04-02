import { createClient } from "@/lib/supabase/server";
import { updateConsultation } from "../actions";
import { Save, Clock, AlignRight, ListChecks, AlertCircle } from "lucide-react";

export default async function AdminConsultationsPage() {
  const supabase = await createClient();
  
  const { data: consultations } = await supabase
    .from("consultation_types")
    .select("*")
    .order("price", { ascending: true });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-serif text-[#3E2723]">أنواع الاستشارات</h1>
        <p className="text-muted-foreground">تعديل الأسعار، الوصف، والمميزات</p>
      </header>

      {(!consultations || consultations.length === 0) ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-dashed border-[#E6E2D3] text-center">
          <AlertCircle className="w-8 h-8 text-[#D4AF37] mb-2" />
          <h3 className="text-xl font-bold text-[#3E2723]">لا توجد بيانات</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {consultations.map((cons) => {
            // استخراج البيانات من الميتاداتا
            // @ts-ignore
            const description = cons.metadata?.description || "";
            // @ts-ignore
            const features = cons.metadata?.features || [];
            // تحويل المصفوفة لنص عشان يظهر في الـ textarea (كل عنصر في سطر)
            const featuresString = Array.isArray(features) ? features.join("\n") : "";

            return (
              <form key={cons.id} action={updateConsultation.bind(null, cons.id)} className="bg-white p-6 rounded-3xl border border-[#E6E2D3] shadow-sm hover:shadow-md transition-all">
                
                {/* العنوان */}
                <div className="mb-4">
                    <label className="text-xs font-bold text-muted-foreground block mb-1">عنوان الخدمة</label>
                    <input 
                      type="text" 
                      name="title" 
                      defaultValue={cons.title} 
                      className="w-full p-2 border-b-2 border-[#E6E2D3] focus:border-[#2A5B68] bg-transparent font-bold text-lg text-[#3E2723] outline-none"
                    />
                </div>

                {/* السعر والمدة */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground block mb-1">السعر (ج.م)</label>
                        <input 
                            type="number" 
                            name="price" 
                            defaultValue={cons.price} 
                            className="w-full p-3 bg-[#F9F7F0] rounded-xl font-bold text-[#2A5B68]"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-muted-foreground block mb-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> المدة
                        </label>
                        <input 
                            type="text" 
                            name="duration" 
                            defaultValue={cons.duration || ""} 
                            className="w-full p-3 bg-[#F9F7F0] rounded-xl text-sm"
                        />
                    </div>
                </div>

                {/* الوصف */}
                <div className="mb-4">
                    <label className="text-xs font-bold text-muted-foreground block mb-1 flex items-center gap-1">
                        <AlignRight className="w-3 h-3" /> الوصف التعريفي
                    </label>
                    <textarea 
                        name="description" 
                        defaultValue={description}
                        rows={3}
                        className="w-full p-3 border rounded-xl text-sm text-gray-700 focus:ring-2 ring-[#2A5B68] outline-none resize-none"
                        placeholder="اكتب وصفاً مختصراً يظهر تحت العنوان..."
                    />
                </div>

                {/* المميزات (Features) */}
                <div className="mb-6">
                    <label className="text-xs font-bold text-muted-foreground block mb-1 flex items-center gap-1">
                        <ListChecks className="w-3 h-3" /> المميزات (كل ميزة في سطر)
                    </label>
                    <textarea 
                        name="features" 
                        defaultValue={featuresString}
                        rows={4}
                        className="w-full p-3 border rounded-xl text-sm text-gray-700 focus:ring-2 ring-[#2A5B68] outline-none resize-none bg-[#F9F7F0]/50"
                        placeholder="سرية تامة&#10;خطة عمل&#10;متابعة دورية"
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full py-3 bg-[#3E2723] text-white rounded-xl hover:bg-black transition-colors font-bold flex items-center justify-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    حفظ التحديثات
                </button>
              </form>
            );
          })}
        </div>
      )}
    </div>
  );
}