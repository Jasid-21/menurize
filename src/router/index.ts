import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth/:restaurant_name?',
    name: 'auth',
    component: () => import("@/views/LoginView.vue"),
  },

  {
    path: '/check',
    name: 'check',
    component: () => import("@/views/RestaurantNameView.vue"),
  },

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
    path: '/palmoa_gastrobar',
    name: 'palmoa_gastrobar',
    component: () => import("@/views/PalmoaView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
})

export default router
