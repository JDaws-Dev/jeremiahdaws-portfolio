import type { Metadata } from "next";
import { cookies } from "next/headers";
import MozartVoiceButton from "@/components/MozartVoiceButton";
import MozartGate from "./MozartGate";

export const metadata: Metadata = {
  title: "Mozart",
  description: "Voice line.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function MozartPage() {
  const cookieStore = await cookies();
  const gateCookie = cookieStore.get("mozart_voice_gate");
  const expectedGate = process.env.MOZART_VOICE_GATE_TOKEN;

  const authed =
    !!gateCookie && !!expectedGate && gateCookie.value === expectedGate;

  return (
    <main className="min-h-screen bg-paper-muted/40 dark:bg-ink/30">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">
            Composer's line
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-tight tracking-[-0.01em]">
            Mozart
          </h1>
          <p className="mt-4 max-w-md text-sm text-ink-muted dark:text-paper-muted">
            Tap and talk. He's your full Mozart — knows your catalog, your
            sessions, your Suno library, your inbox. Whatever he can't answer
            in voice goes to your Telegram.
          </p>
        </div>

        {authed ? <MozartVoiceButton /> : <MozartGate />}
      </div>
    </main>
  );
}
