import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "jeremiahdaws.com";
// The production aliases that should not be a second, crawlable copy of the
// site. Preview deployments keep their own *.vercel.app hosts and are skipped.
const ALIASES = new Set(["jeremiahdaws.vercel.app", "jeremiahdaws-portfolio.vercel.app"]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host")?.toLowerCase() ?? "";
  const isAdmin =
    req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname.startsWith("/api/admin");

  if (ALIASES.has(host)) {
    const url = req.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  // The admin UI and its routes are a local-only tool: /admin renders the whole
  // catalog (including hidden entries) and /api/admin/polish spends real API
  // credits, so in production they must not answer anonymous requests at all.
  if (isAdmin && process.env.NODE_ENV === "production" && !process.env.ALLOW_ADMIN) {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "content-type": "text/plain", "x-robots-tag": "noindex" },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next's internals and static files, so the alias redirect
  // covers whole pages without touching asset requests.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
