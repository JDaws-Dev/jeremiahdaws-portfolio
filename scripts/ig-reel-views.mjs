// Visit each reel and pull view count; output sorted JSON.
// Usage: node scripts/ig-reel-views.mjs artios_sugarhill

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const profile = process.argv[2] ?? "artios_sugarhill";
const LIMIT = Number(process.argv[3] ?? 0); // 0 = all
const SESSION_DIR = path.join(process.cwd(), "scripts", ".ig-session");
const SRC = path.join(process.cwd(), "scripts", `ig-deep-${profile}.json`);
const OUT = path.join(process.cwd(), "scripts", `ig-reel-views-${profile}.json`);

const all = JSON.parse(await fs.readFile(SRC, "utf8"));
let reels = all.filter((d) => d.kind === "reel");
if (LIMIT > 0) reels = reels.slice(0, LIMIT);

const ctx = await chromium.launchPersistentContext(SESSION_DIR, {
  headless: true,
  viewport: { width: 1280, height: 900 },
  args: ["--disable-blink-features=AutomationControlled"],
});

const [page] = ctx.pages().length ? ctx.pages() : [await ctx.newPage()];

const out = [];
let i = 0;
for (const r of reels) {
  i++;
  try {
    await page.goto(r.url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(900);
    // Read body text and extract "X plays" / "X views" / "X likes"
    const text = await page.evaluate(() => document.body.innerText);
    const playsMatch = text.match(/([\d,.KMB]+)\s+(plays|views|reels)/i);
    const likesMatch = text.match(/([\d,.KMB]+)\s+likes?/i);
    function parseCount(s) {
      if (!s) return 0;
      const num = s.replace(/,/g, "");
      const m = num.match(/^([\d.]+)([KMB]?)$/i);
      if (!m) return Number(num) || 0;
      const v = parseFloat(m[1]);
      const mul = { K: 1e3, M: 1e6, B: 1e9 }[m[2].toUpperCase()] ?? 1;
      return Math.round(v * mul);
    }
    const plays = parseCount(playsMatch?.[1]);
    const likes = parseCount(likesMatch?.[1]);
    out.push({ ...r, plays, likes });
    console.log(`[${i}/${reels.length}] ${plays.toLocaleString()} plays · ${likes.toLocaleString()} likes · ${r.url}`);
  } catch (e) {
    console.log(`[${i}/${reels.length}] ERROR ${r.url}: ${e.message}`);
    out.push({ ...r, plays: 0, likes: 0, error: e.message });
  }
}

out.sort((a, b) => b.plays - a.plays);
await fs.writeFile(OUT, JSON.stringify(out, null, 2));
console.log(`\n✓ ${out.length} → ${OUT}`);

await ctx.close();
