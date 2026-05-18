/**
 * usePagination.js — Helper pagination
 *
 * Setiap komponen dapat instance pagination-nya sendiri (bukan singleton).
 *
 * Usage:
 *   const { currentPage, perPage, total, totalPages, setTotal, reset } = usePagination()
 *
 *   // Setelah fetch data dari API (Laravel contoh):
 *   setTotal(res.data.meta.total)
 *
 *   // Di template:
 *   <Pagination
 *     :currentPage="currentPage"
 *     :totalPages="totalPages"
 *     :perPage="perPage"
 *     @update:currentPage="onPageChange"
 *     @update:perPage="onPerPageChange"
 *   />
 *
 *   // Di script:
 *   function onPageChange(page)  { currentPage.value = page; fetchData() }
 *   function onPerPageChange(pp) { perPage.value = pp; reset(); fetchData() }
 */

import { ref, computed } from 'vue'

export function usePagination(defaultPerPage = 10) {
  const currentPage = ref(1)
  const perPage     = ref(defaultPerPage)
  const total       = ref(0)

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(total.value / perPage.value))
  )

  function setTotal(n)    { total.value = n }
  function nextPage()     { if (currentPage.value < totalPages.value) currentPage.value++ }
  function prevPage()     { if (currentPage.value > 1) currentPage.value-- }
  function goToPage(page) { currentPage.value = page }
  function reset()        { currentPage.value = 1 }

  return { currentPage, perPage, total, totalPages, setTotal, nextPage, prevPage, goToPage, reset }
}
