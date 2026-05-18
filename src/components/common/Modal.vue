<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Title'
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

/** Cara Pakai
 * <template>
 *   <div class="button btn-primary" @click="showModal = true">Show</div>
 *
 *   <!-- Panggil komponen Modal -->
 *   <Modal :isOpen="showModal" title="Konfirmasi" @close="showModal = false">
 *
 *     <!-- Content (Otomatis masuk ke slot default) -->
 *     <p>Ini adalah bagian konten modal.</p>
 *
 *     <!-- Footer (Opsional, masuk ke slot bernama 'footer') -->
 *     <template #footer>
 *       <p>Ini bagian footer</p>
 *     </template>
 *
 *   </Modal>
 * </template>
 *
 * <script setup>
 * import { ref } from 'vue'
 * import Modal from './components/Modal.vue'
 *
 * const showModal = ref(false)
 *
*/
</script>

<template>
  <div
      v-if="isOpen"
      class="fixed inset-0 flex bg-transtext dark:bg-transbg z-[99]"
  >
    <!-- Modal Box -->
    <div class="dark:border dark:border-solid dark:border-primary m-auto w-[90dvw] md:w-[75dvw] max-h-[90dvh] bg-surface box-border rounded-[var(--radius-m)] p-[var(--xxx)] grid grid-rows-[max-content_1fr_max-content] gap-[var(--m)]">

      <!-- Modal Header -->
      <div class="flex justify-between items-center pb-[var(--l)] mb-[var(--m)] text-[var(--l)] font-bold">
        <p>{{ title }}</p>

        <!-- Tombol Close -->
        <div class="min-w-[23px] min-h-[23px] max-w-[23px] max-h-[23px]
               flex items-center justify-center
               border-2 rounded-full cursor-pointer
               bg-surface
               border-danger
               text-danger
               hover:bg-danger hover:text-white cursor-pointer" @click="closeModal">
          <svg class="max-w-[9px] max-h-[9px] fill-current" xmlns="http://www.w3.org/2000/svg" width="35.52" height="35.52" viewBox="0 0 27 27" shape-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd">
            <path d="M8 1l5 6 6-6c2-1 5-1 6 0 2 2 2 5 0 7l-5 5 5 6c2 2 2 5 0 6-1 2-4 2-6 0l-6-5-5 5c-2 2-5 2-7 0-1-1-1-4 0-6l6-6-6-5C0 6 0 3 1 1c2-1 5-1 7 0z"/>
          </svg>
        </div>
      </div>

      <!-- Modal Content -->
      <div class="grid auto-rows-max gap-[var(--x)] items-start justify-items-center overflow-auto relative p-[var(--x)] box-border">
        <slot></slot>
      </div>

      <!-- Modal Footer -->
      <div class="pt-[var(--l)] mt-[var(--m)] text-center text-[var(--s)] text-link">
        <slot name="footer"></slot>
      </div>

    </div>
  </div>
</template>
