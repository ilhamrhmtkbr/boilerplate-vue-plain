<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      { label: 'Name', value: 'Ilham' }
    ]
  }
})
</script>

<!--
Cara Pakai
<template>
    <Data :items="userData" />
</template>

const userData = ref([
  { label: 'name', value: 'Ilham Rahmat Akbar' },
  { label: 'position', value: 'Fullstack Developer' },
  { label: 'experience', value: '5 Years' }
])
-->
<template>
  <div class="flex flex-col gap-[var(--xs)]">
    <div
        v-for="(item, index) in items"
        :key="index"
        class="border border-line rounded-[var(--radius-m)] px-[var(--m)] py-[var(--xs)] bg-transparent"
    >
      <!-- Key/Label -->
      <dt class="font-light capitalize text-[var(--s)] text-link">
        {{ item.label }}
      </dt>

      <!-- Value -->
      <dd class="font-medium">
        {{ item.value }}
      </dd>
    </div>
  </div>
</template>
