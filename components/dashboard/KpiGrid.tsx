"use client";

import KpiCard from "./KpiCard";

export default function KpiGrid({
  metrics,
}: {
  metrics: any;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 mb-10">

      <KpiCard
        title="Total Revenue"
        value={`$${metrics.revenue.toLocaleString()}`}
        subtitle="Live CRM revenue"
        color="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
      />

      <KpiCard
        title="Activities"
        value={metrics.activities}
        subtitle="Realtime activity count"
        color="bg-blue-500/10 border-blue-500/20 text-blue-400"
      />

      <KpiCard
        title="Discovery Calls"
        value={metrics.discoveryCalls}
        subtitle="Appointments booked"
        color="bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
      />

      <KpiCard
        title="Deals Closed"
        value={metrics.closedDeals}
        subtitle="Closed opportunities"
        color="bg-purple-500/10 border-purple-500/20 text-purple-400"
      />

    </div>
  );
}