import { NextResponse } from "next/server";
import { spawn } from "node:child_process";

export const runtime = "nodejs";

const SYSTEM = `You polish portfolio copy for Jeremiah Daws — a multidisciplinary creative who left Disney to make stuff, teach stuff, and film stuff. His voice is direct, confident, no-bs, occasionally funny. He says "I" not "we." He's faithful and family-driven but doesn't preach. Honest about credits — he worked on Disney/Marvel/Lucasfilm-branded projects, NOT directly for Marvel/Lucasfilm.

Your job: take a rough description of a portfolio piece and rewrite it as a tight 2-4 sentence card body for his website. Keep the meaning intact. Strip filler words. Use specifics over adjectives. End on a beat that makes the reader want to click the play button.

Rules:
- Start with the WHAT, not "I made..." or "This is..."
- Concrete > abstract. Numbers, names, tools, outcomes when given.
- No emojis. Plain text only — no markdown, no HTML, no quotes around film titles (just write them naturally).
- Use em dashes (—) not double-dashes.
- Use straight apostrophes ' and quotes "
- 2 to 4 sentences. Hard ceiling.
- If the user gave you context like the project title or role, use it but don't restate it verbatim.

Return ONLY the polished copy. No preamble, no explanation, no quotation marks around the result.`;

async function polishViaAnthropic(prompt: string, apiKey: string): Promise<string> {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 600,
      system: SYSTEM,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!r.ok) {
    const errText = await r.text().catch(() => "");
    throw new Error(`Anthropic ${r.status}: ${errText.slice(0, 300)}`);
  }
  const data = (await r.json()) as { content?: Array<{ type: string; text?: string }> };
  return data.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
}

async function polishViaOpenAI(prompt: string, apiKey: string): Promise<string> {
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-5",
      max_completion_tokens: 600,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: prompt },
      ],
    }),
  });
  if (!r.ok) {
    const errText = await r.text().catch(() => "");
    throw new Error(`OpenAI ${r.status}: ${errText.slice(0, 300)}`);
  }
  const data = (await r.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function polishViaCli(prompt: string): Promise<string> {
  // Use the Claude Code CLI which is authenticated under the user's
  // Pro/Max subscription — no API key required, no per-call billing.
  // Prompt is piped via stdin (Claude Code's preferred input path for -p mode).
  return new Promise<string>((resolve, reject) => {
    const proc = spawn(
      "claude",
      [
        "-p",
        "--output-format",
        "text",
        "--append-system-prompt",
        SYSTEM,
        "--disallowed-tools",
        "Bash,Read,Write,Edit,WebFetch,WebSearch,Glob,Grep,Task",
      ],
      { stdio: ["pipe", "pipe", "pipe"] }
    );

    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (d) => (stdout += d.toString()));
    proc.stderr.on("data", (d) => (stderr += d.toString()));

    const timer = setTimeout(() => {
      proc.kill("SIGKILL");
      reject(new Error("Claude CLI timeout after 90s"));
    }, 90_000);

    proc.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    proc.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`exit ${code}: ${stderr.slice(0, 400) || stdout.slice(0, 200)}`));
      }
    });

    proc.stdin.write(prompt);
    proc.stdin.end();
  });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { text?: string; context?: { title?: string; role?: string; org?: string; year?: string } }
    | null;

  if (!body || !body.text || body.text.trim().length === 0) {
    return NextResponse.json({ ok: false, error: "Missing text" }, { status: 400 });
  }

  const ctx = body.context ?? {};
  const ctxLines: string[] = [];
  if (ctx.title) ctxLines.push(`Project: ${ctx.title}`);
  if (ctx.role) ctxLines.push(`Role: ${ctx.role}`);
  if (ctx.org) ctxLines.push(`Org: ${ctx.org}`);
  if (ctx.year) ctxLines.push(`Year: ${ctx.year}`);
  const ctxBlock = ctxLines.length ? `\n\nContext:\n${ctxLines.join("\n")}` : "";
  const userMsg = `Rough description:\n${body.text.trim()}${ctxBlock}`;

  // Order: Claude Code CLI (subscription, free) → Anthropic API → OpenAI API.
  const errors: string[] = [];

  try {
    const text = await polishViaCli(userMsg);
    if (text) return NextResponse.json({ ok: true, text, source: "claude-cli" });
    throw new Error("empty");
  } catch (e) {
    errors.push(`CLI: ${e instanceof Error ? e.message : "?"}`);
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const text = await polishViaAnthropic(userMsg, anthropicKey);
      if (text) return NextResponse.json({ ok: true, text, source: "anthropic-api" });
      throw new Error("empty");
    } catch (e) {
      errors.push(`Anthropic: ${e instanceof Error ? e.message : "?"}`);
    }
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const text = await polishViaOpenAI(userMsg, openaiKey);
      if (text) return NextResponse.json({ ok: true, text, source: "openai-api" });
      throw new Error("empty");
    } catch (e) {
      errors.push(`OpenAI: ${e instanceof Error ? e.message : "?"}`);
    }
  }

  return NextResponse.json(
    {
      ok: false,
      error: `All polish paths failed. ${errors.join(" | ")}`,
    },
    { status: 500 }
  );
}
