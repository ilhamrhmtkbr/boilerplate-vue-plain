<script setup>
/**
 * FormField — regular form field, full-featured
 *
 * Props:
 *   modelValue  — v-model value
 *   label       — label teks
 *   id          — id input (wajib)
 *   name        — name attribute
 *   type        — text | number | email | password | date | file | select | radio | checkbox | textarea
 *   error       — pesan error
 *   disabled    — disabled state
 *   placeholder — placeholder
 *   options     — Array<{ label: string, value: string }> → untuk select | radio | checkbox group
 *   rows        — jumlah baris textarea (default: 5)
 *   accept      — file accept attribute (contoh: 'image/*', '.pdf')
 *
 * NOTE: Pseudo-element styles (file upload button, autofill, date picker indicator)
 * taruh di global.css — lihat komentar di bawah.
 *
 * Contoh pakai:
 *
 *   <FormField v-model="form.name"    id="name"    label="Full Name" />
 *   <FormField v-model="form.role"    id="role"    label="Role"    type="select"   :options="roleOptions" />
 *   <FormField v-model="form.gender"  id="gender"  label="Gender"  type="radio"    :options="genderOptions" />
 *   <FormField v-model="form.hobbies" id="hobbies" label="Hobbies" type="checkbox" :options="hobbyOptions" />
 *   <FormField v-model="form.agree"   id="agree"   label="Setuju"  type="checkbox" />
 *   <FormField v-model="form.resume"  id="resume"  label="Resume"  type="file" accept=".pdf" />
 *   <FormField v-model="form.bio"     id="bio"     label="Bio"     type="textarea" :rows="4" />
 *   <FormField v-model="form.dob"     id="dob"     label="DOB"     type="date" />
 *
 * ─────────────────────────────────────────────────────────────────
 * Tambahkan ini ke global.css (tidak bisa pakai Tailwind):
 *
 * input::-webkit-file-upload-button {
 *   cursor: pointer;
 *   border: 1px solid var(--primary-color);
 *   color: var(--primary-color);
 *   background-color: var(--bg-color);
 *   padding: 7px var(--xs);
 *   min-width: 63px;
 *   border-radius: var(--radius-s);
 *   transition: .2s;
 *   font-family: Medium, ui-sans-serif;
 *   font-size: var(--s);
 * }
 * input::-webkit-file-upload-button:hover {
 *   color: var(--bg-color);
 *   background-color: var(--primary-color);
 * }
 * input:-webkit-autofill,
 * input:-webkit-autofill:hover,
 * input:-webkit-autofill:focus { background-color: var(--bg-color) !important; }
 *
 * input[type='date']::-webkit-calendar-picker-indicator { cursor: pointer; }
 * .dark-mode input[type='date']::-webkit-calendar-picker-indicator { filter: invert(1); }
 * ─────────────────────────────────────────────────────────────────
 */

const props = defineProps({
  modelValue:  { default: '' },
  label:       { type: String, required: true },
  id:          { type: String, required: true },
  name:        { type: String, default: '' },
  type:        { type: String, default: 'text' },
  error:       { type: String, default: '' },
  disabled:    { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  options:     { type: Array, default: () => [] }, // [{ label, value }]
  rows:        { type: Number, default: 5 },
  accept:      { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

// Base input classes — reused across semua tipe
const baseInput = 'text-[length:var(--m)] font-[inherit] w-full cursor-pointer bg-surface text-text border border-line p-[var(--s)] outline-none box-border h-max rounded-[var(--radius-s)] transition-colors duration-200 placeholder:text-link placeholder:italic disabled:bg-surface disabled:text-text'

const isCheckboxGroup = () => props.type === 'checkbox' && props.options.length > 0

function handleCheckboxGroup(value, event) {
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  if (event.target.checked) {
    emit('update:modelValue', [...current, value])
  } else {
    emit('update:modelValue', current.filter(v => v !== value))
  }
}
</script>

<template>
  <div class="grid gap-[var(--xxs)] w-full max-w-[500px]">

    <!-- Label (semua tipe kecuali radio & checkbox group yang punya label sendiri) -->
    <label
      v-if="type !== 'radio' && !isCheckboxGroup()"
      :for="id"
      class="capitalize font-medium text-[length:var(--s)] text-text"
    >
      {{ label }}
    </label>

    <!-- ── Text / Number / Email / Password ───────────── -->
    <input
      v-if="['text', 'number', 'email', 'password'].includes(type)"
      :id="id"
      :name="name || id"
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="[baseInput, error ? 'border-danger!' : '']"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- ── Date ───────────────────────────────────────── -->
    <input
      v-else-if="type === 'date'"
      :id="id"
      :name="name || id"
      type="date"
      :value="modelValue"
      :disabled="disabled"
      :class="[baseInput, 'cursor-auto max-[800px]:max-w-[57dvw]', error ? 'border-danger!' : '']"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- ── File ───────────────────────────────────────── -->
    <input
      v-else-if="type === 'file'"
      :id="id"
      :name="name || id"
      type="file"
      :accept="accept"
      :disabled="disabled"
      :class="[baseInput, error ? 'border-danger!' : '']"
      @change="$emit('update:modelValue', $event.target.files[0] ?? null)"
    />

    <!-- ── Select ─────────────────────────────────────── -->
    <select
      v-else-if="type === 'select'"
      :id="id"
      :name="name || id"
      :disabled="disabled"
      :value="modelValue"
      :class="[baseInput, error ? 'border-danger!' : '']"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>-- Pilih --</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>

    <!-- ── Textarea ───────────────────────────────────── -->
    <textarea
      v-else-if="type === 'textarea'"
      :id="id"
      :name="name || id"
      :disabled="disabled"
      :placeholder="placeholder"
      :rows="rows"
      :value="modelValue"
      :class="[baseInput, 'resize-none', error ? 'border-danger!' : '']"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- ── Radio group ────────────────────────────────── -->
    <div v-else-if="type === 'radio'" class="grid gap-[var(--xxs)]">
      <span class="capitalize font-medium text-[length:var(--s)] text-text">{{ label }}</span>
      <div class="flex flex-wrap gap-[var(--m)]">
        <label
          v-for="opt in options"
          :key="opt.value"
          class="flex items-center gap-[var(--xxs)] cursor-pointer text-[length:var(--s)] text-text"
        >
          <input
            type="radio"
            :name="name || id"
            :value="opt.value"
            :checked="modelValue === opt.value"
            :disabled="disabled"
            class="w-4 h-4 cursor-pointer accent-primary shrink-0"
            @change="$emit('update:modelValue', opt.value)"
          />
          {{ opt.label }}
        </label>
      </div>
    </div>

    <!-- ── Checkbox tunggal (boolean) ────────────────── -->
    <label
      v-else-if="type === 'checkbox' && !isCheckboxGroup()"
      :for="id"
      class="flex items-center gap-[var(--xxs)] cursor-pointer text-[length:var(--s)] text-text capitalize"
    >
      <input
        :id="id"
        type="checkbox"
        :name="name || id"
        :checked="modelValue"
        :disabled="disabled"
        class="w-4 h-4 cursor-pointer accent-primary shrink-0"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      {{ label }}
    </label>

    <!-- ── Checkbox group ─────────────────────────────── -->
    <div v-else-if="isCheckboxGroup()" class="grid gap-[var(--xxs)]">
      <span class="capitalize font-medium text-[length:var(--s)] text-text">{{ label }}</span>
      <div class="flex flex-wrap gap-[var(--m)]">
        <label
          v-for="opt in options"
          :key="opt.value"
          class="flex items-center gap-[var(--xxs)] cursor-pointer text-[length:var(--s)] text-text"
        >
          <input
            type="checkbox"
            :name="name || id"
            :value="opt.value"
            :checked="Array.isArray(modelValue) && modelValue.includes(opt.value)"
            :disabled="disabled"
            class="w-4 h-4 cursor-pointer accent-primary shrink-0"
            @change="handleCheckboxGroup(opt.value, $event)"
          />
          {{ opt.label }}
        </label>
      </div>
    </div>

    <!-- ── Error ──────────────────────────────────────── -->
    <p v-if="error" class="text-danger text-[length:var(--xs)] italic">
      {{ error }}
    </p>

  </div>
</template>
