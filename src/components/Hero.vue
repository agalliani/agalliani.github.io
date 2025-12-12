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

    <div class="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
      
      <!-- Profile Photo (Left/Top) -->
      <div class="lg:col-span-4 flex justify-center lg:justify-end order-1">
        <div class="relative w-64 h-64 lg:w-80 lg:h-80">
          <!-- Glow effect -->
          <div class="absolute inset-0 bg-accent rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <img src="/propic.webp" alt="Andrea Galliani" 
               class="relative w-full h-full object-cover rounded-full border-2 border-accent shadow-2xl ring-1 ring-white/10" />
        </div>
      </div>

      <!-- Content (Right/Bottom) -->
      <div class="lg:col-span-8 order-2 text-center lg:text-left">
        
        <!-- Header Info -->
        <div class="mb-8">
          <h1 class="text-5xl lg:text-7xl font-bold text-text-main mb-4 tracking-tight">
            Andrea <span class="text-accent">Galliani</span>
          </h1>
          <h2 class="text-xl lg:text-2xl font-mono text-accent-secondary">
            AMS Engineer @ Bosch Sensortec | Ph.D.
          </h2>
        </div>

        <!-- Tech Card -->
        <div id="about" class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
          <h3 class="text-2xl font-bold text-text-main mb-4">About Me</h3>
          <p class="text-lg text-text-muted leading-relaxed mb-6">
            I am an <strong>AMS Engineer at Bosch Sensortec</strong> (Milan) with a Ph.D. in Microelectronics. 
            My profile bridges two worlds: the precision of <strong>Analog Mixed-Signal Design</strong> (28nm CMOS/Radhard) 
            and the scalability of <strong>Industrial IoT Software</strong> (Full-Stack).
          </p>
          <p class="text-lg text-text-muted leading-relaxed mb-8">
            I don't just write code or design schematic, I build complete, intelligent systems from the transistor up to the cloud.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>
