"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useRealtimeActivities() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    fetchActivities();

    const channel = supabase
      .channel("activities-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activities",
        },
        () => {
          fetchActivities();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchActivities() {
    const { data } = await supabase
      .from("activities")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setActivities(data || []);
  }

  return activities;
}