<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import type { BlogPost } from '../types/blog'

// Eager glob: every post JSON is bundled and resolved at import time, so there's
// no async data fetching — vite-ssg can prerender the list without onSSRAppRendered.
const modules = import.meta.glob<{ default: BlogPost }>('../content/blog/*.json', { eager: true })

const posts = computed<BlogPost[]>(() =>
  Object.values(modules)
    .map((m) => m.default)
    .sort((a, b) => (b.date || '').localeCompare(a.date || '')),
)

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
}

useHead({
  title: 'Blog',
  meta: [
    { name: 'description', content: 'Articoli e note dal progetto HAB e dallo sviluppo con l\'AI come copilota — learn in public.' },
    { property: 'og:title', content: 'Blog | Andrea Galliani' },
    { property: 'og:description', content: 'Articoli e note dal progetto HAB e dallo sviluppo con l\'AI come copilota — learn in public.' },
    { property: 'og:url', content: 'https://andreagalliani.com/blog' },
    { property: 'og:type', content: 'website' },
  ],
  link: [{ rel: 'canonical', href: 'https://andreagalliani.com/blog' }],
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-200">
    <header class="border-b border-white/5">
      <div class="container mx-auto max-w-3xl px-6 py-6">
        <RouterLink to="/" class="font-mono font-bold text-xl text-slate-200 hover:text-amber-400 transition-colors">
          AG.
        </RouterLink>
      </div>
    </header>

    <main class="container mx-auto max-w-3xl px-6 py-12">
      <h1 class="text-4xl font-bold mb-10 tracking-tight">Blog</h1>

      <p v-if="posts.length === 0" class="text-slate-400">Nessun articolo pubblicato per ora.</p>

      <ul class="flex flex-col gap-8">
        <li v-for="post in posts" :key="post.slug" class="border-b border-white/5 pb-8 last:border-b-0">
          <RouterLink :to="`/blog/${post.slug}`" class="group block">
            <time v-if="post.date" class="font-mono text-xs text-amber-400/80">{{ formatDate(post.date) }}</time>
            <h2 class="text-2xl font-semibold mt-1 group-hover:text-amber-400 transition-colors">
              {{ post.title }}
            </h2>
            <p class="text-slate-400 mt-2">{{ post.excerpt }}</p>
            <div v-if="post.tags.length" class="flex flex-wrap gap-2 mt-3">
              <span v-for="tag in post.tags" :key="tag"
                    class="font-mono text-xs text-slate-500 bg-white/5 rounded px-2 py-0.5">#{{ tag }}</span>
            </div>
          </RouterLink>
        </li>
      </ul>
    </main>
  </div>
</template>
