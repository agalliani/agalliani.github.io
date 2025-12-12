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
            I thrive at the intersection of hardware and software.
          </p>
          <p class="text-lg leading-relaxed text-text-muted mb-6">
            With hands-on experience in analog & mixed-signal IC design and a strong background in full-stack development, I simplify the bridge between silicon and systems. I create solutions that are not only technically robust but also practical and scalable.
          </p>
          <p class="text-lg leading-relaxed text-text-muted">
            Working with me means gaining a collaborator who understands both the chip and the code, delivering value faster and smarter.
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

