"use client";

import { useEffect, useMemo, useState } from "react";

type CalendarItem = {
  id: string;
  title: string;
  date: string;
  type: "Goal" | "Objective" | "Task" | "IDS Follow-Up" | "Meeting";
  notes: string;
  status: "Open" | "In Progress" | "Done";
};

const storageKey = "salesos_calendar_items";

const starterItems: CalendarItem[] = [
  {
    id: "starter-1",
    title: "Finalize SalesOS MVP",
    date: new Date().toISOString().slice(0, 10),
    type: "Objective",
    notes:
      "Stabilize dashboard, offer builder, calendar, IDS flow, and internal team workflow.",
    status: "In Progress",
  },
];

export default function CalendarTasksPage() {
  const [items, setItems] = useState<CalendarItem[]>(starterItems);

  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().slice(0, 10),
    type: "Task" as CalendarItem["type"],
    notes: "",
    status: "Open" as CalendarItem["status"],
  });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const grouped = useMemo(() => {
    return items.reduce<Record<string, CalendarItem[]>>((acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = [];
      }

      acc[item.date].push(item);

      return acc;
    }, {});
  }, [items]);

  const sortedDates = Object.keys(grouped).sort();

  const almaAnalysis = useMemo(() => {
    const open = items.filter((item) => item.status !== "Done").length;
    const ids = items.filter((item) => item.type === "IDS Follow-Up").length;
    const today = new Date().toISOString().slice(0, 10);
    const todayItems = items.filter((item) => item.date === today).length;
    const done = items.filter((item) => item.status === "Done").length;

    let message =
      "ALMA recommends keeping every task tied to an owner, deadline, and clear outcome.";

    if (open > 0) {
      message = `You have ${open} open execution items. Prioritize IDS follow-ups first, then complete the highest revenue-impacting objectives.`;
    }

    if (todayItems > 0) {
      message = `${message} You also have ${todayItems} item(s) scheduled for today.`;
    }

    return {
      open,
      ids,
      todayItems,
      done,
      message,
    };
  }, [items]);

  function addItem(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        title: form.title,
        date: form.date,
        type: form.type,
        notes: form.notes,
        status: form.status,
      },
    ]);

    setForm({
      title: "",
      date: new Date().toISOString().slice(0, 10),
      type: "Task",
      notes: "",
      status: "Open",
    });
  }

  function updateStatus(id: string, status: CalendarItem["status"]) {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  }

  function deleteItem(id: string) {
    setItems(items.filter((item) => item.id !== id));
  }

  function clearDone() {
    setItems(items.filter((item) => item.status !== "Done"));
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">
          Calendar / Tasks
        </h1>

        <p className="text-zinc-500 mt-2 max-w-3xl">
          Track meetings, goals, objectives, tasks, and IDS follow-ups. Items
          added from IDS Meeting automatically appear here.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  Execution Calendar
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  Daily view of goals, meetings, tasks, and IDS action items.
                </p>
              </div>

              <button
                onClick={clearDone}
                className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-zinc-800 transition"
              >
                Clear Completed
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="border border-white/10 bg-black/30 rounded-2xl p-4">
                <p className="text-xs text-zinc-500">Open</p>
                <p className="text-3xl font-semibold mt-2">
                  {almaAnalysis.open}
                </p>
              </div>

              <div className="border border-white/10 bg-black/30 rounded-2xl p-4">
                <p className="text-xs text-zinc-500">Today</p>
                <p className="text-3xl font-semibold mt-2">
                  {almaAnalysis.todayItems}
                </p>
              </div>

              <div className="border border-white/10 bg-black/30 rounded-2xl p-4">
                <p className="text-xs text-zinc-500">IDS Follow-Ups</p>
                <p className="text-3xl font-semibold mt-2">
                  {almaAnalysis.ids}
                </p>
              </div>

              <div className="border border-white/10 bg-black/30 rounded-2xl p-4">
                <p className="text-xs text-zinc-500">Completed</p>
                <p className="text-3xl font-semibold mt-2">
                  {almaAnalysis.done}
                </p>
              </div>
            </div>

            {sortedDates.length === 0 ? (
              <div className="border border-white/10 rounded-3xl p-8 bg-black/30 text-zinc-500 text-sm">
                No calendar items yet.
              </div>
            ) : (
              <div className="space-y-5">
                {sortedDates.map((date) => (
                  <div
                    key={date}
                    className="border border-white/10 rounded-3xl p-5 bg-black/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-zinc-500">
                        {date}
                      </p>

                      <p className="text-xs text-zinc-600">
                        {grouped[date].length} item(s)
                      </p>
                    </div>

                    <div className="space-y-3">
                      {grouped[date].map((item) => (
                        <div
                          key={item.id}
                          className="border border-white/10 rounded-2xl p-4 bg-zinc-950/70"
                        >
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs uppercase tracking-widest text-blue-400">
                                  {item.type}
                                </span>

                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    item.status === "Done"
                                      ? "bg-emerald-500/10 text-emerald-400"
                                      : item.status === "In Progress"
                                      ? "bg-yellow-500/10 text-yellow-400"
                                      : "bg-zinc-800 text-zinc-400"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </div>

                              <p className="font-semibold mt-2">
                                {item.title}
                              </p>

                              {item.notes && (
                                <p className="text-sm text-zinc-400 mt-3 leading-relaxed whitespace-pre-wrap">
                                  {item.notes}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={item.status}
                                onChange={(e) =>
                                  updateStatus(
                                    item.id,
                                    e.target.value as CalendarItem["status"]
                                  )
                                }
                                className="bg-black border border-white/10 rounded-xl px-3 py-2 text-xs"
                              >
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Done</option>
                              </select>

                              <button
                                onClick={() => deleteItem(item.id)}
                                className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl px-3 py-2 text-xs"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold">
              Add Calendar Item
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Add tasks, goals, objectives, meetings, or manual IDS follow-ups.
            </p>

            <form
              onSubmit={addItem}
              className="space-y-4 mt-6"
            >
              <input
                className="soft-input"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <input
                className="soft-input"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
              />

              <select
                className="soft-input"
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as CalendarItem["type"],
                  })
                }
              >
                <option>Task</option>
                <option>Goal</option>
                <option>Objective</option>
                <option>IDS Follow-Up</option>
                <option>Meeting</option>
              </select>

              <select
                className="soft-input"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as CalendarItem["status"],
                  })
                }
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <textarea
                className="soft-input min-h-[130px]"
                placeholder="Notes, goals, objectives, next steps..."
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: e.target.value,
                  })
                }
              />

              <button className="w-full bg-white text-black rounded-xl py-3 font-semibold hover:bg-zinc-200 transition">
                Add to Calendar
              </button>
            </form>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold">
              ALMA Calendar Analysis
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Execution intelligence based on current tasks.
            </p>

            <div className="mt-5 border border-white/10 rounded-2xl p-5 bg-black/30">
              <p className="text-sm text-zinc-300 leading-relaxed">
                {almaAnalysis.message}
              </p>
            </div>

            <div className="mt-5 border border-blue-500/20 rounded-2xl p-5 bg-blue-500/5">
              <p className="text-sm text-blue-300 font-semibold">
                ALMA Recommendation
              </p>

              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Keep every IDS item tied to a measurable outcome. Anything not
                assigned to a date should not leave the meeting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}