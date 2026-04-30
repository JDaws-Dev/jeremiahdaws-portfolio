"use client";

/**
 * Voice button for JARVIS, hosted at jeremiahdaws.com/jarvis.
 *
 * Ported from Projects/ConsultingBusiness/web/app/components/VapiDemoButton.tsx
 * with three changes:
 *   1. The web call is created server-side at /api/jarvis-vapi (which gates
 *      on a JARVIS_VOICE_GATE cookie set by /api/jarvis-auth). Anonymous
 *      visitors can't make Vapi calls on Jeremiah's account.
 *   2. Uses vapi.reconnect(webCallUrl) instead of vapi.start(assistantId) so
 *      the SDK doesn't try to authenticate from the browser.
 *   3. UI matches the cream/serif/ink aesthetic of jeremiahdaws.com.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

type CallState = "idle" | "connecting" | "live" | "ended" | "error" | "unauthorized";

function extractErrorDetail(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "object" && e !== null) {
    const obj = e as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;
    if (typeof obj.error === "string") return obj.error;
    if (typeof obj.error === "object" && obj.error !== null) {
      const inner = obj.error as Record<string, unknown>;
      if (typeof inner.message === "string") return inner.message;
      if (typeof inner.statusCode === "number")
        return `HTTP ${inner.statusCode}: ${inner.message ?? "unknown error"}`;
    }
    try {
      return JSON.stringify(e);
    } catch {
      /* fall through */
    }
  }
  return String(e);
}

function friendlyError(detail: string): string {
  if (/mic|permission|not allowed|denied/i.test(detail))
    return "Microphone access blocked. Allow it in the address bar and try again.";
  if (/401|unauthorized/i.test(detail))
    return "Session expired. Refresh the page and re-enter the password.";
  if (/quota|billing/i.test(detail))
    return "Vapi quota or billing issue, sir.";
  if (/network|fetch|timeout/i.test(detail))
    return "Network hiccup. Try again.";
  return "Something went sideways starting the call. Try again.";
}

export default function JarvisVoiceButton() {
  const [state, setState] = useState<CallState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const callActiveRef = useRef(false);

  // The public key is only needed for SDK construction; the server-side
  // /api/jarvis-vapi handles the authenticated /call/web request and
  // returns a webCallUrl that vapi.reconnect() can use without auth.
  const publicKey = (process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "").trim();

  useEffect(() => {
    return () => {
      try {
        vapiRef.current?.stop();
      } catch {
        /* unmount */
      }
    };
  }, []);

  const ensureVapi = useCallback((): Vapi | null => {
    if (!publicKey) return null;
    if (!vapiRef.current) {
      const v = new Vapi(publicKey);
      v.on("call-start", () => {
        callActiveRef.current = true;
        setState("live");
        setMessage(null);
      });
      v.on("call-end", () => {
        callActiveRef.current = false;
        setState("ended");
        setMessage(null);
      });
      v.on("error", (e: unknown) => {
        if (!callActiveRef.current) return;
        callActiveRef.current = false;
        const detail = extractErrorDetail(e);
        if (process.env.NODE_ENV === "development") {
          console.warn("[JarvisVoiceButton] call error:", detail);
        }
        setState("error");
        setMessage(friendlyError(detail));
      });
      vapiRef.current = v;
    }
    return vapiRef.current;
  }, [publicKey]);

  async function handleClick() {
    if (state === "live" || state === "connecting") {
      try {
        vapiRef.current?.stop();
      } catch {
        /* best-effort */
      }
      callActiveRef.current = false;
      setState("ended");
      return;
    }

    const v = ensureVapi();
    if (!v) {
      setState("error");
      setMessage("Voice not configured. NEXT_PUBLIC_VAPI_PUBLIC_KEY missing.");
      return;
    }

    try {
      setState("connecting");
      setMessage(null);

      // Server-side: validate cookie, create web call, return webCallUrl.
      const res = await fetch("/api/jarvis-vapi", { method: "POST" });
      if (!res.ok) {
        // Distinguish gate-level 401 (cookie missing/expired) from
        // upstream errors (Vapi key wrong, env missing, etc.). The server
        // gate returns {error:"unauthorized"} for cookie failures.
        const body = await res.json().catch(() => ({}) as Record<string, unknown>);
        const detail =
          typeof body.detail === "string" ? body.detail : undefined;
        const errMsg =
          typeof body.error === "string" ? body.error : `HTTP ${res.status}`;
        if (res.status === 401 && errMsg === "unauthorized") {
          // Real cookie/gate failure — only this path means "refresh."
          setState("unauthorized");
          setMessage("Session expired. Refresh and re-enter the password.");
          return;
        }
        if (res.status === 503) {
          setState("error");
          setMessage(
            "Voice not configured on the server. Vercel env vars missing.",
          );
          return;
        }
        // Anything else: surface the actual error so debugging is possible.
        throw new Error(detail ? `${errMsg} — ${detail}` : errMsg);
      }
      const data: { webCallUrl?: string; id?: string } = await res.json();
      if (!data.webCallUrl) {
        throw new Error("Server returned no webCallUrl.");
      }

      callActiveRef.current = true;
      // reconnect() takes a WebCall object; sidesteps the SDK's start()
      // auth path so we don't need a public key on the client.
      await v.reconnect({ webCallUrl: data.webCallUrl, id: data.id });
    } catch (e: unknown) {
      callActiveRef.current = false;
      const detail = extractErrorDetail(e);
      if (process.env.NODE_ENV === "development") {
        console.warn("[JarvisVoiceButton] start failed:", detail);
      }
      setState("error");
      setMessage(friendlyError(detail));
    }
  }

  const label = (() => {
    switch (state) {
      case "connecting":
        return "Connecting — allow mic…";
      case "live":
        return "Live — speak now (tap to hang up)";
      case "ended":
        return "Tap to call again";
      case "unauthorized":
        return "Refresh to re-authenticate";
      case "error":
      case "idle":
      default:
        return "Tap to talk to JARVIS";
    }
  })();

  const isLive = state === "live";
  const isConnecting = state === "connecting";

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={state === "unauthorized"}
        className={[
          "group relative inline-flex items-center justify-center gap-3 rounded-full",
          "px-10 py-6 text-lg font-medium tracking-tight transition-all duration-200",
          "shadow-md hover:shadow-xl active:scale-[0.98]",
          "border",
          isLive
            ? "bg-emerald-600 text-white border-emerald-700"
            : isConnecting
              ? "bg-ink/80 text-paper border-ink"
              : state === "ended"
                ? "bg-paper text-ink/70 border-ink/20 hover:bg-ink hover:text-paper"
                : state === "unauthorized"
                  ? "bg-paper-muted text-ink-muted border-ink/15 cursor-not-allowed"
                  : "bg-ink text-paper border-ink hover:bg-ink/90",
        ].join(" ")}
        aria-live="polite"
        aria-label="Talk to JARVIS"
      >
        <svg
          aria-hidden
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="8" y1="22" x2="16" y2="22" />
        </svg>
        {isLive && (
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
        )}
        <span>{label}</span>
      </button>

      {message && (
        <p className="mt-4 max-w-md text-center text-sm text-ink-muted dark:text-paper-muted">
          {message}
        </p>
      )}

      {isLive && (
        <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-ink-muted">
          Speak normally · he's listening
        </p>
      )}
    </div>
  );
}
