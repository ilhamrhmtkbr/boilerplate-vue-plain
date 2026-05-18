<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const items = [
  { id: 1, label: 'home', to: '/' },
  { id: 2, label: 'product', to: '/product' }
]
</script>

<!--
Usage:
- otomatis active dari vue-router (tanpa function manual)
-->

<template>
  <div
      class="flex flex-wrap items-center
           gap-y-[var(--s)] gap-x-[var(--xxs)]
           p-[var(--xs)]
           text-[length:var(--s)]
           rounded-[var(--radius-s)]
           border border-line
           w-max max-w-[85dvw]
           text-link"
  >
    <template v-for="(item, i) in items" :key="item.id">
      <RouterLink
          :to="item.to"
          class="px-[var(--xs)] py-[2px]
               rounded-[var(--radius-s)]
               text-link
               capitalize cursor-pointer
               hover:text-primary
               hover:bg-transprimary"
          :class="route.path === item.to
          ? 'text-primary bg-transprimary'
          : ''"
      >
        {{ item.label }}
      </RouterLink>

      <span v-if="i < items.length - 1">></span>
    </template>
  </div>
</template>
