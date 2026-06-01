"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Note = {
  id: string;
  created_at: string;
  client_id: string | null;
  rep_name: string | null;
  note: string;
  type: string | null;
};

export default function RepNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [repName, setRepName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadNotes() {
    const { data, error } = await supabase
      .from("rep_notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Load error: " + error.message);
      return;
    }

    setNotes(data || []);
  }

  async function addNote() {
    if (!note.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("rep_notes").insert([
      {
        rep_name: repName || "Admin",
        note,
        type: "manual",
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Save error: " + error.message);
      return;
    }

    setRepName("");
    setNote("");
    await loadNotes();
  }

  async function deleteNote(id: string) {
    const { error } = await supabase
      .from("rep_notes")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete error: " + error.message);
      return;
    }

    await loadNotes();
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          SALESOS MODULE
        </div>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          Rep Notes
        </h1>

        <p className="mt-3 text-zinc-500">
          Sales rep notes, objections, lead updates, and internal follow-up context.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-7 lg:col-span-2">
          <h2 className="text-2xl font-bold">Notes Feed</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Live rep notes saved to Supabase.
          </p>

          <div className="mt-8 space-y-4">
            {notes.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-black/40 p-6 text-zinc-500">
                No notes yet.
              </div>
            ) : (
              notes.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-black/40 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">
                        {item.rep_name || "Admin"}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteNote(item.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="mt-5 text-sm text-zinc-200">
                    {item.note}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-7">
          <h2 className="text-2xl font-bold">Quick Actions</h2>

          <div className="mt-8 space-y-4">
            <input
              value={repName}
              onChange={(e) => setRepName(e.target.value)}
              placeholder="Rep name"
              className="w-full rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm outline-none focus:border-white/40"
            />

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write note, objection, lead update, or follow-up..."
              rows={6}
              className="w-full resize-none rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm outline-none focus:border-white/40"
            />

            <button
              onClick={addNote}
              disabled={loading}
              className="w-full rounded-2xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Entry"}
            </button>

            <button
              onClick={loadNotes}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-3 text-sm font-semibold transition hover:bg-zinc-900"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}