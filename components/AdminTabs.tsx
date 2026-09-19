"use client";

import { useState } from "react";
import type { Asset, AssetOverride, PortfolioEntry } from "@/lib/portfolio";
import { AdminGrid } from "./AdminGrid";
import { AdminAssetGrid } from "./AdminAssetGrid";

type AssetWithMeta = Asset & {
  override?: AssetOverride;
};

export function AdminTabs({
  entries,
  assets,
}: {
  entries: PortfolioEntry[];
  assets: AssetWithMeta[];
}) {
  const [tab, setTab] = useState<"assets" | "entries">("assets");

  return (
    <div>
      <div className="mb-6 inline-flex rounded-full border border-ink/15 bg-paper p-1">
        <button
          onClick={() => setTab("assets")}
          aria-pressed={tab === "assets"}
          className={[
            "rounded-full px-4 py-1.5 text-sm font-medium transition",
            tab === "assets"
              ? "bg-ink text-paper"
              : "text-ink-muted hover:text-accent",
          ].join(" ")}
        >
          Assets ({assets.length})
        </button>
        <button
          onClick={() => setTab("entries")}
          aria-pressed={tab === "entries"}
          className={[
            "rounded-full px-4 py-1.5 text-sm font-medium transition",
            tab === "entries"
              ? "bg-ink text-paper"
              : "text-ink-muted hover:text-accent",
          ].join(" ")}
        >
          Entries ({entries.length})
        </button>
      </div>

      {tab === "assets" ? <AdminAssetGrid assets={assets} /> : <AdminGrid entries={entries} />}
    </div>
  );
}
