import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { nextTick } from 'vue'

import App from './App.vue'
import { routes } from './router'
import { trackPageView } from './composables/useAnalytics'
import { createLangRef, LANG_KEY } from './composables/useI18n'
import { langFromPath } from './i18n/routing'

// vite-ssg builds the router (right history mode per environment), manages the
// unhead instance, and handles mount — so no manual createApp/createUnhead/mount.
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    // Always land at the top of the new page on navigation (Vue Router keeps
    // the previous scroll offset by default, which otherwise drops visitors
    // mid-page on /projects when they navigated from further down the home page).
    // A hash target (the header's "Contact" link, which resolves to /#contact
    // from any page) wins over that: `top` offsets the sticky header, since
    // router scrolling ignores the sections' scroll-margin.
    scrollBehavior(to, _from, savedPosition) {
      if (to.hash) return { el: to.hash, top: 72, behavior: 'smooth' }
      return savedPosition ?? { top: 0 }
    },
  },
  ({ app, router, isClient }) => {
    app.use(createPinia())

    // The /en prefix *is* the language state (see composables/useI18n). The ref
    // belongs to this app instance — vite-ssg prerenders routes concurrently, so
    // a shared one would let the passes overwrite each other's language — and
    // the guard below is its only writer. It runs during prerender too, which is
    // what makes vite-ssg emit real English HTML into dist/en/** rather than
    // Italian markup that only turns English once JS boots.
    const lang = createLangRef()
    app.provide(LANG_KEY, lang)
    router.beforeEach((to) => {
      lang.value = langFromPath(to.path)
    })

    // GA4 pageviews. `send_page_view: false` in the index.html gtag config means
    // nothing is sent automatically, so every view — the landing one included —
    // comes from here. Without this the SPA reported one pageview per session.
    if (!isClient) return

    let lastPath = ''
    const sendPageView = async (path: string) => {
      // afterEach also fires for the initial navigation on hydration, which
      // would otherwise double up with the isReady() call below.
      if (path === lastPath) return
      lastPath = path
      // unhead writes document.title after the route commits; without the tick
      // we'd report the *previous* page's title.
      await nextTick()
      trackPageView(path, document.title)
    }

    router.isReady().then(() => sendPageView(router.currentRoute.value.fullPath))
    router.afterEach((to) => {
      void sendPageView(to.fullPath)
    })
  },
)

// Lazy-loaded route chunks are fetched by hashed filename. If the site was
// redeployed while a tab (especially a long-lived mobile/PWA tab) stayed open,
// that hash no longer exists on the server and the dynamic import silently
// fails — clicking "All work" then does nothing. Recover by reloading once.
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', () => {
    window.location.reload()
  })
}
