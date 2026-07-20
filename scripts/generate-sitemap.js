#!/usr/bin/env node
/**
 * generate-sitemap.js
 *
 * Generates sitemap.xml and robots.txt into dist/ after the Vite build.
 *
 * Approach mirrored from frontend-oxymeter/scripts/generate-sitemap.js (same author,
 * same conventions) — see that file for the reference implementation:
 *  - Only <loc> and <lastmod> in the sitemap — Google ignores <priority>/<changefreq>
 *    since 2024, so they're just dead weight.
 *  - <lastmod> in ISO 8601 date format (YYYY-MM-DD).
 *  - Site URL overridable via SITE_URL env var (falls back to the production domain),
 *    so preview/staging builds don't leak the wrong canonical host into the sitemap.
 *  - robots.txt allows real-time AI browsing/citation bots (Google-Extended,
 *    ChatGPT-User, PerplexityBot) but blocks AI training crawlers.
 *
 * Run:  node scripts/generate-sitemap.js
 * Hook: runs automatically in the "postbuild" step via package.json (after `vite build`,
 * so it writes straight into dist/, alongside the rest of the static output).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

const SITE_URL = (process.env.SITE_URL || 'https://andreagalliani.com').replace(/\/+$/, '');
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// Single source of truth for indexable page routes.
// Keep this in sync with src/router/index.ts — the catch-all 404 route is
// intentionally excluded. The /blog section is added dynamically below from the
// synced post JSON, so it stays in sync with what actually got published.
const PAGES = ['/', '/blog'];

// Static, directly-indexable assets that live outside the router (not "pages").
const ASSETS = ['/scientific_academic_cv_eng.pdf'];

const blogDir = path.resolve(__dirname, '../src/content/blog');

/** Wraps a URL entry with <loc> and <lastmod> only — Google ignores priority/changefreq. */
const urlEntry = (loc, lastmod = TODAY) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;

/** One <url> per synced blog post, using the post's own date as <lastmod>. */
function blogEntries() {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(blogDir, f), 'utf8')))
    .map((post) => urlEntry(`${SITE_URL}/blog/${post.slug}`, post.date || TODAY));
}

function generateSitemap() {
  const urls = [
    ...[...PAGES, ...ASSETS].map((p) => urlEntry(`${SITE_URL}${p}`)),
    ...blogEntries(),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
  ].join('\n');

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
  console.log(`✅ sitemap.xml generated (${urls.length} URLs) → ${SITE_URL}`);
}

function generateRobots() {
  const content = `# ---- REGOLE GLOBALI PER TUTTI I MOTORI DI RICERCA ----
User-agent: *
Allow: /

# ---- AI BOTS: POLICY SFUMATA ----
# Apriamo i bot di browsing in tempo reale (citano il sito nelle risposte live)
# e i bot usati per AI Overviews di Google Search.
# Google-Extended, ChatGPT-User, PerplexityBot: nessuna regola qui sotto =
# ereditano Allow: / dal blocco globale.

# Blocchiamo solo i bot di TRAINING (raccolgono dati per addestrare LLM senza compenso)
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

# ---- LINK ALLA SITEMAP ----
Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(distDir, 'robots.txt'), content, 'utf8');
  console.log('✅ robots.txt generated');
}

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ not found — run `vite build` first.');
  process.exit(1);
}

generateSitemap();
generateRobots();
