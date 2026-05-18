<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  perPage: { type: Number, default: 10 },
  perPageOptions: { type: Array, default: () => [5, 10, 15, 25, 50] }
})

const emit = defineEmits(['update:currentPage', 'update:perPage'])

// Handle klik Next/Prev/Angka
const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

// Handle ganti jumlah data per halaman
const changePerPage = (event) => {
  emit('update:perPage', Number(event.target.value))
}

// Bikin array halaman [1, 2, 3, ...]
const pages = computed(() => {
  return Array.from({ length: props.totalPages }, (_, i) => i + 1)
})

/** Cara Pakai & Mapping API
 * <template>
 *   <Pagination
 *     :currentPage="paginationMeta.current"
 *     :totalPages="paginationMeta.last"
 *     :perPage="paginationMeta.perPage"
 *     @update:currentPage="fetchData"
 *     @update:perPage="updatePerPage"
 *   />
 * </template>
 *
 * <script setup>
 * import { ref } from 'vue'
 * import Pagination from './components/Pagination.vue'
 *
 * const paginationMeta = ref({ current: 1, last: 1, perPage: 10 })
 *
 * // Contoh Adapter: Backend berubah-ubah? Yang diubah cuma fungsi ini!
 * const fetchData = async (page = 1) => {
 *   const response = await api.get(`/users?page=${page}`)
 *
 *   // KALAU LARAVEL:
 *   paginationMeta.value = {
 *     current: response.data.meta.current_page,
 *     last: response.data.meta.last_page,
 *     perPage: response.data.meta.per_page
 *   }
 *
 *   // KALAU GOLANG/EXPRESS (Misal):
 *   // paginationMeta.value = {
 *   //   current: response.data.page,
 *   //   last: response.data.total_pages,
 *   //   perPage: response.data.limit
 *   // }
 * }
 *
*/
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-[var(--x)] mt-[var(--x)]">

    <!-- Wrapper Pagination Box -->
    <div class="grid font-medium shadow-box border-style-default py-[var(--s)] px-[var(--xxxx)] rounded-full">

      <!-- Elements (Scrollable) -->
      <div class="flex gap-[var(--m)] items-center max-w-full overflow-auto pb-[2px] custom-scrollbar">

        <!-- Prev Button -->
        <div
            class="min-w-[var(--xx)] min-h-[var(--xx)] max-w-[var(--xx)] max-h-[var(--xx)] border border-style-default flex items-center justify-center text-[var(--s)] rounded-[var(--radius-s)] cursor-pointer hover:bg-primary hover:text-white transition-colors"
            :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
            @click="changePage(currentPage - 1)"
        >
          &lt;
        </div>

        <!-- Page Numbers -->
        <div
            v-for="page in pages"
            :key="page"
            class="min-w-[var(--xx)] min-h-[var(--xx)] max-w-[var(--xx)] max-h-[var(--xx)] border border-style-default flex items-center justify-center text-[var(--s)] rounded-[var(--radius-s)] cursor-pointer hover:bg-primary hover:text-white transition-colors"
            :class="{ 'bg-primary text-white': page === currentPage }"
            @click="changePage(page)"
        >
          {{ page }}
        </div>

        <!-- Next Button -->
        <div
            class="min-w-[var(--xx)] min-h-[var(--xx)] max-w-[var(--xx)] max-h-[var(--xx)] border border-style-default flex items-center justify-center text-[var(--s)] rounded-[var(--radius-s)] cursor-pointer hover:bg-primary hover:text-white transition-colors"
            :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
            @click="changePage(currentPage + 1)"
        >
          &gt;
        </div>

      </div>
    </div>

    <!-- Per Page Selector -->
    <div class="flex gap-[var(--m)] w-max flex-nowrap whitespace-nowrap items-center text-[var(--s)]">
      <span>Per Page : </span>
      <select
          :value="perPage"
          @change="changePerPage"
          class="py-[3px] px-[var(--m)] rounded-[var(--radius-s)] border border-style-default bg-transparent outline-none cursor-pointer"
      >
        <option v-for="option in perPageOptions" :key="option" :value="option" class="text-black">
          {{ option }}
        </option>
      </select>
    </div>

  </div>
</template>

<style scoped>
/* Scrollbar khusus untuk pagination elements sesuai CSS kamu */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--border); /* Biar ada warnanya pas di-scroll */
  border-radius: 4px;
}
</style>
