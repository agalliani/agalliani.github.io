// Thin typed wrapper over Microsoft Clarity (@microsoft/clarity), the session
// replay / heatmap counterpart to the GA4 wrapper in useAnalytics.ts.
//
// The npm package only queues calls onto `window.clarity` and injects the tag
// script, so importing it is safe during the vite-ssg prerender pass — but every
// call *does* touch `window`, hence the guards here. Nothing throws, so call
// sites never need one of their own.
//
// Consent: unlike gtag there are no consent defaults to declare up front, so
// initClarity() immediately follows init() with an explicit consentV2 state.
// Until the visitor accepts the banner that state is `denied`, which keeps
// Clarity cookieless (no first-party _clck/_clsk cookies); useConsent flips it
// to `granted` on accept. This only takes effect if "Cookie consent" is enabled
// in the Clarity project settings — otherwise Clarity always sets its cookies.

import Clarity from '@microsoft/clarity'

const PROJECT_ID = 'y3pjsamd7b'

function ready(): boolean {
  return typeof window !== 'undefined' && typeof window.clarity === 'function'
}

/** Load the Clarity tag. Client-only, called once from main.ts. */
export function initClarity(consent: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return
  Clarity.init(PROJECT_ID)
  setClarityConsent(consent)
}

/**
 * Mirror the banner's answer into Clarity. The site runs no ads, so ad storage
 * stays denied regardless — same rule as the gtag consent update.
 */
export function setClarityConsent(consent: 'granted' | 'denied'): void {
  if (!ready()) return
  Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: consent })
}

/**
 * Tag the current session with an arbitrary key/value, to filter recordings by
 * it in the Clarity dashboard.
 */
export function setClarityTag(key: string, value: string | string[]): void {
  if (!ready()) return
  Clarity.setTag(key, value)
}

/** Custom event, surfaced next to Clarity's own Smart events. */
export function trackClarityEvent(name: string): void {
  if (!ready()) return
  Clarity.event(name)
}
