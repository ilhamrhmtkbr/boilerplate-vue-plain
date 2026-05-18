// src/composables/useAuth.js

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from './useApi.js'

// ── Singleton state ───────────────────────────────────────────────────
const user            = ref(null)
const isAuthenticated = ref(false)

// Cek session aktif saat app pertama kali load
// (cookie httpOnly masih ada atau tidak)
let sessionChecked = false

export function useAuth() {
  const router                   = useRouter()
  const { post, get, loading, error } = useApi()

  // Dipanggil sekali di App.vue atau router guard
  async function checkSession() {
    if (sessionChecked) return
    sessionChecked = true
    try {
      const res         = await get('/auth/me')
      user.value        = res.data.user
      isAuthenticated.value = true
    } catch {
      // Cookie tidak ada / expired → state tetap false
      user.value            = null
      isAuthenticated.value = false
    }
  }

  async function login(credentials) {
    const res = await post('/auth/login', credentials)
    // Backend set httpOnly cookie via Set-Cookie, kita tidak pegang tokennya
    user.value            = res.data.user
    isAuthenticated.value = true
    router.push('/dashboard')
    return res
  }

  async function register(data) {
    return await post('/auth/register', data)
  }

  async function forgotPassword(email) {
    return await post('/auth/forgot-password', { email })
  }

  async function logout() {
    try {
      await post('/auth/logout') // backend hapus cookie / blacklist token
    } finally {
      user.value            = null
      isAuthenticated.value = false
      sessionChecked        = false
      router.push('/auth/login')
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    checkSession,
    login,
    register,
    logout,
    forgotPassword,
  }
}
