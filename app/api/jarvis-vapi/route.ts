import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side Vapi web-call creator for JARVIS voice mode.
 *
 * Auth gate: requires the JARVIS_VOICE_GATE cookie set by /api/jarvis-auth
 * after the visitor enters the right password on /jarvis. Without that cookie
 * we refuse to mint a webCallUrl, so an anonymous visitor to jeremiahdaws.com
 * cannot start a Vapi call on Jeremiah's account.
 *
 * Pattern adapted from ConsultingBusiness/web/app/api/vapi/route.ts. The
 * @vapi-ai/web SDK's start() flow can lose its auth header in some Next.js
 * bundler configurations, so we always create the web call here and let the
 * client use vapi.reconnect(webCallUrl) instead.
 */
export async function POST() {
  const cookieStore = await cookies();
  const gateCookie = cookieStore.get("jarvis_voice_gate");
  const expectedGate = process.env.JARVIS_VOICE_GATE_TOKEN;

  if (!expectedGate) {
    console.error("[jarvis-vapi] JARVIS_VOICE_GATE_TOKEN not set");
    return NextResponse.json(
      { error: "voice gate not configured" },
      { status: 503 },
    );
  }

  if (!gateCookie || gateCookie.value !== expectedGate) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // /call/web takes the org PUBLIC key for auth — not the private key. The
  // private key is for admin operations like creating assistants. Vapi's
  // own error message ("you may be using the private key instead of the
  // public key, or vice versa") is the giveaway. Public key is browser-safe,
  // exposed via NEXT_PUBLIC_*; we use it server-side here to avoid CORS and
  // to keep the assistantId off the wire.
  const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const assistantId = process.env.VAPI_JARVIS_ASSISTANT_ID;

  if (!vapiPublicKey || !assistantId) {
    console.error(
      "[jarvis-vapi] missing NEXT_PUBLIC_VAPI_PUBLIC_KEY or VAPI_JARVIS_ASSISTANT_ID",
    );
    return NextResponse.json(
      { error: "voice not configured" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.vapi.ai/call/web", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vapiPublicKey}`,
      },
      body: JSON.stringify({ assistantId }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[jarvis-vapi] vapi error", res.status, detail);
      return NextResponse.json(
        { error: `Vapi API error: ${res.status}`, detail },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({
      webCallUrl: data.webCallUrl ?? data.transport?.callUrl,
      id: data.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[jarvis-vapi] failed to create web call", message);
    return NextResponse.json(
      { error: "Failed to create web call", detail: message },
      { status: 500 },
    );
  }
}
