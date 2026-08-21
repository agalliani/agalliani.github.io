#!/usr/bin/env node
/**
 * sync-blog-content.js
 *
 * Syncs blog posts from the (separate) `hab` repo into this site.
 *
 * The two repos stay independent (no submodule, no monorepo — see
 * hab/docs/architettura-blog-sito.md). hab is the single source of truth for
 * content; this script reads the ready-to-publish posts, renders their markdown
 * to HTML *at sync time* (never in the browser), and writes committable
 * artifacts into the site:
 *   - src/content/blog/<slug>.json   (frontmatter + pre-rendered HTML)
 *   - public/images/blog/<slug>/...  (post images, copied verbatim)
 *
 * It does NOT decide what to publish — it mirrors everything under
 * hab/content/blog/. Choosing "this post is ready" is a human decision made in
 * hab (moving a post out of content/diario/ into content/blog/).
 *
 * Source repo path: HAB_REPO_PATH env var, falling back to ../hab relative to
 * this repo's root.
 *
 * Run:  npm run sync-blog   (manual/local step — the generated JSON is what
 * gets committed and what Vercel builds from; this never runs on Vercel).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import katexPlugin from '@vscode/markdown-it-katex';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');

// hab repo path — overridable so the two repos can live anywhere on disk.
const habRoot = process.env.HAB_REPO_PATH
  ? path.resolve(process.env.HAB_REPO_PATH)
  : path.resolve(siteRoot, '../hab');

const blogSrcDir = path.join(habRoot, 'content', 'blog');
const jsonOutDir = path.join(siteRoot, 'src', 'content', 'blog');
const imgOutRoot = path.join(siteRoot, 'public', 'images', 'blog');

// html:false → raw HTML in the markdown is escaped, not injected. Content is
// first-party/trusted (authored by us in hab), so this is a safety default, not
// a full sanitizer.
const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

// Math is written in the posts as LaTeX ($inline$ / $$display$$) and rendered
// to HTML+MathML *here*, at sync time — the browser never loads KaTeX, it only
// needs `katex/dist/katex.min.css` (imported from src/assets/main.css) plus the
// fonts Vite bundles alongside it.
md.use(katexPlugin.default ?? katexPlugin, {
  throwOnError: false,
  strict: false,
  output: 'htmlAndMathml',
});

/** Rewrites relative `images/...` refs to the site-absolute public path. */
function rewriteImagePath(ref, slug) {
  if (!ref) return ref;
  // Only rewrite post-relative refs (leave absolute URLs / already-rooted paths).
  if (/^(https?:)?\/\//.test(ref) || ref.startsWith('/')) return ref;
  const normalized = ref.replace(/^\.\//, '');
  return `/images/blog/${slug}/${normalized.replace(/^images\//, '')}`;
}

function copyPostImages(postDir, slug) {
  const imagesDir = path.join(postDir, 'images');
  if (!fs.existsSync(imagesDir)) return;
  const dest = path.join(imgOutRoot, slug);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(imagesDir, dest, { recursive: true });
}

/** Renders a post's markdown body and points its images at the public path. */
function renderBody(content, slug) {
  return md
    .render(content)
    .replace(/(<img[^>]+src=")([^"]+)(")/g, (_m, pre, ref, post) => `${pre}${rewriteImagePath(ref, slug)}${post}`);
}

/**
 * Optional English rendering, from `index.en.md` next to the Italian index.
 * Date and cover stay single-sourced from the Italian frontmatter (one post,
 * one publication date, one image). `slug`, however, is translatable: set
 * `slug: "..."` in the index.en.md frontmatter to give the translation its
 * own keyword-bearing URL instead of inheriting the Italian one — see
 * docs on ARTICLE_GROUPS-style localized slugs. Falls back to the Italian
 * slug when omitted, for posts translated before this field existed.
 */
function readTranslation(postDir, slug, fallback) {
  const enPath = path.join(postDir, 'index.en.md');
  if (!fs.existsSync(enPath)) return undefined;

  const { data, content } = matter(fs.readFileSync(enPath, 'utf8'));
  const translation = {
    title: data.title || fallback.title,
    excerpt: data.excerpt || fallback.excerpt,
    html: renderBody(content, slug),
  };
  if (data.tags) translation.tags = data.tags;
  if (data.slug) translation.slug = data.slug;
  return translation;
}

function syncPost(slug) {
  const postDir = path.join(blogSrcDir, slug);
  const indexPath = path.join(postDir, 'index.md');
  if (!fs.statSync(postDir).isDirectory() || !fs.existsSync(indexPath)) return false;

  const { data, content } = matter(fs.readFileSync(indexPath, 'utf8'));

  copyPostImages(postDir, slug);

  const post = {
    slug: data.slug || slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : null,
    // `updated:` in the frontmatter, set only when a published post is
    // materially revised. It feeds schema.org `dateModified` and the sitemap's
    // <lastmod>, which is how a crawler learns a URL is worth re-fetching —
    // so it must stay absent rather than default to "today", or every post
    // would claim to have changed on every build.
    updated: data.updated ? new Date(data.updated).toISOString().split('T')[0] : null,
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    cover: data.cover ? rewriteImagePath(data.cover, slug) : null,
    html: renderBody(content, slug),
  };

  const en = readTranslation(postDir, slug, post);
  if (en) post.en = en;

  fs.mkdirSync(jsonOutDir, { recursive: true });
  fs.writeFileSync(path.join(jsonOutDir, `${slug}.json`), `${JSON.stringify(post, null, 2)}\n`, 'utf8');
  return true;
}

function syncAll() {
  if (!fs.existsSync(blogSrcDir)) {
    console.log(`ℹ️  No blog content found at ${blogSrcDir} — nothing to sync.`);
    return;
  }

  const slugs = fs
    .readdirSync(blogSrcDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  let count = 0;
  for (const slug of slugs) {
    if (syncPost(slug)) count += 1;
  }

  console.log(`✅ Synced ${count} blog post(s) from ${blogSrcDir} → src/content/blog/`);
}

syncAll();
