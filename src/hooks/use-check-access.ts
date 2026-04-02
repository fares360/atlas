"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useCheckAccess(bookId: string) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function check() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setHasAccess(false);
          return;
        }

        // استدعاء دالة RPC من الداتابيز
        const { data, error } = await supabase.rpc("has_purchased_book", {
          check_book_id: bookId,
        });

        if (!error && data) {
          setHasAccess(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    check();
  }, [bookId, supabase]);

  return { hasAccess, loading };
}
