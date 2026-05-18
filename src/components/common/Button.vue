<script setup>
defineProps({
  text: {
    type: String,
    default: 'Submit'
  },
  variant: {
    type: String,
    default: 'primary' // primary | warning | success | danger
  },
  type: {
    type: String,
    default: 'solid' // solid | outline | badge
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<!--
Usage:
<Button text="Click" />
<Button text="Delete" variant="danger" />
<Button text="Outline" variant="primary" type="outline" />
<Button text="Badge" variant="success" type="badge" />
<Button text="Loading" :loading="true" />
<Button text="Disabled" :disabled="true" />
-->

<template>
  <button
      :disabled="disabled || loading"
      class="cursor-pointer border-none outline-none flex items-center justify-center gap-2
           px-[var(--m)] py-[calc(var(--m)/2)]
           min-w-[77px] w-max rounded-[var(--radius-s)]
           text-[length:var(--s)] font-medium
           transition-all duration-200 dark:text-white
           disabled:opacity-50 disabled:cursor-not-allowed"
      :class="[
      // SOLID
      type === 'solid' && variant === 'primary' ? 'bg-primary text-bg hover:ring-4 hover:ring-transprimary' : '',
      type === 'solid' && variant === 'warning' ? 'bg-warning text-bg hover:ring-4 hover:ring-transwarning' : '',
      type === 'solid' && variant === 'success' ? 'bg-success text-bg hover:ring-4 hover:ring-transsuccess' : '',
      type === 'solid' && variant === 'danger' ? 'bg-danger text-bg hover:ring-4 hover:ring-transdanger' : '',

      // OUTLINE
      type === 'outline' && variant === 'primary' ? 'border text-primary border border-solid border-line hover:border-primary hover:ring-4 hover:ring-transprimary' : '',
      type === 'outline' && variant === 'warning' ? 'border text-warning border border-solid border-line hover:border-warning hover:ring-4 hover:ring-transwarning' : '',
      type === 'outline' && variant === 'success' ? 'border text-success border border-solid border-line hover:border-success hover:ring-4 hover:ring-transsuccess' : '',
      type === 'outline' && variant === 'danger' ? 'border text-danger border border-solid border-line hover:border-danger hover:ring-4 hover:ring-transdanger' : '',

      // BADGE
      type === 'badge' && variant === 'primary' ? 'bg-transprimary text-primary rounded-full hover:bg-primary hover:text-bg' : '',
      type === 'badge' && variant === 'warning' ? 'bg-transwarning text-warning rounded-full hover:bg-warning hover:text-bg' : '',
      type === 'badge' && variant === 'success' ? 'bg-transsuccess text-success rounded-full hover:bg-success hover:text-bg' : '',
      type === 'badge' && variant === 'danger' ? 'bg-transdanger text-danger rounded-full hover:bg-danger hover:text-bg' : ''
    ]"
  >
    <!-- loading spinner -->
    <svg
        v-if="loading"
        class="animate-spin h-4 w-4"
        viewBox="0 0 24 24"
    >
      <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
      />
      <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>

    <span v-if="!loading">
      {{ text }}
    </span>
  </button>
</template>
