import type { Metadata } from "next";
import { cookies } from "next/headers";
import JarvisVoiceButton from "@/components/JarvisVoiceButton";
import JarvisGate from "./JarvisGate";

export const metadata: Metadata = {
  title: "JARVIS",
  description: "Voice line.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function JarvisPage() {
  const cookieStore = await cookies();
  const gateCookie = cookieStore.get("jarvis_voice_gate");
  const expectedGate = process.env.JARVIS_VOICE_GATE_TOKEN;

  const authed =
    !!gateCookie && !!expectedGate && gateCookie.value === expectedGate;

  return (
    <main className="min-h-screen bg-paper-muted/40 dark:bg-ink/30">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">
            Personal line
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-tight tracking-[-0.01em]">
            JARVIS
          </h1>
          <p className="mt-4 max-w-md text-sm text-ink-muted dark:text-paper-muted">
            Tap to talk. He has your full stack — Gmail, Calendar, Drive,
            Telegram, Mozart, Anna, your sites. Whatever you ask for lands in
            your Telegram thread.
          </p>
        </div>

        {authed ? <JarvisVoiceButton /> : <JarvisGate />}
      </div>
    </main>
  );
}
