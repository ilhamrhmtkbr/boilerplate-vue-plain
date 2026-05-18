<script setup>
import { onMounted } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useApi } from '@/composables/useApi.js'
import { useToast } from '@/composables/useToast.js'
import { useAuth } from '@/composables/useAuth.js'

const { get, put, loading } = useApi()
const { showToast }         = useToast()
const { user: authUser }    = useAuth()

const schema = yup.object({
  name:  yup.string().required('Nama wajib diisi').min(2, 'Minimal 2 karakter'),
  email: yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  password: yup.string().test('min-jika-diisi', 'Minimal 8 karakter', (val) => !val || val.length >= 8),
  password_confirmation: yup.string().test('cocok', 'Password tidak cocok', function (val) {
    return !this.parent.password || val === this.parent.password
  }),
})

const { defineField, handleSubmit, errors, setValues } = useForm({ validationSchema: schema })

const [name]                  = defineField('name')
const [email]                 = defineField('email')
const [password]              = defineField('password')
const [password_confirmation] = defineField('password_confirmation')

async function fetchProfile() {
  try {
    // const res = await get('/profile')
    // setValues({ ...res.data, password: '', password_confirmation: '' })

    // Mock — hapus setelah API siap
    setValues({
      name:                  authUser.value?.name  ?? 'Budi Santoso',
      email:                 authUser.value?.email ?? 'budi@mail.com',
      password:              '',
      password_confirmation: '',
    })
  } catch {
    showToast('Gagal memuat profile', 'danger')
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (!values.password) {
    delete values.password
    delete values.password_confirmation
  }
  try {
    await put('/profile', values)
    showToast('Profile berhasil diperbarui!', 'success')
  } catch {
    showToast('Gagal memperbarui profile', 'danger')
  }
})

onMounted(fetchProfile)
</script>

<template>
  <div class="grid gap-[var(--m)]">

    <SectionTitle text="Profile Saya" />

    <CardWrapper replace-shadow-with-border>
      <form @submit.prevent="onSubmit" class="grid gap-[var(--m)]">

        <!-- Info Akun -->
        <div>
          <h2 class="font-bold text-[length:var(--l)] text-text mb-[var(--m)]">Informasi Akun</h2>
          <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[var(--m)]">
            <FormField v-model="name"  id="name"  label="Nama Lengkap" :error="errors.name" />
            <FormField v-model="email" id="email" label="Email" type="email" :error="errors.email" />
          </div>
        </div>

        <!-- Ubah Password -->
        <div>
          <h2 class="font-bold text-[length:var(--l)] text-text mb-[var(--xxs)]">Ubah Password</h2>
          <p class="text-link text-[length:var(--s)] mb-[var(--m)]">Kosongkan jika tidak ingin mengubah password</p>
          <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[var(--m)]">
            <FormField v-model="password"              id="password"              label="Password Baru" type="password" placeholder="Min. 8 karakter" :error="errors.password" />
            <FormField v-model="password_confirmation" id="password_confirmation" label="Konfirmasi Password Baru" type="password" :error="errors.password_confirmation" />
          </div>
        </div>

        <div class="flex justify-end mt-[var(--m)]">
          <Button text="Simpan Perubahan" variant="primary" :loading="loading" />
        </div>

      </form>
    </CardWrapper>

  </div>
</template>
