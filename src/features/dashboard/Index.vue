<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi.js'

const { get } = useApi()

// ── Stats Cards ────────────────────────────────────────────────────
// TODO: Ganti mock data dengan API call
const stats = ref([
  { label: 'Total User',    value: '1.240', icon: '👥', trend: '+12%', trendUp: true  },
  { label: 'User Aktif',   value: '987',   icon: '✅', trend: '+5%',  trendUp: true  },
  { label: 'Total Produk', value: '342',   icon: '📦', trend: '+8%',  trendUp: true  },
  { label: 'Pending',      value: '23',    icon: '⏳', trend: '-2%',  trendUp: false },
])

// ── Chart Data ─────────────────────────────────────────────────────
const chartBarData = ref([
  { label: 'Jan', value: 400 },
  { label: 'Feb', value: 700 },
  { label: 'Mar', value: 550 },
  { label: 'Apr', value: 900 },
  { label: 'Mei', value: 620 },
  { label: 'Jun', value: 850 },
])

const chartLineData = ref([
  { label: 'Sen', value: 120 },
  { label: 'Sel', value: 380 },
  { label: 'Rab', value: 210 },
  { label: 'Kam', value: 540 },
  { label: 'Jum', value: 320 },
  { label: 'Sab', value: 750 },
  { label: 'Min', value: 490 },
])

// ── Recent Users Table ─────────────────────────────────────────────
const recentUsers = ref([
  { name: 'Andi Wijaya',     email: 'andi@mail.com',  role: 'Admin', status: 'active' },
  { name: 'Budi Santoso',    email: 'budi@mail.com',  role: 'User',  status: 'active' },
  { name: 'Citra Dewi',      email: 'citra@mail.com', role: 'Mod',   status: 'inactive' },
  { name: 'Doni Kurniawan',  email: 'doni@mail.com',  role: 'User',  status: 'active' },
  { name: 'Eka Putri',       email: 'eka@mail.com',   role: 'User',  status: 'active' },
])

// ── Fetch dari API ─────────────────────────────────────────────────
async function fetchDashboard() {
  // TODO: Uncomment saat API siap
  // try {
  //   const res = await get('/dashboard')
  //   stats.value       = res.data.stats
  //   recentUsers.value = res.data.recent_users
  //   chartBarData.value  = res.data.chart_monthly
  //   chartLineData.value = res.data.chart_weekly
  // } catch {
  //   // handle error
  // }
}

onMounted(fetchDashboard)
</script>

<template>
  <div class="grid gap-[var(--xx)]">

    <SectionTitle text="Dashboard" />

    <!-- Stats Cards -->
    <div class="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-[var(--m)]">
      <CardWrapper v-for="stat in stats" :key="stat.label" replace-shadow-with-border>
        <div class="flex items-center justify-between gap-[var(--m)]">
          <div class="grid gap-[var(--xxs)]">
            <p class="text-link text-[length:var(--s)]">{{ stat.label }}</p>
            <p class="text-[length:var(--xx)] font-bold text-text">{{ stat.value }}</p>
            <p :class="['text-[length:var(--xs)]', stat.trendUp ? 'text-success' : 'text-danger']">
              {{ stat.trend }} bulan ini
            </p>
          </div>
          <span class="text-[36px]">{{ stat.icon }}</span>
        </div>
      </CardWrapper>
    </div>

    <!-- Charts Row -->
    <div class="flex flex-wrap gap-[var(--m)]">
      <ChartBar  name="Pendaftaran Bulanan" :stats="chartBarData" />
      <ChartLine name="Aktivitas Mingguan"  :stats="chartLineData" />
    </div>

    <!-- Recent Users -->
    <CardWrapper replace-shadow-with-border>
      <div class="flex items-center justify-between mb-[var(--m)]">
        <h2 class="font-bold text-[length:var(--l)] text-text">User Terbaru</h2>
        <router-link to="/user" class="text-primary text-[length:var(--s)] hover:underline">
          Lihat Semua →
        </router-link>
      </div>

      <Table
        :headers="['No', 'Nama', 'Email', 'Role', 'Status']"
        :items="recentUsers"
      >
        <template #row="{ item, index }">
          <td class="text-center px-[var(--xs)] py-[var(--s)]">{{ index + 1 }}</td>
          <td class="px-[var(--xs)] py-[var(--s)] font-medium">{{ item.name }}</td>
          <td class="px-[var(--xs)] py-[var(--s)] text-link">{{ item.email }}</td>
          <td class="px-[var(--xs)] py-[var(--s)]">{{ item.role }}</td>
          <td class="px-[var(--xs)] py-[var(--s)]">
            <span :class="[
              'px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium',
              item.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
            ]">
              {{ item.status === 'active' ? 'Aktif' : 'Nonaktif' }}
            </span>
          </td>
        </template>
      </Table>
    </CardWrapper>

  </div>
</template>
