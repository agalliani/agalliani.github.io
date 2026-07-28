// URL layout for the two languages.
//
// Italian is the default and lives at the bare paths (/, /projects, /blog/...);
// English is the same tree under an /en prefix. The URL — not localStorage — is
// the single source of truth for the current language: that's what makes the
// English pages crawlable, since a search engine only ever sees the server
// response for a URL, never a client-side toggle.
//
// Both trees are prerendered by vite-ssg (see `includedRoutes` in
// vite.config.ts) and cross-linked with hreflang (see composables/useSeo.ts).

import type { Lang } from './messages'

export const LANGS: Lang[] = ['it', 'en']

/** The language served at the un-prefixed paths, and the hreflang x-default. */
export const DEFAULT_LANG: Lang = 'it'

export const SITE_URL = 'https://andreagalliani.com'

const PREFIX: Record<Lang, string> = { it: '', en: '/en' }

// Matches the prefix only as a whole path segment, so a future /english-… page
// wouldn't be mistaken for the English tree.
const PREFIX_RE = /^\/en(?=\/|$)/

/** The language a path belongs to, read from its prefix. */
export function langFromPath(path: string): Lang {
  return PREFIX_RE.test(path) ? 'en' : DEFAULT_LANG
}

/** Strips the language prefix — the language-neutral identity of a page. */
export function basePath(path: string): string {
  const stripped = path.replace(PREFIX_RE, '')
  return stripped === '' ? '/' : stripped
}

/** The same page in another language: localizePath('/blog', 'en') → '/en/blog'. */
export function localizePath(path: string, lang: Lang): string {
  const base = basePath(path)
  if (lang === DEFAULT_LANG) return base
  return base === '/' ? PREFIX[lang] : `${PREFIX[lang]}${base}`
}

/** Absolute URL for a site path — canonicals and og:url must not be relative. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
}
