import { computed, type ComputedRef, type Ref } from 'vue'
import type { BlogPost } from '../types/blog'
import type { Lang } from '../i18n/messages'
import { useI18n } from './useI18n'

// Eager glob: every post JSON is bundled and resolved at import time, so there's
// no async data fetching — vite-ssg can prerender list, post and home sections
// without onSSRAppRendered. Shared here so the three call sites (BlogListView,
// BlogPostView, home BlogSection) stay in sync.
const modules = import.meta.glob<{ default: BlogPost }>('../content/blog/*.json', { eager: true })

const allPosts: BlogPost[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const bySlug: Record<string, BlogPost> = Object.fromEntries(allPosts.map((p) => [p.slug, p]))

/**
 * Merges the English rendering over the Italian one. Posts without an `en`
 * block fall back to Italian, so a partially translated blog stays coherent
 * instead of showing gaps.
 *
 * Every reader below goes through this and reads `lang.value`, which is what
 * makes the returned computeds re-evaluate when the language changes — the
 * views themselves stay language-agnostic.
 */
function localize(post: BlogPost, to: Lang): BlogPost {
  if (to !== 'en' || !post.en) return post
  const { title, excerpt, html, tags } = post.en
  return { ...post, title, excerpt, html, tags: tags ?? post.tags }
}

// These are composables, not plain getters: the language comes from the app's
// injected ref (see useI18n), so they have to be called from setup like any
// other composable.

/** All posts, newest first. */
export function usePosts(): ComputedRef<BlogPost[]> {
  const { lang } = useI18n()
  return computed(() => allPosts.map((p) => localize(p, lang.value)))
}

/** The N most recent posts (used by the home blog section). */
export function useLatestPosts(count: number): ComputedRef<BlogPost[]> {
  const { lang } = useI18n()
  return computed(() => allPosts.slice(0, count).map((p) => localize(p, lang.value)))
}

/** A single post by slug — undefined when the slug matches nothing. */
export function usePost(slug: Ref<string>): ComputedRef<BlogPost | undefined> {
  const { lang } = useI18n()
  return computed(() => {
    const post = bySlug[slug.value]
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
