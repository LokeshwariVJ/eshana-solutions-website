import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const names = ["SUPABASE_SERVICE_ROLE_KEY", "RESEND_API_KEY"];
const secrets = names.flatMap(name => process.env[name] ? [[name, process.env[name]]] : []);
const tracked = execFileSync("git", ["ls-files", "-z"]).toString().split("\0").filter(Boolean);
const findings = [];
function scan(label, data) {
  for (const [name, value] of secrets) {
    if (value.length >= 12 && data.includes(value)) findings.push(`${label}: ${name}`);
  }
}
const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard", "-z"]).toString().split("\0").filter(Boolean);
for (const file of [...tracked, ...untracked]) if (existsSync(file)) scan(file, readFileSync(file).toString());
scan("git diff", execFileSync("git", ["diff", "HEAD"], { maxBuffer: 20 * 1024 * 1024 }).toString());
if (process.argv.includes("--history")) {
  scan("git history", execFileSync("git", ["log", "--all", "-p", "--format="], { maxBuffer: 100 * 1024 * 1024 }).toString());
}
function walk(path) {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const file = join(path, entry.name);
    if (entry.isDirectory()) walk(file);
    else {
      const content = readFileSync(file).toString();
      scan(file, content);
      if (names.some(name => content.includes(name))) findings.push(`${file}: server credential reference in client asset`);
    }
  }
}
if (!existsSync(".next/static")) throw new Error("Run a production build before scanning client assets.");
walk(".next/static");
const example = readFileSync(".env.example", "utf8").trim().split(/\r?\n/);
if (!example.every(line => /^[A-Z][A-Z0-9_]*=$/.test(line))) findings.push(".env.example must contain empty variable declarations only");
if (tracked.some(file => /(^|\/)\.env(\.|$)/.test(file) && file !== ".env.example")) findings.push("Environment file is tracked");
execFileSync("git", ["check-ignore", "-q", ".env.local"]);
if (findings.length) {
  console.error(findings.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`PASS: tracked files, diff and client assets contain none of the ${secrets.length} configured private key values; environment hygiene passes.`);
  if (secrets.length !== names.length) console.log("NOTE: configure both private keys locally for a complete exact-value check.");
}
