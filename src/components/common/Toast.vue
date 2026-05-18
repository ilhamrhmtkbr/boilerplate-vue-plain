<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Default Message'
  },
  type: {
    type: String,
    default: 'primary' // bisa success, danger, warning
  }
})

const emit = defineEmits(['close'])

/** Cara Pakai
 * <Toast
 *   :show="isToastVisible"
 *   message="Data Berhasil Disimpan!"
 *   type="success"
 *   @close="isToastVisible = false"
 * />
 */
</script>

<template>
  <Transition name="fade-slide">
    <div
        v-if="show"
        class="fixed right-[var(--m)] bottom-[100px] z-[99] w-max text-white"
    >
      <div
          :class="[
          'break-all py-[var(--s)] px-[var(--l)] border border-line rounded-[var(--radius-m)] flex items-center gap-[var(--m)] max-w-[75dvw] h-max box-border',
          `bg-${type}`
        ]"
      >
        <p class="flex-1">{{ message }}</p>

        <!-- Close Button -->
        <div
            @click="emit('close')"
            class="toast-button-close min-w-[23px] min-h-[23px] max-w-[23px] max-h-[23px] flex items-center justify-center border-2 border-transparent rounded-full bg-surface text-danger cursor-pointer hover:bg-danger hover:border-white hover:text-white transition-all group"
        >
          <svg class="w-2 h-2 fill-danger group-hover:fill-bg transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27">
            <path d="M8 1l5 6 6-6c2-1 5-1 6 0 2 2 2 5 0 7l-5 5 5 6c2 2 2 5 0 6-1 2-4 2-6 0l-6-5-5 5c-2 2-5 2-7 0-1-1-1-4 0-6l6-6-6-5C0 6 0 3 1 1c2-1 5-1 7 0z"/>
          </svg>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Animasi biar smooth pas muncul */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Selector khusus buat handle fill SVG pas hover kalau gak mau pake group-hover */
.toast-button-close:hover svg {
  fill: var(--bg-color);
}
</style>
