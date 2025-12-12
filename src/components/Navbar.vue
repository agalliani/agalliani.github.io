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

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToSection = (id: string) => {
  isMobileMenuOpen.value = false
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
      <div class="font-mono font-bold text-2xl text-slate-200 hover:text-amber-400 cursor-pointer tracking-tighter transition-colors" 
           @click="scrollToSection('hero')">
        AG.
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex gap-8">
        <button @click="scrollToSection('about')" 
                class="text-slate-400 font-mono text-sm hover:text-amber-400 transition-colors cursor-pointer">
          About
        </button>
        <button @click="scrollToSection('projects')" 
                class="text-slate-400 font-mono text-sm hover:text-amber-400 transition-colors cursor-pointer">
          Projects
        </button>
        <button @click="scrollToSection('skills')" 
                class="text-slate-400 font-mono text-sm hover:text-amber-400 transition-colors cursor-pointer">
          Skills
        </button>
        <button @click="scrollToSection('footer')" 
                class="text-slate-400 font-mono text-sm hover:text-amber-400 transition-colors cursor-pointer">
          Contact
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-slate-200 text-2xl focus:outline-none cursor-pointer" @click="toggleMobileMenu">
        <i class="fas" :class="isMobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div v-show="isMobileMenuOpen" 
         class="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 shadow-xl md:hidden flex flex-col p-6 gap-4">
      <button @click="scrollToSection('about')" 
              class="text-slate-400 font-mono text-lg hover:text-amber-400 transition-colors text-left py-2 border-b border-white/5 cursor-pointer">
        About
      </button>
      <button @click="scrollToSection('projects')" 
              class="text-slate-400 font-mono text-lg hover:text-amber-400 transition-colors text-left py-2 border-b border-white/5 cursor-pointer">
        Projects
      </button>
      <button @click="scrollToSection('skills')" 
              class="text-slate-400 font-mono text-lg hover:text-amber-400 transition-colors text-left py-2 border-b border-white/5 cursor-pointer">
        Skills
      </button>
      <button @click="scrollToSection('footer')" 
              class="text-slate-400 font-mono text-lg hover:text-amber-400 transition-colors text-left py-2 cursor-pointer">
        Contact
      </button>
    </div>
  </nav>
</template>

