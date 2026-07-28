/// <reference types="vite/client" />

// gtag.js is loaded from index.html (not npm), so its global has to be declared
// here for the analytics composable to stay type-safe.
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export {}
