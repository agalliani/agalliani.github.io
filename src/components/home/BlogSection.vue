<script setup lang="ts">
import { useI18n } from '../../composables/useI18n'
import oxymeterHero from '@/assets/images/web-apps/oxymeter-hero.png'

const { t } = useI18n()
</script>

<template>
  <section
    id="blog"
    class="scroll-mt-16 bg-night px-[clamp(24px,5vw,48px)] py-[clamp(64px,10vw,120px)] font-ui text-surface"
  >
    <div class="mx-auto max-w-[1080px]">
      <!-- Heading -->
      <div class="max-w-[600px]">
        <div class="mb-2 font-serif text-[22px] italic text-sky">{{ t.blogKicker }}</div>
        <h2 class="m-0 font-serif text-[48px] font-medium leading-[1.1]">{{ t.blogTitle }}</h2>
        <p class="mt-5 text-[19px] leading-[1.6] text-night-text">{{ t.blogLead }}</p>
      </div>

      <!-- Cards -->
      <div class="mt-14 grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-7">
        <!-- HAB — placeholder panel, not yet a real link -->
        <div
          class="flex flex-col overflow-hidden rounded-3xl border border-night-line bg-night-card"
        >
          <div
            class="relative aspect-video overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#22467e_45%,#7db0e6_100%)]"
          >
            <div
              class="absolute inset-0"
              style="
                background:
                  radial-gradient(circle at 72% 20%, rgba(255, 255, 255, 0.9) 0 2px, transparent 3px),
                  radial-gradient(circle at 30% 35%, rgba(255, 255, 255, 0.7) 0 1.5px, transparent 2.5px),
                  radial-gradient(circle at 55% 15%, rgba(255, 255, 255, 0.6) 0 1.5px, transparent 2.5px);
              "
            ></div>
            <div
              class="absolute bottom-[22px] left-7 font-mono text-[12px] uppercase tracking-[0.1em] text-white/85"
            >
              ↑ 35.000 m
            </div>
          </div>
          <div class="flex flex-1 flex-col p-8 pb-[34px]">
            <div class="flex items-center justify-between">
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-night-faint">
                {{ t.habLabel }}
              </span>
              <span
                class="rounded-full border border-badge-line px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-sky"
              >
                {{ t.blogSoon }}
              </span>
            </div>
            <h3 class="mt-5 font-serif text-[clamp(28px,3.4vw,36px)] font-medium leading-[1.12] tracking-[-0.01em] text-white">
              HAB
            </h3>
            <p class="mt-3 text-[16px] leading-[1.6] text-night-text">{{ t.habLead }}</p>
          </div>
        </div>

        <!-- Oxymeter — real link -->
        <a
          href="https://www.oxymeter.it/"
          target="_blank"
          rel="noopener"
          class="group flex flex-col overflow-hidden rounded-3xl border border-night-line bg-night-card no-underline transition duration-[250ms] hover:-translate-y-1 hover:border-night-line-strong hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
        >
          <div class="aspect-video overflow-hidden bg-[#1a1a1c]">
            <img
              :src="oxymeterHero"
              alt="Oxymeter"
              class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
          <div class="flex flex-1 flex-col p-8 pb-[34px]">
            <div class="flex items-center justify-between">
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-night-faint">
                {{ t.oxyLabel }}
              </span>
              <span
                class="rounded-full border border-badge-line px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-sky"
              >
                {{ t.blogSoon }}
              </span>
            </div>
            <h3 class="mt-5 font-serif text-[clamp(28px,3.4vw,36px)] font-medium leading-[1.12] tracking-[-0.01em] text-white">
              Oxymeter
            </h3>
            <p class="mt-3 text-[16px] leading-[1.6] text-night-text">{{ t.oxyLead }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
