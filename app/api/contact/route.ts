import { NextResponse } from "next/server";

const TO = "jedaws@gmail.com";
// Only Jeremiah ever sees this sender; replies go to the visitor via reply_to.
const FROM = "Jeremiah Daws Website <contact@jeremiahdaws.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PAGE_LABELS: Record<string, string> = {
  "/": "Home page",
  "/work": "Filmmaker page",
  "/maker": "Maker page",
  "/apps": "AI Builder page",
};

// Site palette, inlined because email clients ignore stylesheets.
const RED = "#b3312c";
const BLUE = "#2f5b96";
const INK = "#0b0d10";
const MUTED = "#5b6068";
const PAPER = "#fafaf7";
const LINE = "#e6e3da";

function renderEmail(o: {
  name: string;
  email: string;
  topic: string;
  pageLabel: string;
  message: string;
  sentAt: string;
}): string {
  const name = escapeHtml(o.name);
  const email = escapeHtml(o.email);
  const firstName = escapeHtml(o.name.split(/\s+/)[0] || o.name);
  const replyHref = `mailto:${encodeURIComponent(o.email)}?subject=${encodeURIComponent(`Re: ${o.topic}`)}`;
  const message = escapeHtml(o.message).replace(/\n/g, "<br>");
  const chip = (label: string, color: string) =>
    `<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 11px;border-radius:999px;border:1px solid ${color}33;background:${color}0d;color:${color};font-size:12px;font-weight:600;letter-spacing:.02em;">${escapeHtml(label)}</span>`;

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:${PAPER};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${LINE};border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">
  <tr><td style="height:5px;line-height:5px;font-size:0;background:${RED};background-image:linear-gradient(90deg,${RED},#e0736b,${BLUE});">&nbsp;</td></tr>
  <tr><td style="padding:26px 32px 0;">
    <span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${INK};">Jeremiah Daws<span style="color:${RED};">.</span></span>
    <div style="margin-top:22px;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:${BLUE};">New message from your site</div>
    <div style="margin-top:8px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;color:${INK};">${name}</div>
    <div style="margin-top:6px;font-size:15px;"><a href="mailto:${email}" style="color:${RED};text-decoration:none;">${email}</a></div>
    <div style="margin-top:16px;">${chip(o.topic, RED)}${o.pageLabel ? chip(`From the ${o.pageLabel}`, BLUE) : ""}</div>
  </td></tr>
  <tr><td style="padding:14px 32px 0;">
    <div style="background:${PAPER};border:1px solid ${LINE};border-left:4px solid ${RED};border-radius:10px;padding:18px 20px;font-size:16px;line-height:1.6;color:${INK};">${message}</div>
  </td></tr>
  <tr><td style="padding:24px 32px 30px;">
    <a href="${replyHref}" style="display:inline-block;background:${RED};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px;">Reply to ${firstName} &rarr;</a>
    <div style="margin-top:12px;font-size:13px;color:${MUTED};">Or just hit Reply. It goes straight to ${firstName}.</div>
  </td></tr>
  <tr><td style="padding:16px 32px;border-top:1px solid ${LINE};font-size:12px;color:${MUTED};">
    Sent ${escapeHtml(o.sentAt)} from the contact form on <a href="https://jeremiahdaws.com" style="color:${BLUE};text-decoration:none;">jeremiahdaws.com</a>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

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

  const pageLabel = PAGE_LABELS[page] ?? (page ? `${page} page` : "");
  const sentAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const html = renderEmail({ name, email, topic, pageLabel, message, sentAt });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New message from ${name} · ${topic}`,
      html,
      text: `New message from your site\n\n${name}\n${email}\n${topic}${pageLabel ? ` · from the ${pageLabel}` : ""}\n\n${message}\n\n— Sent ${sentAt} from jeremiahdaws.com`,
    }),
  });

  if (!res.ok) {
    console.error("contact: resend failed", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "Couldn't send right now" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
