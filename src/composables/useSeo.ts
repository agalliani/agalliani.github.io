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
 * @param translated pass false when this page has no real translation yet (an
 *   untranslated blog post still resolves under /en, but it renders the Italian
 *   text). Such a page points its canonical at the Italian URL and claims no
 *   alternates, so it reads as one page in one language instead of duplicate
 *   content wearing an hreflang label it doesn't deserve.
 */
export function seoLinks(base: string, lang: Lang, translated = true) {
  if (!translated) {
    return [{ rel: 'canonical', href: absoluteUrl(localizePath(base, DEFAULT_LANG)) }]
  }
  return [
    { rel: 'canonical', href: absoluteUrl(localizePath(base, lang)) },
    ...LANGS.map((l) => ({
      rel: 'alternate',
      hreflang: l,
      href: absoluteUrl(localizePath(base, l)),
    })),
    { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(localizePath(base, DEFAULT_LANG)) },
  ]
}

/** og:url + og:locale, which have to track the language like the canonical does. */
export function seoOpenGraph(base: string, lang: Lang) {
  return [
    { property: 'og:url', content: absoluteUrl(localizePath(base, lang)) },
    { property: 'og:locale', content: OG_LOCALE[lang] },
  ]
}
