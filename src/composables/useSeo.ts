import type { Lang } from '../i18n/messages'
import { LANGS, DEFAULT_LANG, SITE_URL, absoluteUrl, localizePath } from '../i18n/routing'

// SEO plumbing shared by every view, so the two language trees are described to
// crawlers consistently. Each page must answer three questions:
//   - which URL is the canonical one for *this* version (never the other tree's);
//   - which other URLs are the same page in another language (hreflang);
//   - which one to serve when the user's language matches nothing (x-default).
// Google only treats the pages as alternates if the annotations are reciprocal,
// which is why both trees emit the identical `alternate` set.

const OG_LOCALE: Record<Lang, string> = { it: 'it_IT', en: 'en_GB' }

/**
 * `link` entries for useHead: canonical for the current language plus the
 * reciprocal hreflang set.
 *
 * @param base language-neutral path of the page, e.g. '/blog' or '/blog/my-post'
 *   (the Italian path — used as-is for `it` and as the `localizePath` fallback
 *   for any language missing from `localizedPaths`).
 * @param translated pass false when this page has no real translation yet (an
 *   untranslated blog post still resolves under /en, but it renders the Italian
 *   text). Such a page points its canonical at the Italian URL and claims no
 *   alternates, so it reads as one page in one language instead of duplicate
 *   content wearing an hreflang label it doesn't deserve.
 * @param localizedPaths override per-language path, for pages where the URL
 *   isn't just `base` with an /en prefix — namely blog posts, which get a
 *   real localized slug (see `LocalizedBlogPost.langPaths`). Without this,
 *   `seoLinks` would build the English alternate as the *Italian* slug under
 *   /en, which is exactly the "same URL, different title" shape that made
 *   Google fold the English page into the Italian one.
 */
export function seoLinks(
  base: string,
  lang: Lang,
  translated = true,
  localizedPaths?: Partial<Record<Lang, string>>,
) {
  const pathFor = (l: Lang) => localizedPaths?.[l] ?? localizePath(base, l)

  if (!translated) {
    return [{ rel: 'canonical', href: absoluteUrl(pathFor(DEFAULT_LANG)) }]
  }
  return [
    { rel: 'canonical', href: absoluteUrl(pathFor(lang)) },
    ...LANGS.map((l) => ({
      rel: 'alternate',
      hreflang: l,
      href: absoluteUrl(pathFor(l)),
    })),
    { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(pathFor(DEFAULT_LANG)) },
  ]
}

/** og:url + og:locale, which have to track the language like the canonical does. */
export function seoOpenGraph(base: string, lang: Lang, localizedPaths?: Partial<Record<Lang, string>>) {
  const path = localizedPaths?.[lang] ?? localizePath(base, lang)
  return [
    { property: 'og:url', content: absoluteUrl(path) },
    { property: 'og:locale', content: OG_LOCALE[lang] },
  ]
}

/** The site-wide fallback image, used by any page that has none of its own. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/propic.webp`

interface SocialOptions {
  title: string
  description: string
  /** Site-absolute or full URL; defaults to the portrait. */
  image?: string | null
  /** What the image shows — read aloud by screen readers on social cards. */
  imageAlt?: string
  type?: 'website' | 'article'
}

/**
 * The Open Graph + Twitter block every page owes a crawler.
 *
 * Without this each view inherited og:title/og:description from index.html —
 * the English home-page copy — so an Italian project page announced itself to
 * every social preview and every crawler as the English portfolio. og:url and
 * og:locale still come from seoOpenGraph, which needs the route.
 *
 * twitter:title/description/image are deliberately absent: X falls back to the
 * og:* values, and two sources for one string is two things to keep in sync.
 */
export function seoSocial({ title, description, image, imageAlt, type = 'website' }: SocialOptions) {
  const src = image ?? DEFAULT_OG_IMAGE
  return [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: 'Andrea Galliani' },
    { property: 'og:image', content: src.startsWith('http') ? src : `${SITE_URL}${src}` },
    { property: 'og:image:alt', content: imageAlt ?? title },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
}

/**
 * The article-specific half for a blog post: dates in the ISO 8601 form the OG
 * spec asks for, the author, and one `article:tag` per tag. `article:author` is
 * a URL rather than a name — it points at the same Person the JSON-LD graph
 * defines, so the two descriptions of "who wrote this" agree.
 */
export function seoArticle(opts: {
  published: string | null
  modified?: string | null
  tags: string[]
  authorUrl?: string
}) {
  const { published, modified, tags, authorUrl = `${SITE_URL}/#person` } = opts
  return [
    ...(published ? [{ property: 'article:published_time', content: published }] : []),
    { property: 'article:modified_time', content: modified || published || '' },
    { property: 'article:author', content: authorUrl },
    { name: 'author', content: 'Andrea Galliani' },
    // A distinct `key` per tag: unhead dedupes meta by property, so without it
    // the whole list would collapse into whichever tag came last.
    ...tags.map((tag) => ({ property: 'article:tag', content: tag, key: `article:tag:${tag}` })),
  ].filter((m) => m.content !== '')
}
