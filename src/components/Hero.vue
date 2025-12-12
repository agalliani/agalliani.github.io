<script setup lang="ts">
const scrollToProjects = () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-20 pointer-events-none" 
         style="background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 24px 24px;">
    </div>

    <div class="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
      <!-- Text Content -->
      <div class="text-center lg:text-left order-2 lg:order-1">
        <h1 class="text-5xl lg:text-7xl font-bold text-text-main mb-4 tracking-tight">
          Andrea <span class="text-accent">Galliani</span>
        </h1>
        <h2 class="text-lg lg:text-xl font-mono text-accent-secondary mb-8">
          AMS Engineer @ Bosch Sensortec | Ph.D.
        </h2>
        <p class="text-text-muted text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          Bridging Analog Design & Digital Intelligence. Designing Mixed-Signal interfaces for MEMS sensors.
        </p>
        
        <button @click="scrollToProjects" 
                class="px-8 py-3 bg-accent hover:bg-accent-hover text-primary-dark font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-accent/20">
          View Projects
        </button>
      </div>

      <!-- Profile Photo -->
      <div class="order-1 lg:order-2 flex justify-center lg:justify-end">
        <div class="relative w-64 h-64 lg:w-80 lg:h-80">
          <div class="absolute inset-0 bg-accent rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <img src="/propic.webp" alt="Andrea Galliani" 
               class="relative w-full h-full object-cover rounded-full border-4 border-primary-light shadow-2xl ring-1 ring-white/10" />
        </div>
      </div>
    </div>
  </section>
</template>

