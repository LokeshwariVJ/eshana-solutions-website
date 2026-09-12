import "server-only";
import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { createInquiryClient } from "../supabase/server";

export function requestAddress(requestHeaders: Pick<Headers, "get">): string {
  // Only trust Vercel's overwritten proxy header, never arbitrary client forwarding headers.
  const forwarded = process.env.VERCEL === "1" ? requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0].trim() : undefined;
  return forwarded && isIP(forwarded) ? forwarded : "shared-origin";
}

export async function allowInquiry(address: string, email: string): Promise<boolean> {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Rate limiting is not configured");
  const client = createInquiryClient();
  for (const [identity, limit] of [[`ip:${address}`, 10], [`email:${email}`, 3]] as const) {
    const key = createHmac("sha256", secret).update(identity).digest("hex");
    const { data, error } = await client.rpc("consume_inquiry_rate_limit", { p_key: key, p_limit: limit }).abortSignal(AbortSignal.timeout(5000));
    if (error) throw new Error("Rate limiter unavailable");
    if (data !== true) return false;
  }
  return true;
}
