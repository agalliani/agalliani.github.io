<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { usePost } from '../composables/useBlogPosts'
import { localizePath } from '../i18n/routing'
import { track } from '../composables/useAnalytics'
import type { Messages } from '../i18n/messages'

// The one navigation bar of the site, shared by the home page and every route
// (/blog, /blog/:slug, /projects). It used to exist in three variants — a
// scroll nav on the home page and a reduced "← Home" chrome on the inner pages
// — so the site had no stable navigation: its shape changed per page. Now real
// destinations are RouterLinks, and #contact (a section, not a page) is the one
// anchor, resolved against "/" so it works from an inner page too.

const { t, lp, other } = useI18n()
const route = useRoute()

const links: { key: keyof Messages; to: string }[] = [
  { key: 'navWork', to: '/projects' },
  { key: 'navBlog', to: '/blog' },
]

// Compared against the localised path, so /en/blog highlights "Blog" the same
// way /blog does. /blog/<slug> keeps it highlighted too.
const isActive = (to: string) => route.path === lp(to) || route.path.startsWith(`${lp(to)}/`)

// On the home page the brand is a scroll-to-top affordance; elsewhere the
// RouterLink navigation does the work on its own.
const onBrandClick = (e: MouseEvent) => {
  track('nav_click', { target: 'brand', location: 'header' })
  if (route.path !== lp('/')) return
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onNavClick = (target: string) => track('nav_click', { target, location: 'header' })

// The language switch is a link to the same page in the other tree, not a state
// toggle: the URL carries the language, so the switch has to be navigation.
// Being a real <a href> also means crawlers can follow it and discover the
// English pages, which a button would have hidden behind a click handler.
//
// For every page but a blog post the other tree's URL *is* the same path with
// the prefix swapped. A post is the exception: its English URL can carry its
// own localized slug (see LocalizedBlogPost.langPaths), so prefixing blindly
// pointed at URLs that don't exist — /en/<italian-slug>, which is prerendered
// for no post, and worse, /blog/<english-slug> going back, which resolves to
// nothing at all and 404s. So ask the post for its real URL in the other
// language, and only fall back to the prefix swap when there isn't one (a
// static page, or a post with no translation — which by design still renders
// Italian under /en and canonicalises to the Italian URL).
const currentPost = usePost(computed(() => String(route.params.slug ?? '')))

const switchTo = computed(() => ({
  path: currentPost.value?.langPaths[other.value] ?? localizePath(route.path, other.value),
  hash: route.hash,
}))

const onSwitchLang = () => track('language_switch', { to: other.value })
</script>

<template>
  <header
    class="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white/80 px-[clamp(24px,5vw,48px)] py-[18px] font-ui backdrop-blur-[20px] backdrop-saturate-[1.8]"
  >
    <RouterLink
      :to="lp('/')"
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
        :to="lp(l.to)"
        class="no-underline transition-colors hover:text-ink"
        :class="isActive(l.to) ? 'font-semibold text-ink' : 'text-ink-soft'"
        :aria-current="isActive(l.to) ? 'page' : undefined"
        @click="onNavClick(l.to)"
      >
        {{ t[l.key] }}
      </RouterLink>

      <RouterLink
        :to="{ path: lp('/'), hash: '#contact' }"
        class="text-ink-soft no-underline transition-colors hover:text-ink max-[440px]:hidden"
        @click="onNavClick('contact')"
      >
        {{ t.navContact }}
      </RouterLink>

      <RouterLink
        :to="switchTo"
        class="shrink-0 rounded-full border border-line-strong px-3 py-1.5 text-[13px] font-semibold text-ink no-underline transition-colors hover:bg-surface"
        :hreflang="other"
        :aria-label="`Switch language to ${other === 'en' ? 'English' : 'Italian'}`"
        @click="onSwitchLang"
      >
        {{ other.toUpperCase() }}
      </RouterLink>
    </nav>
  </header>
</template>
