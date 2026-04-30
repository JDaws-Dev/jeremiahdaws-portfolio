import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side Vapi web-call creator for Mozart voice mode.
 *
 * Auth gate: requires the MOZART_VOICE_GATE cookie set by /api/mozart-auth.
 * Same shape as /api/jarvis-vapi but uses MOZART_* env vars + cookie name.
 */
export async function POST() {
  const cookieStore = await cookies();
  const gateCookie = cookieStore.get("mozart_voice_gate");
  const expectedGate = process.env.MOZART_VOICE_GATE_TOKEN;

  if (!expectedGate) {
    console.error("[mozart-vapi] MOZART_VOICE_GATE_TOKEN not set");
    return NextResponse.json(
      { error: "voice gate not configured" },
      { status: 503 },
    );
  }

  if (!gateCookie || gateCookie.value !== expectedGate) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const assistantId = process.env.VAPI_MOZART_ASSISTANT_ID;

  if (!vapiPublicKey || !assistantId) {
    console.error(
      "[mozart-vapi] missing NEXT_PUBLIC_VAPI_PUBLIC_KEY or VAPI_MOZART_ASSISTANT_ID",
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
      console.error("[mozart-vapi] vapi error", res.status, detail);
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
    console.error("[mozart-vapi] failed to create web call", message);
    return NextResponse.json(
      { error: "Failed to create web call", detail: message },
      { status: 500 },
    );
  }
}
