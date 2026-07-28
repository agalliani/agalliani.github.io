import { computed, type ComputedRef } from 'vue'
import type { BlogPost } from '../types/blog'
import type { Lang } from '../i18n/messages'

// Eager glob: every post JSON is bundled and resolved at import time, so there's
// no async data fetching — vite-ssg can prerender list, post and home sections
// without onSSRAppRendered. Shared here so the three call sites (BlogListView,
// BlogPostView, home BlogSection) stay in sync.
const modules = import.meta.glob<{ default: BlogPost }>('../content/blog/*.json', { eager: true })

const allPosts: BlogPost[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const bySlug: Record<string, BlogPost> = Object.fromEntries(allPosts.map((p) => [p.slug, p]))

/** All posts, newest first. */
export function usePosts(): ComputedRef<BlogPost[]> {
  return computed(() => allPosts)
}

/** The N most recent posts (used by the home blog section). */
export function useLatestPosts(count: number): ComputedRef<BlogPost[]> {
  return computed(() => allPosts.slice(0, count))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return bySlug[slug]
}

export function formatPostDate(date: string | null, lang: Lang = 'it'): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
