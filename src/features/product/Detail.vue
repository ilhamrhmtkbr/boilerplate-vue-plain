<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi.js'
import { useToast } from '@/composables/useToast.js'

const route            = useRoute()
const router           = useRouter()
const { get, loading } = useApi()
const { showToast }    = useToast()

const product = ref(null)

function formatPrice(val) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(val)
}

async function fetchProduct() {
  try {
    // const res = await get(`/products/${route.params.id}`)
    // product.value = res.data.data

    // Mock — hapus setelah API siap
    product.value = {
      id:          route.params.id,
      name:        'Laptop Pro X',
      description: 'Laptop gaming terbaik dengan performa tinggi. Cocok untuk desainer, developer, dan gamer.',
      price:       15000000,
      stock:       10,
      category:    'Elektronik',
      status:      'active',
      created_at:  '5 Januari 2025',
    }
  } catch {
    showToast('Gagal memuat detail produk', 'danger')
    router.push('/product')
  }
}

onMounted(fetchProduct)
</script>

<template>
  <div class="grid gap-[var(--m)]">

    <div class="flex flex-wrap items-center justify-between gap-[var(--m)]">
      <div>
        <SectionTitle text="Detail Produk" />
        <Breadcrumb />
      </div>
      <div class="flex items-center gap-[var(--m)]">
        <Button text="← Kembali" variant="primary" type="outline" @click="router.back()" />
        <Button text="Edit"      variant="warning"               @click="router.push(`/product/${route.params.id}/edit`)" />
      </div>
    </div>

    <LoadingPulse v-if="loading" height="300px" />

    <CardWrapper v-else-if="product" replace-shadow-with-border>
      <h2 class="font-bold text-[length:var(--x)] text-text mb-[var(--m)]">{{ product.name }}</h2>

      <div class="grid gap-[var(--s)]">
        <div class="flex items-start gap-[var(--m)] pb-[var(--s)] border-b border-line">
          <span class="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Deskripsi</span>
          <span class="text-text leading-relaxed">{{ product.description }}</span>
        </div>
        <div class="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line">
          <span class="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Harga</span>
          <span class="font-bold text-text text-[length:var(--l)]">{{ formatPrice(product.price) }}</span>
        </div>
        <div class="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line">
          <span class="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Stok</span>
          <span :class="product.stock === 0 ? 'text-danger font-medium' : 'text-text'">
            {{ product.stock === 0 ? 'Habis' : `${product.stock} unit` }}
          </span>
        </div>
        <div class="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line">
          <span class="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Kategori</span>
          <span class="text-text">{{ product.category }}</span>
        </div>
        <div class="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line">
          <span class="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Status</span>
          <span :class="[
            'px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium',
            product.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
          ]">
            {{ product.status === 'active' ? 'Aktif' : 'Nonaktif' }}
          </span>
        </div>
        <div class="flex items-center gap-[var(--m)]">
          <span class="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Ditambahkan</span>
          <span class="text-text">{{ product.created_at }}</span>
        </div>
      </div>
    </CardWrapper>

  </div>
</template>
