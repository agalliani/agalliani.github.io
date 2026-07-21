<script setup lang="ts">
import { ref } from 'vue'
import MiniGallery from '../MiniGallery.vue'
import { useI18n } from '../../composables/useI18n'
import type { Project } from '../../data/projects'

defineProps<{ project: Project }>()

const { t } = useI18n()
const expanded = ref(false)
</script>

<template>
  <article
    class="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
  >
    <!-- Media: single hero image or a gallery strip -->
    <div v-if="project.image" class="aspect-video overflow-hidden border-b border-line">
      <img
        :src="project.image"
        :alt="project.title"
        class="h-full w-full object-cover object-top"
        loading="lazy"
      />
    </div>
    <div v-else-if="project.gallery && project.gallery.length" class="border-b border-line bg-surface p-3">
      <MiniGallery :images="project.gallery" heightClass="h-40" />
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div v-if="project.badge" class="mb-3">
        <span class="rounded-full bg-surface px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-soft">
          {{ project.badge }}
        </span>
      </div>

      <h3 class="text-[20px] font-semibold tracking-[-0.01em] text-ink">{{ project.title }}</h3>
      <div v-if="project.subtitle" class="mt-1 font-mono text-[13px] text-brand">
        {{ project.subtitle }}
      </div>

      <div class="mt-3">
        <div
          class="text-[15px] leading-[1.55] text-ink-soft"
          :class="{ 'line-clamp-3': !expanded }"
          v-html="project.desc"
        ></div>
        <button
          type="button"
          class="mt-2 cursor-pointer bg-transparent text-[13px] font-semibold text-brand hover:underline"
          @click="expanded = !expanded"
        >
          {{ expanded ? t.showLess : t.readMore }}
        </button>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="tech in project.tech"
          :key="tech"
          class="rounded-md bg-surface px-2 py-1 font-mono text-[11px] text-ink-soft"
        >
          {{ tech }}
        </span>
      </div>

      <div class="mt-auto space-y-3 pt-5">
        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand hover:underline"
        >
          {{ project.linkLabel || 'View project' }} <span aria-hidden="true">→</span>
        </a>

        <div v-if="project.links && project.links.length" class="border-t border-line pt-4">
          <span class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-faint">
            {{ t.resources }}
          </span>
          <div class="flex flex-col gap-2">
            <a
              v-for="l in project.links"
              :key="l.url"
              :href="l.url"
              target="_blank"
              rel="noopener"
              class="text-[14px] text-ink-soft transition-colors hover:text-brand"
            >
              {{ l.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
