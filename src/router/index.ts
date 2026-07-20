import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Route table only — vite-ssg owns router creation (memory history on the
// server, web history in the browser), so we no longer call createRouter here.
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]
