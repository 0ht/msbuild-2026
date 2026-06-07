#!/usr/bin/env node

/**
 * URL がすでに announcements エントリに含まれているかチェックするスクリプト。
 *
 * Usage:
 *   node scripts/check-url.mjs <URL>
 *   node scripts/check-url.mjs <URL1> <URL2> ...
 *
 * Exit code:
 *   0 — すべての URL がいずれかのエントリに存在
 *   1 — 未カバーの URL が存在
 *
 * 出力:
 *   各 URL に対して ✓ (カバー済み) or ✗ (未カバー) を表示
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ANNOUNCEMENTS_DIR = join(import.meta.dirname, "../content/announcements");

function extractUrls(content) {
  const urls = new Set();

  // frontmatter official_sources
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    const fm = fmMatch[1];
    for (const line of fm.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("- http")) {
        urls.add(trimmed.slice(2).trim());
      }
    }
  }

  // markdown links [text](url)
  const linkRe = /\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
  let m;
  while ((m = linkRe.exec(content)) !== null) {
    urls.add(m[2]);
  }

  // bare URLs in text
  const bareRe = /(?<!\()(https?:\/\/[^\s)<>"]+)/g;
  while ((m = bareRe.exec(content)) !== null) {
    urls.add(m[1]);
  }

  return urls;
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    // Remove locale prefix for learn.microsoft.com
    u.pathname = u.pathname.replace(/^\/(ja-jp|en-us|zh-cn|fr-fr|de-de)\//i, "/");
    // Remove trailing slash
    u.pathname = u.pathname.replace(/\/$/, "");
    // Lowercase host
    u.hostname = u.hostname.toLowerCase();
    // Remove common tracking params
    u.searchParams.delete("wt.mc_id");
    u.searchParams.delete("ocid");
    u.searchParams.delete("source");
    u.searchParams.delete("tab");
    return u.toString();
  } catch {
    return url.toLowerCase();
  }
}

// Collect all URLs from announcements
const allUrls = new Map(); // normalized URL -> { file, original }

const files = readdirSync(ANNOUNCEMENTS_DIR).filter((f) => f.endsWith(".md"));
for (const file of files) {
  const content = readFileSync(join(ANNOUNCEMENTS_DIR, file), "utf-8");
  const urls = extractUrls(content);
  for (const url of urls) {
    const norm = normalizeUrl(url);
    if (!allUrls.has(norm)) {
      allUrls.set(norm, { file, original: url });
    }
  }
}

// Check input URLs
const inputUrls = process.argv.slice(2);

if (inputUrls.length === 0) {
  console.log(`Usage: node scripts/check-url.mjs <URL> [URL2] ...`);
  console.log(`\nTotal URLs indexed from ${files.length} announcement files: ${allUrls.size}`);
  process.exit(0);
}

let hasUncovered = false;

for (const input of inputUrls) {
  const norm = normalizeUrl(input);
  const match = allUrls.get(norm);
  if (match) {
    console.log(`✓ ${input}`);
    console.log(`  → ${match.file}`);
  } else {
    console.log(`✗ ${input}`);
    console.log(`  (未カバー)`);
    hasUncovered = true;
  }
}

process.exit(hasUncovered ? 1 : 0);
