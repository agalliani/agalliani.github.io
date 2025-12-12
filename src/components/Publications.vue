<script setup lang="ts">
import MiniGallery from './MiniGallery.vue'

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

const fieldWork = [
  {
    title: 'Giro-E Technician | MOST Project',
    event: 'Giro-E 2024',
    description: 'Field technician managing prototype devices on race bikes during the <strong>Giro-E 2024</strong> (Siena to Naples). Proved reliability of sensors in extreme real-world conditions.',
    location: 'Siena - Naples',
    date: 'May 2024',
    icon: 'fas fa-bicycle',
    color: 'from-emerald-500/20 to-teal-500/5'
  },
  {
    title: 'X-Ray Irradiation Campaigns',
    event: 'INFN Padova',
    description: 'Executed irradiation campaigns at the Department of Physics in Padova using X-ray facilities. Performed <strong>Total Ionizing Dose (TID)</strong> testing on 28nm CMOS chips, managing the DAQ setup to collect operational data during and after radiation exposure.',
    location: 'Padova, Italy',
    date: '2023 - 2024',
    icon: 'fas fa-radiation',
    color: 'from-amber-500/20 to-orange-500/5'
  },
  {
    title: 'Wire Bonding Supervision',
    event: 'INFN Torino/Milano',
    description: 'Supervised the wire-bonding operations at INFN Physics Departments (Turin/Milan). <strong>Design for Manufacturing:</strong> Personally designed the custom daughter-board PCBs, strictly enforcing <strong>ENIG (Electroless Nickel Immersion Gold)</strong> surface finishing to ensure reliable wire bondability. <strong>Operations:</strong> Managed the bonding setup for both ceramic packages (CPGA) and direct Chip-on-Board (CoB) assemblies.',
    location: 'Torino & Milano',
    date: '2022 - 2024',
    icon: 'fas fa-microchip',
    color: 'from-purple-500/20 to-indigo-500/5',
    gallery: [
      '/images/bonding-microscope.jpg',
      '/images/daughter-board-enig.jpg',
      '/images/lab-torino.jpg'
    ]
  }
]
</script>

<template>
  <section class="py-24 px-6 bg-slate-950 relative border-t border-white/5">
    <div class="container mx-auto max-w-6xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <!-- Selected Talks (4 cols) -->
        <div class="lg:col-span-4">
          <h2 class="text-3xl font-bold text-slate-200 mb-8 flex items-center gap-3">
            <i class="fas fa-bullhorn text-accent"></i> Selected Talks
          </h2>
          <div class="space-y-6">
            <div v-for="talk in talks" :key="talk.event" class="bg-slate-900/50 border border-white/5 p-6 rounded-xl hover:border-accent/30 transition-colors group">
              <div class="flex justify-between items-start mb-2">
                <span class="text-amber-400 font-mono text-sm">{{ talk.event }}</span>
                <span class="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded text-slate-400">{{ talk.type }}</span>
              </div>
              <h3 class="text-lg font-bold text-slate-200 group-hover:text-amber-400 transition-colors">{{ talk.topic }}</h3>
            </div>
          </div>
          <div class="mt-8">
            <a href="https://scholar.google.com/citations?user=mReBtJQAAAAJ&hl=it" target="_blank" class="inline-flex items-center text-slate-400 hover:text-amber-400 transition-colors font-medium">
              View Full Publication List <i class="fas fa-external-link-alt ml-2 text-xs"></i>
            </a>
          </div>
        </div>

        <!-- Field Experience (8 cols) -->
        <div class="lg:col-span-8">
          <h2 class="text-3xl font-bold text-slate-200 mb-8 flex items-center gap-3">
            <i class="fas fa-flask text-accent"></i> Field Experience
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="work in fieldWork" :key="work.title" 
                 class="bg-gradient-to-br border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                 :class="[work.color, 'to-slate-900']">
              
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors"></div>
              
              <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                  <div class="inline-block px-3 py-1 bg-white/10 text-white text-xs font-bold uppercase rounded-full backdrop-blur-sm">
                    {{ work.event }}
                  </div>
                  <i :class="[work.icon, 'text-2xl text-white/50 group-hover:text-white transition-colors']"></i>
                </div>
                
                <h3 class="text-xl font-bold text-white mb-3 leading-tight">{{ work.title }}</h3>
                <p class="text-slate-300 text-sm leading-relaxed mb-6" v-html="work.description"></p>
                
                <MiniGallery v-if="work.gallery" :images="work.gallery" />

                <div class="flex flex-col gap-2 text-xs text-slate-400 font-mono border-t border-white/10 pt-4">
                  <span class="flex items-center"><i class="fas fa-map-marker-alt w-5 text-center mr-2"></i>{{ work.location }}</span>
                  <span class="flex items-center"><i class="fas fa-calendar-alt w-5 text-center mr-2"></i>{{ work.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
