<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-6xl font-bold text-slate-200 mb-4">404</h1>
    <p class="text-xl text-slate-400 mb-8">Page Not Found</p>
    <p class="text-slate-500 mb-8 max-w-md">
      The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      If you are looking for a sub-project (like timeline-me), it might not be deployed yet.
    </p>
    <RouterLink to="/" class="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors">
      Go Home
    </RouterLink>
  </div>
</template>
