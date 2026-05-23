export default function CalendarPage() {
  return (
    <div className="min-h-screen text-white">

      <div className="mb-10">

        <h1 className="text-4xl font-semibold tracking-tight">
          Calendar
        </h1>

        <p className="text-zinc-500 mt-2">
          Internal scheduling and task management.
        </p>

      </div>

      <div className="glass-card rounded-3xl p-8">

        <h2 className="text-xl font-semibold mb-6">
          Upcoming Tasks
        </h2>

        <div className="space-y-4">

          <div className="border border-zinc-800 rounded-2xl p-5">
            <p className="font-medium">
              Founders Clube Call
            </p>

            <p className="text-sm text-zinc-500 mt-1">
              Tomorrow — 2:00 PM
            </p>
          </div>

          <div className="border border-zinc-800 rounded-2xl p-5">
            <p className="font-medium">
              CR Masonry Demo
            </p>

            <p className="text-sm text-zinc-500 mt-1">
              Friday — 11:00 AM
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}