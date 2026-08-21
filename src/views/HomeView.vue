<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SiteHeader from '../components/SiteHeader.vue'
import HeroSection from '../components/home/HeroSection.vue'
import BlogSection from '../components/home/BlogSection.vue'
import WorkSection from '../components/home/WorkSection.vue'
import SiteFooter from '../components/home/SiteFooter.vue'
import { useI18n } from '../composables/useI18n'
import { seoLinks, seoOpenGraph, seoSocial } from '../composables/useSeo'
import { homeSchema, jsonLdScript } from '../composables/useStructuredData'

const { t, lang } = useI18n()

useHead(() => ({
  title: 'Home',
  meta: [
    { name: 'description', content: t.value.seoHomeDesc },
    ...seoSocial({ title: 'Andrea Galliani | AMS Engineer & Ph.D.', description: t.value.seoHomeDesc }),
    ...seoOpenGraph('/', lang.value),
  ],
  link: seoLinks('/', lang.value),
  // The page that defines the Person entity the whole site refers back to.
  script: [jsonLdScript(homeSchema(lang.value, t.value.seoHomeDesc))],
}))
</script>

<template>
  <div class="min-h-screen bg-white font-ui text-ink">
    <SiteHeader />
    <main>
      <HeroSection />
      <BlogSection />
      <WorkSection />
    </main>
    <SiteFooter />
  </div>
</template>
