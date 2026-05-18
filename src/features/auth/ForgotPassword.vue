<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuth } from '@/composables/useAuth.js'
import { useToast } from '@/composables/useToast.js'

const { forgotPassword, loading } = useAuth()
const { showToast }               = useToast()

const sent = ref(false)

const schema = yup.object({
  email: yup.string().required('Email wajib diisi').email('Format email tidak valid'),
})

const { defineField, handleSubmit, errors } = useForm({ validationSchema: schema })
const [email] = defineField('email')

const onSubmit = handleSubmit(async (values) => {
  try {
    await forgotPassword(values.email)
    sent.value = true
  } catch {
    showToast('Gagal mengirim email. Coba lagi.', 'danger')
  }
})
</script>

<template>
  <div class="min-h-[100dvh] flex items-center justify-center bg-bg p-[var(--m)]">
    <div class="w-full max-w-[400px] grid gap-[var(--l)]
                p-[var(--xxx)] bg-surface rounded-[var(--radius-m)]
                border border-line shadow-[var(--box-shadow)]">

      <!-- State: Email Terkirim -->
      <template v-if="sent">
        <div class="text-center grid gap-[var(--m)]">
          <div class="text-[48px] mx-auto">📧</div>
          <h1 class="text-[length:var(--x)] font-bold text-text">Email Terkirim!</h1>
          <p class="text-link text-[length:var(--s)]">
            Cek inbox kamu dan ikuti link reset password yang kami kirimkan.
          </p>
          <router-link to="/auth/login" class="text-primary text-[length:var(--s)] hover:underline font-medium">
            ← Kembali ke Login
          </router-link>
        </div>
      </template>

      <!-- State: Form -->
      <template v-else>
        <div class="grid gap-[var(--xxs)]">
          <h1 class="text-[length:var(--xx)] font-bold text-text">Lupa Password?</h1>
          <p class="text-link text-[length:var(--s)]">
            Masukkan email dan kami akan kirimkan link reset password.
          </p>
        </div>

        <form @submit.prevent="onSubmit" class="grid gap-[var(--m)]">
          <FormField
            v-model="email"
            id="email"
            label="Email"
            type="email"
            placeholder="contoh@email.com"
            :error="errors.email"
          />

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
            <span>{{ loading ? 'Mengirim...' : 'Kirim Link Reset' }}</span>
          </button>
        </form>

        <p class="text-center text-[length:var(--s)] text-link">
          Ingat password?
          <router-link to="/auth/login" class="text-primary hover:underline font-medium">
            Kembali Login
          </router-link>
        </p>
      </template>

    </div>
  </div>
</template>
