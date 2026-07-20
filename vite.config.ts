import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
// Type-only import: activates vite-ssg's `declare module 'vite'` augmentation so
// `ssgOptions` type-checks below.
import type { } from 'vite-ssg'

/** Concrete /blog/<slug> paths, read from the synced JSON so prerender covers every post. */
function blogRoutes(): string[] {
  const dir = fileURLToPath(new URL('./src/content/blog', import.meta.url))
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => `/blog/${f.replace(/\.json$/, '')}`)
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  ssgOptions: {
    // Emit dist/<route>/index.html so Vercel serves each prerendered route
    // (the filesystem is checked before the SPA rewrite in vercel.json).
    dirStyle: 'nested',
    // Explicit route list: static routes + every blog post; the catch-all
    // not-found and the /blog/:slug template are intentionally excluded.
    includedRoutes: () => ['/', '/blog', ...blogRoutes()],
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'propic.webp'],
      manifest: {
        name: 'Andrea Galliani Portfolio',
        short_name: 'AG Portfolio',
        description: 'Portfolio of Andrea Galliani - AMS Engineer & Full Stack Developer',
        theme_color: '#0f172a',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json,vue,ts}'],
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/], // Exclude static SEO files
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-awesome-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
