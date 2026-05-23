"use client";

import { useRole } from "@/hooks/useRole";

export default function RoleGate({
  allowed,
  children,
}: {
  allowed: string[];
  children: React.ReactNode;
}) {
  const role = useRole();

  if (!allowed.includes(role)) {
    return null;
  }

  return <>{children}</>;
}