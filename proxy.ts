import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { contentSecurityPolicy } from "./lib/security";

export function proxy(request: NextRequest) {
  if (!["GET", "HEAD", "POST"].includes(request.method)) {
    return new NextResponse(null, { status: 405, headers: { Allow: "GET, HEAD, POST" } });
  }
  const nonce = randomBytes(18).toString("base64");
  const csp = contentSecurityPolicy(nonce, process.env.NODE_ENV === "development");
  const requestHeaders = new Headers(request.headers);
  // Overwrite any client-provided nonce or CSP rather than trusting request input.
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
