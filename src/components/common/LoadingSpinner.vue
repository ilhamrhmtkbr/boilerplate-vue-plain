<script setup>
/**
 * LoadingSpinner — spinner circle, pakai animate-spin bawaan Tailwind
 *
 * Props:
 *   size  — ukuran spinner (default: 'var(--x)')
 *   color — warna border-top (default: 'border-t-primary')
 *
 * Contoh pakai:
 *
 *   <LoadingSpinner />
 *   <LoadingSpinner size="var(--xx)" />
 */

defineProps({
  size:  { type: String, default: 'var(--x)' },
})
</script>

<template>
  <div
    class="border-4 border-transparent border-t-primary rounded-full bg-transparent animate-spin shrink-0"
    :style="{ width: size, height: size }"
  />
</template>
