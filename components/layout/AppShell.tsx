"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { supabase } from "@/lib/supabase";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  const isLogin = pathname === "/login";

  useEffect(() => {
    async function check() {
      if (isLogin) {
        setAllowed(true);
        setChecking(false);
        return;
      }

      const forcedLogout = localStorage.getItem("salesos_logged_out");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (forcedLogout === "true" || !session) {
        setAllowed(false);
        setChecking(false);
        window.location.replace("/login");
        return;
      }

      setAllowed(true);
      setChecking(false);
    }

    check();
  }, [pathname, isLogin]);

  if (checking) {
    return (
      <div className="min-h-screen bg-black text-zinc-500 flex items-center justify-center">
        Checking SALESOS access...
      </div>
    );
  }

  if (isLogin) {
    return <>{children}</>;
  }

  if (!allowed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <main className="min-h-screen p-4 pt-24 md:pt-8 md:pl-[317px] md:pr-8">
        {children}
      </main>
    </div>
  );
}