"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Metrics {
  revenue: number;
  activities: number;
  discoveryCalls: number;
  closedDeals: number;
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    revenue: 0,
    activities: 0,
    discoveryCalls: 0,
    closedDeals: 0,
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  async function fetchMetrics() {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select("*");

      if (error || !data) {
        console.error(error);
        return;
      }

      const revenue = data.reduce(
        (acc: number, item: any) =>
          acc + Number(item.amount || 0),
        0
      );

      const discoveryCalls = data.filter(
        (item: any) =>
          item.activity === "Discovery Call"
      ).length;

      const closedDeals = data.filter(
        (item: any) =>
          item.activity === "Deal Closed"
      ).length;

      setMetrics({
        revenue,
        activities: data.length,
        discoveryCalls,
        closedDeals,
      });

    } catch (err) {
      console.error(err);
    }
  }

  return metrics;
}