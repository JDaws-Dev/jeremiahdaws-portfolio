"use client";

import { useState } from "react";

export default function JarvisGate() {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/jarvis-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.status === 401) {
        setError("Wrong password.");
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setError(`Gate error (HTTP ${res.status}).`);
        setSubmitting(false);
        return;
      }
      // Reload — server-rendered page will pick up the gate cookie
      // and render JarvisVoiceButton instead of this form.
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col items-stretch gap-3"
    >
      <label htmlFor="jarvis-password" className="sr-only">
        Password
      </label>
      <input
        id="jarvis-password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="rounded-md border border-ink/20 bg-paper px-4 py-3 text-base text-ink shadow-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink dark:bg-ink/40 dark:text-paper"
      />
      <button
        type="submit"
        disabled={submitting || !password}
        className="rounded-md bg-ink px-4 py-3 text-sm font-medium tracking-tight text-paper shadow-sm transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Checking…" : "Enter"}
      </button>
      {error && (
        <p className="text-center text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}
