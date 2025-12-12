<script setup lang="ts">
</script>

<template>
  <section class="py-24 px-6 bg-primary/50 backdrop-blur-md border-y border-white/5 relative overflow-hidden">
    <div class="container mx-auto max-w-5xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="order-2 lg:order-1">
          <h2 class="text-4xl font-bold text-text-main mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-16 after:h-1 after:bg-accent after:rounded-full">
            About Me
          </h2>
          <p class="text-xl text-accent-secondary font-medium mb-6">
            Bridging the Gap Between Analog Silicon and Edge AI.
          </p>
          <p class="text-lg leading-relaxed text-text-muted mb-6">
            I am an <strong>AMS Engineer at Bosch Sensortec</strong> (Milan) with a Ph.D. in Microelectronics. My profile bridges two worlds: the precision of <strong>Analog Mixed-Signal Design</strong> (28nm CMOS/Radhard) and the scalability of <strong>Industrial IoT Software</strong> (Full-Stack). I build reliable systems from the sensor physics up to the cloud dashboard.
          </p>
          <p class="text-lg leading-relaxed text-text-muted">
            Recognized by <strong>Bosch Sensortec</strong> as a top innovator (1st Prize & HQ Invited), I don't just write code or design schematics—I build complete, intelligent systems from the transistor up to the cloud.
          </p>
        </div>
        
        <div class="order-1 lg:order-2 flex justify-center items-center">
          <div class="w-64 h-64 bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-white/10 rounded-3xl rotate-45 shadow-2xl relative backdrop-blur-sm animate-pulse">
            <div class="absolute inset-0 border border-white/5 rounded-3xl -rotate-6 scale-90"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

