// Thin typed wrapper over gtag.js (loaded in index.html, see the Consent Mode
// block there). Every helper is a silent no-op when `gtag` isn't there, which
// covers two real cases: the vite-ssg prerender pass (no `window` at all) and a
// browser where an ad blocker dropped the tag. Nothing here throws, so call
// sites never need a guard.
//
// Consent is *not* checked here: Consent Mode handles it inside gtag — with
// `analytics_storage: 'denied'` events still go out, just cookieless. Queueing
// events ourselves would only duplicate that logic.

/**
 * Every custom event the site sends. Keeping it a union means a typo fails
 * `npm run type-check` instead of silently creating a junk event in GA4.
 */
export type AnalyticsEvent =
  | 'page_view'
  | 'outbound_click'
  | 'contact_click'
  | 'cta_click'
  | 'nav_click'
  | 'blog_post_click'
  | 'language_switch'
  | 'page_not_found'
  | 'scroll_depth'
  | 'read_complete'
  | 'gallery_open'
  | 'project_expand'

export type AnalyticsParams = Record<string, string | number | boolean>

function gtag(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === 'undefined') return undefined
  return typeof window.gtag === 'function' ? window.gtag : undefined
}

export function track(name: AnalyticsEvent, params: AnalyticsParams = {}): void {
  gtag()?.('event', name, params)
}

/**
 * Manual page_view — `send_page_view: false` in the gtag config means GA4 never
 * sends one on its own, so this is the single source of pageviews (initial load
 * included). Called from the router hook in main.ts.
 */
export function trackPageView(path: string, title: string): void {
  gtag()?.('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
  })
}

/**
 * Click on a link leaving the site. `context` says *where* on the site it was
 * (featured_work, project_card, footer_social, post_body, …) — that's the part
 * worth segmenting on, so register it as a custom dimension in GA4.
 */
export function trackOutbound(url: string, label: string, context: string): void {
  track('outbound_click', {
    link_url: url,
    link_domain: hostnameOf(url),
    link_label: label,
    context,
  })
}

function hostnameOf(url: string): string {
  try {
    // Relative URLs would throw without a base; they're not outbound anyway, so
    // the base only exists to keep this total.
    return new URL(url, typeof window !== 'undefined' ? window.location.href : 'https://andreagalliani.com')
      .hostname
  } catch {
    return ''
  }
}
