<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '../../composables/useI18n'
import { useLatestPosts, formatPostDate } from '../../composables/useBlogPosts'
import oxymeterHero from '@/assets/images/web-apps/oxymeter-hero.png'

const { t, lang } = useI18n()

// The HAB card is the entry point to the blog: as soon as a post exists it
// becomes a real link to the latest one, otherwise it stays the "coming soon"
// teaser it was before any content was synced.
const latest = computed(() => useLatestPosts(1).value[0])
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

      <!-- Cards -->
      <div class="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-7">
        <!-- HAB — links to the latest post once one has been published -->
        <component
          :is="latest ? RouterLink : 'div'"
          :to="latest ? `/blog/${latest.slug}` : undefined"
          class="group flex flex-col overflow-hidden rounded-3xl border border-night-line bg-night-card no-underline transition duration-[250ms]"
          :class="
            latest
              ? 'hover:-translate-y-1 hover:border-night-line-strong hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]'
              : ''
          "
        >
          <div
            class="relative aspect-video overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#22467e_45%,#7db0e6_100%)]"
          >
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
          </div>
          <div class="flex flex-1 flex-col p-8 pb-[34px]">
            <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-night-faint">
                {{ t.habLabel }}
              </span>
              <span
                v-if="latest"
                class="font-mono text-[11px] uppercase tracking-[0.08em] text-night-faint"
              >
                {{ formatPostDate(latest.date, lang) }}
              </span>
              <span
                v-else
                class="rounded-full border border-badge-line px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-sky"
              >
                {{ t.blogSoon }}
              </span>
            </div>
            <h3
              class="mt-5 font-serif text-[clamp(28px,3.4vw,36px)] font-medium leading-[1.12] tracking-[-0.01em] text-white transition-colors group-hover:text-sky"
            >
              {{ latest ? latest.title : 'HAB' }}
            </h3>
            <p class="mt-3 text-[16px] leading-[1.6] text-night-text">
              {{ latest ? latest.excerpt : t.habLead }}
            </p>
          </div>
        </component>

        <!-- Oxymeter — real link -->
        <a
          href="https://www.oxymeter.it/"
          target="_blank"
          rel="noopener"
          class="group flex flex-col overflow-hidden rounded-3xl border border-night-line bg-night-card no-underline transition duration-[250ms] hover:-translate-y-1 hover:border-night-line-strong hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
        >
          <div class="aspect-video overflow-hidden bg-[#1a1a1c]">
            <img
              :src="oxymeterHero"
              alt="Oxymeter"
              class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
          <div class="flex flex-1 flex-col p-8 pb-[34px]">
            <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-night-faint">
                {{ t.oxyLabel }}
              </span>
              <span
                class="rounded-full border border-badge-line px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-sky"
              >
                {{ t.blogSoon }}
              </span>
            </div>
            <h3 class="mt-5 font-serif text-[clamp(28px,3.4vw,36px)] font-medium leading-[1.12] tracking-[-0.01em] text-white">
              Oxymeter
            </h3>
            <p class="mt-3 text-[16px] leading-[1.6] text-night-text">{{ t.oxyLead }}</p>
          </div>
        </a>
      </div>

      <div class="mt-12">
        <RouterLink to="/blog" class="text-[17px] font-medium text-sky no-underline hover:underline">
          {{ t.blogAllPosts }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
