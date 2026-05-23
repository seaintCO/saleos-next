"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    localStorage.removeItem("salesos_logged_out");

    router.push("/dashboard");

    router.refresh();

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-zinc-950 rounded-3xl p-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">
            SALESOS
          </p>

          <h1 className="text-4xl font-semibold text-white">
            Welcome Back
          </h1>

          <p className="text-zinc-500 mt-3">
            Sign into your enterprise operating system.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-black border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="admin@company.com"
              required
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-black border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white text-black py-3 font-semibold hover:opacity-90 transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}