import { computed, type ComputedRef, type Ref } from 'vue'
import type { BlogPost } from '../types/blog'
import type { Lang } from '../i18n/messages'
import { localizePath } from '../i18n/routing'
import { useI18n } from './useI18n'

// Eager glob: every post JSON is bundled and resolved at import time, so there's
// no async data fetching — vite-ssg can prerender list, post and home sections
// without onSSRAppRendered. Shared here so the three call sites (BlogListView,
// BlogPostView, home BlogSection) stay in sync.
const modules = import.meta.glob<{ default: BlogPost }>('../content/blog/*.json', { eager: true })

const allPosts: BlogPost[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

/** The Italian (default-language) slug — every post has exactly one. */
const bySlug: Record<string, BlogPost> = Object.fromEntries(allPosts.map((p) => [p.slug, p]))

/**
 * The English slug — only populated for translated posts, keyed by
 * `en.slug` when set, falling back to the Italian slug otherwise (old
 * behaviour, kept for translations that predate localized slugs).
 */
const byEnSlug: Record<string, BlogPost> = Object.fromEntries(
  allPosts.filter((p) => p.en).map((p) => [p.en!.slug ?? p.slug, p]),
)

/** A post merged with its current-language fields, plus the real URL for each published language. */
export interface LocalizedBlogPost extends BlogPost {
  /** `/blog/<slug>` for every language this post is published in — for canonical/hreflang, never guessed from a single slug. */
  langPaths: Partial<Record<Lang, string>>
}

/**
 * Merges the English rendering over the Italian one. Posts without an `en`
 * block fall back to Italian, so a partially translated blog stays coherent
 * instead of showing gaps.
 *
 * Every reader below goes through this and reads `lang.value`, which is what
 * makes the returned computeds re-evaluate when the language changes — the
 * views themselves stay language-agnostic.
 */
function localize(post: BlogPost, to: Lang): LocalizedBlogPost {
  // Full, already-prefixed paths (langPaths.en must carry the /en prefix
  // itself — the whole point is that it's not derivable from langPaths.it by
  // prefixing, since the slug can differ too).
  const langPaths: Partial<Record<Lang, string>> = { it: `/blog/${post.slug}` }
  if (post.en) langPaths.en = localizePath(`/blog/${post.en.slug ?? post.slug}`, 'en')

  if (to !== 'en' || !post.en) return { ...post, langPaths }

  const { title, excerpt, html, tags, slug } = post.en
  return { ...post, title, excerpt, html, tags: tags ?? post.tags, slug: slug ?? post.slug, langPaths }
}

// These are composables, not plain getters: the language comes from the app's
// injected ref (see useI18n), so they have to be called from setup like any
// other composable.

/** All posts, newest first. */
export function usePosts(): ComputedRef<LocalizedBlogPost[]> {
  const { lang } = useI18n()
  return computed(() => allPosts.map((p) => localize(p, lang.value)))
}

/** The N most recent posts (used by the home blog section). */
export function useLatestPosts(count: number): ComputedRef<LocalizedBlogPost[]> {
  const { lang } = useI18n()
  return computed(() => allPosts.slice(0, count).map((p) => localize(p, lang.value)))
}

/**
 * A single post by slug — undefined when the slug matches nothing.
 *
 * The lookup is language-aware: under /en the slug in the URL is the
 * *English* slug (falls back to the Italian index too, so an old bookmark or
 * a direct hit on the pre-localization URL still resolves client-side
 * instead of 404ing — the 301 in vercel.json handles the prerendered/crawled
 * case).
 */
export function usePost(slug: Ref<string>): ComputedRef<LocalizedBlogPost | undefined> {
  const { lang } = useI18n()
  return computed(() => {
    const post = (lang.value === 'en' ? byEnSlug[slug.value] : undefined) ?? bySlug[slug.value]
    return post && localize(post, lang.value)
  })
}

export function formatPostDate(date: string | null, lang: Lang = 'it'): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
