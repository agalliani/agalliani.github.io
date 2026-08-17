/// <reference types="vite/client" />

// gtag.js is loaded from index.html (not npm), so its global has to be declared
// here for the analytics composable to stay type-safe. `clarity` comes from the
// tag script @microsoft/clarity injects — the package's own methods call it
// blindly, so useClarity checks for it before forwarding anything.
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

export {}
