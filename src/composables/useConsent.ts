import { ref } from 'vue'
import { trackPageView } from './useAnalytics'
import { setClarityConsent } from './useClarity'

// Analytics consent state, shaped exactly like useI18n(): one module-level ref
// shared by every importer, hydrated from localStorage on the client only.
//
// SSR note: vite-ssg prerenders with `consent` at null and ConsentBanner is
// gated behind an onMounted flag, so the banner never lands in the static HTML.
// Never read localStorage at module load — it doesn't exist on the server.

const STORAGE_KEY = 'ag-consent'

export type Consent = 'granted' | 'denied'

/** null = the visitor hasn't chosen yet (the only state that shows the banner). */
const consent = ref<Consent | null>(null)

/** Fan the visitor's answer out to every tag that has a consent switch. */
function updateConsent(value: Consent): void {
  if (typeof window === 'undefined') return
  // Only analytics storage is ever granted — the site runs no ads, so the ad_*
  // signals stay denied regardless of the answer.
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: value === 'granted' ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }
  // Clarity has no consent defaults to declare up front, so main.ts already sent
  // a `denied` state at init; this is the update.
  setClarityConsent(value)
}

/**
 * Read the persisted choice once on the client. Call from onMounted (never at
 * module load) — same rule as initLangFromStorage().
 */
export function initConsentFromStorage(): void {
  if (typeof window === 'undefined') return
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved !== 'granted' && saved !== 'denied') return
  consent.value = saved
  // Both tags start at `denied`, so only a granted choice needs replaying.
  if (saved === 'granted') updateConsent('granted')
}

export function useConsent() {
  const set = (value: Consent) => {
    consent.value = value
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, value)
    updateConsent(value)
  }

  const grant = () => {
    set('granted')
    // The pageview for this route already went out cookieless, before consent.
    // Re-send it so the now-identified session doesn't start on a blank entry.
    if (typeof window !== 'undefined') {
      trackPageView(window.location.pathname + window.location.search, document.title)
    }
  }

  const deny = () => set('denied')

  return { consent, grant, deny }
}
