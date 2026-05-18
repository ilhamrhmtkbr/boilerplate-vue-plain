<script setup>
/**
 * LoadingPulse — skeleton shimmer, buat placeholder konten saat loading
 *
 * Tambahkan ke global.css + @theme:
 *
 *   @keyframes skeleton-loading {
 *     0%   { background-position: 200% 0; }
 *     100% { background-position: -200% 0; }
 *   }
 *
 *   Di dalam @theme:
 *   --animate-skeleton: skeleton-loading 2s infinite;
 *
 * Props:
 *   width   — lebar (default: '100%')
 *   height  — tinggi (default: 'var(--m)')
 *   rounded — border radius Tailwind class (default: 'rounded-[var(--radius-m)]')
 *
 * Contoh pakai:
 *
 *   <!-- Text placeholder -->
 *   <LoadingPulse height="var(--m)" />
 *   <LoadingPulse height="var(--m)" width="60%" />
 *
 *   <!-- Avatar placeholder -->
 *   <LoadingPulse width="48px" height="48px" rounded="rounded-full" />
 *
 *   <!-- Card skeleton -->
 *   <div class="card-wrapper grid gap-[var(--m)]">
 *     <LoadingPulse width="48px" height="48px" rounded="rounded-full" />
 *     <LoadingPulse height="var(--m)" />
 *     <LoadingPulse height="var(--m)" width="70%" />
 *     <LoadingPulse height="var(--m)" width="50%" />
 *   </div>
 */

defineProps({
  width:   { type: String, default: '100%' },
  height:  { type: String, default: 'var(--m)' },
  rounded: { type: String, default: 'rounded-[var(--radius-m)]' },
})
</script>

<template>
  <div
      class="animate-skeleton bg-[length:200%_100%] shrink-0"
      :class="rounded"
      :style="{
      width,
      height,
      backgroundImage: 'linear-gradient(90deg, var(--border-color), var(--transbg-color) 50%, var(--border-color) 75%)',
    }"
  />
</template>
