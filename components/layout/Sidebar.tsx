"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  ShieldCheck,
  Server,
  SlidersHorizontal,
  Sparkles,
  Trophy,
  ClipboardCheck,
  Calendar,
  Tag,
  Phone,
  CircleDollarSign,
  ClipboardList,
  UserPlus,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const sections = [
  {
    title: "OVERVIEW",
    links: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Team / Reps", href: "/team", icon: Users },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Rep Notes", href: "/rep-notes", icon: ShieldCheck },
    ],
  },

  {
    title: "ADMIN",
    links: [
      { label: "Admin Ops", href: "/admin-ops", icon: Server },
      {
        label: "Manual Controls",
        href: "/manual-controls",
        icon: SlidersHorizontal,
      },
      { label: "ALMA Command", href: "/alma", icon: Sparkles },
      {
        label: "Questionnaires",
        href: "/questionnaires",
        icon: ClipboardList,
      },
      { label: "Onboarding", href: "/onboarding", icon: UserPlus },
      { label: "Scorecards", href: "/scorecards", icon: Trophy },
      {
        label: "IDS Meeting",
        href: "/ids-meeting",
        icon: ClipboardCheck,
      },
      {
        label: "Calendar / Tasks",
        href: "/calendar-tasks",
        icon: Calendar,
      },
      {
        label: "Pricing / Offers",
        href: "/pricing-offers",
        icon: Tag,
      },
    ],
  },

  {
    title: "ACTIVITY",
    links: [
      { label: "Call Logs", href: "/call-logs", icon: Phone },
      {
        label: "Deals Closed",
        href: "/deals-closed",
        icon: CircleDollarSign,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  async function logout() {
    localStorage.setItem("salesos_logged_out", "true");

    await supabase.auth.signOut({
      scope: "global",
    });

    sessionStorage.clear();

    setOpen(false);

    window.location.replace("/login");
  }

  const sidebarContent = (
    <>
      <div className="h-[76px] px-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <LayoutDashboard size={18} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            SALESOS
          </h1>

          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Command Center
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-7">
        {sections.map((section) => (
          <div key={section.title} className="mb-7">
            <p className="px-3 mb-3 text-xs tracking-[0.3em] text-zinc-500 uppercase">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.links.map((link) => {
                const Icon = link.icon;

                const active =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 border ${
                      active
                        ? "bg-zinc-900 border-white/10 text-white"
                        : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-950"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`transition ${
                        active
                          ? "text-blue-400"
                          : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    />

                    <span className="text-sm font-medium">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-5 border-t border-white/10">
        <div className="mb-4 rounded-xl border border-white/10 bg-zinc-950 p-4">
          <p className="text-sm font-semibold text-white">
            Admin
          </p>

          <p className="text-xs text-zinc-500 truncate mt-1">
            seaintco@gmail.com
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 hover:bg-zinc-800 transition-all py-3 text-sm font-medium flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-black flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <LayoutDashboard size={18} />
          </div>

          <div>
            <p className="text-white font-bold leading-none">
              SALESOS
            </p>

            <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 mt-1">
              Command Center
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-xl border border-white/10 bg-zinc-900 flex items-center justify-center"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-[285px] bg-black border-r border-white/10 flex-col">
        {sidebarContent}
      </aside>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm">
          <aside className="h-screen w-[85%] max-w-[320px] bg-black border-r border-white/10 flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}