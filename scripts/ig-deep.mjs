// Deep crawl ONE profile — scrolls aggressively to harvest as much of the feed as possible.
// Usage: node scripts/ig-deep.mjs jeremiahdaws

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const profile = process.argv[2] ?? "jeremiahdaws";
const SESSION_DIR = path.join(process.cwd(), "scripts", ".ig-session");
const OUT_PATH = path.join(process.cwd(), "scripts", `ig-deep-${profile}.json`);

const ctx = await chromium.launchPersistentContext(SESSION_DIR, {
  headless: false,
  viewport: { width: 1280, height: 900 },
  args: ["--disable-blink-features=AutomationControlled"],
});

const [page] = ctx.pages().length ? ctx.pages() : [await ctx.newPage()];

console.log(`→ Deep crawl @${profile}`);
await page.goto(`https://www.instagram.com/${profile}/`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

const seen = new Map();
let stable = 0;
const MAX_SCROLLS = 80;

for (let i = 0; i < MAX_SCROLLS && stable < 6; i++) {
  const links = await page.$$eval("main a[href*='/p/'], main a[href*='/reel/']", (as) =>
    as.map((a) => ({
      href: a.getAttribute("href") ?? "",
      caption: (a.querySelector("img")?.getAttribute("alt") ?? a.textContent ?? "").trim(),
    }))
  );

  let added = 0;
  for (const l of links) {
    if (!l.href) continue;
    const fullUrl = l.href.startsWith("http") ? l.href : `https://www.instagram.com${l.href}`;
    if (seen.has(fullUrl)) continue;
    const kind = l.href.includes("/reel/") ? "reel" : "post";
    seen.set(fullUrl, { url: fullUrl, caption: l.caption, kind });
    added++;
  }

  if (added === 0) stable++;
  else stable = 0;

  console.log(`  scroll ${i + 1}: +${added}, total ${seen.size}`);
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.95));
  await page.waitForTimeout(1100);
}

const out = Array.from(seen.values());
await fs.writeFile(OUT_PATH, JSON.stringify(out, null, 2));
console.log(`\n✓ ${out.length} entries → ${OUT_PATH}`);

await ctx.close();
