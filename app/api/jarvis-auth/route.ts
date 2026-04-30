import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Password gate for /jarvis. POST with { password } in JSON.
 *
 * On match: sets `jarvis_voice_gate` HTTP-only cookie containing
 * JARVIS_VOICE_GATE_TOKEN. /api/jarvis-vapi checks this cookie before
 * minting a Vapi web call URL. Cookie expires in 8 hours so an idle
 * tab doesn't keep the gate open indefinitely.
 *
 * On mismatch: 401, no cookie set.
 *
 * Constant-time string compare to defeat timing attacks (low risk on a
 * one-user site, but the cost is one buffer compare).
 */
export async function POST(req: Request) {
  const expected = process.env.JARVIS_VOICE_PASSWORD;
  const token = process.env.JARVIS_VOICE_GATE_TOKEN;

  if (!expected || !token) {
    console.error(
      "[jarvis-auth] JARVIS_VOICE_PASSWORD or JARVIS_VOICE_GATE_TOKEN not set",
    );
    return NextResponse.json(
      { error: "voice gate not configured" },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const submitted = (body.password ?? "").trim();
  if (!submitted) {
    return NextResponse.json({ error: "password required" }, { status: 400 });
  }

  if (!safeEqual(submitted, expected)) {
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("jarvis_voice_gate", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
