<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '../../composables/useI18n'
import { useLatestPosts, formatPostDate } from '../../composables/useBlogPosts'
import { track } from '../../composables/useAnalytics'

const { t, lang } = useI18n()

// `location` separates a post opened from the home teaser from the same post
// opened via /blog — the pageview alone can't tell them apart, and that's the
// number that says whether this section earns its place on the home page.
const onPostClick = (slug: string, position: 'featured' | 'list') =>
  track('blog_post_click', { slug, location: 'home', position })

// A preview of the blog, and nothing else. This section used to mix the latest
// post with an Oxymeter card that linked off-site (and was already listed under
// /projects), so "Blog" in the nav, the hero CTA and this heading each meant
// something different. Oxymeter now lives in Selected work; here the newest
// post is the hero card and the next two are compact rows — the layout the
// section grows into as more posts get published.
const latest = useLatestPosts(3)
const featured = computed(() => latest.value[0])
const rest = computed(() => latest.value.slice(1))
</script>

<template>
  <section
    id="blog"
    class="scroll-mt-16 bg-night px-[clamp(24px,5vw,48px)] py-[clamp(64px,10vw,120px)] font-ui text-surface"
  >
    <div class="mx-auto max-w-[1080px]">
      <!-- Heading -->
      <div class="max-w-[600px]">
        <div class="mb-2 font-serif text-[22px] italic text-sky">{{ t.blogKicker }}</div>
        <h2 class="m-0 font-serif text-[48px] font-medium leading-[1.1]">{{ t.blogTitle }}</h2>
        <p class="mt-5 text-[19px] leading-[1.6] text-night-text">{{ t.blogLead }}</p>
      </div>

      <template v-if="featured">
        <!-- Newest post -->
        <RouterLink
          :to="`/blog/${featured.slug}`"
          class="group mt-14 grid grid-cols-[1.05fr_.95fr] items-stretch overflow-hidden rounded-3xl border border-night-line bg-night-card no-underline transition duration-[250ms] hover:-translate-y-1 hover:border-night-line-strong hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)] max-md:grid-cols-1"
          @click="onPostClick(featured.slug, 'featured')"
        >
          <div
            class="relative min-h-[260px] overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#22467e_45%,#7db0e6_100%)] max-md:aspect-video max-md:min-h-0"
          >
            <img
              v-if="featured.cover"
              :src="featured.cover"
              :alt="featured.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <template v-else>
              <div
                class="absolute inset-0"
                style="
                  background:
                    radial-gradient(circle at 72% 20%, rgba(255, 255, 255, 0.9) 0 2px, transparent 3px),
                    radial-gradient(circle at 30% 35%, rgba(255, 255, 255, 0.7) 0 1.5px, transparent 2.5px),
                    radial-gradient(circle at 55% 15%, rgba(255, 255, 255, 0.6) 0 1.5px, transparent 2.5px);
                "
              ></div>
              <div
                class="absolute bottom-[22px] left-7 font-mono text-[12px] uppercase tracking-[0.1em] text-white/85"
              >
                ↑ 35.000 m
              </div>
            </template>
          </div>

          <div class="flex flex-col justify-center p-10 max-md:p-8 max-md:pb-[34px]">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                class="rounded-full border border-badge-line px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-sky"
              >
                {{ t.blogLatest }}
              </span>
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-night-faint">
                {{ formatPostDate(featured.date, lang) }}
              </span>
            </div>
            <h3
              class="mt-5 font-serif text-[clamp(28px,3.4vw,38px)] font-medium leading-[1.12] tracking-[-0.01em] text-white transition-colors group-hover:text-sky"
            >
              {{ featured.title }}
            </h3>
            <p class="mt-3 text-[16px] leading-[1.6] text-night-text">{{ featured.excerpt }}</p>
          </div>
        </RouterLink>

        <!-- Older posts, when there are any -->
        <ul v-if="rest.length" class="m-0 mt-4 flex list-none flex-col gap-1 p-0">
          <li v-for="post in rest" :key="post.slug">
            <RouterLink
              :to="`/blog/${post.slug}`"
              class="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 rounded-2xl px-6 py-5 no-underline transition-colors duration-200 hover:bg-night-card max-md:grid-cols-1 max-md:px-4"
              @click="onPostClick(post.slug, 'list')"
            >
              <time class="font-mono text-[11px] uppercase tracking-[0.08em] text-night-faint">
                {{ formatPostDate(post.date, lang) }}
              </time>
              <div>
                <h3
                  class="m-0 font-serif text-[22px] font-medium leading-[1.2] text-white transition-colors group-hover:text-sky"
                >
                  {{ post.title }}
                </h3>
                <p class="mt-2 text-[15px] leading-[1.55] text-night-text">{{ post.excerpt }}</p>
              </div>
            </RouterLink>
          </li>
        </ul>
      </template>

      <!-- Before the first post is synced -->
      <p v-else class="mt-14 text-[17px] text-night-text">{{ t.blogEmpty }}</p>

      <div class="mt-12">
        <RouterLink
          to="/blog"
          class="text-[17px] font-medium text-sky no-underline hover:underline"
          @click="track('nav_click', { target: 'all_posts', location: 'blog_section' })"
        >
          {{ t.blogAllPosts }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
