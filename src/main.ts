import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import App from './App.vue'
import { routes } from './router'

// vite-ssg builds the router (right history mode per environment), manages the
// unhead instance, and handles mount — so no manual createApp/createUnhead/mount.
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app }) => {
    app.use(createPinia())
  },
)
