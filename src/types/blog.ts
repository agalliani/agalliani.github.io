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
   * translation simply stay Italian. Slug/date/cover are deliberately not
   * translatable — one post, one URL, one publication date.
   */
  en?: BlogPostTranslation
}

export interface BlogPostTranslation {
  title: string
  excerpt: string
  html: string
  tags?: string[]
}
