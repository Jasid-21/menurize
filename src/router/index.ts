import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/HomeView.vue"),
  },

  {
    path: '/error',
    name: 'error',
    component: () => import("@/views/ErrorView.vue"),
  },

  {
    path: '/palmoa',
    name: 'palmoa',
    component: () => import("@/views/PalmoaView.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
