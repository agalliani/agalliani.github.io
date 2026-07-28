<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '../../composables/useI18n'
import { featuredWork } from '../../data/projects'
import { track, trackOutbound } from '../../composables/useAnalytics'

const { t } = useI18n()
</script>

<template>
  <section
    id="work"
    class="mx-auto max-w-[1080px] scroll-mt-16 px-[clamp(24px,5vw,48px)] py-[clamp(64px,10vw,120px)] font-ui"
  >
    <!-- Heading -->
    <div class="mb-2.5 text-[14px] font-medium uppercase tracking-[0.12em] text-ink-faint">
      {{ t.workKicker }}
    </div>
    <h2 class="m-0 text-[46px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
      {{ t.workTitle }}
    </h2>
    <p class="mt-[18px] max-w-[560px] text-[19px] leading-[1.6] text-ink-soft">{{ t.workLead }}</p>

    <!-- Dense list -->
    <div class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-x-10 gap-y-[14px]">
      <a
        v-for="item in featuredWork"
        :key="item.id"
        :href="item.href"
        target="_blank"
        rel="noopener"
        class="grid grid-cols-[96px_1fr_auto] items-center gap-5 rounded-2xl p-4 no-underline transition-colors duration-200 hover:bg-surface"
        @click="trackOutbound(item.href, item.id, 'featured_work')"
      >
        <div
          class="aspect-square overflow-hidden rounded-xl"
          :class="item.dark ? 'bg-[#111]' : 'bg-surface-2'"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="h-full w-full object-cover"
            :class="item.dark ? 'object-center' : 'object-top'"
            loading="lazy"
          />
        </div>
        <div class="min-w-0">
          <div class="flex flex-wrap items-baseline gap-2.5">
            <h3 class="m-0 text-[18px] font-semibold tracking-[-0.01em] text-ink">{{ item.title }}</h3>
            <span class="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-faint">
              {{ item.tag }}
            </span>
          </div>
          <p class="mt-1 text-[14px] leading-[1.45] text-ink-soft">{{ t[item.descKey] }}</p>
        </div>
        <span class="text-[18px] text-arrow" aria-hidden="true">→</span>
      </a>
    </div>

    <div class="mt-12">
      <RouterLink
        to="/projects"
        class="text-[17px] font-medium text-brand hover:underline"
        @click="track('nav_click', { target: 'all_work', location: 'work_section' })"
      >
        {{ t.allWork }}
      </RouterLink>
    </div>
  </section>
</template>
