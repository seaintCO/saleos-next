export default function AnalyticsPage() {
  return (
    <div className="min-h-screen text-white">

      <div className="mb-10">

        <h1 className="text-4xl font-semibold tracking-tight">
          Analytics
        </h1>

        <p className="text-zinc-500 mt-2">
          Revenue intelligence and CRM performance metrics.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="glass-card rounded-3xl p-6">

          <p className="text-sm text-zinc-500">
            Close Rate
          </p>

          <h3 className="text-5xl font-semibold mt-5">
            28%
          </h3>

        </div>

        <div className="glass-card rounded-3xl p-6">

          <p className="text-sm text-zinc-500">
            Average Deal
          </p>

          <h3 className="text-5xl font-semibold mt-5">
            $4.8k
          </h3>

        </div>

        <div className="glass-card rounded-3xl p-6">

          <p className="text-sm text-zinc-500">
            Forecast Revenue
          </p>

          <h3 className="text-5xl font-semibold mt-5">
            $87k
          </h3>

        </div>

      </div>

    </div>
  );
}