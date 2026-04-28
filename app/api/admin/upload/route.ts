import { NextResponse } from "next/server";
import { readOverrides, writeOverrides } from "@/lib/portfolio";
import { revalidatePath } from "next/cache";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

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

const UPLOAD_DIR = path.join(process.cwd(), "public", "portfolio", "uploaded");

export async function POST(req: Request) {
  // Local-only admin: this writes to the local /public folder.
  // Vercel serverless runtimes have a read-only filesystem, so this
  // route is only useful in development.
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_UPLOAD) {
    return NextResponse.json(
      { ok: false, error: "Uploads are local-only. Run dev server, upload, commit /public/portfolio/uploaded/." },
      { status: 403 }
    );
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ ok: false, error: "Expected multipart/form-data" }, { status: 400 });
  }

  const file = form.get("file");
  const targetUrl = form.get("url");
  const target = form.get("target"); // "asset" | "entry"
  const slug = form.get("slug"); // for entry overrides

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Missing 'file'" }, { status: 400 });
  }

  // Pick an extension from the MIME type
  const mime = file.type || "image/jpeg";
  const ext =
    mime.includes("png") ? "png" :
    mime.includes("webp") ? "webp" :
    mime.includes("gif") ? "gif" :
    "jpg";

  // Build a stable filename: prefer slug-based, fall back to URL hash
  let basename: string;
  if (typeof slug === "string" && slug) {
    basename = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  } else if (typeof targetUrl === "string" && targetUrl) {
    basename = crypto.createHash("sha1").update(normalizeUrl(targetUrl)).digest("hex").slice(0, 12);
  } else {
    basename = crypto.randomBytes(6).toString("hex");
  }
  const filename = `${basename}.${ext}`;
  const fullPath = path.join(UPLOAD_DIR, filename);
  const publicUrl = `/portfolio/uploaded/${filename}`;

  // Ensure dir + write file
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const arrayBuffer = await file.arrayBuffer();
  fs.writeFileSync(fullPath, Buffer.from(arrayBuffer));

  // Apply override
  const overrides = readOverrides();
  if (target === "entry" && typeof slug === "string" && slug) {
    const current = overrides.entries[slug] ?? {};
    overrides.entries[slug] = { ...current, thumbnail: publicUrl };
  } else if (typeof targetUrl === "string" && targetUrl) {
    const key = normalizeUrl(targetUrl);
    const current = overrides.assets[key] ?? {};
    overrides.assets[key] = { ...current, thumbnail: publicUrl };
  }
  writeOverrides(overrides);

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/maker");
  revalidatePath("/apps");

  return NextResponse.json({ ok: true, url: publicUrl, filename });
}
