export default function Page() {
  return (
    <div className="min-h-screen text-white">

      <div className="mb-10">

        <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950/70 rounded-full px-4 py-2 text-xs text-zinc-400 mb-5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SALESOS MODULE
        </div>

        <h1 className="text-5xl font-semibold tracking-tight">
          Manual Controls
        </h1>

        <p className="text-zinc-500 mt-3 max-w-2xl text-sm leading-relaxed">
          Admin overrides for dashboard numbers, internal metrics, and temporary CRM inputs.
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="glass-card rounded-3xl p-7 xl:col-span-2">

          <h2 className="text-2xl font-semibold">
            Manual Inputs
          </h2>

          <p className="text-sm text-zinc-500 mt-2">
            This workspace is ready for live Supabase data, forms, tables, and automation.
          </p>

          <div className="mt-8 border border-zinc-800 rounded-3xl p-6 bg-black/30">

            <p className="text-sm text-zinc-400">
              Module status
            </p>

            <h3 className="text-4xl font-semibold mt-3">
              Ready
            </h3>

          </div>

        </div>

        <div className="glass-card rounded-3xl p-7">

          <h2 className="text-2xl font-semibold">
            Quick Actions
          </h2>

          <div className="space-y-3 mt-6">

            <button className="w-full bg-white text-black rounded-2xl py-3 text-sm font-semibold hover:bg-zinc-200 transition">
              Add Entry
            </button>

            <button className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 text-sm font-semibold hover:bg-zinc-900 transition">
              Export
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
