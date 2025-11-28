"use client";

import { createContext, useContext, useEffect, useState } from "react";

// حالياً سنقوم بعمل Context بسيط حتى نربطه بـ Supabase لاحقاً
const AuthContext = createContext({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
