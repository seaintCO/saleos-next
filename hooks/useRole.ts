"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useRole() {
  const [role, setRole] = useState("sales_rep");

  useEffect(() => {
    fetchRole();
  }, []);

  async function fetchRole() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (data?.role) {
      setRole(data.role);
    }
  }

  return role;
}