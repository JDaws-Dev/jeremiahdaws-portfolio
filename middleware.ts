import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The admin UI and its routes are a local-only tool: /admin renders the whole
// catalog (including hidden entries) and /api/admin/polish spends real API
// credits, so in production they must not answer anonymous requests at all.
// Deploy and upload already refuse in production; this covers the rest.
export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_ADMIN) {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "content-type": "text/plain", "x-robots-tag": "noindex" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
