"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      if (pathname === "/login") {
        setAllowed(true);
        setChecking(false);
        return;
      }

      const forcedLogout = localStorage.getItem("salesos_logged_out");

      if (forcedLogout === "true") {
        setAllowed(false);
        setChecking(false);
        router.replace("/login");
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setAllowed(false);
        setChecking(false);
        router.replace("/login");
        return;
      }

      setAllowed(true);
      setChecking(false);
    }

    checkAuth();
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-black text-zinc-500 flex items-center justify-center">
        Checking SALESOS access...
      </div>
    );
  }

  if (!allowed && pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
}