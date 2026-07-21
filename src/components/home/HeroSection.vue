<script setup lang="ts">
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    class="mx-auto grid max-w-[1200px] grid-cols-[1.15fr_.85fr] items-center gap-20 px-[clamp(24px,5vw,48px)] py-[clamp(64px,10vw,120px)] font-ui max-md:grid-cols-1 max-md:gap-10"
  >
    <!-- Left: copy -->
    <div>
      <div class="text-[14px] font-medium uppercase tracking-[0.12em] text-ink-faint">
        {{ t.role }}
      </div>
      <h1 class="mt-5 text-[76px] font-semibold leading-[1.02] tracking-[-0.03em] text-ink max-md:text-[clamp(48px,15vw,68px)]">
        Andrea<br />Galliani
      </h1>
      <p class="mt-7 max-w-[480px] text-[26px] font-medium leading-[1.32] tracking-[-0.01em] text-ink max-md:text-[22px]">
        {{ t.heroTag }}
      </p>
      <p class="mt-[22px] max-w-[500px] text-[19px] leading-[1.6] text-ink-soft">
        {{ t.heroLead }}
      </p>
      <div class="mt-10 flex flex-wrap gap-3.5">
        <button
          type="button"
          class="cursor-pointer rounded-full bg-brand px-7 py-3.5 text-[16px] font-medium text-white transition-opacity hover:opacity-90"
          @click="scrollTo('blog')"
        >
          {{ t.ctaBlog }}
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-full bg-surface px-7 py-3.5 text-[16px] font-medium text-ink transition-colors hover:bg-surface-2"
          @click="scrollTo('work')"
        >
          {{ t.ctaWork }}
        </button>
      </div>
    </div>

    <!-- Right: portrait -->
    <div
      class="aspect-[4/5] overflow-hidden rounded-[28px] bg-surface shadow-[0_30px_70px_rgba(0,0,0,0.14)] max-md:order-first max-md:mx-auto max-md:w-full max-md:max-w-[340px]"
    >
      <img
        src="/propic.webp"
        alt="Andrea Galliani"
        class="h-full w-full object-cover"
        width="640"
        height="800"
      />
    </div>
  </section>
</template>
