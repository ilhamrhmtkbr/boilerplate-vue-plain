<script setup>
/**
 * ChartBar.vue — Bar chart menggunakan Chart.js + vue-chartjs
 *
 * Install (jika belum):
 *   npm install chart.js vue-chartjs
 *
 * Props:
 *   name  — judul chart (String)
 *   stats — Array of { label: string, value: number }
 *
 * Contoh pakai:
 *   <script setup>
 *   import ChartBar from '@/components/charts/ChartBar.vue'
 *
 *   const data = [
 *     { label: 'Jan', value: 450 },
 *     { label: 'Feb', value: 590 },
 *     { label: 'Mar', value: 800 },
 *     { label: 'Apr', value: 320 },
 *   ]
 *   <\/script>
 *
 *   <template>
 *     <ChartBar name="Revenue Bulanan" :stats="data" />
 *   </template>
 */

import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  name:  { type: String, default: 'Chart' },
  stats: { type: Array,  default: () => [] },
})

const chartData = computed(() => ({
  labels: props.stats.map(i => i.label),
  datasets: [
    {
      label:                props.name,
      data:                 props.stats.map(i => i.value),
      backgroundColor:      '#4f46e5',
      hoverBackgroundColor: '#4f46e5',
      borderRadius:         8,
      borderSkipped:        false,
      barThickness:         32,
    },
  ],
}))

const chartOptions = {
  responsive:          true,
  maintainAspectRatio: false,
  plugins: {
    legend:  { display: false },
    tooltip: { padding: 12, backgroundColor: '#1f2937', cornerRadius: 8 },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid:  { color: 'rgba(156,163,175,0.15)' },
      ticks: { color: '#9ca3af', font: { size: 11 } },
    },
    x: {
      grid:  { display: false },
      ticks: { color: '#6b7280', font: { size: 12, weight: '500' } },
    },
  },
  animation: { duration: 1200, easing: 'easeInOutQuart' },
}
</script>

<template>
  <div class="p-6 bg-surface rounded-xl shadow-md border-style-default w-full max-w-lg max-md:max-w-[88dvw]">

    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <span class="grid place-items-center w-9 h-9 rounded-lg bg-transprimary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="fill-primary">
          <path fill-rule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7zm6 6a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0V8zm-5 2a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1zm8 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1z" />
        </svg>
      </span>
      <h3 class="text-[length:var(--l,1rem)] font-bold truncate">{{ name }}</h3>
    </div>

    <!-- Chart -->
    <div class="h-72 w-full">
      <Bar v-if="stats.length" :data="chartData" :options="chartOptions" />
      <div v-else class="flex h-full items-center justify-center text-sm text-link italic">
        Memuat data...
      </div>
    </div>

  </div>
</template>
