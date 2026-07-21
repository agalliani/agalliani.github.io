<script setup lang="ts">
import { useI18n } from '../../composables/useI18n'

const { t, other, toggle } = useI18n()

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <header
    class="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white/80 px-[clamp(24px,5vw,48px)] py-[18px] font-ui backdrop-blur-[20px] backdrop-saturate-[1.8]"
  >
    <button
      type="button"
      class="cursor-pointer bg-transparent text-[19px] font-semibold tracking-[-0.02em] text-ink"
      @click="scrollTop"
    >
      Andrea Galliani
    </button>

    <nav class="flex items-center gap-[34px] text-[15px] max-md:gap-5">
      <button
        type="button"
        class="nav-link cursor-pointer bg-transparent text-ink transition-colors hover:text-ink/60 max-[440px]:hidden"
        @click="scrollTo('work')"
      >
        {{ t.navWork }}
      </button>
      <button
        type="button"
        class="nav-link cursor-pointer bg-transparent font-medium text-ink transition-colors hover:text-ink/60 max-[440px]:hidden"
        @click="scrollTo('blog')"
      >
        {{ t.navBlog }}
      </button>
      <button
        type="button"
        class="nav-link cursor-pointer bg-transparent text-ink transition-colors hover:text-ink/60 max-[440px]:hidden"
        @click="scrollTo('contact')"
      >
        {{ t.navContact }}
      </button>
      <button
        type="button"
        class="cursor-pointer rounded-full border border-line-strong bg-transparent px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-surface"
        :aria-label="`Switch language to ${other === 'en' ? 'English' : 'Italian'}`"
        @click="toggle"
      >
        {{ other.toUpperCase() }}
      </button>
    </nav>
  </header>
</template>
