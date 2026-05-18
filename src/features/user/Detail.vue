<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi.js'
import { useToast } from '@/composables/useToast.js'

const route            = useRoute()
const router           = useRouter()
const { get, loading } = useApi()
const { showToast }    = useToast()

const user = ref(null)

// Contoh timeline aktivitas — sesuaikan dengan data dari API
const activityLog = ref([
  { title: 'Akun Dibuat',      desc: 'Akun berhasil didaftarkan ke sistem.',          time: '10 Jan 2025', active: true  },
  { title: 'Login Pertama',    desc: 'Pengguna pertama kali masuk ke sistem.',         time: '10 Jan 2025', active: true  },
  { title: 'Profile Diupdate', desc: 'Nama dan nomor telepon diperbarui.',             time: '15 Feb 2025', active: false },
  { title: 'Password Diubah',  desc: 'Password berhasil diganti.',                    time: '20 Mar 2025', active: false },
])

async function fetchUser() {
  try {
    // const res = await get(`/users/${route.params.id}`)
    // user.value = res.data.data

    // Mock — hapus setelah API siap
    user.value = {
      id:         route.params.id,
      name:       'Budi Santoso',
      email:      'budi@mail.com',
      role:       'user',
      status:     'active',
      created_at: '10 Januari 2025',
    }
  } catch {
    showToast('Gagal memuat detail user', 'danger')
    router.push('/user')
  }
}

onMounted(fetchUser)
</script>

<template>
  <div class="grid gap-[var(--m)]">

    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-[var(--m)]">
      <div>
        <SectionTitle text="Detail User" />
        <Breadcrumb />
      </div>
      <div class="flex items-center gap-[var(--m)]">
        <Button text="← Kembali" variant="primary" type="outline" @click="router.back()" />
        <Button text="Edit"      variant="warning"               @click="router.push(`/user/${route.params.id}/edit`)" />
      </div>
    </div>

    <LoadingPulse v-if="loading" height="300px" />

    <template v-else-if="user">
      <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[var(--m)]">

        <!-- Info Card -->
        <CardWrapper replace-shadow-with-border>
          <h2 class="font-bold text-[length:var(--l)] text-text mb-[var(--m)]">Informasi User</h2>

          <div class="grid gap-[var(--s)]">
            <div v-for="(row, i) in [
              { label: 'Nama',      value: user.name },
              { label: 'Email',     value: user.email },
              { label: 'Role',      value: user.role },
              { label: 'Bergabung', value: user.created_at },
            ]" :key="i"
              class="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line last:border-none last:pb-0"
            >
              <span class="text-link text-[length:var(--s)] min-w-[100px] shrink-0">{{ row.label }}</span>
              <span class="font-medium text-text capitalize">{{ row.value }}</span>
            </div>

            <!-- Status khusus karena pakai badge -->
            <div class="flex items-center gap-[var(--m)]">
              <span class="text-link text-[length:var(--s)] min-w-[100px] shrink-0">Status</span>
              <span :class="[
                'px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium',
                user.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
              ]">
                {{ user.status === 'active' ? 'Aktif' : 'Nonaktif' }}
              </span>
            </div>
          </div>
        </CardWrapper>

        <!-- Activity Timeline -->
        <CardWrapper replace-shadow-with-border>
          <h2 class="font-bold text-[length:var(--l)] text-text mb-[var(--m)]">Riwayat Aktivitas</h2>
          <Timeline :items="activityLog" />
        </CardWrapper>

      </div>
    </template>

  </div>
</template>
