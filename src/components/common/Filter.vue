<template>
  <!-- Tombol Trigger -->
  <div
      @click="showModal = true"
      class="cursor-pointer group outline-none flex items-center justify-center gap-x-4 py-[calc(var(--m)/2)] px-[var(--m)] h-max min-w-[77px] w-max rounded-[var(--radius-s)] text-[length:var(--s)] border border-solid border-line hover:outline-4 hover:outline-solid hover:outline-transprimary hover:border hover:border-solid hover:border-primary hover:text-primary"
  >
    <svg
        class="max-w-[var(--l)] max-h-[var(--l)] fill-text group-hover:fill-primary"
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="800"
        viewBox="0 0 24 24"
    >
      <path
          fill-rule="evenodd"
          d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v1.172a3 3 0 0 1-.879 2.121l-5.828 5.828a1 1 0 0 0-.293.707v2.343a3 3 0 0 1-.879 2.121l-2.202 2.202C10.842 22.572 9 21.809 9 20.286v-5.457a1 1 0 0 0-.293-.707L2.879 8.293A3 3 0 0 1 2 6.172V5z"
      />
    </svg>
    <span class="capitalize font-medium text-[length:var(--s)]">
      {{ value ? formatText(value) : title }}
    </span>
  </div>

  <!-- Modal Component -->
  <Modal
      :isOpen="showModal"
      :title="title"
      @close="showModal = false"
  >
    <!-- Grid layout untuk item filter -->
    <div class="grid grid-cols-1 gap-2 w-full">
      <div
          v-for="(item, key) in filters"
          :key="key"
          @click="selectItem(item)"
          :class="[
          'cursor-pointer font-[\'Medium\',_ui-sans-serif] bg-translink py-[calc(var(--m)/2)] px-[var(--m)] h-max min-w-[77px] rounded-[var(--radius-s)] text-[length:var(--s)] border-2 border-solid transition-colors',
          getValue(item) === value
            ? 'border-primary text-primary'
            : 'border-transparent text-link hover:border-primary hover:text-primary'
        ]"
      >
        {{ getLabel(item) }}
      </div>
    </div>

    <template #footer>
      <p>Filter</p>
    </template>
  </Modal>
</template>

<!--Cara Pakai : <Filter title="Sort By" :filters="['Ascending', 'Descending']" value="asc"/>-->

<script setup>
import {ref} from 'vue'
import Modal from './Modal.vue'
import {removeUnderscoreAndCapitalize} from "../utils/formatText.js";

const props = defineProps({
  title: {
    type: String,
    default: 'Sort By'
  },
  filters: {
    type: Array,
    default: () => []
  },
  value: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits(['update:value', 'change'])

const showModal = ref(false)

// Helpers
const getValue = (item) => (typeof item === 'object' ? item.value : item)
const getLabel = (item) => (typeof item === 'object' ? item.label : item)
const formatText = (val) => removeUnderscoreAndCapitalize(val)

function selectItem(item) {
  const val = getValue(item)
  // Emit ke parent
  emit('update:value', val)
  emit('change', val)

  // Tutup modal
  showModal.value = false
}
</script>
