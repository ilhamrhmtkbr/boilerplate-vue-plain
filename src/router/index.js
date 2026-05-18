/**
 * router/index.js
 *
 * Struktur:
 *   /auth/login            → Guest only
 *   /auth/register         → Guest only
 *   /auth/forgot-password  → Guest only
 *   /                      → App routes (AppLayout wrapper, butuh login)
 *     /dashboard
 *     /profile
 *     /user | /user/create | /user/:id | /user/:id/edit
 *     /product | /product/create | /product/:id | /product/:id/edit
 *
 * Syarat:
 *   - '@' alias ke 'src/' di vite.config.js (lihat TODO di bawah)
 *   - AppLayout ada di src/components/layouts/AppLayout.vue
 *
 * Aktifkan di main.js:
 *   import router from '@/router/index.js'
 *   app.use(router)
 */

import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layouts/AppLayout.vue'
import {useAuth} from "../composables/useAuth.js";

const routes = [
  {
    path:      '/',
    name:      'Index',
    component: () => import('@/features/Index.vue'),
    meta:      { guest: true },
  },
  // ── Guest Routes ──────────────────────────────────────────────────
  {
    path:      '/auth/login',
    name:      'Login',
    component: () => import('@/features/auth/Login.vue'),
    meta:      { guest: true },
  },
  {
    path:      '/auth/register',
    name:      'Register',
    component: () => import('@/features/auth/Register.vue'),
    meta:      { guest: true },
  },
  {
    path:      '/auth/forgot-password',
    name:      'ForgotPassword',
    component: () => import('@/features/auth/ForgotPassword.vue'),
    meta:      { guest: true },
  },

  // ── App Routes (AppLayout wrapper, butuh auth) ────────────────────
  {
    path:      '/admin',
    component: AppLayout,
    meta:      { requiresAuth: false }, // buat test/lihat page false, kalo project beneran true
    children: [
      { path: '', redirect: '/dashboard' },

      // Dashboard
      {
        path:      'dashboard',
        name:      'Dashboard',
        component: () => import('@/features/dashboard/Index.vue'),
      },

      // Profile user yang sedang login
      {
        path:      'profile',
        name:      'Profile',
        component: () => import('@/features/user/Profile.vue'),
      },

      // ── User CRUD ────────────────────────────────────────────────
      {
        path:      'user',
        name:      'UserIndex',
        component: () => import('@/features/user/Index.vue'),
      },
      {
        path:      'user/create',
        name:      'UserCreate',
        component: () => import('@/features/user/Create.vue'),
      },
      // Penting: 'user/create' harus SEBELUM 'user/:id'
      // agar '/user/create' tidak terbaca sebagai id='create'
      {
        path:      'user/:id',
        name:      'UserDetail',
        component: () => import('@/features/user/Detail.vue'),
      },
      {
        path:      'user/:id/edit',
        name:      'UserEdit',
        component: () => import('@/features/user/Edit.vue'),
      },

      // ── Product CRUD ─────────────────────────────────────────────
      {
        path:      'product',
        name:      'ProductIndex',
        component: () => import('@/features/product/Index.vue'),
      },
      {
        path:      'product/create',
        name:      'ProductCreate',
        component: () => import('@/features/product/Create.vue'),
      },
      {
        path:      'product/:id',
        name:      'ProductDetail',
        component: () => import('@/features/product/Detail.vue'),
      },
      {
        path:      'product/:id/edit',
        name:      'ProductEdit',
        component: () => import('@/features/product/Edit.vue'),
      },
    ],
  },

  // ── Catch-all ─────────────────────────────────────────────────────
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

// ── Navigation Guard ─────────────────────────────────────────────────
router.beforeEach(async (to) => {
  const { isAuthenticated, checkSession } = useAuth()

  await checkSession()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return '/auth/login'
  }
  if (to.meta.guestOnly && isAuthenticated.value) {
    return '/admin/dashboard'
  }

  return true
})

export default router
