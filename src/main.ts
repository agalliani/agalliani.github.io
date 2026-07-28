import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import App from './App.vue'
import { routes } from './router'

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
  ({ app }) => {
    app.use(createPinia())
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
