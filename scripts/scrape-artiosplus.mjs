// Scrapes artiosplus.com for video pages + Vimeo IDs.
// Output: scripts/artiosplus.json — { videos: [{ slug, title, url, vimeoId, posterUrl }] }
//
// Run: node scripts/scrape-artiosplus.mjs

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const BASE = "https://artiosplus.com";
const OUT = path.join(process.cwd(), "scripts", "artiosplus.json");

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
});
const page = await ctx.newPage();

console.log(`→ Loading ${BASE}`);
await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

// Try to enumerate every link that looks like a content page.
const linkHrefs = await page.$$eval("a[href]", (as) =>
  Array.from(new Set(as.map((a) => a.href).filter(Boolean)))
);

const sameOrigin = linkHrefs.filter((h) => {
  try {
    const u = new URL(h);
    return u.origin === BASE && !/(login|sign[_-]?up|account|cart|checkout|legal|privacy|terms)/i.test(u.pathname);
  } catch {
    return false;
  }
});

console.log(`  found ${sameOrigin.length} same-origin links`);

const videos = [];
const visited = new Set();

async function visit(url) {
  if (visited.has(url)) return;
  visited.add(url);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.waitForTimeout(1200);
  } catch (err) {
    console.log(`  fail ${url}: ${err.message}`);
    return;
  }

  const title = (await page.title()).replace(/\s*\|\s*Artios.*$/i, "").trim();

  // Find Vimeo iframes and links
  const vimeoIds = await page.evaluate(() => {
    const ids = new Set();
    for (const el of document.querySelectorAll("iframe[src*='vimeo.com'], a[href*='vimeo.com']")) {
      const src = (el.getAttribute("src") ?? el.getAttribute("href")) ?? "";
      const m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (m) ids.add(m[1]);
    }
    return Array.from(ids);
  });

  // Also pick up posters
  const posterUrl = await page.evaluate(() => {
    const og = document.querySelector('meta[property="og:image"]');
    return og ? og.getAttribute("content") : null;
  });

  // Find more inner links (depth 1)
  const more = await page.$$eval("a[href]", (as) =>
    Array.from(new Set(as.map((a) => a.href).filter(Boolean)))
  );

  if (vimeoIds.length) {
    for (const vid of vimeoIds) {
      videos.push({
        slug: new URL(url).pathname.replace(/\/$/, "").split("/").pop() || "home",
        title,
        url,
        vimeoId: vid,
        posterUrl,
      });
      console.log(`  ✓ ${title} → vimeo ${vid}`);
    }
  }

  return more.filter((h) => {
    try {
      const u = new URL(h);
      return u.origin === BASE;
    } catch {
      return false;
    }
  });
}

// Crawl breadth-first up to a budget
const queue = [BASE, ...sameOrigin];
let processed = 0;
const BUDGET = 80;

while (queue.length && processed < BUDGET) {
  const url = queue.shift();
  if (!url) break;
  const more = await visit(url);
  if (more) {
    for (const m of more) {
      if (!visited.has(m) && !queue.includes(m) && queue.length < BUDGET * 3) queue.push(m);
    }
  }
  processed++;
}

// Dedupe by vimeoId
const seen = new Set();
const unique = videos.filter((v) => {
  if (seen.has(v.vimeoId)) return false;
  seen.add(v.vimeoId);
  return true;
});

await fs.writeFile(OUT, JSON.stringify({ videos: unique }, null, 2));
console.log(`\n✓ ${unique.length} unique videos → ${OUT}`);

await browser.close();
