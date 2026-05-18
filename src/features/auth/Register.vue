<script setup>
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuth } from '@/composables/useAuth.js'
import { useToast } from '@/composables/useToast.js'

const router               = useRouter()
const { register, loading } = useAuth()
const { showToast }        = useToast()

const schema = yup.object({
  name:                  yup.string().required('Nama wajib diisi').min(2, 'Minimal 2 karakter'),
  email:                 yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  password:              yup.string().required('Password wajib diisi').min(8, 'Minimal 8 karakter'),
  password_confirmation: yup.string()
    .required('Konfirmasi password wajib diisi')
    .oneOf([yup.ref('password')], 'Password tidak cocok'),
})

const { defineField, handleSubmit, errors } = useForm({ validationSchema: schema })

const [name]                  = defineField('name')
const [email]                 = defineField('email')
const [password]              = defineField('password')
const [password_confirmation] = defineField('password_confirmation')

const onSubmit = handleSubmit(async (values) => {
  try {
    await register(values)
    showToast('Registrasi berhasil! Silakan login.', 'success')
    router.push('/auth/login')
  } catch {
    showToast('Registrasi gagal, silakan coba lagi.', 'danger')
  }
})
</script>

<template>
  <div class="min-h-[100dvh] flex items-center justify-center bg-bg p-[var(--m)]">
    <div class="w-full max-w-[450px] grid gap-[var(--l)]
                p-[var(--xxx)] bg-surface rounded-[var(--radius-m)]
                border border-line shadow-[var(--box-shadow)]">

      <!-- Header -->
      <div class="grid gap-[var(--xxs)]">
        <h1 class="text-[length:var(--xx)] font-bold text-text">Buat Akun ✨</h1>
        <p class="text-link text-[length:var(--s)]">Isi data di bawah untuk mendaftar</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="grid gap-[var(--m)]">
        <FormField v-model="name"                  id="name"                  label="Nama Lengkap" :error="errors.name" />
        <FormField v-model="email"                 id="email"                 label="Email" type="email" placeholder="contoh@email.com" :error="errors.email" />
        <FormField v-model="password"              id="password"              label="Password" type="password" placeholder="Min. 8 karakter" :error="errors.password" />
        <FormField v-model="password_confirmation" id="password_confirmation" label="Konfirmasi Password" type="password" :error="errors.password_confirmation" />

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-[calc(var(--m)/2)] px-[var(--m)]
                 bg-primary text-bg rounded-[var(--radius-s)]
                 font-medium transition-all
                 hover:ring-4 hover:ring-transprimary
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10"
                    stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
          <span>{{ loading ? 'Mendaftar...' : 'Daftar' }}</span>
        </button>
      </form>

      <p class="text-center text-[length:var(--s)] text-link">
        Sudah punya akun?
        <router-link to="/auth/login" class="text-primary hover:underline font-medium">
          Masuk
        </router-link>
      </p>

    </div>
  </div>
</template>
