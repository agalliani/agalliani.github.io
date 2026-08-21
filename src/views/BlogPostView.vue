<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteHeader from '../components/SiteHeader.vue'
import BreadcrumbTrail from '../components/BreadcrumbTrail.vue'
import { usePost, usePosts, formatPostDate } from '../composables/useBlogPosts'
import { useI18n } from '../composables/useI18n'
import { seoArticle, seoLinks, seoOpenGraph, seoSocial } from '../composables/useSeo'
import { blogPostSchema, jsonLdScript } from '../composables/useStructuredData'
import { track, trackOutbound } from '../composables/useAnalytics'
import { useScrollDepth } from '../composables/useScrollDepth'
// Post formulas are pre-rendered to KaTeX markup at sync time
// (scripts/sync-blog-content.js); only this stylesheet (and its fonts) ships,
// and only on the routes that can contain math.
import 'katex/dist/katex.min.css'

const { t, lang, lp } = useI18n()
const route = useRoute()

const body = ref<HTMLElement | null>(null)
const slug = computed(() => String(route.params.slug))

// Resolved synchronously from the bundled JSON (see useBlogPosts), so vite-ssg
// prerenders every post statically.
const post = usePost(slug)

// One trail, used twice: rendered as the visible breadcrumb and serialized as
// BreadcrumbList. Google requires the two to describe the same hierarchy.
const trail = computed(() => {
  const p = post.value
  const here = p ? (p.langPaths[lang.value] ?? `/blog/${p.slug}`) : lp('/blog')
  return [
    { name: t.value.navHome, path: lp('/') },
    { name: t.value.navBlog, path: lp('/blog') },
    ...(p ? [{ name: p.title, path: here }] : []),
  ]
})

// Two more posts to read next. A post that links only back to /blog is a leaf
// in the crawl graph: these give a crawler (and a reader who reached the end)
// somewhere else to go, from the page where the interest is highest.
const allPosts = usePosts()
const related = computed(() =>
  allPosts.value.filter((p) => p.slug !== post.value?.slug).slice(0, 2),
)

useScrollDepth(body, slug)

// Links inside the post come from v-html, so there's no template to hang a
// @click on — one delegated listener on the container covers them all,
// including any added by future posts.
const onBodyClick = (e: MouseEvent) => {
  const anchor = (e.target as HTMLElement | null)?.closest('a')
  if (!anchor) return
  if (anchor.hostname && anchor.hostname !== window.location.hostname) {
    trackOutbound(anchor.href, anchor.textContent?.trim() || anchor.href, 'post_body')
  }
}

onMounted(() => {
  body.value?.addEventListener('click', onBodyClick)
})

onBeforeUnmount(() => body.value?.removeEventListener('click', onBodyClick))

// Meta tags are baked into the static HTML by vite-ssg → social crawlers (which
// don't run JS) and search engines see them in the server response.
useHead(() => {
  const p = post.value
  if (!p) return { title: t.value.postNotFound, meta: [{ name: 'robots', content: 'noindex' }] }
  // Always the Italian path — the per-language URL (which may have its own
  // localized slug) comes from langPaths, not from re-prefixing this one.
  const base = p.langPaths.it ?? `/blog/${p.slug}`
  // `image` (not `cover`): a post without an explicit cover still has the
  // first picture in its body, which is a far better card than the portrait.
  return {
    title: p.title,
    meta: [
      { name: 'description', content: p.excerpt },
      ...seoSocial({
        title: p.title,
        description: p.excerpt,
        image: p.image,
        imageAlt: p.title,
        type: 'article',
      }),
      ...seoArticle({ published: p.date, modified: p.updated, tags: p.tags }),
      ...seoOpenGraph(base, lang.value, p.langPaths),
    ],
    // A post is only claimed as an alternate once it actually has an English
    // rendering — see the `en` block in the post JSON.
    link: seoLinks(base, lang.value, Boolean(p.en), p.langPaths),
    // Article + breadcrumb graph. The trail mirrors the visible breadcrumb in
    // the template — Google requires the two to describe the same hierarchy.
    script: [
      jsonLdScript(
        blogPostSchema(lang.value, p, trail.value),
      ),
    ],
  }
})
</script>

<template>
  <div class="min-h-screen bg-white font-ui text-ink">
    <SiteHeader />

    <main class="mx-auto max-w-[720px] px-[clamp(24px,5vw,48px)] pb-[clamp(56px,8vw,96px)] pt-[clamp(48px,8vw,88px)]">
      <template v-if="post">
        <!-- The header navigates the site; this navigates the hierarchy the
             post sits in, and is the on-page counterpart of the JSON-LD
             BreadcrumbList. -->
        <BreadcrumbTrail :items="trail" />
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
        <article ref="body" class="post-body" v-html="post.html"></article>

        <section v-if="related.length" class="mt-16 border-t border-line pt-8">
          <h2 class="m-0 font-serif text-[24px] font-medium tracking-[-0.01em]">
            {{ t.moreReading }}
          </h2>
          <ul class="mt-5 flex list-none flex-col gap-4 p-0">
            <li v-for="other in related" :key="other.slug">
              <RouterLink
                :to="other.langPaths[lang] ?? `/blog/${other.slug}`"
                class="group block no-underline"
                @click="track('blog_post_click', { slug: other.slug, location: 'post_related' })"
              >
                <time
                  v-if="other.date"
                  class="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint"
                >
                  {{ formatPostDate(other.date, lang) }}
                </time>
                <span
                  class="mt-1 block font-serif text-[20px] font-medium leading-[1.25] text-ink transition-colors group-hover:text-brand"
                >
                  {{ other.title }}
                </span>
              </RouterLink>
            </li>
          </ul>
        </section>

        <div class="mt-12 border-t border-line pt-8">
          <RouterLink :to="lp('/blog')" class="text-[17px] font-medium text-brand no-underline hover:underline">
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
          :to="lp('/blog')"
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
        <RouterLink :to="lp('/')" class="font-medium text-brand hover:underline">{{ t.backHome }}</RouterLink>
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

/* --- Math (KaTeX, pre-rendered at sync time) --- */
/* Formulas usually sit inside a blockquote, which is muted + italic; the
   formula itself must read as body text, not as an aside. */
.post-body :deep(.katex) {
  font-style: normal;
  color: #1d1d1f; /* --color-ink */
  font-size: 1.05em;
}
.post-body :deep(.katex-display) {
  margin: 0.5rem 0;
  /* A long display formula scrolls in its own box instead of widening the page. */
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.25rem 0;
}
.post-body :deep(.katex-block) {
  margin: 0;
}
</style>
