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
}
