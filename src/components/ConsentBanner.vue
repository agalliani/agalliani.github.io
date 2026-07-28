<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useConsent, initConsentFromStorage } from '../composables/useConsent'

const { t } = useI18n()
const { consent, grant, deny } = useConsent()

// Client-only render. Two reasons: localStorage isn't readable during the
// vite-ssg prerender (so the banner would always be baked in as "undecided"),
// and shipping it in the static HTML would put a cookie bar in front of every
// crawler. Flipping the flag in onMounted keeps the server output empty.
const mounted = ref(false)

onMounted(() => {
  initConsentFromStorage()
  mounted.value = true
})
</script>

<template>
  <div
    v-if="mounted && consent === null"
    class="fixed inset-x-0 bottom-0 z-50 border-t border-night-line bg-night px-[clamp(24px,5vw,48px)] py-4 font-ui"
    role="region"
    aria-label="Cookie consent"
  >
    <div class="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-4">
      <p class="m-0 max-w-[620px] text-[14px] leading-[1.5] text-night-text">{{ t.consentText }}</p>
      <div class="flex shrink-0 gap-2.5">
        <button
          type="button"
          class="cursor-pointer rounded-full border border-night-line bg-transparent px-5 py-2 text-[14px] font-medium text-night-text transition-colors hover:border-night-line-strong hover:text-white"
          @click="deny"
        >
          {{ t.consentReject }}
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-full bg-brand px-5 py-2 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
          @click="grant"
        >
          {{ t.consentAccept }}
        </button>
      </div>
    </div>
  </div>
</template>
