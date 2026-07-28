<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteHeader from '../components/SiteHeader.vue'
import { usePosts, formatPostDate } from '../composables/useBlogPosts'
import { useI18n, initLangFromStorage } from '../composables/useI18n'

const { t, lang } = useI18n()
const posts = usePosts()

onMounted(initLangFromStorage)

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
  <div class="min-h-screen bg-white font-ui text-ink">
    <SiteHeader />

    <!-- Heading -->
    <section class="mx-auto max-w-[820px] px-[clamp(24px,5vw,48px)] pb-4 pt-[clamp(48px,8vw,96px)]">
      <div class="mb-2.5 text-[14px] font-medium uppercase tracking-[0.12em] text-ink-faint">
        {{ t.blogKicker }}
      </div>
      <h1 class="m-0 font-serif text-[clamp(40px,6vw,56px)] font-medium leading-[1.05] tracking-[-0.02em]">
        {{ t.blogTitle }}
      </h1>
      <p class="mt-4 max-w-[620px] text-[19px] leading-[1.6] text-ink-soft">{{ t.blogPageLead }}</p>
    </section>

    <!-- Posts -->
    <main class="mx-auto max-w-[820px] px-[clamp(24px,5vw,48px)] pb-[clamp(56px,8vw,96px)] pt-8">
      <p v-if="posts.length === 0" class="text-[17px] text-ink-soft">{{ t.blogEmpty }}</p>

      <ul class="m-0 flex list-none flex-col gap-3 p-0">
        <li v-for="post in posts" :key="post.slug">
          <RouterLink
            :to="`/blog/${post.slug}`"
            class="group block rounded-2xl p-6 no-underline transition-colors duration-200 hover:bg-surface max-md:p-4"
          >
            <time
              v-if="post.date"
              class="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint"
            >
              {{ formatPostDate(post.date, lang) }}
            </time>
            <h2
              class="mt-2 font-serif text-[clamp(24px,3vw,30px)] font-medium leading-[1.15] tracking-[-0.01em] text-ink transition-colors group-hover:text-brand"
            >
              {{ post.title }}
            </h2>
            <p class="mt-2.5 text-[17px] leading-[1.6] text-ink-soft">{{ post.excerpt }}</p>
            <div v-if="post.tags.length" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-faint"
              >
                #{{ tag }}
              </span>
            </div>
          </RouterLink>
        </li>
      </ul>
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
