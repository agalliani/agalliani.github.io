<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import type { BlogPost } from '../types/blog'

const SITE_URL = 'https://andreagalliani.com'

// Same eager glob as the list view — the post for the current slug is resolved
// synchronously from the bundled JSON, so vite-ssg prerenders it statically.
const modules = import.meta.glob<{ default: BlogPost }>('../content/blog/*.json', { eager: true })
const bySlug = Object.fromEntries(
  Object.values(modules).map((m) => [m.default.slug, m.default]),
) as Record<string, BlogPost>

const route = useRoute()
const post = computed<BlogPost | undefined>(() => bySlug[String(route.params.slug)])

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Meta tags are baked into the static HTML by vite-ssg → social crawlers (which
// don't run JS) and search engines see them in the server response.
useHead(() => {
  const p = post.value
  if (!p) return { title: 'Articolo non trovato' }
  const url = `${SITE_URL}/blog/${p.slug}`
  const image = p.cover ? `${SITE_URL}${p.cover}` : `${SITE_URL}/propic.webp`
  return {
    title: p.title,
    meta: [
      { name: 'description', content: p.excerpt },
      { property: 'og:title', content: p.title },
      { property: 'og:description', content: p.excerpt },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
    ],
    link: [{ rel: 'canonical', href: url }],
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-200">
    <header class="border-b border-white/5">
      <div class="container mx-auto max-w-3xl px-6 py-6">
        <RouterLink to="/blog" class="font-mono text-sm text-slate-400 hover:text-amber-400 transition-colors">
          ← Blog
        </RouterLink>
      </div>
    </header>

    <main class="container mx-auto max-w-3xl px-6 py-12">
      <template v-if="post">
        <time v-if="post.date" class="font-mono text-xs text-amber-400/80">{{ formatDate(post.date) }}</time>
        <h1 class="text-4xl font-bold mt-2 mb-6 tracking-tight">{{ post.title }}</h1>
        <div v-if="post.tags.length" class="flex flex-wrap gap-2 mb-10">
          <span v-for="tag in post.tags" :key="tag"
                class="font-mono text-xs text-slate-500 bg-white/5 rounded px-2 py-0.5">#{{ tag }}</span>
        </div>
        <!-- html is pre-rendered and rewritten at sync time (first-party content). -->
        <article class="post-body" v-html="post.html"></article>
      </template>

      <template v-else>
        <h1 class="text-3xl font-bold mb-4">Articolo non trovato</h1>
        <p class="text-slate-400 mb-8">L'articolo che cerchi non esiste o è stato spostato.</p>
        <RouterLink to="/blog" class="text-amber-400 hover:text-amber-300 font-mono">← Torna al blog</RouterLink>
      </template>
    </main>
  </div>
</template>

<style scoped>
/* Minimal typography for the injected post HTML (no @tailwindcss/typography dep). */
.post-body {
  line-height: 1.75;
  color: rgb(203 213 225); /* slate-300 */
}
.post-body :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
  color: rgb(226 232 240); /* slate-200 */
}
.post-body :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
  color: rgb(226 232 240);
}
.post-body :deep(p) {
  margin: 1rem 0;
}
.post-body :deep(a) {
  color: rgb(251 191 36); /* amber-400 */
  text-decoration: underline;
}
.post-body :deep(ul),
.post-body :deep(ol) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}
.post-body :deep(ul) { list-style: disc; }
.post-body :deep(ol) { list-style: decimal; }
.post-body :deep(li) { margin: 0.375rem 0; }
.post-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}
.post-body :deep(code) {
  font-family: ui-monospace, monospace;
  font-size: 0.875em;
  background: rgb(255 255 255 / 0.06);
  padding: 0.15em 0.35em;
  border-radius: 0.25rem;
}
.post-body :deep(pre) {
  background: rgb(255 255 255 / 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}
.post-body :deep(pre code) {
  background: none;
  padding: 0;
}
.post-body :deep(blockquote) {
  border-left: 3px solid rgb(251 191 36 / 0.5);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: rgb(148 163 184); /* slate-400 */
}
</style>
