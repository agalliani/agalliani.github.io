<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Andrea Galliani | AMS Engineer & Ph.D.',
  titleTemplate: '%s | Andrea Galliani',
  meta: [
    { name: 'description', content: 'Portfolio of Andrea Galliani, Ph.D. - AMS Engineer at Bosch Sensortec. Specializing in Deep Tech, Analog Mixed-Signal Design, and Industrial IoT.' },
    { property: 'og:image', content: 'https://agalliani.github.io/propic.webp' },
    { property: 'og:url', content: 'https://agalliani.github.io/' },
    { name: 'theme-color', content: '#0f172a' }
  ]
})
</script>


<template>
  <RouterView />
</template>

