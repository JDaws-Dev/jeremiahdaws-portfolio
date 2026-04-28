// Take scripts/artiosplus.json and enrich each Vimeo entry with its real title via oEmbed.
// Output: scripts/artiosplus-enriched.json

import fs from "node:fs/promises";
import path from "node:path";

const IN = path.join(process.cwd(), "scripts", "artiosplus.json");
const OUT = path.join(process.cwd(), "scripts", "artiosplus-enriched.json");

const raw = JSON.parse(await fs.readFile(IN, "utf8"));

// Dedupe by vimeoId
const ids = Array.from(new Set(raw.videos.map((v) => v.vimeoId)));
console.log(`→ enriching ${ids.length} unique Vimeo IDs`);

const out = [];
for (const id of ids) {
  const vimeoUrl = `https://vimeo.com/${id}`;
  try {
    const r = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(vimeoUrl)}`);
    if (!r.ok) {
      console.log(`  ${id} skip (${r.status})`);
      continue;
    }
    const j = await r.json();
    out.push({
      vimeoId: id,
      title: j.title ?? `Vimeo ${id}`,
      author: j.author_name ?? null,
      duration: j.duration ?? null,
      thumbnail: j.thumbnail_url ?? `https://vumbnail.com/${id}.jpg`,
      url: vimeoUrl,
    });
    console.log(`  ✓ ${id} — ${j.title}`);
  } catch (err) {
    console.log(`  ${id} error: ${err.message}`);
  }
}

await fs.writeFile(OUT, JSON.stringify(out, null, 2));
console.log(`\n✓ ${out.length} entries → ${OUT}`);
