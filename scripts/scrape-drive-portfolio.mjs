// Scrape JEREMIAH DAWS_PORTFOLIO Drive folder via embeddedfolderview.
// The top folder has 3 sub-folders by role. Recurse into each.
//
// Output: scripts/drive-portfolio.json
//   { byRole: { "DIRECTOR/PRODUCER": [...], "EDITOR": [...], "PRODUCER": [...] } }
//
// Run: node scripts/scrape-drive-portfolio.mjs

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT_FOLDER = "1kvD0fq1nEsG3PWj6ZF7Ck1WiQblxziM-";
const OUT = path.join(process.cwd(), "scripts", "drive-portfolio.json");

function folderUrl(id) {
  return `https://drive.google.com/embeddedfolderview?id=${id}#list`;
}

async function listFolder(page, folderId) {
  await page.goto(folderUrl(folderId), { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(800);
  return page.evaluate(() => {
    const out = [];
    document.querySelectorAll(".flip-entry").forEach((entry) => {
      const id = (entry.id || "").replace(/^entry-/, "");
      if (!id) return;
      const a = entry.querySelector("a[href]");
      const href = a?.getAttribute("href") ?? "";
      const title = entry.querySelector(".flip-entry-title")?.textContent?.trim() ?? "";
      const isFolder = /\/drive\/folders\//.test(href);
      const isFile = /\/file\/d\//.test(href);
      out.push({ id, title, kind: isFolder ? "folder" : isFile ? "file" : "unknown", href });
    });
    return out;
  });
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const top = await listFolder(page, ROOT_FOLDER);
console.log(`→ root folder has ${top.length} entries`);

const byRole = {};
for (const entry of top) {
  if (entry.kind !== "folder") continue;
  console.log(`\n→ Entering "${entry.title}" (${entry.id})`);
  const items = await listFolder(page, entry.id);
  const files = items.filter((i) => i.kind === "file");
  console.log(`  ${files.length} files`);
  byRole[entry.title] = files.map((f) => ({ id: f.id, title: f.title }));
}

const total = Object.values(byRole).reduce((n, arr) => n + arr.length, 0);
await fs.writeFile(OUT, JSON.stringify({ byRole, total }, null, 2));
console.log(`\n✓ ${total} videos across ${Object.keys(byRole).length} roles → ${OUT}`);

for (const [role, files] of Object.entries(byRole)) {
  console.log(`\n${role}:`);
  for (const f of files) console.log(`  · ${f.title}`);
}

await browser.close();
