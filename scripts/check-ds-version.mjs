#!/usr/bin/env node
/**
 * check-ds-version.mjs — prebuild guard for portlink-landing.
 *
 * Ensures the vendored DS distribution in app/_ds is a real, present,
 * parseable version. In dev (when the DS repo is present as a sibling
 * directory), also checks that the vendored VERSION isn't behind the DS.
 *
 * Fails fast (exit 1) if:
 *   - app/_ds/VERSION is missing or empty
 *   - app/_ds/portlink-tokens.dist.css is missing
 *   - In --strict mode: vendored VERSION is older than ../portlink-design-system's
 *     design-system-v3/VERSION (tells the dev to run `npm run ds:sync` in the DS repo).
 *
 * Emits a warning (nonfatal) if the sibling DS repo is newer but --strict
 * isn't set (so CI builds continue even when the DS repo isn't checked out).
 *
 * Flags:
 *   --strict    fail on drift against sibling DS repo
 *   --quiet     suppress "in sync" success output
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const STRICT = process.argv.includes("--strict") || process.env.DS_STRICT === "1";
const QUIET = process.argv.includes("--quiet");

const VENDOR_DIR = path.join(ROOT, "app/_ds");
const VENDOR_VERSION = path.join(VENDOR_DIR, "VERSION");
const VENDOR_TOKENS = path.join(VENDOR_DIR, "portlink-tokens.dist.css");

function fail(msg) {
  console.error(`[ds-guard] FAIL ${msg}`);
  console.error(`[ds-guard]   fix: cd ../portlink-design-system && npm run ds:release`);
  process.exit(1);
}

function parseSemver(v) {
  const m = /^v?(\d+)\.(\d+)\.(\d+)/.exec(v.trim());
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], raw: v.trim() };
}

function cmp(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}

// ------------------------------------------------------------------
// Sanity: vendored artifacts exist
// ------------------------------------------------------------------
if (!existsSync(VENDOR_TOKENS)) {
  fail(`missing vendored DS tokens at app/_ds/portlink-tokens.dist.css`);
}
if (!existsSync(VENDOR_VERSION)) {
  fail(`missing vendored VERSION at app/_ds/VERSION`);
}
const vendored = readFileSync(VENDOR_VERSION, "utf8").trim();
if (!vendored) fail(`VERSION file is empty`);

const vendoredSemver = parseSemver(vendored);
if (!vendoredSemver) fail(`VERSION not in vX.Y.Z form: "${vendored}"`);

// ------------------------------------------------------------------
// Optional: compare against sibling DS repo
// ------------------------------------------------------------------
const dsSiblingVersion = path.resolve(ROOT, "../portlink-design-system/design-system-v3/VERSION");
if (existsSync(dsSiblingVersion)) {
  const latest = readFileSync(dsSiblingVersion, "utf8").trim();
  const latestSemver = parseSemver(latest);
  if (latestSemver && cmp(vendoredSemver, latestSemver) < 0) {
    const msg = `vendored DS is ${vendored}, sibling repo has ${latest}`;
    if (STRICT) fail(msg);
    console.warn(`[ds-guard] WARN ${msg} (run \`npm run ds:release\` in the DS repo)`);
  }
}

if (!QUIET) {
  console.log(`[ds-guard] ok — DS ${vendored} vendored at app/_ds/`);
}
