<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { track } from '../composables/useAnalytics'
import type { Messages } from '../i18n/messages'

// The one navigation bar of the site, shared by the home page and every route
// (/blog, /blog/:slug, /projects). It used to exist in three variants — a
// scroll nav on the home page and a reduced "← Home" chrome on the inner pages
// — so the site had no stable navigation: its shape changed per page. Now real
// destinations are RouterLinks, and #contact (a section, not a page) is the one
// anchor, resolved against "/" so it works from an inner page too.

const { t, other, toggle } = useI18n()
const route = useRoute()

const links: { key: keyof Messages; to: string }[] = [
  { key: 'navWork', to: '/projects' },
  { key: 'navBlog', to: '/blog' },
]

// /blog/<slug> keeps "Blog" highlighted.
const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)

// On the home page the brand is a scroll-to-top affordance; elsewhere the
// RouterLink navigation does the work on its own.
const onBrandClick = (e: MouseEvent) => {
  track('nav_click', { target: 'brand', location: 'header' })
  if (route.path !== '/') return
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onNavClick = (target: string) => track('nav_click', { target, location: 'header' })

const onToggleLang = () => {
  // Read `other` before toggling — after it, it's the language we came from.
  track('language_switch', { to: other.value })
  toggle()
}
</script>

<template>
  <header
    class="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white/80 px-[clamp(24px,5vw,48px)] py-[18px] font-ui backdrop-blur-[20px] backdrop-saturate-[1.8]"
  >
    <RouterLink
      to="/"
      class="text-[19px] font-semibold tracking-[-0.02em] text-ink no-underline max-[440px]:text-[17px]"
      @click="onBrandClick"
    >
      Andrea Galliani
    </RouterLink>

    <nav
      class="flex items-center gap-[34px] text-[15px] max-md:gap-5 max-[440px]:gap-3.5 max-[440px]:text-[14px]"
    >
      <RouterLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        class="no-underline transition-colors hover:text-ink"
        :class="isActive(l.to) ? 'font-semibold text-ink' : 'text-ink-soft'"
        :aria-current="isActive(l.to) ? 'page' : undefined"
        @click="onNavClick(l.to)"
      >
        {{ t[l.key] }}
      </RouterLink>

      <RouterLink
        :to="{ path: '/', hash: '#contact' }"
        class="text-ink-soft no-underline transition-colors hover:text-ink max-[440px]:hidden"
        @click="onNavClick('contact')"
      >
        {{ t.navContact }}
      </RouterLink>

      <button
        type="button"
        class="shrink-0 cursor-pointer rounded-full border border-line-strong bg-transparent px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-surface"
        :aria-label="`Switch language to ${other === 'en' ? 'English' : 'Italian'}`"
        @click="onToggleLang"
      >
        {{ other.toUpperCase() }}
      </button>
    </nav>
  </header>
</template>
