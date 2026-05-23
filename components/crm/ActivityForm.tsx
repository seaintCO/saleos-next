"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ActivityForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    client: "",
    activity: "Discovery Call",
    amount: "",
    rep: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase
        .from("activities")
        .insert([
          {
            client: formData.client,
            activity: formData.activity,
            amount: Number(formData.amount),
            rep: formData.rep,
          },
        ]);

      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      setFormData({
        client: "",
        activity: "Discovery Call",
        amount: "",
        rep: "",
      });

      onSuccess?.();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <select
        className="soft-input"
        value={formData.activity}
        onChange={(e) =>
          setFormData({
            ...formData,
            activity: e.target.value,
          })
        }
      >
        <option>Discovery Call</option>
        <option>Deal Closed</option>
        <option>Follow-up</option>
        <option>Appointment Set</option>
      </select>

      <input
        placeholder="Business / Client"
        className="soft-input"
        value={formData.client}
        onChange={(e) =>
          setFormData({
            ...formData,
            client: e.target.value,
          })
        }
      />

      <input
        placeholder="Deal Value"
        className="soft-input"
        value={formData.amount}
        onChange={(e) =>
          setFormData({
            ...formData,
            amount: e.target.value,
          })
        }
      />

      <input
        placeholder="Sales Rep"
        className="soft-input"
        value={formData.rep}
        onChange={(e) =>
          setFormData({
            ...formData,
            rep: e.target.value,
          })
        }
      />

      <button
        disabled={loading}
        className="w-full bg-white text-black py-3 rounded-2xl font-semibold hover:bg-zinc-200 transition"
      >
        {loading
          ? "Saving..."
          : "Save Activity"}
      </button>

    </form>
  );
}