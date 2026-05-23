"use client";

import { useState } from "react";

type CalendarItem = {
  id: string;
  title: string;
  date: string;
  type: "Goal" | "Objective" | "Task" | "IDS Follow-Up" | "Meeting";
  notes: string;
  status: "Open" | "In Progress" | "Done";
};

export default function IDSMeetingPage() {
  const [issue, setIssue] = useState("");
  const [solution, setSolution] = useState("");
  const [owner, setOwner] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [saved, setSaved] = useState(false);

  function addToCalendar(e: React.FormEvent) {
    e.preventDefault();

    const current = localStorage.getItem("salesos_calendar_items");
    const items: CalendarItem[] = current ? JSON.parse(current) : [];

    const newItem: CalendarItem = {
      id: crypto.randomUUID(),
      title: issue || "IDS Follow-Up",
      date,
      type: "IDS Follow-Up",
      notes: `Owner: ${owner || "Unassigned"}\n\nSolution / Next Step:\n${solution}`,
      status: "Open",
    };

    localStorage.setItem(
      "salesos_calendar_items",
      JSON.stringify([...items, newItem])
    );

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
          Capture issues, decisions, and solutions. Approved follow-ups are
          automatically pushed into Calendar / Tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="glass-card p-6 xl:col-span-2">
          <h2 className="text-2xl font-semibold">
            Add IDS Follow-Up
          </h2>

          <form onSubmit={addToCalendar} className="space-y-4 mt-6">
            <input
              className="soft-input"
              placeholder="Issue / Objective"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />

            <textarea
              className="soft-input min-h-[160px]"
              placeholder="Solution, decision, or next step..."
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />

            <input
              className="soft-input"
              placeholder="Owner / Person responsible"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />

            <input
              className="soft-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button className="w-full bg-white text-black rounded-xl py-3 font-semibold hover:bg-zinc-200 transition">
              Add to Calendar
            </button>

            {saved && (
              <p className="text-emerald-400 text-sm">
                Added to Calendar / Tasks.
              </p>
            )}
          </form>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold">
            ALMA IDS Analysis
          </h2>

          <div className="mt-5 border border-white/10 rounded-2xl p-5 bg-black/30 text-sm text-zinc-300 leading-relaxed">
            ALMA recommends converting every IDS issue into a clear owner,
            deadline, and measurable next step. Do not leave this meeting with
            vague ideas — every decision should become a calendar execution item.
          </div>
        </div>
      </div>
    </div>
  );
}