import { computed, type ComputedRef } from 'vue'
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

const { lang } = useI18n()

/**
 * Merges the English rendering over the Italian one. Posts without an `en`
 * block fall back to Italian, so a partially translated blog stays coherent
 * instead of showing gaps.
 *
 * Every reader below goes through this and touches `lang.value`, which is what
 * makes the callers' computeds re-evaluate on toggle — the views themselves
 * stay language-agnostic.
 */
function localize(post: BlogPost, to: Lang): BlogPost {
  if (to !== 'en' || !post.en) return post
  const { title, excerpt, html, tags } = post.en
  return { ...post, title, excerpt, html, tags: tags ?? post.tags }
}

/** All posts, newest first. */
export function usePosts(): ComputedRef<BlogPost[]> {
  return computed(() => allPosts.map((p) => localize(p, lang.value)))
}

/** The N most recent posts (used by the home blog section). */
export function useLatestPosts(count: number): ComputedRef<BlogPost[]> {
  return computed(() => allPosts.slice(0, count).map((p) => localize(p, lang.value)))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = bySlug[slug]
  return post && localize(post, lang.value)
}

export function formatPostDate(date: string | null, lang: Lang = 'it'): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
