<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import SiteHeader from '../components/home/SiteHeader.vue'
import HeroSection from '../components/home/HeroSection.vue'
import BlogSection from '../components/home/BlogSection.vue'
import WorkSection from '../components/home/WorkSection.vue'
import SiteFooter from '../components/home/SiteFooter.vue'
import { initLangFromStorage } from '../composables/useI18n'

// Restore the visitor's saved language on the client (no-op during SSR).
onMounted(initLangFromStorage)

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content:
        'Andrea Galliani — AMS Engineer & Ph.D. in Microelectronics. I design analog chips and build software, and I document my projects (HAB, Oxymeter) building in public.',
    },
  ],
})
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
