import assert from "node:assert/strict";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !anon) throw new Error("Local Supabase public configuration is required.");
const headers = { apikey: anon, "Content-Type": "application/json" };
// Legacy anon JWTs use Authorization; publishable keys are sent only as apikey.
if (anon.startsWith("eyJ")) headers.Authorization = `Bearer ${anon}`;
for (const table of ["inquiries", "inquiry_rate_limits"]) {
  const key = table === "inquiries" ? "id" : "bucket_key";
  for (const method of ["GET", "PATCH", "DELETE", "POST"]) {
    // Primary keys cannot be NULL, so even a misconfigured policy cannot mutate an existing row.
    const query = method === "GET" ? `select=${key}&limit=0` : `${key}=is.null`;
    const response = await fetch(`${url}/rest/v1/${table}?${query}`, {
      method, headers, signal: AbortSignal.timeout(10000),
      ...(method === "POST" || method === "PATCH" ? { body: "{}" } : {}),
    });
    const data = await response.json();
    assert([401, 403].includes(response.status) && data.code === "42501", `Expected permission denial for anonymous ${method} ${table}; received ${response.status}`);
    console.log(`PASS: anonymous ${method} ${table} denied`);
  }
}
const rpc = await fetch(`${url}/rest/v1/rpc/consume_inquiry_rate_limit`, {
  method: "POST", headers, body: JSON.stringify({ p_key: "0".repeat(64), p_limit: 0 }), signal: AbortSignal.timeout(10000),
});
const rpcData = await rpc.json();
assert([401, 403].includes(rpc.status) && rpcData.code === "42501", "Anonymous rate-limit RPC must be denied");
console.log("PASS: anonymous RPC denied; no customer data read or modified.");
for (const scheme of ["http", "https"]) {
  const response = await fetch(`${scheme}://eshanasolutions.com`, { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(10000) });
  const location = response.headers.get("location");
  console.log(JSON.stringify({ scheme, status: response.status, location, hsts: response.headers.get("strict-transport-security"), cspPresent: response.headers.has("content-security-policy") }));
  if (scheme === "http") assert([301, 302, 307, 308].includes(response.status) && location?.startsWith("https://"), "Production must redirect HTTP to HTTPS");
  else assert(response.status < 400 && response.headers.has("strict-transport-security"), "Production HTTPS and HSTS required");
}
