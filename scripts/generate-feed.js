#!/usr/bin/env node
/**
 * generate-feed.js
 *
 * Writes dist/rss.xml (Italian) and dist/en/rss.xml (English) from the synced
 * post JSON, in the postbuild step alongside the sitemap.
 *
 * One feed per language, not one mixed feed: a subscriber picked a language
 * when they picked the URL, and a feed that alternates between two of them is
 * a feed people unsubscribe from. The English feed lists only posts that
 * actually have an `en` block — the same rule the hreflang annotations follow,
 * so the two never disagree about what exists in English.
 *
 * The feed is not a ranking signal, but it is a discovery surface: feed
 * readers, newsletter tools and aggregators find posts through it long before
 * a crawler gets round to re-reading /blog. Each <item> carries the full post
 * HTML in content:encoded, so a reader shows the article rather than a teaser.
 *
 * Site URL overridable via SITE_URL, exactly like the sitemap.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const blogDir = path.resolve(__dirname, '../src/content/blog');

const SITE_URL = (process.env.SITE_URL || 'https://andreagalliani.com').replace(/\/+$/, '');
const AUTHOR = 'Andrea Galliani';

// Mirrors src/i18n/routing.ts and generate-sitemap.js — plain Node can't import
// the TypeScript module, so the URL layout lives in three places and moves together.
const FEEDS = {
  it: {
    path: '/rss.xml',
    blogPath: '/blog',
    title: 'Blog di Andrea Galliani',
    description:
      'Articoli e note dai progetti che sto costruendo: le scelte, gli errori e i numeri veri.',
  },
  en: {
    path: '/en/rss.xml',
    blogPath: '/en/blog',
    title: 'Andrea Galliani’s Blog',
    description:
      'Notes and articles from the projects I am building: the choices, the mistakes and the real numbers.',
  },
};

/** XML text escaping, for the few fields that aren't wrapped in CDATA. */
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** CDATA can't contain the closing sequence; split it across two sections. */
const cdata = (s) => `<![CDATA[${String(s).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

/** RFC 822, which is what RSS 2.0 requires — not the ISO dates everything else uses. */
const rfc822 = (date) => new Date(`${date}T09:00:00Z`).toUTCString();

function posts() {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(blogDir, f), 'utf8')))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

/** The post as it reads in `lang`, or null when it isn't published there. */
function localize(post, lang) {
  if (lang === 'it') return { ...post, url: `${SITE_URL}/blog/${post.slug}` };
  if (!post.en) return null;
  return {
    ...post,
    title: post.en.title,
    excerpt: post.en.excerpt,
    html: post.en.html,
    tags: post.en.tags || post.tags,
    url: `${SITE_URL}/en/blog/${post.en.slug || post.slug}`,
  };
}

function item(post) {
  const date = post.updated || post.date;
  return [
    '    <item>',
    `      <title>${cdata(post.title)}</title>`,
    `      <link>${esc(post.url)}</link>`,
    // The permalink identity of the item: readers dedupe on it, so it must be
    // the canonical URL and must never change once published.
    `      <guid isPermaLink="true">${esc(post.url)}</guid>`,
    ...(date ? [`      <pubDate>${rfc822(date)}</pubDate>`] : []),
    `      <description>${cdata(post.excerpt)}</description>`,
    `      <content:encoded>${cdata(post.html)}</content:encoded>`,
    ...(post.tags || []).map((tag) => `      <category>${cdata(tag)}</category>`),
    `      <dc:creator>${cdata(AUTHOR)}</dc:creator>`,
    '    </item>',
  ].join('\n');
}

function generateFeed(lang) {
  const feed = FEEDS[lang];
  const items = posts()
    .map((p) => localize(p, lang))
    .filter(Boolean);

  const lastBuild = items[0]?.updated || items[0]?.date;

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${cdata(feed.title)}</title>`,
    `    <link>${esc(SITE_URL)}${esc(feed.blogPath)}</link>`,
    `    <description>${cdata(feed.description)}</description>`,
    `    <language>${lang === 'it' ? 'it-IT' : 'en-GB'}</language>`,
    // atom:link rel="self" is how a feed states its own address — without it
    // an aggregator that found the feed by a redirect can't tell them apart.
    `    <atom:link href="${esc(SITE_URL)}${esc(feed.path)}" rel="self" type="application/rss+xml"/>`,
    ...(lastBuild ? [`    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>`] : []),
    items.map(item).join('\n'),
    '  </channel>',
    '</rss>',
  ].join('\n');

  const out = path.join(distDir, feed.path);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, xml, 'utf8');
  console.log(`✅ ${feed.path} generated (${items.length} items)`);
}

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ not found — run `vite build` first.');
  process.exit(1);
}

for (const lang of Object.keys(FEEDS)) generateFeed(lang);
