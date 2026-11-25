/**
 * GradPath AU v1 (Live Pilot Site) — Automated Minimal Acceptance Test Kit (MAT)
 *
 * Organized strictly by Customer Journey (J1 -> J4).
 * Run via: node tests/mat-v1.mjs
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const HTML_PATH = path.join(ROOT, "index.html");
const html = fs.readFileSync(HTML_PATH, "utf8");

const REQUIRED_FOUNDERS = [
  "Abhishek Agarwal",
  "Rishi Aggarwal",
  "Brijesh Patel",
  "Paresh Bapna",
  "Jacob George",
  "Shifali Singla",
  "Rupam Agarwal",
];

const results = [];

function runCase(id, journey, title, fn) {
  try {
    fn();
    results.push({ id, journey, title, ok: true });
    console.log(`  PASS  [${id}] ${title}`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    results.push({ id, journey, title, ok: false, error: msg });
    console.error(`  FAIL  [${id}] ${title}\n        -> ${msg}`);
  }
}

console.log("\nGradPath AU v1 — Minimal Acceptance Test Kit (MAT)\n");

// =========================================================================
// JOURNEY 1 — Graduate Discovery, 32 Programs & 7 Melbourne Tech Founders
// =========================================================================
console.log("Journey 1 — Graduate Discovery, 32 Programs & 7 Melbourne Tech Founders");

runCase("MAT-V1-J1-01", "J1", "All inline <script> blocks compile with zero JavaScript syntax errors", () => {
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length >= 1, "Expected at least one inline <script> block");
  for (let i = 0; i < scripts.length; i++) {
    new Function(scripts[i][1]);
  }
});

runCase("MAT-V1-J1-02", "J1", "All 7 Verified Melbourne Tech Founders exist with real headshots on disk", () => {
  for (const name of REQUIRED_FOUNDERS) {
    assert.ok(html.includes(name), `Missing founder in index.html: ${name}`);
  }
  const founderSlugFiles = [
    "assets/mentor-abhishek-agarwal.jpg",
    "assets/mentor-rishi-aggarwal.jpg",
    "assets/mentor-brijesh-patel.jpg",
    "assets/mentor-paresh-bapna.jpg",
    "assets/mentor-jacob-george.jpg",
    "assets/mentor-shifali-singla.jpg",
    "assets/mentor-rupam-agarwal.jpg",
  ];
  for (const rel of founderSlugFiles) {
    assert.ok(html.includes(rel), `index.html missing reference to ${rel}`);
    assert.ok(fs.existsSync(path.join(ROOT, rel)), `Missing file on disk: ${rel}`);
  }
});

runCase("MAT-V1-J1-03", "J1", "All referenced local media assets exist on disk", () => {
  const refs = [...new Set([...html.matchAll(/assets\/[a-zA-Z0-9._-]+/g)].map((m) => m[0]))];
  assert.ok(refs.length >= 10, `Expected >= 10 media asset references, found ${refs.length}`);
  for (const rel of refs) {
    assert.ok(fs.existsSync(path.join(ROOT, rel)), `Broken asset reference: ${rel}`);
  }
  assert.ok(html.includes("assets/mentoring-walkthrough.mp4"), "Missing walkthrough video");
  assert.ok(html.includes("assets/mentoring-walkthrough-poster.jpg"), "Missing walkthrough poster");
});

runCase("MAT-V1-J1-04", "J1", "32 Australian graduate programs loaded in INITIAL_PROGRAMS array", () => {
  const match = html.match(/const INITIAL_PROGRAMS = \[([\s\S]*?)\n    \];/);
  assert.ok(match, "Could not locate INITIAL_PROGRAMS array");
  const companyCount = (match[1].match(/company:\s*"/g) || []).length;
  assert.equal(companyCount, 32, `Expected 32 programs, found ${companyCount}`);
});

// =========================================================================
// JOURNEY 2 — Graduate Self-Practice Lab & Assessment Centre Prep
// =========================================================================
console.log("\nJourney 2 — Graduate Self-Practice Lab & Assessment Centre Prep");

runCase("MAT-V1-J2-01", "J2", "One-Way Video Simulator & SHL Psychometric Drill intact", () => {
  assert.ok(html.includes("const VIDEO_PROMPTS = ["), "Missing VIDEO_PROMPTS");
  assert.ok(html.includes("const PSYCHOMETRIC_QUESTIONS = ["), "Missing PSYCHOMETRIC_QUESTIONS");
  assert.ok(html.includes("renderVideoPrompt"), "Missing renderVideoPrompt");
  assert.ok(html.includes("renderStarBank"), "Missing renderStarBank");
});

runCase("MAT-V1-J2-02", "J2", "Assessment Centre Pilot Cohorts, MediLink Case & 6-point Rubric intact", () => {
  assert.ok(html.includes("MediLink"), "Missing MediLink group case brief");
  assert.ok(html.includes("const AC_COHORTS = ["), "Missing AC_COHORTS");
  assert.ok(html.includes("renderAcCohorts"), "Missing renderAcCohorts");
  assert.ok(html.includes("renderAcRubric"), "Missing renderAcRubric");
});

// =========================================================================
// JOURNEY 3 — Graduate Free 30-Min Pilot Booking & Mobile Navigation
// =========================================================================
console.log("\nJourney 3 — Graduate Free 30-Min Pilot Booking & Mobile Navigation");

runCase("MAT-V1-J3-01", "J3", "Booking modal wired to Formspree endpoint & mentor_portal_link", () => {
  assert.ok(html.includes("https://formspree.io/f/xjywpzpq"), "Missing Formspree endpoint");
  assert.ok(html.includes("mentor_portal_link"), "Missing mentor_portal_link field");
});

runCase("MAT-V1-J3-02", "J3", "No mobile bottom-nav vs Session Blueprint data-mtab attribute collision", () => {
  assert.ok(html.includes("data-mtab="), "Missing mobile nav data-mtab");
  assert.ok(html.includes("data-extab="), "Missing Session Blueprint showcase data-extab");
});

// =========================================================================
// JOURNEY 4 — Mentor Studio, Google Meet Invite & Branded Scorecard
// =========================================================================
console.log("\nJourney 4 — Mentor Studio, Google Meet Invite & Branded Scorecard");

runCase("MAT-V1-J4-01", "J4", "Mentor Studio uses Google Meet + deployed Apps Script URL with zero Jitsi", () => {
  assert.ok(!/meet\.jit\.si|jitsi/i.test(html), "Found prohibited Jitsi reference in v1 index.html");
  assert.ok(html.includes("google_meet_auto"), "Missing google_meet_auto mode");
  assert.ok(html.includes("https://meet.new"), "Missing meet.new quick-create shortcut");
  assert.ok(html.includes("createGoogleMeet"), "Missing createGoogleMeet payload flag");
  assert.ok(
    html.includes("https://script.google.com/macros/s/AKfycbywPJBMhjvQumYR9-7rfySTXnWt6jHtpNVl0UbDXkvPG8Lek45GdHb2Zu2TizBW81mj/exec"),
    "Missing deployed Google Apps Script Web App URL"
  );
});

runCase("MAT-V1-J4-02", "J4", "Branded Scorecard (?report=) & Studio deep-link router intact", () => {
  assert.ok(html.includes("decodeReportPayload"), "Missing decodeReportPayload");
  assert.ok(html.includes("renderBrandedReport"), "Missing renderBrandedReport");
  assert.ok(html.includes("handleDeepLinks"), "Missing handleDeepLinks");
});

const passed = results.filter((r) => r.ok).length;
const failed = results.filter((r) => !r.ok);
console.log(`\n=============================================================`);
console.log(`V1 MAT REGRESSION SUMMARY: ${passed}/${results.length} PASSED, ${failed.length} FAILED`);
console.log(`=============================================================\n`);

if (failed.length > 0) process.exit(1);
