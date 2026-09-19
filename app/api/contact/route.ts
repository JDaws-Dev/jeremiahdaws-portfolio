import { NextResponse } from "next/server";

const TO = "jedaws@gmail.com";
// Only Jeremiah ever sees this sender; replies go to the visitor via reply_to.
const FROM = "Jeremiah Daws — Website <contact@getsafefamily.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data || typeof data !== "object") {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(data.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const message = clean(data.message, 5000);
  const topic = clean(data.topic, 120) || "General";
  const page = clean(data.page, 200);

  if (!name || !EMAIL_RE.test(email) || message.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please add your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "Email isn't configured" }, { status: 503 });
  }

  const html = `
    <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
    <p><strong>Topic:</strong> ${escapeHtml(topic)}${page ? ` · <strong>Page:</strong> ${escapeHtml(page)}` : ""}</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Site contact: ${topic} — ${name}`,
      html,
      text: `${name} <${email}>\nTopic: ${topic}${page ? `\nPage: ${page}` : ""}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("contact: resend failed", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "Couldn't send right now" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
