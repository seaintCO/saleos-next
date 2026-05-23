"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    month: "Jan",
    revenue: 12000,
  },
  {
    month: "Feb",
    revenue: 18000,
  },
  {
    month: "Mar",
    revenue: 24000,
  },
  {
    month: "Apr",
    revenue: 32000,
  },
  {
    month: "May",
    revenue: 42000,
  },
];

export default function RevenueChart() {
  return (
    <div className="glass-card rounded-3xl p-7">

      <div className="mb-6">

        <h3 className="text-2xl font-semibold">
          Revenue Analytics
        </h3>

        <p className="text-sm text-zinc-500 mt-1">
          Monthly CRM performance
        </p>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.5}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <XAxis
              dataKey="month"
              stroke="#71717a"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}