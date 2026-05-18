<script setup>
/**
 * LoadingBar — progress bar
 *
 * Props:
 *   progress  — nilai progress 0–100 (controlled). Kalau null → pakai animated
 *   animated  — auto-fill animasi 11s (untuk loading page dll)
 *
 * Tambahkan ke global.css + @theme:
 *
 *   @keyframes fillProgress {
 *     from { width: 0; }
 *     to   { width: 100%; }
 *   }
 *
 *   Di dalam @theme:
 *   --animate-fill-progress: fillProgress 11s ease-out forwards;
 *
 * Contoh pakai:
 *
 *   <!-- Controlled (dari state/prop) -->
 *   <LoadingBar :progress="uploadPercent" />
 *
 *   <!-- Auto animasi -->
 *   <LoadingBar animated />
 */

const props = defineProps({
  progress: { type: Number, default: null }, // 0–100
  animated: { type: Boolean, default: false },
})
</script>

<template>
  <div class="h-[var(--s)] bg-white/20 rounded-full overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
    <div
      class="h-full bg-primary rounded-full"
      :class="animated && progress === null ? 'animate-fill-progress' : ''"
      :style="progress !== null ? { width: `${progress}%`, transition: 'width 0.3s ease' } : {}"
    />
  </div>
</template>
