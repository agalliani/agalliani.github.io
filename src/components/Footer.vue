<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Andrea-Galliani-3' },
  { name: 'Scopus', url: 'https://www.scopus.com/authid/detail.uri?authorId=57936566700' },
  { name: 'ORCID', url: 'https://orcid.org/0000-0001-8606-5689' },
  { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=mReBtJQAAAAJ&hl=it' }
]
</script>

<template>
  <footer class="py-16 px-6 border-t border-white/5 mt-16 bg-primary/50 backdrop-blur-sm">
    <div class="container mx-auto max-w-4xl text-center">
      <div class="flex justify-center flex-wrap gap-6 mb-8">
        <a v-for="link in links" 
           :key="link.name" 
           :href="link.url" 
           target="_blank" 
           rel="noopener"
           class="text-text-muted text-sm hover:text-accent hover:underline transition-colors">
          {{ link.name }}
        </a>
      </div>
      
      <div class="mb-8">
        <a href="mailto:andreagalliani29@gmail.com" 
           class="font-mono text-text-main text-base hover:text-accent-secondary transition-colors">
          andreagalliani29 [at] gmail [dot] com
        </a>
      </div>

      <p class="text-text-muted text-xs opacity-60">
        © {{ year }} Andrea Galliani. Built with Vue 3 & Vite.
      </p>
    </div>
  </footer>
</template>

