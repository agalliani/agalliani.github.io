<script setup lang="ts">
const talks = [
  {
    event: 'ApplePies 2023 (Genoa)',
    topic: 'Flash-ADC based programmable front-end',
    type: 'Oral Session',
    icon: 'fas fa-microphone-alt'
  },
  {
    event: 'IEEE EUROCON 2023 (Turin)',
    topic: 'Zero dead-time front-end in 28nm CMOS',
    type: 'Oral Session',
    icon: 'fas fa-microphone-alt'
  },
  {
    event: 'iWoRiD 2025 (Bratislava)',
    topic: 'High Dynamic Range Photon Science',
    type: 'Poster',
    icon: 'fas fa-chalkboard-teacher'
  }
]
</script>

<template>
  <section class="py-24 px-6 bg-slate-950 relative border-t border-white/5">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-3xl font-bold text-slate-200 mb-8 flex items-center gap-3">
        <i class="fas fa-bullhorn text-accent"></i> Selected Talks
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="talk in talks" :key="talk.event" class="bg-slate-900/50 border border-white/5 p-6 rounded-xl hover:border-accent/30 transition-colors group">
          <div class="flex justify-between items-start mb-2">
            <span class="text-amber-400 font-mono text-sm">{{ talk.event }}</span>
            <span class="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded text-slate-400">{{ talk.type }}</span>
          </div>
          <h3 class="text-lg font-bold text-slate-200 group-hover:text-amber-400 transition-colors">{{ talk.topic }}</h3>
        </div>
      </div>
      <div class="mt-8 text-center">
        <a href="https://scholar.google.com/citations?user=mReBtJQAAAAJ&hl=it" target="_blank" class="inline-flex items-center text-slate-400 hover:text-amber-400 transition-colors font-medium">
          View Full Publication List <i class="fas fa-external-link-alt ml-2 text-xs"></i>
        </a>
      </div>
    </div>
  </section>
</template>
