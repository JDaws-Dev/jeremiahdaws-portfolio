import { NextResponse } from "next/server";
import { readOverrides, writeOverrides } from "@/lib/portfolio";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { slug?: string; patch?: { hidden?: boolean; thumbnail?: string; description?: string } }
    | null;
  if (!body || !body.slug || !body.patch) {
    return NextResponse.json({ ok: false, error: "Missing slug or patch" }, { status: 400 });
  }

  const overrides = readOverrides();
  const current = overrides.entries[body.slug] ?? {};
  const next = { ...current, ...body.patch };

  // Drop empty fields so the JSON stays clean.
  if (next.hidden === false) delete next.hidden;
  if (next.thumbnail === "") delete next.thumbnail;
  if (next.description === "") delete next.description;

  if (Object.keys(next).length === 0) {
    delete overrides.entries[body.slug];
  } else {
    overrides.entries[body.slug] = next;
  }

  writeOverrides(overrides);

  revalidatePath("/");
  revalidatePath("/work");

  return NextResponse.json({ ok: true, slug: body.slug, override: overrides.entries[body.slug] ?? null });
}
