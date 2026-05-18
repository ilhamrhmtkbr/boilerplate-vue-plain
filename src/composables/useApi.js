// src/composables/useApi.js

import { ref } from 'vue'
import axios from 'axios'

// ── Singleton axios instance ──────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // kirim cookie httpOnly otomatis ke backend
})

// ── Refresh token state ───────────────────────────────────────────────
let isRefreshing = false
let failedQueue  = [] // request yang pending selama proses refresh

function processQueue(error, token = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  failedQueue = []
}

// ── Request interceptor ───────────────────────────────────────────────
// Kalau pakai httpOnly cookie → tidak perlu attach token manual,
// cookie otomatis ikut karena withCredentials: true
//
// Kalau backend lo masih pakai Bearer token (bukan cookie),
// uncomment blok ini:
//
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token')
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

// ── Response interceptor ──────────────────────────────────────────────
api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config

      // Kalau bukan 401, atau sudah pernah retry → langsung reject
      if (error.response?.status !== 401 || original._retry) {
        return Promise.reject(error)
      }

      // Tandai sudah retry biar tidak infinite loop
      original._retry = true

      if (isRefreshing) {
        // Ada request lain yang juga 401 saat refresh sedang jalan
        // → antrekan, tunggu token baru
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
            .then(() => api(original))  // retry dengan cookie baru (httpOnly)
            .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        // Minta token baru ke backend
        // Backend akan set cookie httpOnly baru lewat Set-Cookie header
        await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
        )

        processQueue(null)
        return api(original) // retry request original

      } catch (refreshError) {
        // Refresh token juga expired / invalid → paksa logout
        processQueue(refreshError)
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)

      } finally {
        isRefreshing = false
      }
    }
)

// ── Composable ────────────────────────────────────────────────────────
export function useApi() {
  const loading = ref(false)
  const error   = ref(null)

  async function request(method, url, data = null, config = {}) {
    loading.value = true
    error.value   = null
    try {
      const res = await api({ method, url, data, ...config })
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message ?? err.message ?? 'Terjadi kesalahan'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    get:   (url, params = {}) => request('GET',    url, null, { params }),
    post:  (url, data)        => request('POST',   url, data),
    put:   (url, data)        => request('PUT',    url, data),
    patch: (url, data)        => request('PATCH',  url, data),
    del:   (url)              => request('DELETE', url),
  }
}

export { api }
