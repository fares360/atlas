import { z } from "zod";

// 1. التعبير النمطي لكلمة المرور القوية
// (حرف صغير، حرف كبير، رقم، رمز خاص، 8 خانات على الأقل)
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

// 2. التعبير النمطي لرقم الهاتف المصري (صيغة دولية)
// يقبل الأرقام التي تبدأ بـ +20 ثم 10/11/12/15 ثم 8 أرقام
const egyptPhoneRegex = /^\+201[0125][0-9]{8}$/;

// --- مخطط تسجيل الدخول ---
export const loginSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z.string().min(1, { message: "يرجى إدخال كلمة المرور" }),
});

// --- مخطط إنشاء الحساب ---
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "الاسم يجب أن يكون 3 حروف على الأقل" }),

    email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),

    phone: z.string().refine((val) => egyptPhoneRegex.test(val), {
      message: "يرجى إدخال رقم مصري صحيح (فودافون، اتصالات، أورانج، وي)",
    }),

    password: z.string().regex(passwordRegex, {
      message:
        "كلمة المرور ضعيفة: يجب أن تحتوي على 8 حروف، حرف كبير، حرف صغير، رقم، ورمز.",
    }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"], // مكان ظهور الخطأ
  });

// استخراج الأنواع (Types) لاستخدامها في المكونات
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
