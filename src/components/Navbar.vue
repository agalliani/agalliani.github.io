<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav :class="[
    'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6',
    isScrolled ? 'py-4 bg-slate-900/90 backdrop-blur-md border-b border-white/5 shadow-lg' : 'py-6 bg-transparent'
  ]">
    <div class="container mx-auto flex justify-between items-center">
      <div class="font-mono font-bold text-2xl text-text-main hover:text-accent cursor-pointer tracking-tighter transition-colors" 
           @click="scrollToSection('hero')">
        AG.
      </div>
      <div class="flex gap-8">
        <button @click="scrollToSection('about')" 
                class="text-text-muted font-mono text-sm hover:text-accent transition-colors">
          About
        </button>
        <button @click="scrollToSection('projects')" 
                class="text-text-muted font-mono text-sm hover:text-accent transition-colors">
          Projects
        </button>
        <button @click="scrollToSection('skills')" 
                class="text-text-muted font-mono text-sm hover:text-accent transition-colors">
          Skills
        </button>
        <button @click="scrollToSection('footer')" 
                class="text-text-muted font-mono text-sm hover:text-accent transition-colors">
          Contact
        </button>
      </div>
    </div>
  </nav>
</template>

