<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useApi } from '@/composables/useApi.js'
import { useToast } from '@/composables/useToast.js'

const route                   = useRoute()
const router                  = useRouter()
const { get, put, loading }   = useApi()
const { showToast }           = useToast()

const ROLE_OPTIONS = [
  { label: 'Admin',     value: 'admin' },
  { label: 'User',      value: 'user' },
  { label: 'Moderator', value: 'moderator' },
]

const STATUS_OPTIONS = [
  { label: 'Aktif',    value: 'active' },
  { label: 'Nonaktif', value: 'inactive' },
]

const schema = yup.object({
  name:   yup.string().required('Nama wajib diisi').min(2, 'Minimal 2 karakter'),
  email:  yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  role:   yup.string().required('Role wajib dipilih'),
  status: yup.string().required('Status wajib dipilih'),
  // Password opsional saat edit — kosong = tidak diubah
  password: yup.string().test(
    'min-jika-diisi',
    'Minimal 8 karakter',
    (val) => !val || val.length >= 8
  ),
})

const { defineField, handleSubmit, errors, setValues } = useForm({ validationSchema: schema })

const [name]     = defineField('name')
const [email]    = defineField('email')
const [password] = defineField('password')
const [role]     = defineField('role')
const [status]   = defineField('status')

async function fetchUser() {
  try {
    // const res = await get(`/users/${route.params.id}`)
    // setValues({ ...res.data.data, password: '' })

    // Mock — hapus setelah API siap
    setValues({ name: 'Budi Santoso', email: 'budi@mail.com', role: 'user', status: 'active', password: '' })
  } catch {
    showToast('Gagal memuat data user', 'danger')
    router.push('/user')
  }
}

const onSubmit = handleSubmit(async (values) => {
  // Hapus password dari payload jika tidak diisi
  if (!values.password) delete values.password

  try {
    await put(`/users/${route.params.id}`, values)
    showToast('User berhasil diperbarui!', 'success')
    router.push('/user')
  } catch {
    showToast('Gagal memperbarui data user', 'danger')
  }
})

onMounted(fetchUser)
</script>

<template>
  <div class="grid gap-[var(--m)]">

    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-[var(--m)]">
      <div>
        <SectionTitle text="Edit User" />
        <Breadcrumb />
      </div>
      <Button text="← Kembali" variant="primary" type="outline" @click="router.back()" />
    </div>

    <!-- Form Card -->
    <CardWrapper replace-shadow-with-border>
      <form @submit.prevent="onSubmit" class="grid gap-[var(--m)]">

        <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[var(--m)]">
          <FormField v-model="name"     id="name"     label="Nama Lengkap"        :error="errors.name" />
          <FormField v-model="email"    id="email"    label="Email" type="email"  :error="errors.email" />
          <FormField v-model="password" id="password" label="Password Baru" type="password"
                     placeholder="Kosongkan jika tidak ingin mengubah" :error="errors.password" />
          <FormField v-model="role"     id="role"     label="Role" type="select"  :options="ROLE_OPTIONS"   :error="errors.role" />
          <FormField v-model="status"   id="status"   label="Status" type="select" :options="STATUS_OPTIONS" :error="errors.status" />
        </div>

        <div class="flex items-center justify-end gap-[var(--m)] mt-[var(--m)]">
          <Button text="Batal"    variant="danger"  type="outline" @click="router.back()" />
          <Button text="Perbarui" variant="primary" :loading="loading" />
        </div>

      </form>
    </CardWrapper>

  </div>
</template>
