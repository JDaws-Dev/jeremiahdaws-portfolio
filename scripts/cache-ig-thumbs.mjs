// Visits each IG post's /embed/captioned/ page, hides ALL chrome (header,
// captions, play buttons, footer, branding) via injected CSS, then takes a
// clean screenshot of just the photo/video element.
// Output: public/portfolio/ig-thumbs/{shortcode}.jpg + ig-caption-map.json
//
// Run: node scripts/cache-ig-thumbs.mjs [--force]

import { chromium } from "playwright";
import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";

const FORCE = process.argv.includes("--force");

const ROOT = process.cwd();
const SESSION_DIR = path.join(ROOT, "scripts", ".ig-session");
const OUT_DIR = path.join(ROOT, "public", "portfolio", "ig-thumbs");
const THUMB_MAP = path.join(ROOT, "scripts", "ig-thumb-map.json");
const CAPTION_MAP = path.join(ROOT, "scripts", "ig-caption-map.json");
const PORTFOLIO_DIR = path.join(ROOT, "content", "portfolio");

await fs.mkdir(OUT_DIR, { recursive: true });

// Hide every IG embed UI element except the photo/video itself.
const HIDE_CSS = `
  /* Hide everything except the media frame. */
  header, footer, [role="dialog"], .Caption, .CaptionUsername,
  [class*="caption" i], [class*="Caption" i],
  [class*="header" i], [class*="Header" i],
  [class*="footer" i], [class*="Footer" i],
  [class*="username" i], [class*="Username" i],
  [class*="avatar" i], [class*="Avatar" i],
  [class*="LoadingDots" i],
  [aria-label*="Like"], [aria-label*="Comment"], [aria-label*="Share"],
  svg[aria-label*="Verified"],
  ._aatk, ._aatm, ._abm0, ._abl-, ._aatp,
  [class*="EmbeddedMediaActions"],
  [class*="mediaInfo"],
  a[href*="instagram.com/p/"][href*="/?utm_source"],
  a[href*="instagram.com/reel/"][href*="/?utm_source"],
  /* Pseudo play overlay on hover */
  [class*="PlayButton" i], [class*="playButton" i],
  [class*="play-button" i], [class*="VideoOverlay" i],
  button[aria-label*="Play" i] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  /* Big native play icon overlay on video posters */
  video::-webkit-media-controls,
  video::-webkit-media-controls-overlay-play-button,
  video::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none !important;
  }
  /* Make the body just hold the media */
  body { background: black !important; margin: 0 !important; padding: 0 !important; }
`;

const igUrls = new Set();
for (const f of await fs.readdir(PORTFOLIO_DIR)) {
  if (!f.endsWith(".mdx")) continue;
  const text = await fs.readFile(path.join(PORTFOLIO_DIR, f), "utf8");
  const matches = text.match(/https:\/\/www\.instagram\.com\/(?:[\w.]+\/)?(?:p|reel|reels)\/[\w-]+/g) ?? [];
  for (const m of matches) igUrls.add(m);
}
const urls = Array.from(igUrls);
console.log(`→ ${urls.length} unique IG URLs (force=${FORCE})`);

let thumbs = {};
let captions = {};
try {
  if (fssync.existsSync(THUMB_MAP)) thumbs = JSON.parse(await fs.readFile(THUMB_MAP, "utf8"));
} catch {}
try {
  if (fssync.existsSync(CAPTION_MAP)) captions = JSON.parse(await fs.readFile(CAPTION_MAP, "utf8"));
} catch {}

const ctx = await chromium.launchPersistentContext(SESSION_DIR, {
  headless: false,
  viewport: { width: 1280, height: 900 },
  args: ["--disable-blink-features=AutomationControlled"],
});
const [page] = ctx.pages().length ? ctx.pages() : [await ctx.newPage()];

let saved = 0,
  failed = 0;

for (const url of urls) {
  const m = url.match(/\/(?:p|reel|reels)\/([\w-]+)/);
  if (!m) continue;
  const code = m[1];
  const out = path.join(OUT_DIR, `${code}.jpg`);
  if (!FORCE && thumbs[code] && fssync.existsSync(out)) continue;

  try {
    const embedUrl = `https://www.instagram.com/p/${code}/embed/captioned/`;
    await page.goto(embedUrl, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.waitForTimeout(1500);

    // Inject the chrome-hiding CSS.
    await page.addStyleTag({ content: HIDE_CSS });
    await page.waitForTimeout(400);

    // Pull caption from og:description.
    const cap = await page.evaluate(() => {
      const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? "";
      const m = ogDesc.match(/"([^"]+)"/);
      return (m ? m[1] : ogDesc).trim();
    });
    if (cap) captions[code] = cap;

    // Find the largest media element on the page (img or video).
    const mediaSel = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll("img, video"));
      let best = null;
      let bestArea = 0;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const area = r.width * r.height;
        if (area > bestArea && area > 10000) {
          bestArea = area;
          best = el;
        }
      }
      if (!best) return null;
      // Build a unique selector: tag + index in document
      const tag = best.tagName.toLowerCase();
      const all = Array.from(document.querySelectorAll(tag));
      const idx = all.indexOf(best);
      return `${tag}:nth-of-type(${idx + 1})`;
    });

    if (!mediaSel) {
      console.log(`  ${code} no media element`);
      failed++;
      continue;
    }

    const handle = await page.$(mediaSel);
    if (!handle) {
      failed++;
      continue;
    }

    await handle.screenshot({ path: out, type: "jpeg", quality: 85 });
    thumbs[code] = `/portfolio/ig-thumbs/${code}.jpg`;
    saved++;

    console.log(`  ✓ ${code}  ${cap ? cap.slice(0, 60) + "…" : "(no caption)"}`);

    if (saved % 10 === 0) {
      await fs.writeFile(THUMB_MAP, JSON.stringify(thumbs, null, 2));
      await fs.writeFile(CAPTION_MAP, JSON.stringify(captions, null, 2));
    }
  } catch (err) {
    console.log(`  ${code} error: ${err.message}`);
    failed++;
  }
}

await fs.writeFile(THUMB_MAP, JSON.stringify(thumbs, null, 2));
await fs.writeFile(CAPTION_MAP, JSON.stringify(captions, null, 2));
console.log(`\n✓ ${saved} screenshots saved, ${failed} failed`);

await ctx.close();
