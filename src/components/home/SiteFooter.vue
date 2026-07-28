<script setup lang="ts">
import { useI18n } from '../../composables/useI18n'
import { track, trackOutbound } from '../../composables/useAnalytics'

const { t } = useI18n()

const links = [
  { label: 'Email', href: 'mailto:andrea.galliani.29@gmail.com', external: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andreagalliani', external: true },
  { label: 'GitHub', href: 'https://github.com/agalliani', external: true },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=mReBtJQAAAAJ&hl=it', external: true },
]

// The mail link is the site's actual conversion — it gets its own event name so
// it can be marked as a conversion in GA4 without filtering on a parameter.
const onLinkClick = (link: (typeof links)[number]) => {
  if (link.external) trackOutbound(link.href, link.label, 'footer_social')
  else track('contact_click', { method: 'email' })
}
</script>

<template>
  <footer
    id="contact"
    class="scroll-mt-16 border-t border-line bg-surface px-[clamp(24px,5vw,48px)] pb-14 pt-[clamp(64px,9vw,110px)] font-ui"
  >
    <div
      class="mx-auto flex max-w-[1080px] flex-wrap items-end justify-between gap-10 max-md:flex-col max-md:items-start"
    >
      <div>
        <div class="text-[14px] font-medium uppercase tracking-[0.12em] text-ink-faint">
          {{ t.contactKicker }}
        </div>
        <h2 class="mt-3 text-[44px] font-semibold tracking-[-0.02em] text-ink">{{ t.contactTitle }}</h2>
        <p class="mt-4 max-w-[460px] text-[19px] leading-[1.6] text-ink-soft">{{ t.contactLead }}</p>
      </div>
      <div class="flex flex-col gap-3 text-[17px] font-medium max-md:items-start md:items-end">
        <a
          v-for="l in links"
          :key="l.label"
          :href="l.href"
          :target="l.external ? '_blank' : undefined"
          :rel="l.external ? 'noopener' : undefined"
          class="text-brand hover:underline"
          @click="onLinkClick(l)"
        >
          {{ l.label }}
        </a>
      </div>
    </div>
    <div class="mx-auto mt-14 max-w-[1080px] border-t border-line pt-7 text-[13px] text-ink-faint">
      © 2026 Andrea Galliani
    </div>
  </footer>
</template>
