<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})

/** Cara Pakai
 * <Tooltip text="Java">
 *    <p class="cursor-pointer">Java</p>
 * </Tooltip>
 */
</script>

<template>
  <div
      class="relative inline-block group"
      :data-tooltip="text"
  >
    <!-- Element aslinya (Java, Elixir, dll) -->
    <slot />

    <!-- Tooltip Element -->
    <div class="
      invisible group-hover:visible
      absolute z-[111] left-0
      bottom-[-2.5rem] md:bottom-[-2.2rem]
      bg-text text-bg
      py-[7px] px-[11px]
      rounded-[5px] text-[var(--xs)] font-medium
      whitespace-nowrap transition-all duration-200
    ">
      {{ text }}
    </div>
  </div>
</template>
