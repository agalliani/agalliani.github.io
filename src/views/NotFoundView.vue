<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center font-ui text-ink"
  >
    <div class="font-mono text-[13px] uppercase tracking-[0.12em] text-ink-faint">404</div>
    <h1 class="mt-4 font-serif text-[clamp(36px,6vw,52px)] font-medium tracking-[-0.02em]">
      Page not found
    </h1>
    <p class="mt-4 max-w-[460px] text-[19px] leading-[1.6] text-ink-soft">
      The page you are looking for might have been removed, had its name changed, or is temporarily
      unavailable.
    </p>
    <div class="mt-9 flex flex-wrap justify-center gap-3.5">
      <RouterLink
        to="/"
        class="rounded-full bg-brand px-7 py-3.5 text-[16px] font-medium text-white no-underline transition-opacity hover:opacity-90"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/blog"
        class="rounded-full bg-surface px-7 py-3.5 text-[16px] font-medium text-ink no-underline transition-colors hover:bg-surface-2"
      >
        Blog
      </RouterLink>
    </div>
  </div>
</template>
