"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Activity {
  id: string;
  client: string;
  activity: string;
  amount: number;
  rep: string;
  created_at: string;
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  async function fetchActivities() {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        return;
      }

      setActivities(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    activities,
    loading,
    refreshActivities: fetchActivities,
  };
}