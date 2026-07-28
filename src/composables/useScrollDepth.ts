import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import { track } from './useAnalytics'

const THRESHOLDS = [25, 50, 75, 100] as const

/**
 * How far down an article the visitor actually got, plus how long it took.
 *
 * A pageview says a post was opened; these say it was read — the only way to
 * tell a post that lands from one that gets bounced off.
 *
 * Each threshold fires at most once per `slug` (scrolling back up and down
 * again doesn't re-fire), and the set resets when the slug changes so a
 * client-side navigation between two posts measures each one cleanly.
 *
 * @param el   the article element to measure (not the window: the page has a
 *             header and a footer that aren't part of the read)
 * @param slug reactive post identifier; changing it starts a fresh measurement
 */
export function useScrollDepth(el: Ref<HTMLElement | null>, slug: Ref<string>) {
  let sent = new Set<number>()
  let startedAt = 0
  let ticking = false

  const measure = () => {
    const node = el.value
    if (!node) return

    // How much of the article has passed the bottom of the viewport, as a
    // fraction of the article's own scrollable length.
    const top = node.getBoundingClientRect().top + window.scrollY
    const readable = Math.max(node.offsetHeight - window.innerHeight, 1)
    const progress = ((window.scrollY - top) / readable) * 100

    for (const threshold of THRESHOLDS) {
      if (progress < threshold || sent.has(threshold)) continue
      sent.add(threshold)
      track('scroll_depth', { percent: threshold, slug: slug.value })
      if (threshold === 100) {
        track('read_complete', {
          slug: slug.value,
          seconds: Math.round((Date.now() - startedAt) / 1000),
        })
      }
    }
  }

  // Scroll fires far more often than it's worth measuring; coalesce to one
  // read per frame so layout isn't thrashed.
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      measure()
    })
  }

  const reset = () => {
    sent = new Set()
    startedAt = Date.now()
  }

  onMounted(() => {
    reset()
    window.addEventListener('scroll', onScroll, { passive: true })
    // A short post can already be fully visible without any scrolling.
    measure()
  })

  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

  watch(slug, reset)
}
