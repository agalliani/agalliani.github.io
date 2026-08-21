<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import ProjectCard from '../components/projects/ProjectCard.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { projectCategories } from '../data/projects'
import { useI18n } from '../composables/useI18n'
import { seoLinks, seoOpenGraph, seoSocial } from '../composables/useSeo'
import { jsonLdScript, pageSchema } from '../composables/useStructuredData'

const { t, lang, lp } = useI18n()

useHead(() => ({
  title: t.value.projectsTitle,
  meta: [
    { name: 'description', content: t.value.seoProjectsDesc },
    ...seoSocial({ title: `${t.value.projectsTitle} | Andrea Galliani`, description: t.value.seoProjectsDesc }),
    ...seoOpenGraph('/projects', lang.value),
  ],
  link: seoLinks('/projects', lang.value),
  script: [
    jsonLdScript(
      pageSchema(lang.value, '/projects', t.value.projectsTitle, t.value.seoProjectsDesc, [
        { name: t.value.navHome, path: lp('/') },
        { name: t.value.projectsTitle, path: lp('/projects') },
      ]),
    ),
  ],
}))
</script>

<template>
  <div class="min-h-screen bg-white font-ui text-ink">
    <SiteHeader />

    <!-- Heading -->
    <section class="mx-auto max-w-[1080px] px-[clamp(24px,5vw,48px)] pb-4 pt-[clamp(48px,8vw,96px)]">
      <h1 class="m-0 text-[clamp(40px,6vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em]">
        {{ t.projectsTitle }}
      </h1>
      <p class="mt-4 max-w-[620px] text-[19px] leading-[1.6] text-ink-soft">{{ t.projectsLead }}</p>
    </section>

    <!-- Categories -->
    <section
      v-for="cat in projectCategories"
      :key="cat.id"
      class="mx-auto max-w-[1080px] px-[clamp(24px,5vw,48px)] py-[clamp(40px,6vw,72px)]"
    >
      <div class="mb-10">
        <h2 class="inline-block text-[32px] font-semibold tracking-[-0.02em]">
          {{ t[cat.titleKey] }}
        </h2>
        <div class="mt-3 h-1 w-14 rounded-full" :style="{ background: cat.accent }"></div>
        <p class="mt-4 max-w-[560px] text-[17px] leading-[1.55] text-ink-soft">{{ t[cat.leadKey] }}</p>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in cat.items" :key="project.id" :project="project" />
      </div>
    </section>

    <!-- Footer strip -->
    <footer class="border-t border-line bg-surface px-[clamp(24px,5vw,48px)] py-14">
      <div class="mx-auto flex max-w-[1080px] items-center justify-between gap-6 text-[13px] text-ink-faint">
        <span>© 2026 Andrea Galliani</span>
        <RouterLink :to="lp('/')" class="font-medium text-brand hover:underline">{{ t.backHome }}</RouterLink>
      </div>
    </footer>
  </div>
</template>
