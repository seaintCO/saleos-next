"use client";

import ActivityFeed from "@/components/crm/ActivityFeed";
import ActivityForm from "@/components/crm/ActivityForm";

export default function RealtimeFeedSection() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">

      <div className="glass-card rounded-3xl p-7 2xl:col-span-2">

        <div className="mb-6">

          <h3 className="text-2xl font-semibold">
            Realtime Activity Feed
          </h3>

          <p className="text-sm text-zinc-500 mt-1">
            Live enterprise CRM activity
          </p>

        </div>

        <ActivityFeed />

      </div>

      <div className="glass-card rounded-3xl p-7">

        <div className="mb-6">

          <h3 className="text-2xl font-semibold">
            Log Activity
          </h3>

          <p className="text-sm text-zinc-500 mt-1">
            Insert live CRM activity
          </p>

        </div>

        <ActivityForm />

      </div>

    </div>
  );
}