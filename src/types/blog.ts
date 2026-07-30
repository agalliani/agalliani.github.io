// Shape of each src/content/blog/<slug>.json, produced by
// scripts/sync-blog-content.js from a hab post. `html` is pre-rendered at sync
// time (never parsed in the browser); `cover` is a site-absolute image path.
export interface BlogPost {
  slug: string
  title: string
  date: string | null
  excerpt: string
  tags: string[]
  cover: string | null
  html: string
  /**
   * English rendering of the same post (from hab's `index.en.md`), merged over
   * the Italian one when the site language is 'en'. Optional: posts without a
   * translation simply stay Italian. Date/cover are deliberately not
   * translatable — one post, one publication date, one image.
   *
   * `slug`, on the other hand, CAN diverge from the Italian one (see
   * BlogPostTranslation) — a translated post gets a real, keyword-bearing URL
   * in its own language instead of an Italian slug wearing an /en prefix,
   * which is what makes Google treat it as a distinct indexable document
   * rather than a probable duplicate of the Italian page.
   */
  en?: BlogPostTranslation
}

export interface BlogPostTranslation {
  title: string
  excerpt: string
  html: string
  tags?: string[]
  /**
   * Localized URL slug for this translation, e.g. IT `mandare-un-pezzo...` →
   * EN `send-a-piece-of-myself-to-the-stratosphere`. Optional for backward
   * compatibility with posts translated before this existed: falls back to
   * the Italian slug (old behaviour) when absent.
   */
  slug?: string
}
