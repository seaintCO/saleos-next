export default function SettingsPage() {
  return (
    <div className="min-h-screen text-white">

      <div className="mb-10">

        <h1 className="text-4xl font-semibold tracking-tight">
          Settings
        </h1>

        <p className="text-zinc-500 mt-2">
          Manage platform preferences and system configuration.
        </p>

      </div>

      <div className="glass-card rounded-3xl p-8">

        <h2 className="text-xl font-semibold mb-6">
          Platform Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Company Name
            </label>

            <input
              className="soft-input"
              placeholder="SEAINT"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Admin Email
            </label>

            <input
              className="soft-input"
              placeholder="admin@seaint.com"
            />
          </div>

        </div>

      </div>

    </div>
  );
}