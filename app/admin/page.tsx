import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { AdminTabs } from "@/components/AdminTabs";
import { AdminDeployButton } from "@/components/AdminDeployButton";
import { getAllAssets, getAllEntries, readOverrides } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Jeremiah Daws",
  robots: { index: false, follow: false },
};

function normalizeUrl(u: string): string {
  try {
    const url = new URL(u);
    for (const p of [...url.searchParams.keys()]) {
      if (/^(utm_|fbclid|si$|igshid|feature)/i.test(p)) url.searchParams.delete(p);
    }
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return u.split("#")[0];
  }
}

export default function AdminPage() {
  const entries = getAllEntries({ includeHidden: true });
  const overrides = readOverrides();
  const rawAssets = getAllAssets({ includeHidden: true });
  const assets = rawAssets.map((a) => ({
    ...a,
    override: overrides.assets[normalizeUrl(a.url)],
  }));

  return (
    <main className="min-h-screen bg-paper-muted/40 pb-24 dark:bg-ink/30">
      <TopNav />
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <header className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Local admin</p>
              <h1 className="mt-2 font-serif text-4xl leading-tight tracking-[-0.01em]">
                Edit portfolio
              </h1>
            </div>
            <AdminDeployButton />
          </div>
          <p className="mt-3 max-w-3xl text-sm text-ink-muted dark:text-paper-muted">
            Two views — <strong>Assets</strong> for individual videos/posts (hide,
            retitle, caption with AI assist, tag, reorder); <strong>Entries</strong> for
            the high-level project pages. Edits save to{" "}
            <code className="mx-1 rounded bg-paper-muted px-1 dark:bg-ink/40">content/overrides.json</code>{" "}
            and uploaded thumbnails to{" "}
            <code className="mx-1 rounded bg-paper-muted px-1 dark:bg-ink/40">/public/portfolio/uploaded/</code>.
            Click <strong>Deploy changes</strong> to commit + push to GitHub —
            Vercel rebuilds in ~40s.
          </p>
        </header>
        <AdminTabs entries={entries} assets={assets} />
      </div>
    </main>
  );
}
