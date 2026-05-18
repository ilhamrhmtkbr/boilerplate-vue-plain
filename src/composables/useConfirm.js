/**
 * useConfirm.js — Promise-based confirm dialog (singleton)
 *
 * Tambahkan ConfirmDialog di App.vue atau AppLayout.vue:
 *
 *   <script setup>
 *   import { useConfirm } from '@/composables/useConfirm.js'
 *   const { confirm, onConfirm, onCancel } = useConfirm()
 *   </script>
 *
 *   <Modal :isOpen="confirm.show" :title="confirm.title" @close="onCancel">
 *     <p class="text-text">{{ confirm.message }}</p>
 *     <template #footer>
 *       <div class="flex gap-[var(--m)] justify-center">
 *         <Button text="Batal" variant="danger" type="outline" @click="onCancel()" />
 *         <Button text="Ya, Lanjutkan" variant="primary" @click="onConfirm()" />
 *       </div>
 *     </template>
 *   </Modal>
 *
 * Usage di komponen manapun:
 *   const { showConfirm } = useConfirm()
 *   const ok = await showConfirm('Hapus Data', 'Yakin ingin menghapus data ini?')
 *   if (ok) { ... lanjutkan hapus ... }
 */

import { ref } from 'vue'

const confirm = ref({
  show:    false,
  title:   '',
  message: '',
  resolve: null,
})

export function useConfirm() {
  function showConfirm(title, message) {
    return new Promise((resolve) => {
      confirm.value = { show: true, title, message, resolve }
    })
  }

  function onConfirm() {
    confirm.value.resolve?.(true)
    confirm.value.show = false
  }

  function onCancel() {
    confirm.value.resolve?.(false)
    confirm.value.show = false
  }

  return { confirm, showConfirm, onConfirm, onCancel }
}
