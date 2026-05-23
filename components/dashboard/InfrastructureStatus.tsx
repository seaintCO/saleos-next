"use client";

export default function InfrastructureStatus() {
  return (
    <div className="glass-card rounded-3xl p-7 mt-8">

      <div className="flex flex-wrap items-center gap-3">

        <div className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-2xl text-sm">
          Supabase Connected
        </div>

        <div className="border border-blue-500/20 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-2xl text-sm">
          Live Database
        </div>

        <div className="border border-purple-500/20 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-2xl text-sm">
          App Router Active
        </div>

        <div className="border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-2xl text-sm">
          AI Layer Pending
        </div>

      </div>

    </div>
  );
}