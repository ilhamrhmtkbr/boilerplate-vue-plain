<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const toggle = (event) => {
  emit('update:modelValue', event.target.checked)
}
</script>

<template>
  <div class="flex items-center justify-start gap-[var(--m)]">
    <label
        class="relative inline-block w-[63px] h-[33px] rounded-[33px] cursor-pointer transition-all duration-300 border border-line hover:scale-[1.02] hover:border-primary
             shadow-[inset_3px_3px_6px_0_rgb(204,219,232),inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5)]
             dark:shadow-[inset_3px_3px_6px_0_rgba(0,0,0,0.5),inset_-3px_-3px_6px_1px_rgba(255,255,255,0.1)]"
    >
      <input
          type="checkbox"
          class="hidden peer"
          :checked="modelValue"
          @change="toggle"
      >

      <!-- Slider -->
      <span
          class="flex items-center justify-center bg-sidebar transition-all duration-300 ease-in-out rounded-[33px] w-[25px] h-[25px] absolute left-[3px] top-1/2 -translate-y-1/2 border border-line shadow-[0_4px_8px_-2px_rgba(9,30,66,0.25),0_0_0_1px_rgba(9,30,66,0.08)]
               peer-checked:left-[34px]"
      >
      </span>
    </label>

    <!-- Status Label -->
    <span v-if="label" class="text-[16px] font-medium min-w-[60px] text-text">
      {{ label }}
    </span>
  </div>
</template>
