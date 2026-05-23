"use client";

export default function AiInsights() {
  return (
    <div className="glass-card rounded-3xl p-7">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h3 className="text-2xl font-semibold">
            ALMA Intelligence
          </h3>

          <p className="text-sm text-zinc-500 mt-1">
            AI-powered CRM forecasting
          </p>

        </div>

        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />

      </div>

      <div className="space-y-5">

        <div className="border border-zinc-800 rounded-2xl p-5 bg-black/20">

          <p className="text-sm text-zinc-500">
            Forecast Insight
          </p>

          <p className="text-sm text-white mt-2 leading-relaxed">
            Discovery calls increased 18% this week.
            Estimated close probability is trending upward.
          </p>

        </div>

        <div className="border border-zinc-800 rounded-2xl p-5 bg-black/20">

          <p className="text-sm text-zinc-500">
            Operator Intelligence
          </p>

          <p className="text-sm text-white mt-2 leading-relaxed">
            Luis currently has the highest revenue conversion rate
            across all active operators.
          </p>

        </div>

        <div className="border border-zinc-800 rounded-2xl p-5 bg-black/20">

          <p className="text-sm text-zinc-500">
            Revenue Projection
          </p>

          <p className="text-sm text-white mt-2 leading-relaxed">
            Forecasted monthly revenue projection:
            $127,000 based on current CRM activity velocity.
          </p>

        </div>

      </div>

    </div>
  );
}