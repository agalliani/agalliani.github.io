<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import type { BlogPost } from '../types/blog'
import SiteHeader from '../components/SiteHeader.vue'
import { getPostBySlug, formatPostDate } from '../composables/useBlogPosts'
import { useI18n, initLangFromStorage } from '../composables/useI18n'

const SITE_URL = 'https://andreagalliani.com'

const { t, lang } = useI18n()
const route = useRoute()

// Resolved synchronously from the bundled JSON (see useBlogPosts), so vite-ssg
// prerenders every post statically.
const post = computed<BlogPost | undefined>(() => getPostBySlug(String(route.params.slug)))

onMounted(initLangFromStorage)

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
  <div class="min-h-screen bg-white font-ui text-ink">
    <SiteHeader />

    <main class="mx-auto max-w-[720px] px-[clamp(24px,5vw,48px)] pb-[clamp(56px,8vw,96px)] pt-[clamp(48px,8vw,88px)]">
      <template v-if="post">
        <!-- Breadcrumb up one level: the header navigates the site, this one
             navigates the hierarchy the post sits in. -->
        <RouterLink
          to="/blog"
          class="text-[15px] font-medium text-ink-soft no-underline transition-colors hover:text-ink"
        >
          {{ t.backBlog }}
        </RouterLink>
        <time
          v-if="post.date"
          class="mt-8 block font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint"
        >
          {{ formatPostDate(post.date, lang) }}
        </time>
        <h1
          class="mt-3 font-serif text-[clamp(36px,5.5vw,52px)] font-medium leading-[1.08] tracking-[-0.02em] text-ink"
        >
          {{ post.title }}
        </h1>
        <p class="mt-5 text-[20px] leading-[1.55] text-ink-soft">{{ post.excerpt }}</p>
        <div v-if="post.tags.length" class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-faint"
          >
            #{{ tag }}
          </span>
        </div>

        <hr class="my-10 border-0 border-t border-line" />

        <!-- html is pre-rendered and rewritten at sync time (first-party content). -->
        <article class="post-body" v-html="post.html"></article>

        <div class="mt-16 border-t border-line pt-8">
          <RouterLink to="/blog" class="text-[17px] font-medium text-brand no-underline hover:underline">
            {{ t.backBlog }}
          </RouterLink>
        </div>
      </template>

      <template v-else>
        <h1 class="font-serif text-[clamp(32px,5vw,44px)] font-medium tracking-[-0.02em]">
          {{ t.postNotFound }}
        </h1>
        <p class="mt-4 text-[19px] leading-[1.6] text-ink-soft">{{ t.postNotFoundLead }}</p>
        <RouterLink
          to="/blog"
          class="mt-8 inline-block text-[17px] font-medium text-brand no-underline hover:underline"
        >
          {{ t.backBlog }}
        </RouterLink>
      </template>
    </main>

    <!-- Footer strip -->
    <footer class="border-t border-line bg-surface px-[clamp(24px,5vw,48px)] py-14">
      <div class="mx-auto flex max-w-[1080px] items-center justify-between gap-6 text-[13px] text-ink-faint">
        <span>© 2026 Andrea Galliani</span>
        <RouterLink to="/" class="font-medium text-brand hover:underline">{{ t.backHome }}</RouterLink>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Minimal typography for the injected post HTML (no @tailwindcss/typography dep).
   Colours/fonts mirror the light home theme tokens in assets/main.css. */
.post-body {
  font-size: 19px;
  line-height: 1.7;
  color: #1d1d1f; /* --color-ink */
}
.post-body :deep(h2) {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin: 2.75rem 0 1rem;
}
.post-body :deep(h3) {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 500;
  line-height: 1.25;
  margin: 2rem 0 0.75rem;
}
.post-body :deep(p) {
  margin: 1.25rem 0;
}
.post-body :deep(a) {
  color: #0071e3; /* --color-brand */
  text-decoration: none;
}
.post-body :deep(a:hover) {
  text-decoration: underline;
}
.post-body :deep(strong) {
  font-weight: 600;
}
.post-body :deep(ul),
.post-body :deep(ol) {
  margin: 1.25rem 0;
  padding-left: 1.5rem;
}
.post-body :deep(ul) { list-style: disc; }
.post-body :deep(ol) { list-style: decimal; }
.post-body :deep(li) { margin: 0.5rem 0; }
.post-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  margin: 2rem 0;
}
.post-body :deep(hr) {
  border: 0;
  border-top: 1px solid #e8e8ed; /* --color-line */
  margin: 2.5rem 0;
}
.post-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: #f5f5f7; /* --color-surface */
  padding: 0.15em 0.4em;
  border-radius: 6px;
}
.post-body :deep(pre) {
  background: #1d1d1f; /* --color-night */
  color: #f5f5f7;
  padding: 1.25rem;
  border-radius: 16px;
  overflow-x: auto;
  margin: 2rem 0;
  font-size: 15px;
  line-height: 1.6;
}
.post-body :deep(pre code) {
  background: none;
  padding: 0;
  font-size: inherit;
}
.post-body :deep(blockquote) {
  border-left: 3px solid #d2d2d7; /* --color-line-strong */
  padding-left: 1.25rem;
  margin: 2rem 0;
  color: #6e6e73; /* --color-ink-soft */
  font-style: italic;
}
</style>
