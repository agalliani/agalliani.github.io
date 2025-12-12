<script setup lang="ts">
const skillCategories = [
  {
    title: 'Silicon & Hardware',
    skills: [
      { name: 'Analog IC Design', validation: 'Bosch Sensortec & PhD' },
      { name: 'RadHard Design', validation: 'INFN Falaphel / CERN' },
      { name: '28nm CMOS', validation: 'Tape-out Experience' },
      { name: 'Cadence Virtuoso', validation: 'Daily Professional Use' },
      { name: 'PCB Design', validation: 'Altium Designer / KiCad' },
      { name: 'Lab Testing', validation: 'Validation & Characterization' }
    ],
    theme: 'accent'
  },
  {
    title: 'Software & Firmware',
    skills: [
      { name: 'SystemVerilog', validation: 'STFC Training & Verification' },
      { name: 'Python', validation: 'Data Analysis & Automation' },
      { name: 'Vue.js / TS', validation: 'MangroviaIoT Platform' },
      { name: 'C / C++', validation: 'Embedded & DAQ Systems' },
      { name: 'Node.js', validation: 'Backend Services' },
      { name: 'Linux / Bash', validation: 'Server Administration' }
    ],
    theme: 'secondary'
  },
  {
    title: 'Methodology & Tools',
    skills: [
      { name: 'Git & CI/CD', validation: 'Enterprise Workflows' },
      { name: 'Docker', validation: 'Containerization' },
      { name: 'Fusion 360', validation: 'Enclosures & Wearables' },
      { name: '3D Printing', validation: 'Bambu Lab X1C / Ender 3' },
      { name: 'Tech Writing', validation: '10+ Publications' },
      { name: 'Public Speaking', validation: 'IEEE Conferences' }
    ],
    theme: 'muted'
  }
]

const themeClasses = {
  accent: {
    border: 'border-accent/20',
    bg: 'bg-accent/5',
    text: 'text-accent',
    hover: 'group-hover:border-accent group-hover:shadow-accent/10',
    pill: 'bg-accent/10 border-accent/20 text-accent'
  },
  secondary: {
    border: 'border-accent-secondary/20',
    bg: 'bg-accent-secondary/5',
    text: 'text-accent-secondary',
    hover: 'group-hover:border-accent-secondary group-hover:shadow-accent-secondary/10',
    pill: 'bg-accent-secondary/10 border-accent-secondary/20 text-accent-secondary'
  },
  muted: {
    border: 'border-white/10',
    bg: 'bg-white/5',
    text: 'text-text-muted',
    hover: 'group-hover:border-text-muted group-hover:shadow-text-muted/10',
    pill: 'bg-white/5 border-white/10 text-text-muted'
  }
}
</script>

<template>
  <section class="py-24 px-6 bg-primary-dark/50 relative">
    <div class="container mx-auto max-w-6xl">
      <h2 class="text-4xl font-bold text-center text-text-main mb-4 tracking-tight">
        Technical Arsenal
      </h2>
      <p class="text-center text-text-muted mb-16 max-w-2xl mx-auto">
        Competencies backed by real-world industrial projects and academic research.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="category in skillCategories" :key="category.title"
             class="group p-6 border rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
             :class="[themeClasses[category.theme as keyof typeof themeClasses].border, themeClasses[category.theme as keyof typeof themeClasses].bg, themeClasses[category.theme as keyof typeof themeClasses].hover]">
          
          <h3 class="font-mono text-xl mb-6 uppercase tracking-widest border-b border-white/10 pb-4"
              :class="themeClasses[category.theme as keyof typeof themeClasses].text">
            {{ category.title }}
          </h3>
          
          <div class="grid grid-cols-1 gap-3">
            <div v-for="skill in category.skills" :key="skill.name" 
                 class="flex flex-col p-3 rounded-lg border transition-colors"
                 :class="themeClasses[category.theme as keyof typeof themeClasses].pill">
              <span class="font-bold text-sm">{{ skill.name }}</span>
              <span class="text-xs opacity-70 mt-1 font-mono">{{ skill.validation }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

