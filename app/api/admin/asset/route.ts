import { NextResponse } from "next/server";
import { readOverrides, writeOverrides } from "@/lib/portfolio";
import { revalidatePath } from "next/cache";

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

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        url?: string;
        patch?: {
          hidden?: boolean;
          title?: string;
          caption?: string;
          thumbnail?: string;
          tags?: string[];
          sortOrder?: number;
        };
      }
    | null;

  if (!body || !body.url || !body.patch) {
    return NextResponse.json({ ok: false, error: "Missing url or patch" }, { status: 400 });
  }

  const key = normalizeUrl(body.url);
  const overrides = readOverrides();
  const current = overrides.assets[key] ?? {};
  const next = { ...current, ...body.patch };

  // Drop empty fields so JSON stays clean.
  if (next.hidden === false) delete next.hidden;
  if (next.title === "") delete next.title;
  if (next.caption === "") delete next.caption;
  if (next.thumbnail === "") delete next.thumbnail;
  if (next.tags && next.tags.length === 0) delete next.tags;
  if (next.sortOrder === 0 || next.sortOrder === undefined) delete next.sortOrder;

  if (Object.keys(next).length === 0) {
    delete overrides.assets[key];
  } else {
    overrides.assets[key] = next;
  }

  writeOverrides(overrides);
  revalidatePath("/");
  revalidatePath("/work");

  return NextResponse.json({ ok: true, key, override: overrides.assets[key] ?? null });
}
