<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  description: string
  tech: string[]
  link?: string
  linkLabel?: string
  links?: { label: string; url: string }[]
  icon?: string
  badge?: string
}>()
</script>

<template>
  <div class="group relative bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-accent transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
    <div class="flex justify-between items-start mb-4">
      <div v-if="icon" class="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-accent text-xl border border-white/5">
        <i :class="icon"></i>
      </div>
      <div v-else class="w-10 h-10"></div> <!-- Spacer -->
      
      <div v-if="badge" class="px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wide">
        {{ badge }}
      </div>
    </div>

    <h3 class="text-xl font-bold text-slate-200 mb-1 group-hover:text-accent transition-colors">{{ title }}</h3>
    <div v-if="subtitle" class="text-sm text-teal-400 font-mono mb-3">{{ subtitle }}</div>
    
    <p class="text-slate-400 mb-6 text-sm leading-relaxed flex-grow" v-html="description"></p>
    
    <div class="flex flex-wrap gap-2 mb-6">
      <span v-for="t in tech" :key="t" class="px-2 py-1 text-xs font-mono rounded bg-slate-900/50 text-teal-400 border border-white/5">
        {{ t }}
      </span>
    </div>

    <div class="mt-auto space-y-3">
      <a v-if="link" :href="link" target="_blank" class="inline-flex items-center text-sm text-accent hover:text-amber-400 font-medium transition-colors">
        {{ linkLabel || 'View Project' }} <i class="fas fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1"></i>
      </a>

      <div v-if="links && links.length > 0" class="pt-4 border-t border-white/5">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Resources</span>
        <div class="flex flex-col gap-2">
          <a v-for="l in links" :key="l.label" :href="l.url" target="_blank" class="text-sm text-slate-300 hover:text-accent transition-colors flex items-center gap-2 group/link">
            <i class="fas fa-file-pdf text-xs opacity-70 group-hover/link:text-accent"></i> {{ l.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
