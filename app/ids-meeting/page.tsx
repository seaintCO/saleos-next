"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function IDSMeetingPage() {
  const [issue, setIssue] = useState("");
  const [solution, setSolution] = useState("");
  const [owner, setOwner] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function addIDS(e: React.FormEvent) {
    e.preventDefault();

    if (!issue.trim()) return;

    setLoading(true);

    const { error: idsError } = await supabase.from("ids_items").insert([
      {
        issue,
        solution,
        owner: owner || "Unassigned",
        due_date: date,
        status: "Open",
        priority: "Medium",
      },
    ]);

    if (idsError) {
      setLoading(false);
      alert("IDS save error: " + idsError.message);
      return;
    }

    const { error: calendarError } = await supabase.from("calendar_tasks").insert([
      {
        title: issue,
        date,
        type: "IDS Follow-Up",
        notes: `Owner: ${owner || "Unassigned"}\n\nSolution / Next Step:\n${solution}`,
        status: "Open",
      },
    ]);

    setLoading(false);

    if (calendarError) {
      alert("Calendar save error: " + calendarError.message);
      return;
    }

    setIssue("");
    setSolution("");
    setOwner("");
    setDate(new Date().toISOString().slice(0, 10));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">
          IDS Meeting
        </h1>
        <p className="text-zinc-500 mt-2 max-w-3xl">
          IDS follow-ups now save to Supabase and automatically create calendar tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="glass-card p-6 xl:col-span-2">
          <h2 className="text-2xl font-semibold">Add IDS Follow-Up</h2>

          <form onSubmit={addIDS} className="space-y-4 mt-6">
            <input className="soft-input" placeholder="Issue / Objective" value={issue} onChange={(e) => setIssue(e.target.value)} />
            <textarea className="soft-input min-h-[160px]" placeholder="Solution, decision, or next step..." value={solution} onChange={(e) => setSolution(e.target.value)} />
            <input className="soft-input" placeholder="Owner / Person responsible" value={owner} onChange={(e) => setOwner(e.target.value)} />
            <input className="soft-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <button disabled={loading} className="w-full bg-white text-black rounded-xl py-3 font-semibold hover:bg-zinc-200 transition disabled:opacity-50">
              {loading ? "Saving..." : "Save IDS + Add to Calendar"}
            </button>

            {saved && (
              <p className="text-emerald-400 text-sm">
                Saved to IDS and Calendar.
              </p>
            )}
          </form>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold">ALMA IDS Analysis</h2>
          <div className="mt-5 border border-white/10 rounded-2xl p-5 bg-black/30 text-sm text-zinc-300 leading-relaxed">
            Every IDS item must become a clear owner, deadline, and execution task.
          </div>
        </div>
      </div>
    </div>
  );
}