import type { Lang } from '../i18n/messages'
import { LANGS, DEFAULT_LANG, absoluteUrl, localizePath } from '../i18n/routing'

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
