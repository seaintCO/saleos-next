"use client";

import { useEffect, useState } from "react";

type Note = {
  id: string;
  text: string;
  rep: string;
  createdAt: string;
};

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");
  const [rep, setRep] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("salesos_rep_notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("salesos_rep_notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      text,
      rep: rep || "Sales Rep",
      createdAt: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);
    setText("");
    setRep("");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen text-white">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950/70 rounded-full px-4 py-2 text-xs text-zinc-400 mb-5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SALESOS MODULE
        </div>

        <h1 className="text-5xl font-semibold tracking-tight">Rep Notes</h1>

        <p className="text-zinc-500 mt-3 max-w-2xl text-sm leading-relaxed">
          Sales rep notes, objections, lead updates, and internal follow-up context.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="glass-card rounded-3xl p-7 xl:col-span-2">
          <h2 className="text-2xl font-semibold">Notes Feed</h2>

          <p className="text-sm text-zinc-500 mt-2">
            Live rep notes saved on this device.
          </p>

          <div className="mt-8 space-y-4">
            {notes.length === 0 ? (
              <div className="border border-zinc-800 rounded-3xl p-6 bg-black/30">
                <p className="text-sm text-zinc-400">Module status</p>
                <h3 className="text-4xl font-semibold mt-3">Ready</h3>
                <p className="text-zinc-500 text-sm mt-3">
                  No notes yet. Add the first rep note from the right side.
                </p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="border border-zinc-800 rounded-3xl p-5 bg-black/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-zinc-400">{note.rep}</p>
                      <p className="text-xs text-zinc-600 mt-1">{note.createdAt}</p>
                    </div>

                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="text-zinc-200 mt-4 text-sm leading-relaxed whitespace-pre-wrap">
                    {note.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-7">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>

          <div className="space-y-4 mt-6">
            <input
              value={rep}
              onChange={(e) => setRep(e.target.value)}
              placeholder="Rep name"
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-white/40"
            />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write note, objection, lead update, or follow-up..."
              rows={6}
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-white/40 resize-none"
            />

            <button
              onClick={addNote}
              className="w-full bg-white text-black rounded-2xl py-3 text-sm font-semibold hover:bg-zinc-200 transition"
            >
              Add Entry
            </button>

            <button
              onClick={() => alert(JSON.stringify(notes, null, 2))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 text-sm font-semibold hover:bg-zinc-900 transition"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
