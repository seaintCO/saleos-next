"use client";

export default function TeamIntelligence() {
  return (
    <div className="glass-card rounded-3xl p-7">

      <div className="mb-6">

        <h3 className="text-2xl font-semibold">
          Team Intelligence
        </h3>

        <p className="text-sm text-zinc-500 mt-1">
          AI operator metrics and enterprise analytics
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-black/30 border border-zinc-800 rounded-3xl p-6">

          <p className="text-sm text-zinc-500">
            Active Operators
          </p>

          <h3 className="text-5xl font-semibold mt-4">
            12
          </h3>

        </div>

        <div className="bg-black/30 border border-zinc-800 rounded-3xl p-6">

          <p className="text-sm text-zinc-500">
            AI Calls Today
          </p>

          <h3 className="text-5xl font-semibold mt-4">
            1,482
          </h3>

        </div>

        <div className="bg-black/30 border border-zinc-800 rounded-3xl p-6">

          <p className="text-sm text-zinc-500">
            Forecast Revenue
          </p>

          <h3 className="text-5xl font-semibold mt-4">
            $87k
          </h3>

        </div>

      </div>

    </div>
  );
}