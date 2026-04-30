import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Password gate for /mozart. POST with { password } in JSON. On match,
 * sets `mozart_voice_gate` HTTP-only cookie containing
 * MOZART_VOICE_GATE_TOKEN. Cookie expires in 8 hours.
 */
export async function POST(req: Request) {
  const expected = process.env.MOZART_VOICE_PASSWORD;
  const token = process.env.MOZART_VOICE_GATE_TOKEN;

  if (!expected || !token) {
    console.error(
      "[mozart-auth] MOZART_VOICE_PASSWORD or MOZART_VOICE_GATE_TOKEN not set",
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
  res.cookies.set("mozart_voice_gate", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
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
