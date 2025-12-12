<script setup lang="ts">
const skills = {
  silicon: ['Analog IC Design', 'Mixed-Signal', 'CMOS Technology', 'Cadence Virtuoso', 'Verilog-A', 'Physical Layout'],
  code: ['Python', 'TypeScript', 'Vue.js', 'C++', 'Node.js', 'Full-Stack Dev'],
  tools: ['Git & GitHub', 'Docker', 'Linux / Bash', 'CI/CD Pipelines', 'Altium Designer', 'Matlab']
}
</script>

<template>
  <section class="py-24 px-6 bg-primary-dark/50 relative">
    <div class="container mx-auto max-w-6xl">
      <h2 class="text-4xl font-bold text-center text-text-main mb-16 tracking-tight">
        Technical Arsenal
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Silicon Category -->
        <div class="group p-8 bg-white/5 border border-white/10 rounded-xl hover:-translate-y-1 hover:bg-white/10 hover:border-accent hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300">
          <h3 class="font-mono text-xl text-accent mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
            Silicon
          </h3>
          <div class="flex flex-wrap gap-3">
            <span v-for="skill in skills.silicon" :key="skill" 
                  class="px-3 py-1 text-sm font-mono text-accent bg-accent/10 border border-accent/20 rounded-md">
              {{ skill }}
            </span>
          </div>
        </div>
        
        <!-- Code Category -->
        <div class="group p-8 bg-white/5 border border-white/10 rounded-xl hover:-translate-y-1 hover:bg-white/10 hover:border-accent-secondary hover:shadow-2xl hover:shadow-accent-secondary/10 transition-all duration-300">
          <h3 class="font-mono text-xl text-accent-secondary mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
            Code
          </h3>
          <div class="flex flex-wrap gap-3">
            <span v-for="skill in skills.code" :key="skill" 
                  class="px-3 py-1 text-sm font-mono text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/20 rounded-md">
              {{ skill }}
            </span>
          </div>
        </div>
        
        <!-- Tools Category -->
        <div class="group p-8 bg-white/5 border border-white/10 rounded-xl hover:-translate-y-1 hover:bg-white/10 hover:border-text-muted hover:shadow-2xl hover:shadow-text-muted/10 transition-all duration-300">
          <h3 class="font-mono text-xl text-text-muted mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
            Tools
          </h3>
          <div class="flex flex-wrap gap-3">
            <span v-for="skill in skills.tools" :key="skill" 
                  class="px-3 py-1 text-sm font-mono text-text-muted bg-white/5 border border-white/10 rounded-md">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

