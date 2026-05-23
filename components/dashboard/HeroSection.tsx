"use client";

export default function HeroSection({
  email,
}: {
  email?: string;
}) {
  return (
    <div className="mb-12 flex flex-col 2xl:flex-row 2xl:items-end justify-between gap-8">

      <div>

        <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950/70 rounded-full px-4 py-2 text-xs text-zinc-400 mb-5 backdrop-blur-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SALESOS ENTERPRISE ACTIVE
        </div>

        <h1 className="text-6xl font-semibold tracking-tight text-white">
          SALESOS
        </h1>

        <p className="text-zinc-400 mt-4 max-w-3xl leading-relaxed text-sm">
          Enterprise operating system for SEAINT sales teams,
          CRM intelligence, AI forecasting, and operator analytics.
        </p>

      </div>

      <div className="glass-card rounded-2xl px-5 py-4">

        <p className="text-xs text-zinc-500">
          Logged In As
        </p>

        <p className="text-sm font-medium text-white mt-1">
          {email || "Unknown User"}
        </p>

      </div>

    </div>
  );
}