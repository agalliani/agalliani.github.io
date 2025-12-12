<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-slate-950 border-t border-white/5 relative overflow-hidden">
    <!-- Background Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="container mx-auto max-w-5xl px-6 py-20 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-200 mb-4 tracking-tight">
          Ready to Solve Complex Engineering Challenges?
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Always open to discussing R&D opportunities in Analog IC Design, Embedded Systems, and Edge AI.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <!-- Email -->
        <a href="mailto:andreagalliani29@gmail.com" class="group flex flex-col items-center p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-accent/30 hover:bg-slate-900 transition-all duration-300">
          <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
            <i class="fas fa-envelope text-xl"></i>
          </div>
          <h3 class="text-slate-200 font-bold mb-1">Get in Touch</h3>
          <span class="text-sm text-slate-500 group-hover:text-accent transition-colors">andreagalliani29@gmail.com</span>
        </a>

        <!-- LinkedIn -->
        <a href="https://www.linkedin.com/in/andreagalliani" target="_blank" class="group flex flex-col items-center p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-[#0077b5]/30 hover:bg-slate-900 transition-all duration-300">
          <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-[#0077b5] mb-4 group-hover:scale-110 transition-transform">
            <i class="fab fa-linkedin-in text-xl"></i>
          </div>
          <h3 class="text-slate-200 font-bold mb-1">Connect on LinkedIn</h3>
          <span class="text-sm text-slate-500 group-hover:text-[#0077b5] transition-colors">View Profile</span>
        </a>

        <!-- GitHub -->
        <a href="https://github.com/agalliani" target="_blank" class="group flex flex-col items-center p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/30 hover:bg-slate-900 transition-all duration-300">
          <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <i class="fab fa-github text-xl"></i>
          </div>
          <h3 class="text-slate-200 font-bold mb-1">Check Code</h3>
          <span class="text-sm text-slate-500 group-hover:text-white transition-colors">Explore Repositories</span>
        </a>
      </div>

      <div class="text-center border-t border-white/5 pt-8">
        <p class="text-slate-500 text-sm">
          © {{ year }} Andrea Galliani. Ph.D. Candidate & Engineering Specialist.
        </p>
      </div>
    </div>
  </footer>
</template>

