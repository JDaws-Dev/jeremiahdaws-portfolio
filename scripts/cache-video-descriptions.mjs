// For every YouTube and Vimeo URL referenced anywhere in content/portfolio,
// fetch the platform-side description and cache it.
// Output: scripts/video-description-map.json — { canonicalUrl: description }
//
// Run: node scripts/cache-video-descriptions.mjs [--force]

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";

const execFileAsync = promisify(execFile);

const FORCE = process.argv.includes("--force");
const ROOT = process.cwd();
const OUT = path.join(ROOT, "scripts", "video-description-map.json");
const PORTFOLIO_DIR = path.join(ROOT, "content", "portfolio");

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

const ytSet = new Set();
const vimeoSet = new Set();

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
}

const ytUrls = [...ytSet];
const vimeoUrls = [...vimeoSet];
console.log(`→ ${ytUrls.length} YouTube + ${vimeoUrls.length} Vimeo URLs`);

let cache = {};
try {
  if (fssync.existsSync(OUT)) cache = JSON.parse(await fs.readFile(OUT, "utf8"));
} catch {}

let saved = 0;
let skipped = 0;
let failed = 0;

// ---------- YouTube via yt-dlp ----------
for (const url of ytUrls) {
  const key = canonical(url);
  if (!FORCE && cache[key]) {
    skipped++;
    continue;
  }
  try {
    const { stdout } = await execFileAsync(
      "yt-dlp",
      [
        "--skip-download",
        "--no-warnings",
        "--print",
        "%(description)s",
        url,
      ],
      { maxBuffer: 5 * 1024 * 1024, timeout: 30000 }
    );
    const desc = stdout.trim();
    cache[key] = desc;
    saved++;
    console.log(`  ✓ YT ${url.slice(-15)}  ${desc.slice(0, 80).replace(/\n/g, " ")}…`);
  } catch (err) {
    failed++;
    console.log(`  YT fail ${url}: ${err.message?.slice(0, 100)}`);
  }
  if (saved % 10 === 0 && saved > 0) {
    await fs.writeFile(OUT, JSON.stringify(cache, null, 2));
  }
}

// ---------- Vimeo via public API ----------
for (const url of vimeoUrls) {
  const key = canonical(url);
  if (!FORCE && cache[key]) {
    skipped++;
    continue;
  }
  const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
  if (!id) continue;
  try {
    const r = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
    if (!r.ok) {
      failed++;
      console.log(`  Vimeo ${id} ${r.status}`);
      continue;
    }
    const data = await r.json();
    const desc = (data?.[0]?.description ?? "").trim();
    if (desc) cache[key] = desc;
    saved++;
    console.log(`  ✓ Vimeo ${id}  ${desc.slice(0, 80).replace(/\n/g, " ")}…`);
  } catch (err) {
    failed++;
    console.log(`  Vimeo fail ${url}: ${err.message?.slice(0, 100)}`);
  }
}

await fs.writeFile(OUT, JSON.stringify(cache, null, 2));
console.log(`\n✓ ${saved} new, ${skipped} skipped, ${failed} failed → ${OUT}`);
