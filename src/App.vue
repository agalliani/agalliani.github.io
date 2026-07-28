<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import ConsentBanner from './components/ConsentBanner.vue'
import { useI18n } from './composables/useI18n'

const { t, lang } = useI18n()

// App-level defaults only — the per-page canonical, hreflang set and og:url are
// set by each view (see composables/useSeo), since they depend on the route.
// `htmlAttrs.lang` has to be here: it's one attribute for the whole document,
// and getting it wrong tells crawlers and screen readers the /en pages are
// Italian.
useHead(() => ({
  title: 'Andrea Galliani | AMS Engineer & Ph.D.',
  titleTemplate: '%s | Andrea Galliani',
  htmlAttrs: { lang: lang.value },
  meta: [
    { name: 'description', content: t.value.seoSiteDesc },
    { property: 'og:image', content: 'https://andreagalliani.com/propic.webp' },
    { name: 'theme-color', content: '#0f172a' },
  ],
}))
</script>


<template>
  <RouterView />
  <!-- Sits here rather than in a view: it has to outlive route changes. -->
  <ConsentBanner />
</template>

