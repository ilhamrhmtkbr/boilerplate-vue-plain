<script setup>
defineProps({
  items: {
    type: Array,
    required: true
    /**
     * Format: [
     *  { title: 'Project Started', desc: '...', time: '2 hours ago', active: true },
     *  ...
     * ]
     */
  }
})

/** Cara Pakai
 * <Timeline :items="historyData" />
 */
</script>

<template>
  <div class="grid grid-cols-[max-content_1fr] gap-x-[var(--s)] gap-x-[var(--m)] grid-rows-[max-content]">
    <template v-for="(item, index) in items" :key="index">

      <!-- Kolom Kiri: Dot & Line -->
      <div class="flex flex-col">
        <!-- Dot (Key) -->
        <span
            class="flex items-center justify-center min-w-[var(--xxxx)] min-h-[var(--xxxx)] max-w-[var(--xxxx)] max-h-[var(--xxxx)] rounded-[var(--xxxx)] font-medium cursor-pointer transition-colors"
            :class="item.active
            ? 'bg-primary text-white'
            : 'bg-link text-scrollthumb hover:bg-primary hover:text-white'"
        >
          {{ index + 1 }}
        </span>

        <!-- Divider Line -->
        <!-- Logic: Jangan tampilin divider di item terakhir -->
        <div
            v-if="index < items.length - 1"
            class="min-h-[63px] w-[2px] ml-[calc(var(--xxxx)/2)] translate-x-[-50%] transition-colors"
            :class="item.active ? 'bg-primary' : 'bg-link'"
        ></div>
      </div>

      <!-- Kolom Kanan: Content -->
      <div class="overflow-auto h-max max-h-[300px] max-w-[400px] mt-[4px]">
        <div class="font-medium text-[var(--l)] text-text">
          {{ item.title }}
        </div>
        <div class="text-text/80 text-[var(--m)]">
          {{ item.desc }}
        </div>
        <div class="font-light text-[var(--xs)] text-link">
          {{ item.time }}
        </div>
      </div>

    </template>
  </div>
</template>

<style scoped>
/* Biar scrollbar konten gak ngerusak layout kalau kepanjangan */
.overflow-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-auto::-webkit-scrollbar-thumb {
  background: var(--scrollthumb-color);
  border-radius: 10px;
}
</style>
