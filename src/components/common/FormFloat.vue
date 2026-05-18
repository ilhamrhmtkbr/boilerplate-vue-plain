<script setup>
/**
 * FormFloat — input dengan floating label style (like Google)
 * Hanya untuk: text | number | password | email
 *
 * Props:
 *   modelValue — v-model value
 *   label      — teks floating label
 *   id         — id input (wajib)
 *   type       — text | number | password | email (default: text)
 *   error      — pesan error
 *   disabled   — disabled state
 *
 * Trik Tailwind: pakai `peer` di input, lalu `peer-focus:` dan
 * `peer-[:not(:placeholder-shown)]:` di label — pengganti CSS sibling selector (+)
 *
 * Contoh pakai:
 *
 *   <FormFloat v-model="form.email" id="email" label="Email" :error="errors.email" />
 *   <FormFloat v-model="form.password" id="password" label="Password" type="password" />
 */

defineProps({
  modelValue: { type: [String, Number], default: '' },
  label:      { type: String, required: true },
  id:         { type: String, required: true },
  type:       { type: String, default: 'text' },
  error:      { type: String, default: '' },
  disabled:   { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="grid gap-[var(--xxs)]">

    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        placeholder=" "
        class="peer w-full text-[length:var(--m)] font-[inherit] bg-surface text-text border-2 border-line p-[var(--s)] outline-none box-border rounded-[var(--radius-s)] transition-colors duration-200 focus:border-primary disabled:bg-surface disabled:text-text"
        :class="error ? 'border-danger!' : ''"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <!--
        Label pakai peer-* untuk animasi floating.
        peer-focus            → saat input difokus
        peer-[:not(:placeholder-shown)] → saat input sudah ada value
      -->
      <label
        :for="id"
        class="absolute left-[var(--m)] top-1/2 -translate-y-1/2 text-[length:var(--m)] text-link pointer-events-none transition-all duration-200
               peer-focus:top-0 peer-focus:text-[length:var(--s)] peer-focus:bg-surface peer-focus:text-primary peer-focus:px-1 peer-focus:-translate-y-1/2
               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[length:var(--s)] peer-[:not(:placeholder-shown)]:bg-surface peer-[:not(:placeholder-shown)]:text-link peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:-translate-y-1/2"
      >
        {{ label }}
      </label>
    </div>

    <p v-if="error" class="text-danger text-[length:var(--xs)] italic">
      {{ error }}
    </p>

  </div>
</template>
