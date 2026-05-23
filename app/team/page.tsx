export default function TeamPage() {
  return (
    <div className="min-h-screen text-white">

      <div className="mb-10">

        <h1 className="text-4xl font-semibold tracking-tight">
          Team
        </h1>

        <p className="text-zinc-500 mt-2">
          Internal operators, reps, and performance tracking.
        </p>

      </div>

      <div className="glass-card rounded-3xl p-8">

        <h2 className="text-xl font-semibold mb-6">
          Active Operators
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between border border-zinc-800 rounded-2xl p-5">
            <div>
              <p className="font-medium">Luis</p>
              <p className="text-sm text-zinc-500">Founder / Operator</p>
            </div>

            <p className="text-emerald-400 font-semibold">
              Active
            </p>
          </div>

          <div className="flex items-center justify-between border border-zinc-800 rounded-2xl p-5">
            <div>
              <p className="font-medium">Operator 02</p>
              <p className="text-sm text-zinc-500">Sales Representative</p>
            </div>

            <p className="text-blue-400 font-semibold">
              Online
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}