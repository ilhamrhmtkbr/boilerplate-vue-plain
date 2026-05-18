<script setup>
defineProps({
  text: {
    type: String,
    default: 'hello world'
  }
})
</script>

<template>
  <h1 class="capitalize text-[length:var(--x)] font-['Medium',_sans-serif]
           first-letter:bg-[var(--primary-color)]
           first-letter:text-white
           first-letter:p-[2px_var(--xxs)]
           first-letter:rounded-[var(--radius-s)]
           mb-[var(--m)]">
    {{ text }}
  </h1>
</template>
