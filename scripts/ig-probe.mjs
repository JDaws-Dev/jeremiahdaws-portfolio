import { chromium } from "playwright";
import path from "node:path";
const ctx = await chromium.launchPersistentContext(path.join(process.cwd(), "scripts", ".ig-session"), {
  headless: false, viewport: { width: 1280, height: 900 },
  args: ["--disable-blink-features=AutomationControlled"],
});
const [page] = ctx.pages().length ? ctx.pages() : [await ctx.newPage()];

await page.goto("https://www.instagram.com/artios_sugarhill/reel/DCaUzhcRfJI/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);

const loggedIn = await page.evaluate(() => !!document.cookie.match(/sessionid/));
console.log("Logged in?", loggedIn);

const text = await page.evaluate(() => document.body.innerText);
// Look for various play-count patterns in the visible text
const patterns = [
  /([\d,.KMB]+)\s+(plays?|views?|reels?\s+plays?)/gi,
  /(plays?|views?)[:\s]+([\d,.KMB]+)/gi,
  /([\d,.KMB]+)\s+times?\s+played/gi,
];
for (const p of patterns) {
  const m = [...text.matchAll(p)];
  if (m.length) console.log("MATCH", p.source, ":", m.slice(0,5).map(x => x[0]));
}

// Show a chunk around any number near "play" or "view"
const playIdx = text.toLowerCase().indexOf("play");
if (playIdx !== -1) console.log("\nText around 'play':\n", text.slice(Math.max(0, playIdx-100), playIdx+200));
const viewIdx = text.toLowerCase().indexOf("view");
if (viewIdx !== -1) console.log("\nText around 'view':\n", text.slice(Math.max(0, viewIdx-100), viewIdx+200));

// Wait for user inspection
console.log("\nKeeping browser open for 30s — inspect manually");
await page.waitForTimeout(30000);
await ctx.close();
