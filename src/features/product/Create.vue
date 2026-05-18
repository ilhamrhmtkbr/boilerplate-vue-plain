<script setup>
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useApi } from '@/composables/useApi.js'
import { useToast } from '@/composables/useToast.js'

const router            = useRouter()
const { post, loading } = useApi()
const { showToast }     = useToast()

const CATEGORY_OPTIONS = [
  { label: 'Elektronik', value: 'elektronik' },
  { label: 'Fashion',    value: 'fashion' },
  { label: 'Makanan',    value: 'makanan' },
  { label: 'Lainnya',    value: 'lainnya' },
]

const STATUS_OPTIONS = [
  { label: 'Aktif',    value: 'active' },
  { label: 'Nonaktif', value: 'inactive' },
]

const schema = yup.object({
  name:        yup.string().required('Nama produk wajib diisi'),
  description: yup.string().required('Deskripsi wajib diisi'),
  price:       yup.number().required('Harga wajib diisi').min(0, 'Harga tidak boleh negatif').typeError('Harus berupa angka'),
  stock:       yup.number().required('Stok wajib diisi').min(0, 'Stok tidak boleh negatif').typeError('Harus berupa angka'),
  category:    yup.string().required('Kategori wajib dipilih'),
  status:      yup.string().required('Status wajib dipilih'),
})

const { defineField, handleSubmit, errors } = useForm({ validationSchema: schema })

const [name]        = defineField('name')
const [description] = defineField('description')
const [price]       = defineField('price')
const [stock]       = defineField('stock')
const [category]    = defineField('category')
const [status]      = defineField('status')

const onSubmit = handleSubmit(async (values) => {
  try {
    await post('/products', values)
    showToast('Produk berhasil ditambahkan!', 'success')
    router.push('/product')
  } catch {
    showToast('Gagal menyimpan produk', 'danger')
  }
})
</script>

<template>
  <div class="grid gap-[var(--m)]">

    <div class="flex flex-wrap items-center justify-between gap-[var(--m)]">
      <div>
        <SectionTitle text="Tambah Produk" />
        <Breadcrumb />
      </div>
      <Button text="← Kembali" variant="primary" type="outline" @click="router.back()" />
    </div>

    <CardWrapper replace-shadow-with-border>
      <form @submit.prevent="onSubmit" class="grid gap-[var(--m)]">

        <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[var(--m)]">
          <FormField v-model="name"     id="name"     label="Nama Produk"              :error="errors.name" />
          <FormField v-model="price"    id="price"    label="Harga (Rp)" type="number" :error="errors.price" placeholder="0" />
          <FormField v-model="stock"    id="stock"    label="Stok" type="number"       :error="errors.stock" placeholder="0" />
          <FormField v-model="category" id="category" label="Kategori" type="select"  :options="CATEGORY_OPTIONS" :error="errors.category" />
          <FormField v-model="status"   id="status"   label="Status" type="select"    :options="STATUS_OPTIONS"   :error="errors.status" />
        </div>

        <!-- Deskripsi full width -->
        <FormField
          v-model="description"
          id="description"
          label="Deskripsi"
          type="textarea"
          :rows="4"
          placeholder="Tuliskan deskripsi produk..."
          :error="errors.description"
        />

        <div class="flex items-center justify-end gap-[var(--m)] mt-[var(--m)]">
          <Button text="Batal"  variant="danger"  type="outline" @click="router.back()" />
          <Button text="Simpan" variant="primary" :loading="loading" />
        </div>

      </form>
    </CardWrapper>

  </div>
</template>
