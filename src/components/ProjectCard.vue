<script setup lang="ts">
import { ref } from 'vue'
import MiniGallery from './MiniGallery.vue'

defineProps<{
  title: string
  subtitle?: string
  description: string
  tech: string[]
  link?: string
  linkLabel?: string
  links?: { label: string; url: string }[]
  gallery?: string[]
  icon?: string
  badge?: string
  image?: string
}>()

const isExpanded = ref(false)
</script>

<template>
  <div class="group relative bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-xl hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col overflow-hidden">
    
    <!-- Hero Section: Image OR Gallery -->
    <div v-if="image" class="w-full h-48 overflow-hidden relative border-b border-white/5 group-hover:border-accent/20 transition-colors">
      <div class="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
      <img :src="image" :alt="title" class="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500" loading="lazy">
    </div>
    <div v-else-if="gallery && gallery.length > 0" class="w-full bg-slate-900/50 border-b border-white/5 p-2 overflow-hidden relative group-hover:border-accent/20 transition-colors">
       <MiniGallery :images="gallery" heightClass="h-48" />
    </div>

    <div class="p-6 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-4">
        <div v-if="icon" class="w-10 h-10 rounded-lg bg-slate-700/30 flex items-center justify-center text-accent text-xl">
          <i :class="icon"></i>
        </div>
        <div v-else class="w-10 h-10"></div> <!-- Spacer -->
        
        <div v-if="badge" class="px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wide">
          {{ badge }}
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-200 mb-1 group-hover:text-accent transition-colors">{{ title }}</h3>
      <div v-if="subtitle" class="text-sm text-teal-400 font-mono mb-3">{{ subtitle }}</div>
      
      <div class="relative mb-6 flex-grow group/desc">
        <div :class="{'line-clamp-3': !isExpanded}" class="text-slate-400 text-sm leading-relaxed transition-all duration-300" v-html="description"></div>
        <button 
          @click.stop.prevent="isExpanded = !isExpanded" 
          class="text-xs font-bold text-amber-500 hover:text-amber-400 mt-2 focus:outline-none flex items-center gap-1"
        >
          {{ isExpanded ? 'Show Less' : 'Read More' }}
          <i class="fas" :class="isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </button>
      </div>
      
      <!-- MiniGallery removed from here -->

      <div class="flex flex-wrap gap-2 mb-6">
        <span v-for="t in tech" :key="t" class="px-2 py-1 text-xs font-mono rounded bg-teal-500/10 text-teal-400">
          {{ t }}
        </span>
      </div>

      <div class="mt-auto space-y-3">
        <a v-if="link" :href="link" target="_blank" class="inline-flex items-center text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors">
          {{ linkLabel || 'View Project' }} <i class="fas fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1"></i>
        </a>

        <div v-if="links && links.length > 0" class="pt-4 border-t border-white/5">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Resources</span>
          <div class="flex flex-col gap-2">
            <a v-for="l in links" :key="l.label" :href="l.url" target="_blank" class="text-sm text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-2 group/link">
              <i class="fas fa-file-pdf text-xs opacity-70 group-hover/link:text-amber-400"></i> {{ l.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



