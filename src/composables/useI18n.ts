import { computed, inject, ref, type InjectionKey, type Ref } from 'vue'
import { messages, type Lang } from '../i18n/messages'
import { DEFAULT_LANG, localizePath } from '../i18n/routing'

// The current language, provided per app instance and derived from the route.
//
// It is *not* a module-level ref, and that isn't a style choice: vite-ssg
// prerenders routes concurrently in a single Node process, so shared mutable
// state gets interleaved between renders — the first version of this shipped an
// Italian /blog page with English markup because the /en pass had moved the
// global ref mid-render. One ref per app, created in main.ts, makes each
// prerender pass independent.
//
// Language lives in the URL (/ vs /en), never in localStorage: a crawler has no
// storage and never clicks a toggle, so a stored preference could not make the
// English pages indexable. main.ts owns the only writer — a router guard.

export const LANG_KEY: InjectionKey<Ref<Lang>> = Symbol('lang')

// Used when a component is mounted outside the app created by main.ts — chiefly
// Cypress component tests, which mount a single component with no provider.
const fallbackLang = ref<Lang>(DEFAULT_LANG)

/** Creates the per-app language ref. Call once, from the vite-ssg setup hook. */
export function createLangRef(): Ref<Lang> {
  return ref<Lang>(DEFAULT_LANG)
}

export function useI18n() {
  const lang = inject(LANG_KEY, fallbackLang)

  const t = computed(() => messages[lang.value])
  const other = computed<Lang>(() => (lang.value === 'it' ? 'en' : 'it'))

  /**
   * Localises an internal path to the current language, so every link keeps the
   * visitor inside the tree they're browsing: lp('/blog') is '/blog' in Italian
   * and '/en/blog' in English.
   */
  const lp = (path: string) => localizePath(path, lang.value)

  return { lang, t, other, lp }
}
