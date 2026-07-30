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
// Shared with the app so the prerendered paths and the router can't drift apart.
import { localizePath } from './src/i18n/routing'

/**
 * Per-post slugs, read from the synced JSON: the Italian slug always, plus
 * the English one when the post has a translation — which may be a genuine
 * localized slug (`en.slug`) or, for translations that predate localized
 * slugs, the Italian slug reused under /en (old behaviour).
 */
function blogPostSlugs(): Array<{ it: string; en?: string }> {
  const dir = fileURLToPath(new URL('./src/content/blog', import.meta.url))
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const post = JSON.parse(fs.readFileSync(new URL(`./src/content/blog/${f}`, import.meta.url), 'utf8'))
      return { it: post.slug as string, en: post.en ? ((post.en.slug as string) || post.slug) : undefined }
    })
}

/**
 * Every page, in both languages. The English tree is only indexable because it
 * is prerendered here: without these entries /en/* would fall through to the SPA
 * rewrite and a crawler would get the Italian shell.
 *
 * Blog posts are handled separately from the other pages: their English URL
 * doesn't share the Italian page's slug, so it can't be derived by blindly
 * prefixing `/en` onto the same path like the static pages can.
 */
function allRoutes(): string[] {
  const staticPages = ['/', '/projects', '/blog']
  const posts = blogPostSlugs()
  return [
    ...staticPages,
    ...staticPages.map((p) => localizePath(p, 'en')),
    ...posts.map((p) => `/blog/${p.it}`),
    ...posts.filter((p) => p.en).map((p) => `${localizePath('/blog', 'en')}/${p.en}`),
  ]
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  ssgOptions: {
    // Emit dist/<route>/index.html so Vercel serves each prerendered route
    // (the filesystem is checked before the SPA rewrite in vercel.json).
    dirStyle: 'nested',
    // Explicit route list: static routes + every blog post, in both languages;
    // the catch-all not-found and the /blog/:slug template are intentionally
    // excluded.
    includedRoutes: () => allRoutes(),
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
