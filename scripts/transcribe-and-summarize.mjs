// Transcribe + summarize every video referenced in the portfolio.
//   YouTube  → auto-generated subtitles via yt-dlp (free)
//   Vimeo    → auto-subs if available, else skip
//   Drive    → download audio via yt-dlp, transcribe via OpenAI Whisper API
// Then send transcript (+ existing description) to Claude for a polished
// 2–4 sentence portfolio caption in Jeremiah's voice.
//
// Output: scripts/video-polished-caption-map.json — { canonicalUrl: caption }
//
// Run: node scripts/transcribe-and-summarize.mjs [--force] [--limit N] [--only=youtube|vimeo|drive]

import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import os from "node:os";

const execFileAsync = promisify(execFile);

const FORCE = process.argv.includes("--force");
const LIMIT_ARG = process.argv.find((a) => a.startsWith("--limit"));
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split("=")[1] ?? "0", 10) || Infinity : Infinity;
const ONLY_ARG = process.argv.find((a) => a.startsWith("--only"));
const ONLY = ONLY_ARG ? ONLY_ARG.split("=")[1] : null;

const ROOT = process.cwd();
const OUT = path.join(ROOT, "scripts", "video-polished-caption-map.json");
const DESC_MAP = path.join(ROOT, "scripts", "video-description-map.json");
const PORTFOLIO_DIR = path.join(ROOT, "content", "portfolio");

// Load .env.local for OPENAI_API_KEY
try {
  const envText = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2];
  }
} catch {}

const OPENAI_KEY = process.env.OPENAI_API_KEY;

function canonical(url) {
  try {
    const u = new URL(url);
    for (const p of [...u.searchParams.keys()]) {
      if (/^(utm_|fbclid|si$|igshid|feature)/i.test(p)) u.searchParams.delete(p);
    }
    u.hash = "";
    return u.toString().replace(/\/$/, "");
  } catch {
    return url.split("#")[0];
  }
}

const SYSTEM = `You polish portfolio copy for Jeremiah Daws — a multidisciplinary creative who left Disney to make stuff, teach stuff, and film stuff. His voice is direct, confident, no-bs, occasionally funny. He says "I" not "we." Faithful and family-driven without preaching. Honest about credits — he worked on Disney/Marvel/Lucasfilm-branded projects, NOT directly for Marvel/Lucasfilm.

You're given a video transcript and (sometimes) a platform-side description. Write a tight 2–4 sentence portfolio caption a recruiter sees on a thumbnail. Lead with the WHAT. Specifics over adjectives. Tools, numbers, outcomes when they're in the source. End on a beat that makes someone want to click play.

Plain text only. No emojis, no markdown, no quoted film titles, no preamble. Em dashes (—) not double-dashes. Straight apostrophes ' and quotes ". Hard ceiling: 4 sentences. Return ONLY the caption.`;

// ---------- claude CLI ----------
async function polishWithClaude(prompt) {
  return new Promise((resolve, reject) => {
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
      reject(new Error("Claude CLI timeout"));
    }, 120_000);
    proc.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
    proc.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(`exit ${code}: ${stderr.slice(0, 400)}`));
    });
    proc.stdin.write(prompt);
    proc.stdin.end();
  });
}

async function polishWithOpenAI(prompt) {
  if (!OPENAI_KEY) throw new Error("No OPENAI_API_KEY");
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${OPENAI_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 600,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: prompt },
      ],
    }),
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const data = await r.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function polish(prompt) {
  try {
    return await polishWithClaude(prompt);
  } catch (e) {
    if (OPENAI_KEY) return await polishWithOpenAI(prompt);
    throw e;
  }
}

// ---------- transcript fetch (YT/Vimeo via auto-subs) ----------
function cleanVTT(vtt) {
  const lines = vtt
    .split(/\r?\n/)
    .filter((l) => l.trim() && !/^WEBVTT/.test(l) && !/-->/.test(l) && !/^\d+$/.test(l))
    .map((l) => l.replace(/<[^>]+>/g, "").trim());
  const dedup = [];
  for (const l of lines) {
    if (dedup[dedup.length - 1] !== l) dedup.push(l);
  }
  return dedup.join(" ").replace(/\s+/g, " ").trim();
}

async function fetchAutoSubs(url) {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "yt-trans-"));
  try {
    await execFileAsync(
      "yt-dlp",
      [
        "--skip-download",
        "--write-auto-subs",
        "--sub-langs",
        "en.*,en",
        "--sub-format",
        "vtt",
        "--no-warnings",
        "-o",
        path.join(tmp, "%(id)s.%(ext)s"),
        url,
      ],
      { timeout: 60_000, maxBuffer: 5 * 1024 * 1024 }
    );
    const files = await fs.readdir(tmp);
    const vtt = files.find((f) => f.endsWith(".vtt"));
    if (!vtt) return null;
    return cleanVTT(await fs.readFile(path.join(tmp, vtt), "utf8"));
  } finally {
    fs.rm(tmp, { recursive: true, force: true }).catch(() => {});
  }
}

// ---------- Drive video → audio → Whisper ----------
async function transcribeDrive(url) {
  if (!OPENAI_KEY) throw new Error("Drive transcription requires OPENAI_API_KEY");
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "drive-trans-"));
  try {
    // Download lowest-quality audio-bearing format and extract mp3 audio (Whisper supports up to 25MB).
    await execFileAsync(
      "yt-dlp",
      [
        "-f",
        "bestaudio/best",
        "-x",
        "--audio-format",
        "mp3",
        "--audio-quality",
        "9",
        "--no-warnings",
        "-o",
        path.join(tmp, "audio.%(ext)s"),
        url,
      ],
      { timeout: 240_000, maxBuffer: 50 * 1024 * 1024 }
    );

    const files = await fs.readdir(tmp);
    const audio = files.find((f) => /\.(mp3|m4a|webm|opus)$/.test(f));
    if (!audio) throw new Error("audio extraction failed");
    const audioPath = path.join(tmp, audio);
    const stat = await fs.stat(audioPath);
    // Whisper limit: 25MB. If over, downsample.
    let finalPath = audioPath;
    if (stat.size > 24 * 1024 * 1024) {
      const downPath = path.join(tmp, "audio-low.mp3");
      await execFileAsync(
        "ffmpeg",
        ["-y", "-i", audioPath, "-ac", "1", "-ar", "16000", "-b:a", "32k", downPath],
        { timeout: 240_000, maxBuffer: 5 * 1024 * 1024 }
      );
      finalPath = downPath;
    }
    const buf = await fs.readFile(finalPath);
    const form = new FormData();
    form.append("file", new Blob([buf], { type: "audio/mpeg" }), "audio.mp3");
    form.append("model", "whisper-1");
    form.append("response_format", "text");
    const r = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { authorization: `Bearer ${OPENAI_KEY}` },
      body: form,
    });
    if (!r.ok) throw new Error(`Whisper ${r.status}: ${(await r.text()).slice(0, 300)}`);
    return (await r.text()).trim();
  } finally {
    fs.rm(tmp, { recursive: true, force: true }).catch(() => {});
  }
}

// ---------- main ----------
const ytSet = new Set();
const vimeoSet = new Set();
const driveSet = new Set();
for (const f of await fs.readdir(PORTFOLIO_DIR)) {
  if (!f.endsWith(".mdx")) continue;
  const text = await fs.readFile(path.join(PORTFOLIO_DIR, f), "utf8");
  for (const m of text.matchAll(/https:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w-]{11})/g)) {
    ytSet.add(`https://www.youtube.com/watch?v=${m[1]}`);
  }
  for (const m of text.matchAll(/https:\/\/youtu\.be\/([\w-]{11})/g)) {
    ytSet.add(`https://www.youtube.com/watch?v=${m[1]}`);
  }
  for (const m of text.matchAll(/https:\/\/vimeo\.com\/(\d+)/g)) {
    vimeoSet.add(`https://vimeo.com/${m[1]}`);
  }
  for (const m of text.matchAll(/https:\/\/drive\.google\.com\/file\/d\/([\w-]+)/g)) {
    driveSet.add(`https://drive.google.com/file/d/${m[1]}/view`);
  }
}

let urls = [];
if (!ONLY || ONLY === "youtube") urls.push(...ytSet);
if (!ONLY || ONLY === "vimeo") urls.push(...vimeoSet);
if (!ONLY || ONLY === "drive") urls.push(...driveSet);
urls = urls.slice(0, LIMIT);
console.log(`→ ${urls.length} URLs to process`);

let descMap = {};
try {
  if (fssync.existsSync(DESC_MAP)) descMap = JSON.parse(await fs.readFile(DESC_MAP, "utf8"));
} catch {}

let cache = {};
try {
  if (fssync.existsSync(OUT)) cache = JSON.parse(await fs.readFile(OUT, "utf8"));
} catch {}

let saved = 0;
let skipped = 0;
let failed = 0;

for (const url of urls) {
  const key = canonical(url);
  if (!FORCE && cache[key]) {
    skipped++;
    continue;
  }
  try {
    const isYT = /youtube\.com|youtu\.be/.test(url);
    const isVimeo = /vimeo\.com/.test(url);
    const isDrive = /drive\.google\.com/.test(url);

    let transcript = null;
    if (isYT || isVimeo) {
      transcript = await fetchAutoSubs(url).catch(() => null);
    } else if (isDrive) {
      transcript = await transcribeDrive(url);
    }

    const description = descMap[key] ?? "";

    if (!transcript && !description) {
      console.log(`  ✗ ${url.slice(-30)} no signal — skip`);
      failed++;
      continue;
    }

    const parts = [];
    if (description) parts.push(`Platform-side description:\n${description.slice(0, 2000)}`);
    if (transcript) parts.push(`Transcript:\n${transcript.slice(0, 6000)}`);
    const prompt = parts.join("\n\n");

    const text = await polish(prompt);
    if (!text) {
      console.log(`  ✗ ${url.slice(-30)} empty polish`);
      failed++;
      continue;
    }
    cache[key] = text;
    saved++;
    console.log(`  ✓ ${url.slice(-30)}  ${text.slice(0, 90)}…`);

    if (saved % 5 === 0) await fs.writeFile(OUT, JSON.stringify(cache, null, 2));
  } catch (err) {
    failed++;
    console.log(`  ✗ ${url.slice(-30)} ${err.message?.slice(0, 140)}`);
  }
}

await fs.writeFile(OUT, JSON.stringify(cache, null, 2));
console.log(`\n✓ ${saved} new, ${skipped} skipped, ${failed} failed → ${OUT}`);
