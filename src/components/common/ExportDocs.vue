<template>
  <!-- Tombol Trigger -->
  <div
      @click="showModal = true"
      class="cursor-pointer group outline-none flex items-center justify-center gap-x-4 py-[calc(var(--m)/2)] px-[var(--m)] h-max min-w-[77px] w-max rounded-[var(--radius-s)] text-[length:var(--s)] border border-solid border-line hover:outline-4 hover:outline-solid hover:outline-transprimary hover:border-[1px] hover:border-solid hover:border-primary hover:text-primary"
  >
    <svg class="max-w-[var(--l)] max-h-[var(--l)] fill-text group-hover:fill-primary"
         xmlns="http://www.w3.org/2000/svg" height="800" width="800" viewBox="0 0 459.636 459.636">
      <path d="M424.621 50.643H136.299c-19.307 0-35.015 15.707-35.015 35.014v52.272h41.669c12.94-31.165 53.868-39.785 78.182-15.461l73.448 73.448c18.737 18.736 18.741 49.064.001 67.802l-73.447 73.447c-24.303 24.307-65.232 15.735-78.184-15.458h-41.669v52.272c0 19.307 15.707 35.014 35.015 35.014h288.322c19.307 0 35.015-15.707 35.015-35.014V85.657c0-19.307-15.707-35.014-35.015-35.014zM171.254 303.266c0 14.182 17.221 21.362 27.281 11.3l73.449-73.449c6.241-6.241 6.242-16.359 0-22.6l-73.449-73.449c-10.038-10.043-27.281-2.903-27.281 11.3v13.522H15.981C7.155 169.891 0 177.046 0 185.872v87.891c0 8.826 7.155 15.981 15.981 15.981l155.273.001v13.521z" />
    </svg>
    <span class="capitalize font-['Medium',_ui-sans-serif] text-[length:var(--s)]">Export</span>
  </div>

  <!-- Modal Komponen -->
  <Modal title="Export" :isOpen="showModal" @close="showModal = false">
    <template #footer>
      <p>Filter</p>
    </template>

    <!-- Header -->
    <div class="border-b border-line pb-[var(--m)] flex items-center justify-between">
      <div>
        <h3 class="font-medium text-[length:var(--l)]">Export Laporan Penjualan</h3>
        <p class="text-[length:var(--s)] text-link">Pilih filter lalu export dalam format yang diinginkan</p>
      </div>
      <div class="ml-4 w-10 h-10 bg-transprimary rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    </div>

    <!-- Preset Periode -->
    <div class="px-6 pt-4">
      <p class="font-medium mb-2 tracking-wide">Preset Periode</p>
      <div class="flex flex-wrap gap-2">
        <button
            v-for="preset in PRESET_LIST"
            :key="preset.key"
            @click="setPreset(preset.key)"
            type="button"
            class="px-3 py-1.5 text-[length:var(--s)] font-medium rounded-full cursor-pointer border border-line text-link hover:border-primary hover:text-primary hover:bg-transprimary transition-all duration-150"
        >
          {{ preset.label }}
        </button>
      </div>
    </div>

    <!-- Filter Form -->
    <div class="px-6 py-4 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div>
        <label class="block text-[var(--s)] font-medium mb-1">Tanggal Mulai</label>
        <input
            type="date"
            v-model="form.start_date"
            :max="form.end_date"
            class="w-full text-[var(--s)] border border-line rounded-[var(--radius-m)] px-3 py-2 cursor-pointer focus:bg-transprimary focus:text-primary focus:ring-2 focus:ring-transprimary focus:border-primary outline-none transition-all duration-150"
        />
      </div>
      <div>
        <label class="block text-[var(--s)] font-medium mb-1">Tanggal Akhir</label>
        <input
            type="date"
            v-model="form.end_date"
            :min="form.start_date"
            :max="getTodayDate()"
            class="w-full text-[var(--s)] border border-line rounded-[var(--radius-m)] px-3 py-2 cursor-pointer focus:bg-transprimary focus:text-primary focus:ring-2 focus:ring-transprimary focus:border-primary outline-none transition-all duration-150"
        />
      </div>
      <div>
        <label class="block text-[var(--s)] font-medium mb-1">Cabang</label>
        <select
            v-model="form.branch_id"
            class="w-full text-[var(--s)] border border-line rounded-[var(--radius-m)] px-3 py-2 cursor-pointer focus:bg-transprimary focus:text-primary focus:ring-2 focus:ring-transprimary focus:border-primary outline-none transition-all duration-150"
        >
          <option value="">Semua Cabang</option>
          <option v-for="branch in branches" :key="branch.id" :value="branch.id">
            {{ branch.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-[var(--s)] font-medium mb-1">Tampilkan per</label>
        <select
            v-model="form.group_by"
            class="w-full text-[var(--s)] border border-line rounded-[var(--radius-m)] px-3 py-2 cursor-pointer focus:bg-transprimary focus:text-primary focus:ring-2 focus:ring-transprimary focus:border-primary outline-none transition-all duration-150"
        >
          <option value="daily">Harian</option>
          <option value="monthly">Bulanan</option>
        </select>
      </div>
    </div>

    <div class="border-t border-gray-100 mx-6"></div>

    <!-- Export Buttons -->
    <div class="px-6 py-4 flex flex-col sm:flex-row gap-3">
      <Button @click="handleExport('pdf')" :disabled="isExporting.pdf" text="Export PDF" type="outline"/>
      <Button @click="handleExport('excel')" :disabled="isExporting.excel" text="Export Excel" variant="success" type="outline"/>

      <div class="flex items-center gap-2 ml-auto text-xs text-link">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>File akan ter-download otomatis</span>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Modal from './Modal.vue'
import Button from "./Button.vue";

// --- Props ---
const props = defineProps({
  exportPdfUrl: {
    type: String,
    required: true
  },
  exportExcelUrl: {
    type: String,
    required: true
  },
  branches: {
    type: Array,
    default: () => []
  }
})

// --- Helper Functions ---
function getFirstDayOfMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

function getMondayOfWeek() {
  const now = new Date()
  const day = now.getDay() || 7
  const diff = now.getDate() - day + 1
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

function getFirstDayOfLastMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0]
}

function getLastDayOfLastMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0]
}

// --- Constants ---
const PRESET_LIST = [
  { key: 'today',      label: 'Hari Ini'   },
  { key: 'this_week',  label: 'Minggu Ini' },
  { key: 'this_month', label: 'Bulan Ini'  },
  { key: 'last_month', label: 'Bulan Lalu' },
  { key: 'this_year',  label: 'Tahun Ini'  },
]

const showModal = ref(false)

const form = reactive({
  start_date: getFirstDayOfMonth(),
  end_date: getTodayDate(),
  branch_id: '',
  group_by: 'daily',
})

const isExporting = reactive({
  pdf: false,
  excel: false
})

// --- Computed & Methods ---
function buildQuery() {
  const params = new URLSearchParams()
  if (form.start_date) params.append('start_date', form.start_date)
  if (form.end_date)   params.append('end_date',   form.end_date)
  if (form.branch_id)  params.append('branch_id',  form.branch_id)
  if (form.group_by)   params.append('group_by',   form.group_by)
  return params.toString()
}

const fullPdfUrl = computed(() => `${props.exportPdfUrl}?${buildQuery()}`)
const fullExcelUrl = computed(() => `${props.exportExcelUrl}?${buildQuery()}`)

async function handleExport(type) {
  if (form.start_date > form.end_date) {
    alert('Tanggal mulai tidak boleh lebih besar dari tanggal akhir.')
    return
  }

  isExporting[type] = true
  try {
    window.open(type === 'pdf' ? fullPdfUrl.value : fullExcelUrl.value, '_blank')
  } finally {
    setTimeout(() => {
      isExporting[type] = false
    }, 2000)
  }
}

function setPreset(preset) {
  const today = getTodayDate()
  const now   = new Date()

  const presets = {
    today:      { start_date: today,                    end_date: today },
    this_week:  { start_date: getMondayOfWeek(),        end_date: today },
    this_month: { start_date: getFirstDayOfMonth(),     end_date: today },
    last_month: { start_date: getFirstDayOfLastMonth(), end_date: getLastDayOfLastMonth() },
    this_year:  { start_date: `${now.getFullYear()}-01-01`, end_date: today },
  }

  if (presets[preset]) {
    Object.assign(form, presets[preset])
  }
}
</script>
