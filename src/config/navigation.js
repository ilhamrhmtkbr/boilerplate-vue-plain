/**
 * navigation.js — Konfigurasi item navigasi untuk Sidebar & BottomNav
 *
 * CARA PAKAI DI AppLayout.vue:
 *
 *   import { NAV_ITEMS } from '@/config/navigation.js'
 *
 *   Di template, pass ke Sidebar:
 *   <Sidebar :navItems="NAV_ITEMS" :isSidebarCollapsed="..." @toggle="..." :showSidebar="..." />
 *
 * Catatan: svg ID harus ada di /public/sprite.svg
 *          Ganti dengan icon yang sesuai dengan sprite kamu
 */

export const NAV_ITEMS = [
  {
    type: 'link',
    to:   '/dashboard',
    svg:  'dashboard',
    text: 'Dashboard',
  },
  {
    type: 'sublinks',
    svg:  'users',
    text: 'User',
    links: [
      { to: '/user',    svg: 'list',    text: 'Daftar User' },
      { to: '/profile', svg: 'profile', text: 'Profile Saya' },
    ],
  },
  {
    type: 'sublinks',
    svg:  'box',
    text: 'Produk',
    links: [
      { to: '/product', svg: 'list', text: 'Daftar Produk' },
    ],
  },
]
