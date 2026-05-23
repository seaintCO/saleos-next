"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  Calendar,
  ClipboardCheck,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

type CalendarItem = {
  id: string;
  title: string;
  date: string;
  type: string;
  notes: string;
  status: string;
};

export default function AlmaPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("salesos_calendar_items");

    if (saved) {
      setCalendarItems(JSON.parse(saved));
    }
  }, []);

  const openTasks = useMemo(() => {
    return calendarItems.filter((item) => item.status !== "Done");
  }, [calendarItems]);

  async function askAlma() {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/alma", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          calendarItems,
        }),
      });

      const data = await res.json();

      setResponse(data.result || "No response.");
    } catch (err) {
      setResponse("ALMA failed to respond.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950/70 rounded-full px-4 py-2 text-xs text-zinc-400 mb-5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          ALMA CONNECTED
        </div>

        <h1 className="text-5xl font-semibold tracking-tight">
          ALMA Command Center
        </h1>

        <p className="text-zinc-500 mt-3 max-w-3xl leading-relaxed">
          Autonomous enterprise intelligence for SALESOS. ALMA can analyze your
          calendar, IDS follow-ups, sales execution, offers, and team priorities.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <BrainCircuit className="text-blue-400" size={24} />

              <h2 className="text-2xl font-semibold">
                Ask ALMA
              </h2>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="soft-input min-h-[220px]"
              placeholder="Example: What should we focus on today based on IDS follow-ups and calendar tasks?"
            />

            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={askAlma}
                disabled={loading}
                className="bg-white text-black rounded-xl px-6 py-3 font-semibold hover:bg-zinc-200 transition"
              >
                {loading ? "ALMA Thinking..." : "Run Analysis"}
              </button>

              <div className="text-sm text-zinc-500">
                {openTasks.length} active execution item(s)
              </div>
            </div>
          </div>

          <div className="glass-card p-6 min-h-[420px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="text-purple-400" size={22} />

                <h2 className="text-2xl font-semibold">
                  ALMA Intelligence
                </h2>
              </div>

              <div className="text-xs text-zinc-500">
                LIVE EXECUTION ANALYSIS
              </div>
            </div>

            {response ? (
              <div className="border border-blue-500/20 bg-blue-500/5 rounded-3xl p-6">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
                  <ArrowRight size={15} />
                  Strategic Guidance
                </div>

                <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed text-sm">
                  {response}
                </div>
              </div>
            ) : (
              <div className="border border-white/10 rounded-3xl p-8 bg-black/30 text-zinc-500 text-sm">
                ALMA responses, strategic analysis, execution plans, and
                operational guidance will appear here.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <Calendar className="text-emerald-400" size={22} />

              <h2 className="text-2xl font-semibold">
                Active Calendar / IDS Items
              </h2>
            </div>

            <div className="space-y-3">
              {openTasks.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No open tasks found.
                </p>
              ) : (
                openTasks.slice(0, 8).map((item) => (
                  <div
                    key={item.id}
                    className="border border-white/10 rounded-2xl p-4 bg-black/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">
                          {item.title}
                        </p>

                        <p className="text-xs text-zinc-500 mt-1">
                          {item.type} • {item.status}
                        </p>
                      </div>

                      <p className="text-xs text-zinc-500">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <ClipboardCheck className="text-yellow-400" size={22} />

              <h2 className="text-2xl font-semibold">
                Suggested Commands
              </h2>
            </div>

            <div className="space-y-3">
              {[
                "Summarize IDS follow-ups",
                "What should we focus on today?",
                "Which tasks are blocking progress?",
                "Create a leadership action plan",
                "What should sales reps prioritize?",
                "Analyze our execution gaps",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setPrompt(item)}
                  className="w-full text-left bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-sm hover:bg-black/50 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold">
              ALMA Status
            </h2>

            <div className="space-y-4 mt-5">
              <div className="border border-emerald-500/20 bg-emerald-500/10 rounded-2xl p-4">
                <p className="text-sm text-emerald-400">
                  ALMA Connected
                </p>
              </div>

              <div className="border border-blue-500/20 bg-blue-500/10 rounded-2xl p-4">
                <p className="text-sm text-blue-400">
                  Calendar Synced
                </p>
              </div>

              <div className="border border-purple-500/20 bg-purple-500/10 rounded-2xl p-4">
                <p className="text-sm text-purple-400">
                  IDS Intelligence Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}