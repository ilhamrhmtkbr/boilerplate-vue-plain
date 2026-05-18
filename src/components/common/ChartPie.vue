<script setup>
/**
 * ChartPie.vue — Pie chart menggunakan Chart.js + vue-chartjs
 *
 * Install (jika belum):
 *   npm install chart.js vue-chartjs
 *
 * Props:
 *   name  — judul chart (String)
 *   stats — Array of { label: string, value: number, color?: string }
 *           color bersifat opsional — jika tidak diisi, pakai warna default
 *
 * Contoh pakai:
 *   <script setup>
 *   import ChartPie from '@/components/charts/ChartPie.vue'
 *
 *   const data = [
 *     { label: 'Elektronik', value: 500, color: '#6366f1' },
 *     { label: 'Fashion',    value: 320, color: '#f59e0b' },
 *     { label: 'Makanan',    value: 180, color: '#10b981' },
 *     { label: 'Lainnya',    value: 90  },   // ← tanpa color, otomatis
 *   ]
 *   <\/script>
 *
 *   <template>
 *     <ChartPie name="Distribusi Kategori" :stats="data" />
 *   </template>
 */

import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  name:  { type: String, default: 'Chart' },
  stats: { type: Array,  default: () => [] },
})

const DEFAULT_COLORS = [
  '#6366f1', '#f59e0b', '#10b981', '#f43f5e',
  '#3b82f6', '#8b5cf6', '#14b8a6', '#fb923c',
]
function resolveColor(item, idx) {
  return item.color ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length]
}

const chartData = computed(() => ({
  labels: props.stats.map(i => i.label),
  datasets: [
    {
      label:           props.name,
      data:            props.stats.map(i => i.value),
      backgroundColor: props.stats.map((i, idx) => resolveColor(i, idx)),
      borderWidth:     0,
      hoverOffset:     0,
    },
  ],
}))

const chartOptions = {
  responsive:          true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle:    'circle',
        padding:       20,
        font:          { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: '#1f2937',
      padding:         12,
      cornerRadius:    8,
      callbacks: {
        label: (ctx) => {
          const label = ctx.label ? `  ${ctx.label}: ` : ''
          return `${label}${ctx.parsed} unit`
        },
      },
    },
  },
  animation: { duration: 1200, easing: 'easeInOutQuart' },
}
</script>

<template>
  <div class="p-6 bg-surface rounded-xl shadow-md border-style-default w-full max-w-md max-md:max-w-[88dvw]">

    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <span class="grid place-items-center w-9 h-9 rounded-lg bg-transprimary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" class="fill-primary">
          <path d="M15 0v17.3l15.947 4.784C31.568 20.543 32 18.688 32 16.571 32 7.419 23.453 0 15 0h0zm-2 3c-6.971.728-13 7.026-13 14.5C0 25.508 6.492 32 14.5 32c5.897 0 10.963-3.526 13.229-8.582L13 19V3h0z" fill-rule="evenodd" />
        </svg>
      </span>
      <h3 class="text-[length:var(--l,1rem)] font-bold truncate">{{ name }}</h3>
    </div>

    <!-- Chart -->
    <div class="h-64 w-full flex items-center justify-center">
      <Pie v-if="stats.length" :data="chartData" :options="chartOptions" />
      <p v-else class="text-sm text-link italic">Belum ada data</p>
    </div>

  </div>
</template>
