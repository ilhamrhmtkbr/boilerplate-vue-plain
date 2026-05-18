<script setup>
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useApi } from '@/composables/useApi.js'
import { useToast } from '@/composables/useToast.js'

const router            = useRouter()
const { post, loading } = useApi()
const { showToast }     = useToast()

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
  name:     yup.string().required('Nama wajib diisi').min(2, 'Minimal 2 karakter'),
  email:    yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  password: yup.string().required('Password wajib diisi').min(8, 'Minimal 8 karakter'),
  role:     yup.string().required('Role wajib dipilih'),
  status:   yup.string().required('Status wajib dipilih'),
})

const { defineField, handleSubmit, errors } = useForm({ validationSchema: schema })

const [name]     = defineField('name')
const [email]    = defineField('email')
const [password] = defineField('password')
const [role]     = defineField('role')
const [status]   = defineField('status')

const onSubmit = handleSubmit(async (values) => {
  try {
    await post('/users', values)
    showToast('User berhasil ditambahkan!', 'success')
    router.push('/user')
  } catch {
    showToast('Gagal menyimpan data user', 'danger')
  }
})
</script>

<template>
  <div class="grid gap-[var(--m)]">

    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-[var(--m)]">
      <div>
        <SectionTitle text="Tambah User" />
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
          <FormField v-model="password" id="password" label="Password" type="password" placeholder="Min. 8 karakter" :error="errors.password" />
          <FormField v-model="role"     id="role"     label="Role" type="select"  :options="ROLE_OPTIONS"   :error="errors.role" />
          <FormField v-model="status"   id="status"   label="Status" type="select" :options="STATUS_OPTIONS" :error="errors.status" />
        </div>

        <div class="flex items-center justify-end gap-[var(--m)] mt-[var(--m)]">
          <Button text="Batal"  variant="danger"  type="outline" @click="router.back()" />
          <Button text="Simpan" variant="primary" :loading="loading" />
        </div>

      </form>
    </CardWrapper>

  </div>
</template>
