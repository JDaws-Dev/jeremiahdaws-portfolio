"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "jedaws@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-paper/20 bg-paper/5 px-4 py-3 text-base text-paper placeholder:text-paper/40 outline-none transition focus:border-accent focus:bg-paper/10";

export function ContactForm({
  topic,
  placeholder = "What are you working on?",
  submitLabel = "Send message",
}: {
  topic: string;
  placeholder?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic, page: window.location.pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Couldn't send right now");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send right now");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-paper/20 bg-paper/5 p-6">
        <p className="font-serif text-2xl text-paper">Thanks, it&rsquo;s on its way.</p>
        <p className="mt-2 text-sm text-paper/70">
          I read everything myself and usually reply within a day or two.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-paper/80 underline decoration-paper/30 underline-offset-4 transition hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" noValidate={false}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-paper/75">Name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-paper/75">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-paper/75">Message</span>
        <textarea name="message" required rows={4} placeholder={placeholder} className={field} />
      </label>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-paper shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-accent-muted disabled:translate-y-0 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : submitLabel}
          <span aria-hidden="true">→</span>
        </button>
        {status === "error" ? (
          <p className="text-sm text-paper/80" role="alert">
            {error}. You can also email me at{" "}
            <a href={`mailto:${EMAIL}`} className="font-medium text-paper underline underline-offset-4">
              {EMAIL}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
