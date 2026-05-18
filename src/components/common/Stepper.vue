<script setup>
defineProps({
  steps: {
    type: Array,
    required: true,
    // Format: [{ label: 'Resume' }, { label: 'Email' }]
  },
  currentStep: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:currentStep'])

/** Cara Pakai
 * <Stepper
 *    :steps="[{label: 'Resume'}, {label: 'Email'}, {label: 'Salary'}]"
 *    v-model:currentStep="activeStep"
 * />
 */
</script>

<template>
  <div class="stepper flex items-center justify-start gap-x-[var(--m)] overflow-x-auto pb-[var(--xxs)] custom-scrollbar">
    <template v-for="(step, index) in steps" :key="index">

      <!-- Stepper Item -->
      <div class="flex items-center gap-x-[var(--xxs)]">
        <div
            @click="emit('update:currentStep', index + 1)"
            class="flex items-center justify-center min-w-[var(--xxxx)] min-h-[var(--xxxx)] max-w-[var(--xxxx)] max-h-[var(--xxxx)] rounded-full text-[length:var(--s)] font-medium cursor-pointer transition-colors"
            :class="[
            (currentStep === index + 1)
              ? 'bg-primary text-bg'
              : 'bg-link text-bg hover:bg-primary'
          ]"
        >
          {{ index + 1 }}
        </div>

        <div class="whitespace-nowrap font-medium">
          {{ step.label }}
        </div>
      </div>

      <!-- Divider (Muncul cuma di sela-sela item) -->
      <div
          v-if="index < steps.length - 1"
          class="h-[1px] min-w-[111px] bg-primary"
      ></div>

    </template>
  </div>
</template>

<style scoped>
/* Scrollbar sesuai CSS lu */
.custom-scrollbar::-webkit-scrollbar {
  height: 7px;
}
/* Opsional: kasih warna thumb biar keliatan pas scroll */
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--scrollthumb-color);
  border-radius: 10px;
}
</style>
