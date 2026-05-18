<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi.js'
import { useToast } from '@/composables/useToast.js'
import { useConfirm } from '@/composables/useConfirm.js'
import { usePagination } from '@/composables/usePagination.js'

const router                                                 = useRouter()
const { get, del, loading }                                  = useApi()
const { showToast }                                          = useToast()
const { showConfirm }                                        = useConfirm()
const { currentPage, perPage, totalPages, setTotal, reset }  = usePagination()

const products        = ref([])
const search          = ref('')
const categoryFilter  = ref('')

const CATEGORY_OPTIONS = [
  { label: 'Elektronik', value: 'elektronik' },
  { label: 'Fashion',    value: 'fashion' },
  { label: 'Makanan',    value: 'makanan' },
  { label: 'Lainnya',    value: 'lainnya' },
]

// ── Format Harga IDR ───────────────────────────────────────────────
function formatPrice(val) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(val)
}

// ── Fetch ──────────────────────────────────────────────────────────
async function fetchProducts() {
  // TODO: Uncomment saat API siap
  // try {
  //   const res = await get('/products', {
  //     page:     currentPage.value,
  //     per_page: perPage.value,
  //     search:   search.value,
  //     category: categoryFilter.value,
  //   })
  //   products.value = res.data.data
  //   setTotal(res.data.meta.total)
  // } catch {
  //   showToast('Gagal memuat data produk', 'danger')
  // }

  // Mock Data — hapus setelah API siap
  products.value = [
    { id: 1, name: 'Laptop Pro X',   category: 'elektronik', price: 15000000, stock: 10, status: 'active' },
    { id: 2, name: 'Kemeja Batik',   category: 'fashion',    price:   250000, stock: 50, status: 'active' },
    { id: 3, name: 'Kopi Arabika',   category: 'makanan',    price:    75000, stock: 0,  status: 'inactive' },
    { id: 4, name: 'Smartwatch Z2',  category: 'elektronik', price:  1500000, stock: 25, status: 'active' },
    { id: 5, name: 'Tas Kulit Sapi', category: 'fashion',    price:   800000, stock: 15, status: 'active' },
  ]
  setTotal(products.value.length)
}

async function handleDelete(id) {
  const ok = await showConfirm('Hapus Produk', 'Yakin ingin menghapus produk ini?')
  if (!ok) return
  try {
    // await del(`/products/${id}`)
    showToast('Produk berhasil dihapus', 'success')
    fetchProducts()
  } catch {
    showToast('Gagal menghapus produk', 'danger')
  }
}

function handleSearch() {
  reset()
  fetchProducts()
}

function onPageChange(page) {
  currentPage.value = page
  fetchProducts()
}

function onPerPageChange(pp) {
  perPage.value = pp
  reset()
  fetchProducts()
}

onMounted(fetchProducts)
</script>

<template>
  <div class="grid gap-[var(--m)]">

    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-[var(--m)]">
      <div>
        <SectionTitle text="Manajemen Produk" />
        <Breadcrumb />
      </div>
      <Button text="+ Tambah Produk" variant="primary" @click="router.push('/product/create')" />
    </div>

    <!-- Filter Row -->
    <div class="flex flex-wrap items-center gap-[var(--m)]">
      <div class="flex items-center gap-[var(--xxs)]
                  border border-line rounded-[var(--radius-s)]
                  px-[var(--xs)] py-[var(--xxs)] bg-surface
                  w-full max-w-[300px] focus-within:border-primary transition-colors">
        <svg class="max-w-[var(--m)] max-h-[var(--m)] shrink-0 fill-none stroke-link"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="6"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Cari nama produk..."
          class="outline-none border-none bg-transparent text-text
                 placeholder:text-link text-[length:var(--s)] w-full"
          @keyup.enter="handleSearch"
        />
      </div>

      <Filter
        title="Filter Kategori"
        :filters="CATEGORY_OPTIONS"
        :value="categoryFilter"
        @update:value="(val) => { categoryFilter = val; handleSearch() }"
      />

      <Button
        v-if="search || categoryFilter"
        text="Reset Filter"
        variant="danger"
        type="outline"
        @click="() => { search = ''; categoryFilter = ''; handleSearch() }"
      />
    </div>

    <!-- Table Card -->
    <CardWrapper replace-shadow-with-border>
      <LoadingPulse v-if="loading" height="300px" />

      <template v-else>
        <NoData v-if="!products.length" />

        <template v-else>
          <Table
            :headers="['No', 'Nama Produk', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi']"
            :items="products"
          >
            <template #row="{ item, index }">
              <td class="text-center px-[var(--xs)] py-[var(--s)]">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td class="px-[var(--xs)] py-[var(--s)] font-medium min-w-[150px]">{{ item.name }}</td>
              <td class="px-[var(--xs)] py-[var(--s)] capitalize">{{ item.category }}</td>
              <td class="px-[var(--xs)] py-[var(--s)]">{{ formatPrice(item.price) }}</td>
              <td class="text-center px-[var(--xs)] py-[var(--s)]">
                <span :class="item.stock === 0 ? 'text-danger font-medium' : 'text-text'">
                  {{ item.stock === 0 ? 'Habis' : item.stock }}
                </span>
              </td>
              <td class="px-[var(--xs)] py-[var(--s)]">
                <span :class="[
                  'px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium',
                  item.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
                ]">
                  {{ item.status === 'active' ? 'Aktif' : 'Nonaktif' }}
                </span>
              </td>
              <td class="action px-[var(--xs)] py-[var(--s)]">
                <div class="flex items-center gap-[var(--m)] text-[length:var(--s)]">
                  <router-link :to="`/product/${item.id}`"      class="text-primary hover:underline">Detail</router-link>
                  <router-link :to="`/product/${item.id}/edit`" class="text-warning hover:underline">Edit</router-link>
                  <span class="text-danger cursor-pointer hover:underline" @click="handleDelete(item.id)">Hapus</span>
                </div>
              </td>
            </template>
          </Table>

          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            :perPage="perPage"
            @update:currentPage="onPageChange"
            @update:perPage="onPerPageChange"
          />
        </template>
      </template>
    </CardWrapper>

  </div>
</template>
