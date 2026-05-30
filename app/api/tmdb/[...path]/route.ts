import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Catch-all proxy to TMDB.
 *
 * The browser hits /api/tmdb/3/search/movie?query=… and this route forwards to
 * https://api.themoviedb.org/3/search/movie?query=…&api_key=$TMDB_API_KEY.
 * The api_key only ever lives in a Vercel env var — never reaches the client.
 *
 * Wired for the /movies.html randomizer so the embedded TMDB calls don't leak
 * the key to anyone viewing source.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  // Trim — echo-piped env values can carry a trailing \n that TMDB rejects as "Invalid API key"
  const apiKey = (process.env.TMDB_API_KEY || "").trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "TMDB_API_KEY not configured" },
      { status: 503 },
    );
  }

  const { path } = await params;
  if (!path?.length) {
    return NextResponse.json({ error: "missing TMDB path" }, { status: 400 });
  }

  const tmdb = new URL(`https://api.themoviedb.org/${path.join("/")}`);
  // Forward every query param except a client-supplied api_key
  req.nextUrl.searchParams.forEach((value, key) => {
    if (key !== "api_key") tmdb.searchParams.set(key, value);
  });
  tmdb.searchParams.set("api_key", apiKey);

  try {
    const upstream = await fetch(tmdb.toString(), {
      // No client-side caching headers; we'll cache via CDN below
      headers: { Accept: "application/json" },
    });
    const data = await upstream.json();
    const res = NextResponse.json(data, { status: upstream.status });
    // Cache successful responses on Vercel's edge for an hour, allow stale-while-revalidate for a day
    if (upstream.ok) {
      res.headers.set(
        "Cache-Control",
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      );
    }
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "tmdb proxy failed", message: String(err) },
      { status: 502 },
    );
  }
}
