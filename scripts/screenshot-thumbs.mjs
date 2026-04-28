// Screenshot every site referenced by a portfolio entry that lacks a video embed.
// Saves thumbnails to public/portfolio/{slug}.jpg and prints the slug→path map.
//
// Run: node scripts/screenshot-thumbs.mjs

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "portfolio");
await fs.mkdir(OUT_DIR, { recursive: true });

// Each target = { slug, url } — only sites we want a real screenshot of.
const TARGETS = [
  { slug: "answeraxis", url: "https://www.answeraxis.com/" },
  { slug: "apps-safefamily", url: "https://www.getsafefamily.com/" },
  { slug: "apps-fridaynightvideo", url: "https://fridaynightvideo.app/" },
  { slug: "apps-beaversbathroomblitz", url: "https://beaversbathroomblitz.com/" },
  { slug: "apps-illprayforyou", url: "https://illprayforyou.com/" },
  { slug: "apps-artiosconnect", url: "https://artiosconnect.com/" },
  { slug: "apps-artioscafe", url: "https://artioscafe.com/" },
  { slug: "youtube-channel", url: "https://www.youtube.com/c/JeremiahDaws/videos" },
  // Broadcast credits — IMDB pages
  { slug: "building-wild", url: "https://www.imdb.com/title/tt3403448/" },
  { slug: "starting-strong", url: "https://www.imdb.com/title/tt3299570/" },
  { slug: "our-wild-hearts", url: "https://www.imdb.com/title/tt2456470/" },
  // Featured press
  { slug: "press-tormach", url: "https://tormach.com/articles/filmmaker-to-machinist-launching-a-new-career" },
  { slug: "press-practical-machinist", url: "https://www.practicalmachinist.com/from-video-producer-to-master-machinist-jeremiahs-journey/" },
  // Disney general
  { slug: "disney-yellow-shoes", url: "https://disneyparks.disney.go.com/" },
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
});

const results = {};

for (const t of TARGETS) {
  const page = await ctx.newPage();
  console.log(`→ ${t.slug}  ${t.url}`);
  try {
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    // Try to dismiss common cookie banners.
    for (const sel of [
      'button:has-text("Accept")',
      'button:has-text("Got it")',
      'button:has-text("I agree")',
      'button:has-text("Allow all")',
      '[aria-label*="close" i]',
    ]) {
      try {
        const btn = await page.$(sel);
        if (btn) await btn.click({ timeout: 1000 }).catch(() => {});
      } catch {}
    }
    await page.waitForTimeout(2000);
    const filePath = path.join(OUT_DIR, `${t.slug}.jpg`);
    await page.screenshot({
      path: filePath,
      type: "jpeg",
      quality: 80,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
      timeout: 60_000,
    });
    results[t.slug] = `/portfolio/${t.slug}.jpg`;
    console.log(`  saved → ${filePath}`);
  } catch (err) {
    console.log(`  FAILED: ${err.message}`);
  }
  await page.close();
}

await browser.close();

console.log("\nMapping:");
for (const [slug, p] of Object.entries(results)) {
  console.log(`  ${slug}: ${p}`);
}

await fs.writeFile(
  path.join(ROOT, "scripts", "thumb-map.json"),
  JSON.stringify(results, null, 2)
);
console.log("\n✓ Saved scripts/thumb-map.json");
