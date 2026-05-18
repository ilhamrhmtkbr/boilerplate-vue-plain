<script setup>
/**
 * FormFieldset — input dengan style fieldset + legend
 * Hanya untuk: text | number | password | email
 *
 * Props:
 *   modelValue  — v-model value
 *   label       — teks legend
 *   type        — text | number | password | email (default: text)
 *   error       — pesan error
 *   disabled    — disabled state
 *   placeholder — placeholder input
 *
 * Contoh pakai:
 *
 *   <FormFieldset v-model="form.username" label="Username" :error="errors.username" />
 *   <FormFieldset v-model="form.password" label="Password" type="password" :error="errors.password" />
 */

defineProps({
  modelValue:  { type: [String, Number], default: '' },
  label:       { type: String, required: true },
  type:        { type: String, default: 'text' },
  error:       { type: String, default: '' },
  disabled:    { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="grid gap-[var(--xxs)]">

    <fieldset
      class="outline-none border-2 border-solid rounded-[var(--radius-m)] box-border w-full max-w-[325px] h-max pt-0 px-[var(--xxs)] pb-[6px] transition-colors duration-200"
      :class="error ? 'border-danger' : 'border-text'"
    >
      <legend class="ml-[var(--xxs)] px-[var(--xxs)] text-[length:var(--s)] font-medium text-text">
        {{ label }}
      </legend>

      <input
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        class="border-none outline-none pt-[1px] w-full text-[length:var(--m)] font-[inherit] bg-surface text-text placeholder:text-link placeholder:italic"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </fieldset>

    <p v-if="error" class="text-danger text-[length:var(--xs)] italic">
      {{ error }}
    </p>

  </div>
</template>
