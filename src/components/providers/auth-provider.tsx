"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // دالة مساعدة للتحقق من صلاحية الأدمن
    const checkAdminStatus = async (userId: string) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", userId)
        .single();
      
      setIsAdmin(profile?.is_admin || false);
    };

    // 1. جلب المستخدم عند تحميل الصفحة أول مرة
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        await checkAdminStatus(user.id);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    };

    getUser();

    // 2. الاستماع لتغييرات حالة الدخول (تسجيل دخول، خروج، جوجل، الخ)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      
      // ✅ تعديل جوهري: التحقق من الأدمن مرة أخرى عند تغير الجلسة
      if (session?.user) {
        await checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
      router.refresh(); 
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  // دالة تسجيل الخروج
  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false); // ✅ تصفير حالة الأدمن عند الخروج
    router.refresh();
  };

  return (
    // ✅ تعديل جوهري: تمرير isAdmin هنا لتتمكن باقي الصفحات من قراءته
    <AuthContext.Provider value={{ user, isAdmin, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);