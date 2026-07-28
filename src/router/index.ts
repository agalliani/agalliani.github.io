import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { localizePath } from '../i18n/routing'

// Route table only — vite-ssg owns router creation (memory history on the
// server, web history in the browser), so we no longer call createRouter here.

// The pages, declared once in their Italian (un-prefixed) form. The English
// tree is derived below rather than written out twice, so a page can never
// exist in one language and not the other.
const pages: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/projects',
    name: 'projects',
    // lazy-loaded chunk, prerendered by vite-ssg (see includedRoutes).
    component: () => import('../views/ProjectsView.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    // route level code-splitting: lazy-loaded chunk, prerendered by vite-ssg.
    component: () => import('../views/BlogListView.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('../views/BlogPostView.vue'),
  },
]

/** The same page under /en, renamed because vue-router requires unique names. */
const englishVariant = (route: RouteRecordRaw): RouteRecordRaw => ({
  ...route,
  path: localizePath(route.path, 'en'),
  name: `${String(route.name)}-en`,
})

export const routes: RouteRecordRaw[] = [
  ...pages,
  ...pages.map(englishVariant),
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]
