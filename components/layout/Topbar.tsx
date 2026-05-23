"use client";

export default function Topbar() {
  return (
    <header className="h-16 border-b border-zinc-800/60 bg-black/40 backdrop-blur-xl sticky top-0 z-10">

      <div className="h-full flex items-center justify-between px-6">

        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Dashboard Overview
          </h1>

          <p className="text-xs text-zinc-500">
            Enterprise Command Center
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-800 transition">
            Export
          </button>

          <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-200 transition">
            Quick Add
          </button>

        </div>

      </div>

    </header>
  );
}