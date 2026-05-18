<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuth } from '@/composables/useAuth.js'
import { useToast } from '@/composables/useToast.js'

const { login, loading }  = useAuth()
const { showToast }       = useToast()

const schema = yup.object({
  email:    yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  password: yup.string().required('Password wajib diisi').min(6, 'Minimal 6 karakter'),
})

const { defineField, handleSubmit, errors } = useForm({ validationSchema: schema })

const [email]    = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await login(values)
  } catch {
    showToast('Email atau password salah', 'danger')
  }
})
</script>

<template>
  <div class="min-h-[100dvh] flex items-center justify-center bg-bg p-[var(--m)]">
    <div class="w-full max-w-[400px] grid gap-[var(--l)]
                p-[var(--xxx)] bg-surface rounded-[var(--radius-m)]
                border border-line shadow-[var(--box-shadow)]">

      <!-- Header -->
      <div class="grid gap-[var(--xxs)]">
        <h1 class="text-[length:var(--xx)] font-bold text-text">Selamat Datang 👋</h1>
        <p class="text-link text-[length:var(--s)]">Masuk untuk melanjutkan</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="grid gap-[var(--m)]">
        <FormField
          v-model="email"
          id="email"
          label="Email"
          type="email"
          placeholder="contoh@email.com"
          :error="errors.email"
        />
        <FormField
          v-model="password"
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          :error="errors.password"
        />

        <div class="flex justify-end">
          <router-link
            to="/auth/forgot-password"
            class="text-primary text-[length:var(--s)] hover:underline"
          >
            Lupa password?
          </router-link>
        </div>

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
          <span>{{ loading ? 'Memproses...' : 'Masuk' }}</span>
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-[length:var(--s)] text-link">
        Belum punya akun?
        <router-link to="/auth/register" class="text-primary hover:underline font-medium">
          Daftar
        </router-link>
      </p>

    </div>
  </div>
</template>
