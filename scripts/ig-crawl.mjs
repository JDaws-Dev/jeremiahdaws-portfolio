// IG profile crawler. First run: a Chromium window opens; log into Instagram and
// the script will continue automatically. Subsequent runs reuse the saved session.
//
// Output: scripts/ig-output.json with shape:
// { jeremiahdaws: [{url, caption, kind}], laniertechprecisionmachining: [...], ... }
//
// Run: node scripts/ig-crawl.mjs

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const PROFILES = [
  "jeremiahdaws",
  "laniertechprecisionmachining",
  "bullfrogmachining",
  "artios_sugarhill",
];

const SESSION_DIR = path.join(process.cwd(), "scripts", ".ig-session");
const OUT_PATH = path.join(process.cwd(), "scripts", "ig-output.json");

await fs.mkdir(SESSION_DIR, { recursive: true });

const ctx = await chromium.launchPersistentContext(SESSION_DIR, {
  headless: false,
  viewport: { width: 1280, height: 900 },
  args: ["--disable-blink-features=AutomationControlled"],
});

const [page] = ctx.pages().length ? ctx.pages() : [await ctx.newPage()];

console.log("→ Opening Instagram…");
await page.goto("https://www.instagram.com/", { waitUntil: "domcontentloaded" });

// Wait for login if needed.
console.log("→ Checking login status…");
await page.waitForTimeout(3500);
const loggedIn = await page
  .locator("a[href='/direct/inbox/'], svg[aria-label='New post']")
  .first()
  .isVisible()
  .catch(() => false);

if (!loggedIn) {
  console.log("→ Not logged in. Please log in to Instagram in the open window.");
  console.log("   The script will resume automatically once you're in.");
  await page
    .locator("a[href='/direct/inbox/'], svg[aria-label='New post']")
    .first()
    .waitFor({ timeout: 5 * 60 * 1000 });
  console.log("→ Login detected.");
}

const results = {};

for (const profile of PROFILES) {
  console.log(`\n→ Crawling @${profile}`);
  const url = `https://www.instagram.com/${profile}/`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  // Scroll a few times to load more grid items.
  const seen = new Set();
  let stable = 0;
  for (let i = 0; i < 15 && stable < 3; i++) {
    const links = await page.$$eval("main a[href*='/p/'], main a[href*='/reel/']", (as) =>
      as.map((a) => ({
        href: a.getAttribute("href") ?? "",
        caption: (a.querySelector("img")?.getAttribute("alt") ?? a.textContent ?? "").trim(),
      }))
    );

    let added = 0;
    for (const l of links) {
      if (!l.href) continue;
      if (seen.has(l.href)) continue;
      seen.add(l.href);
      added++;
    }

    if (added === 0) stable++;
    else stable = 0;

    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.9));
    await page.waitForTimeout(900);
  }

  const links = await page.$$eval("main a[href*='/p/'], main a[href*='/reel/']", (as) =>
    as.map((a) => ({
      href: a.getAttribute("href") ?? "",
      caption: (a.querySelector("img")?.getAttribute("alt") ?? a.textContent ?? "").trim(),
    }))
  );

  // Dedupe + only keep posts under this profile.
  const out = [];
  const dupe = new Set();
  for (const l of links) {
    if (!l.href) continue;
    if (dupe.has(l.href)) continue;
    dupe.add(l.href);
    const isOwn = l.href.includes(`/${profile}/`) || (!l.href.includes("/reel/") && !l.href.match(/^\/[^/]+\/(p|reel)\//));
    const fullUrl = l.href.startsWith("http") ? l.href : `https://www.instagram.com${l.href}`;
    const kind = l.href.includes("/reel/") ? "reel" : "post";
    out.push({ url: fullUrl, caption: l.caption, kind, ownProfile: isOwn });
  }

  results[profile] = out;
  console.log(`  captured ${out.length} entries`);
}

await fs.writeFile(OUT_PATH, JSON.stringify(results, null, 2));
console.log(`\n✓ Saved → ${OUT_PATH}`);
console.log("→ You can close the browser window now.");

await ctx.close();
