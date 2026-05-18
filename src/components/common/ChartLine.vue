<script setup>
/**
 * ChartLine.vue — Line chart menggunakan Chart.js + vue-chartjs
 *
 * Install (jika belum):
 *   npm install chart.js vue-chartjs
 *
 * Props:
 *   name    — judul chart (String)
 *   stats   — Array of { label: string, value: number }
 *             ATAU Array of Array (multi-line):
 *             [ { label: 'Dataset A', color?: string, data: [{ label, value }] } ]
 *   smooth  — Boolean, pakai kurva smooth (default: true)
 *
 * ── Single line (paling umum) ────────────────────────────────────────────
 *   <script setup>
 *   import ChartLine from '@/components/charts/ChartLine.vue'
 *
 *   const data = [
 *     { label: 'Jan', value: 120 },
 *     { label: 'Feb', value: 380 },
 *     { label: 'Mar', value: 210 },
 *     { label: 'Apr', value: 540 },
 *   ]
 *   <\/script>
 *
 *   <template>
 *     <ChartLine name="Pengunjung Bulanan" :stats="data" />
 *   </template>
 *
 * ── Multi line ───────────────────────────────────────────────────────────
 *   const multiData = [
 *     {
 *       label: 'Revenue',
 *       color: '#6366f1',
 *       data: [{ label: 'Jan', value: 400 }, { label: 'Feb', value: 600 }],
 *     },
 *     {
 *       label: 'Expense',
 *       color: '#f43f5e',
 *       data: [{ label: 'Jan', value: 200 }, { label: 'Feb', value: 350 }],
 *     },
 *   ]
 *
 *   <ChartLine name="Revenue vs Expense" :stats="multiData" />
 */

import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  CategoryScale, LinearScale, Filler,
} from 'chart.js'

ChartJS.register(
  Title, Tooltip, Legend,
  LineElement, PointElement,
  CategoryScale, LinearScale, Filler,
)

const props = defineProps({
  name:   { type: String,  default: 'Chart' },
  stats:  { type: Array,   default: () => [] },
  smooth: { type: Boolean, default: true },
})

// Deteksi apakah multi-line (array of { label, data: [...] })
const isMulti = computed(() =>
  props.stats.length > 0 && Array.isArray(props.stats[0]?.data)
)

const COLORS = [
  '#6366f1', '#f43f5e', '#10b981', '#f59e0b',
  '#3b82f6', '#8b5cf6', '#14b8a6', '#fb923c',
]

function makeDataset(label, data, color, tension) {
  return {
    label,
    data:            data.map(i => i.value),
    borderColor:     color,
    backgroundColor: color + '22',   // 13% opacity fill
    borderWidth:     2.5,
    pointRadius:     4,
    pointHoverRadius: 6,
    pointBackgroundColor: color,
    tension,
    fill: true,
  }
}

const chartData = computed(() => {
  const tension = props.smooth ? 0.4 : 0

  if (isMulti.value) {
    return {
      labels: props.stats[0].data.map(i => i.label),
      datasets: props.stats.map((s, idx) =>
        makeDataset(s.label, s.data, s.color ?? COLORS[idx % COLORS.length], tension)
      ),
    }
  }

  return {
    labels: props.stats.map(i => i.label),
    datasets: [
      makeDataset(props.name, props.stats, COLORS[0], tension),
    ],
  }
})

const chartOptions = {
  responsive:          true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: {
      display:  true,
      position: 'top',
      align:    'end',
      labels: {
        usePointStyle: true,
        pointStyle:    'circle',
        boxWidth:      8,
        padding:       16,
        font:          { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: '#1f2937',
      padding:         12,
      cornerRadius:    8,
    },
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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-primary">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      </span>
      <h3 class="text-[length:var(--l,1rem)] font-bold truncate">{{ name }}</h3>
    </div>

    <!-- Chart -->
    <div class="h-72 w-full">
      <Line v-if="stats.length" :data="chartData" :options="chartOptions" />
      <div v-else class="flex h-full items-center justify-center text-sm text-link italic">
        Memuat data...
      </div>
    </div>

  </div>
</template>
