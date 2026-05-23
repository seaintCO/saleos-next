"use client";

import { useActivities } from "@/hooks/useActivities";

export default function ActivityFeed() {
  const { activities, loading } = useActivities();

  if (loading) {
    return (
      <div className="text-zinc-500 text-sm">
        Loading activity feed...
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="border border-zinc-800 rounded-3xl p-8 bg-black/30 text-zinc-500 text-sm">
        No activity logged yet. Add your first CRM activity on the right.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left min-w-[700px]">

        <thead>
          <tr className="border-b border-zinc-800/70">
            <th className="px-3 py-4 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Client
            </th>

            <th className="px-3 py-4 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Activity
            </th>

            <th className="px-3 py-4 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Amount
            </th>

            <th className="px-3 py-4 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Rep
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800/40">
          {activities.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-white/[0.02] transition"
            >
              <td className="px-3 py-5 font-medium text-white">
                {item.client || "Unknown Client"}
              </td>

              <td className="px-3 py-5 text-zinc-300">
                {item.activity || "Activity"}
              </td>

              <td className="px-3 py-5 text-emerald-400 font-medium">
                ${Number(item.amount || 0).toLocaleString()}
              </td>

              <td className="px-3 py-5 text-zinc-500">
                {item.rep || "Unassigned"}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}