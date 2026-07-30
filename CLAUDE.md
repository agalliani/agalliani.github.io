# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio + blog for Andrea Galliani. Vue 3 + Vite 6 + TypeScript SPA that is **prerendered to static HTML with `vite-ssg`** and deployed on **Vercel** (despite the `agalliani.github.io` repo name, it is not served from GitHub Pages). The canonical production domain is `https://andreagalliani.com`.

Node `>=22` is required (`.node-version` pins `22.12.0`).

## Commands

```bash
npm run dev          # Vite dev server (SPA mode, no SSG)
npm run build        # type-check (vue-tsc) + vite-ssg prerender + postbuild sitemap/robots
npm run preview      # serve the built dist/ locally on :4173
npm run type-check   # vue-tsc --build only

npm run sync-blog    # pull blog posts from the sibling ../hab repo (see below)

npm run test:e2e     # build preview + run Cypress e2e headless
npm run test:e2e:dev # dev server + open Cypress e2e interactively
npm run test:unit    # Cypress component tests headless
npm run test:unit:dev# open Cypress component runner
```

Testing is **Cypress only** (e2e + component) — there is no Vitest/Jest. E2e specs live in `cypress/e2e/*.cy.ts`; component specs are expected at `src/**/__tests__/*.cy.ts`. To run a single e2e spec against an already-running preview server: `npx cypress run --e2e --spec cypress/e2e/example.cy.ts`.

## Architecture

### Prerendering (vite-ssg)
- `src/main.ts` exports `createApp` from `ViteSSG(...)` — **do not** call `createApp`/`mount` manually; vite-ssg owns router creation (memory history on server, web history in browser), unhead, and mounting.
- `src/router/index.ts` exports only the **route table** (`routes`), not a created router.
- `vite.config.ts` → `ssgOptions.includedRoutes` is an **explicit** list: `['/', '/blog', ...blogRoutes()]`. `blogRoutes()` reads `src/content/blog/*.json` at build time so every post gets prerendered. The catch-all 404 and the `/blog/:slug` template route are intentionally excluded.
- `dirStyle: 'nested'` emits `dist/<route>/index.html`, which Vercel serves via filesystem match before the SPA rewrite in `vercel.json`.

### Blog content pipeline
Blog posts originate in a **separate `hab` repo** (single source of truth for content; no submodule/monorepo). `scripts/sync-blog-content.js`:
- Reads `../hab/content/blog/<slug>/index.md` (path overridable via `HAB_REPO_PATH`).
- Renders markdown → HTML **at sync time** with `markdown-it` (`html: false`), rewrites relative image refs to `/images/blog/<slug>/...`, copies images into `public/images/blog/`.
- Writes committable `src/content/blog/<slug>.json` (shape defined in `src/types/blog.ts`).

The generated JSON + images are **committed artifacts** and are what Vercel builds from — `sync-blog` **never runs on Vercel**, it is a manual local step. In the views (`BlogListView.vue`, `BlogPostView.vue`), posts are loaded via eager `import.meta.glob('../content/blog/*.json', { eager: true })` so they resolve synchronously (no client fetch), and `post.html` is injected with `v-html` (trusted first-party content). `src/content/blog/` may be empty in a fresh checkout — the pipeline handles that gracefully.

### i18n (two indexable language trees)
Italian is the default and lives at the bare paths; English is the same tree under `/en`. **The URL is the language state** — there is no stored preference, because a crawler has neither storage nor a toggle to click.

- `src/i18n/routing.ts` owns the URL layout (`localizePath`, `langFromPath`) and is shared by the router, the views and `vite.config.ts`, so prerendered paths can't drift from the route table.
- `src/router/index.ts` declares each page once (Italian) and **derives** the `/en` variant; `includedRoutes` prerenders both trees, so `dist/en/**` is real English HTML.
- `main.ts` creates **one `lang` ref per app instance** and syncs it in a `router.beforeEach`. It must not be a module-level ref: vite-ssg prerenders routes concurrently in one process, and a shared ref leaks a language across passes (this shipped Italian pages with English markup once already).
- `useI18n()` reads that ref via `inject` — so it, and everything built on it (`usePosts`, `useLatestPosts`, `usePost`), is a **composable that must be called from setup**. `lp('/blog')` localises internal links.
- Per-post translation: an optional `en` block in `src/content/blog/<slug>.json`, synced from `index.en.md` in the `hab` post directory. A post without one still resolves under `/en` but renders Italian, so it canonicalises to the Italian URL and claims no hreflang alternates (see `composables/useSeo.ts`).
- **Localized post slugs:** `en.slug` (optional, set via `slug:` frontmatter in `index.en.md`) gives a translated post its own English URL — e.g. IT `/blog/mandare-un-pezzo-di-me-in-stratosfera` → EN `/en/blog/send-a-piece-of-myself-to-the-stratosphere` — instead of the Italian slug reused under `/en`. This is deliberate: two pages sharing one slug and differing only by an `/en` prefix reads to Google as probable duplicate content, and it can fold the English page's title/snippet into the Italian one's. A real per-language slug makes the two documents unambiguous. Translations that predate this field fall back to the Italian slug (old behaviour) — see `LocalizedBlogPost.langPaths` in `composables/useBlogPosts.ts`, which is the single place that resolves "what's this post's URL in language X" for canonical/hreflang/sitemap/prerendering. Renaming an already-indexed post's slug needs a matching 301 in `vercel.json` `redirects`.

### SEO
- Every view sets meta via `useHead` from `@unhead/vue`; the app-level title template `%s | Andrea Galliani` lives in `App.vue`. Meta is baked into the static HTML so non-JS crawlers see it.
- `composables/useSeo.ts` produces the per-page canonical + reciprocal hreflang set (`it`, `en`, `x-default`) and the language-aware `og:url`/`og:locale`. `App.vue` owns `htmlAttrs.lang`.
- `scripts/generate-sitemap.js` runs in the `postbuild` step and writes `dist/sitemap.xml` + `dist/robots.txt`. `PAGES` in that script must be kept in sync with `src/router/index.ts`, and it **duplicates the `/en` prefix logic** from `src/i18n/routing.ts` (plain Node, can't import TS) — change both together. Each page is emitted once per language with `xhtml:link` alternates; blog URLs are added dynamically from the synced JSON. Site URL is overridable via `SITE_URL` env (defaults to the production domain) so preview builds don't leak the wrong canonical host.
- `vercel.json` gives `sitemap.xml`/`robots.txt` correct content-type + caching and rewrites everything else to the SPA entry.

### Styling
Tailwind **v4**, configured in CSS: `src/assets/main.css` uses `@import "tailwindcss"` and defines the theme in an `@theme` block. **`tailwind.config.js` is vestigial (v3-style) and not the active source of theme tokens** — edit `main.css` for theme changes. PostCSS uses `@tailwindcss/postcss`. Design is dark-mode (slate-950 bg, amber-400 accent).

### Home page
`src/views/HomeView.vue` is a single-page composition of section components (`Hero`, `Projects`, `Publications`, `Skills`, `Footer`, `Navbar`) with in-page anchor navigation (`#hero`, `#projects`, etc.).

## Notes
- Pinia is installed and registered but currently unused (no stores).
- PWA is enabled via `vite-plugin-pwa` (autoUpdate, offline caching of fonts/assets) — config in `vite.config.ts`.
- The `@` alias resolves to `src/`.
