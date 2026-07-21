import { computed, ref } from 'vue'
import { messages, type Lang } from '../i18n/messages'

// Language state as a single module-level ref shared across every component that
// imports this composable. For one boolean-ish toggle + a static dictionary this
// is more maintainable than a Pinia store or vue-i18n: no store boilerplate, no
// SSR install dance. If i18n grows (more locales, interpolation, pluralisation)
// swap this for vue-i18n — callers only touch `t`/`lang`/`toggle`.
//
// SSR note: vite-ssg prerenders every route on the server with `lang` at its
// default ('it'), so the static HTML ships Italian (matching the design). We
// never mutate during prerender; the browser reads the saved preference after
// mount via initLangFromStorage().

const STORAGE_KEY = 'ag-lang'

const lang = ref<Lang>('it')

/**
 * Read the persisted language once on the client. Call from onMounted (never at
 * module load) so it stays out of the SSR render pass — `localStorage` doesn't
 * exist on the server, and mutating state there would leak across prerendered
 * pages.
 */
export function initLangFromStorage(): void {
  if (typeof window === 'undefined') return
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'it' || saved === 'en') lang.value = saved
}

export function useI18n() {
  const t = computed(() => messages[lang.value])
  const other = computed<Lang>(() => (lang.value === 'it' ? 'en' : 'it'))

  const setLang = (next: Lang) => {
    lang.value = next
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, next)
  }

  const toggle = () => setLang(other.value)

  return { lang, t, other, setLang, toggle }
}
