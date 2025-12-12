<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tech: string[]
  link?: string
}>()
</script>

<template>
  <div class="group relative bg-bg-card backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-accent transition-all duration-300 hover:-translate-y-1">
    <h3 class="text-xl font-bold text-text-main mb-2 group-hover:text-accent transition-colors">{{ title }}</h3>
    <p class="text-text-muted mb-4 text-sm leading-relaxed">{{ description }}</p>
    
    <div class="flex flex-wrap gap-2 mb-4">
      <span v-for="t in tech" :key="t" class="px-2 py-1 text-xs font-mono rounded bg-white/5 text-accent-secondary border border-white/5">
        {{ t }}
      </span>
    </div>

    <a v-if="link" :href="link" target="_blank" class="inline-flex items-center text-sm text-accent hover:text-accent-hover font-medium transition-colors">
      View Project <i class="fas fa-arrow-right ml-2 text-xs"></i>
    </a>
  </div>
</template>
