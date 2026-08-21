import type { Lang } from '../i18n/messages'
import { SITE_URL, absoluteUrl, localizePath } from '../i18n/routing'
import type { LocalizedBlogPost } from './useBlogPosts'

// schema.org JSON-LD, the machine-readable half of every page.
//
// The meta tags in useSeo tell Google which URL a page is and what language it
// speaks; these graphs tell it *what the page is about* — that a post is an
// article with an author and a date, that the author is a person with a
// LinkedIn profile, that a post sits under /blog which sits under the home
// page. That is what makes a result eligible for the article/breadcrumb
// treatment in Search instead of a bare blue link.
//
// Everything is emitted as a single `@graph` per page with stable `@id`s, so
// the nodes cross-reference each other (post → author → site) instead of
// repeating the same Person inline three times. The ids are URLs with a
// fragment: they name a *thing*, not a page, which is why they never collide
// with a canonical.

const PERSON_ID = `${SITE_URL}/#person`
const SITE_ID = `${SITE_URL}/#website`

const IN_LANGUAGE: Record<Lang, string> = { it: 'it-IT', en: 'en-GB' }

/** The one image that stands in for the site (and for a post without a cover). */
const DEFAULT_IMAGE = `${SITE_URL}/propic.webp`

type Node = Record<string, unknown>

/**
 * Andrea, the author of everything here. Referenced by `@id` from the site and
 * from every post rather than duplicated: Google merges nodes by id, so one
 * definition keeps the entity single across the whole site.
 */
function person(lang: Lang): Node {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Andrea Galliani',
    url: absoluteUrl(localizePath('/', lang)),
    image: DEFAULT_IMAGE,
    // Untranslated on purpose: it is the job title as it reads on LinkedIn,
    // and sameAs only pays off when the two descriptions match.
    jobTitle: 'Analog Mixed-Signal Engineer',
    worksFor: { '@type': 'Organization', name: 'Bosch Sensortec' },
    knowsAbout: [
      'Analog Mixed-Signal Design',
      'CMOS 28nm',
      'Industrial IoT',
      'Embedded Systems',
      'High Altitude Balloon',
    ],
    // sameAs is how a knowledge-graph entity gets tied to the profiles that
    // already describe it elsewhere — the strongest signal that the "Andrea
    // Galliani" of this site is a specific real person.
    sameAs: [
      'https://www.linkedin.com/in/andreagalliani',
      'https://github.com/agalliani',
      'https://scholar.google.com/citations?user=mReBtJQAAAAJ',
    ],
  }
}

function website(lang: Lang): Node {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: absoluteUrl(localizePath('/', lang)),
    name: 'Andrea Galliani',
    inLanguage: IN_LANGUAGE[lang],
    publisher: { '@id': PERSON_ID },
  }
}

/**
 * The trail from the home page down to the current page. Mirrors the visible
 * breadcrumb in the UI — Google requires the two to agree, and a breadcrumb
 * nobody can see is a structured-data violation, not a shortcut.
 */
export function breadcrumb(items: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Wraps nodes into the single `@graph` a page emits. */
function graph(lang: Lang, ...nodes: Node[]): Node {
  return {
    '@context': 'https://schema.org',
    '@graph': [person(lang), website(lang), ...nodes],
  }
}

/** Home page: the person and the site are the whole story. */
export function homeSchema(lang: Lang, description: string): Node {
  const url = absoluteUrl(localizePath('/', lang))
  return graph(lang, {
    '@type': 'ProfilePage',
    url,
    name: 'Andrea Galliani',
    description,
    inLanguage: IN_LANGUAGE[lang],
    isPartOf: { '@id': SITE_ID },
    mainEntity: { '@id': PERSON_ID },
  })
}

/** A plain content page (/projects) — described, but not an article. */
export function pageSchema(
  lang: Lang,
  path: string,
  name: string,
  description: string,
  trail: { name: string; path: string }[],
): Node {
  return graph(
    lang,
    {
      '@type': 'WebPage',
      url: absoluteUrl(localizePath(path, lang)),
      name,
      description,
      inLanguage: IN_LANGUAGE[lang],
      isPartOf: { '@id': SITE_ID },
      about: { '@id': PERSON_ID },
    },
    breadcrumb(trail),
  )
}

/**
 * The blog index, as a Blog whose `blogPost` list names the posts it links to.
 * This is the crawl hint the list page already gives in HTML, restated in a
 * form a parser can't misread.
 */
export function blogListSchema(
  lang: Lang,
  description: string,
  posts: LocalizedBlogPost[],
  trail: { name: string; path: string }[],
): Node {
  return graph(
    lang,
    {
      '@type': 'Blog',
      '@id': `${SITE_URL}/#blog`,
      url: absoluteUrl(localizePath('/blog', lang)),
      name: 'Blog | Andrea Galliani',
      description,
      inLanguage: IN_LANGUAGE[lang],
      isPartOf: { '@id': SITE_ID },
      author: { '@id': PERSON_ID },
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        '@id': `${absoluteUrl(postPath(p, lang))}#article`,
        headline: p.title,
        url: absoluteUrl(postPath(p, lang)),
        datePublished: p.date ?? undefined,
        author: { '@id': PERSON_ID },
      })),
    },
    breadcrumb(trail),
  )
}

/** The post's URL in the language being rendered (never guessed from a slug). */
function postPath(post: LocalizedBlogPost, lang: Lang): string {
  return post.langPaths[lang] ?? post.langPaths.it ?? `/blog/${post.slug}`
}

/**
 * A single post. `dateModified` falls back to `datePublished`: Google prefers
 * a modified date it can trust over an invented one, and a post that was never
 * edited genuinely has the two dates equal.
 */
export function blogPostSchema(
  lang: Lang,
  post: LocalizedBlogPost,
  trail: { name: string; path: string }[],
): Node {
  const url = absoluteUrl(postPath(post, lang))
  const image = post.image ? `${SITE_URL}${post.image}` : DEFAULT_IMAGE
  return graph(
    lang,
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      url,
      // mainEntityOfPage is what says "this article IS this page", rather than
      // an article that merely happens to be quoted on it.
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      headline: post.title,
      description: post.excerpt,
      image: [image],
      datePublished: post.date ?? undefined,
      dateModified: post.updated ?? post.date ?? undefined,
      inLanguage: IN_LANGUAGE[lang],
      isPartOf: { '@id': SITE_ID },
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      keywords: post.tags.join(', '),
      articleSection: 'Blog',
    },
    breadcrumb(trail),
  )
}

/**
 * The `script` entry for useHead.
 *
 * `<` is escaped because the JSON goes into the HTML verbatim: a `</script>`
 * inside a post title would otherwise end the block early and leave the rest
 * of the graph rendering as text on the page.
 */
export function jsonLdScript(node: Node) {
  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify(node).replace(/</g, '\\u003c'),
  }
}
