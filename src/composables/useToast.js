/**
 * useToast.js — Global toast notification (singleton)
 *
 * Tambahkan komponen Toast di App.vue atau AppLayout.vue:
 *
 *   <script setup>
 *   import { useToast } from '@/composables/useToast.js'
 *   const { toast, hideToast } = useToast()
 *   </script>
 *
 *   <Toast
 *     :show="toast.show"
 *     :message="toast.message"
 *     :type="toast.type"
 *     @close="hideToast()"
 *   />
 *
 * Usage di komponen manapun:
 *   const { showToast } = useToast()
 *   showToast('Berhasil disimpan!', 'success')
 *   showToast('Gagal!', 'danger')
 *   showToast('Perhatian!', 'warning')
 */

import { ref } from 'vue'

const toast = ref({
  show:    false,
  message: '',
  type:    'primary',  // primary | success | danger | warning
})

let timer = null

export function useToast() {
  function showToast(message, type = 'primary', duration = 3000) {
    if (timer) clearTimeout(timer)
    toast.value = { show: true, message, type }
    timer = setTimeout(hideToast, duration)
  }

  function hideToast() {
    toast.value.show = false
  }

  return { toast, showToast, hideToast }
}
