<script setup>
import { ref } from 'vue'

const active = ref(false)
const toggle = () => active.value = !active.value
</script>

<!--
Usage:
<BottomSheet>
  <template #trigger>
    <div class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
      Open
    </div>
  </template>

  <template #header>
    🖱
  </template>

  <template #default>
    <h1>Custom Content</h1>
    <p>Isi bebas</p>
  </template>
</BottomSheet>
-->

<template>
  <!-- trigger -->
  <div @click="toggle">
    <slot name="trigger">
      <div
          class="inline-block cursor-pointer px-[var(--x)] py-[var(--xxs)] font-medium
               bg-[var(--primary-color)] text-white rounded"
      >
        Trigger
      </div>
    </slot>
  </div>

  <!-- sheet -->
  <div
      class="fixed z-[999] left-1/2 -translate-x-1/2
           bg-surface
           h-[85dvh] w-[90dvw]
           border-t border-l border-r
           rounded-t-[var(--radius-m)]
           border-border
           overflow-hidden box-border
           transition-all duration-300 ease-in"
      :class="active ? 'bottom-0' : '-bottom-[86dvh]'"
  >
    <!-- header -->
    <div
        class="min-h-[8dvh] flex items-center justify-center cursor-pointer
             transition-all duration-300
             text-[length:var(--l)]
             hover:bg-[var(--transprimary-color)]
             hover:text-primary
             hover:scale-[1.07]"
        @click="toggle"
    >
      <slot name="header">
        🖱
      </slot>
    </div>

    <!-- content -->
    <div
        class="grid auto-rows-max max-h-[77dvh]
             overflow-x-hidden overflow-y-auto
             box-border
             py-[var(--m)] mx-[var(--m)]
             border-border
             border-t"
    >
      <slot />
    </div>
  </div>
</template>
