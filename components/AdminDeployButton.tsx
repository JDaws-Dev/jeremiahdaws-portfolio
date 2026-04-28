"use client";

import { useState } from "react";

type Result =
  | { ok: true; nothing: boolean; commit?: string; changed?: number; message?: string }
  | { ok: false; error: string };

export function AdminDeployButton() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function deploy() {
    setBusy(true);
    setResult(null);
    try {
      const r = await fetch("/api/admin/deploy", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = (await r.json()) as Result;
      setResult(data);
      // Auto-clear OK status after a few seconds
      if (data.ok) setTimeout(() => setResult(null), 6000);
    } catch (e) {
      setResult({ ok: false, error: e instanceof Error ? e.message : "Deploy failed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={deploy}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-paper shadow-sm shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {busy ? (
          <>
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-paper border-t-transparent" />
            Pushing…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Deploy changes
          </>
        )}
      </button>

      {result?.ok && result.nothing ? (
        <span className="text-xs text-ink-muted dark:text-paper-muted">
          Nothing to push — already in sync.
        </span>
      ) : null}

      {result?.ok && !result.nothing ? (
        <span className="text-xs text-emerald-600 dark:text-emerald-400">
          ✓ Pushed {result.changed} change{result.changed === 1 ? "" : "s"} (
          <code className="font-mono">{result.commit}</code>) — Vercel rebuilding.
        </span>
      ) : null}

      {result && !result.ok ? (
        <span className="text-xs text-red-500">
          ✗ {result.error.slice(0, 200)}
        </span>
      ) : null}
    </div>
  );
}
