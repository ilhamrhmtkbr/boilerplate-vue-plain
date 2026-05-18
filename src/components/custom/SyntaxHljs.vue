<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.min.css'

const props = defineProps({
  code: String,
  language: {
    type: String,
    default: 'html'
  }
})

const el = ref(null)
const activeTab = ref('preview') // 'preview' | 'code'
const copied = ref(false)

const highlight = async () => {
  await nextTick()
  if (el.value) {
    el.value.removeAttribute('data-highlighted') // reset biar bisa re-highlight
    hljs.highlightElement(el.value)
  }
}

const copyCode = async () => {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

onMounted(highlight)
watch(() => props.code, highlight)
watch(activeTab, (val) => {
  if (val === 'code') highlight()
})
</script>

<template>
  <div class="rounded-[var(--radius-m)] border border-line overflow-hidden mb-[var(--m)]">

    <!-- Header: Tabs + Copy Button -->
    <div class="flex items-center justify-between px-[var(--m)] py-2 bg-sidebar border-b border-line">
      <div class="flex gap-1">
        <button
            @click="activeTab = 'preview'"
            :class="[
            'px-3 py-1 text-sm rounded-md transition-all cursor-pointer',
            activeTab === 'preview'
              ? 'bg-surface shadow-sm font-medium text-primary'
              : 'text-link hover:text-primary hover:bg-surface hover:shadow-sm hover:font-medium'
          ]"
        >
          Preview
        </button>
        <button
            @click="activeTab = 'code'"
            :class="[
            'px-3 py-1 text-sm rounded-md transition-all cursor-pointer',
            activeTab === 'code'
              ? 'bg-surface shadow-sm font-medium text-primary'
              : 'text-link hover:text-primary hover:bg-surface hover:shadow-sm hover:font-medium'
          ]"
        >
          Code
        </button>
      </div>

      <!-- Copy Button (hanya muncul di tab Code) -->
      <button
          v-if="activeTab === 'code'"
          @click="copyCode"
          class="flex items-center gap-1.5 px-3 py-1 text-xs rounded-md border transition-all cursor-pointer"
          :class="copied
          ? 'bg-green-50 border-green-300 text-green-600'
          : 'bg-surface border-line text-link hover:text-primary'
        "
      >
        <!-- Icon Copy -->
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <!-- Icon Check -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <!-- Tab: Preview -->
    <div v-if="activeTab === 'preview'" class="p-[var(--m)]">
      <slot>
        <span class="text-sm text-link">No preview slot provided.</span>
      </slot>
    </div>

    <!-- Tab: Code -->
    <div v-if="activeTab === 'code'" class="overflow-auto max-h-[500px]">
      <pre class="!m-0 !rounded-none"><code :class="'language-' + language" ref="el">{{ code }}</code></pre>
    </div>

  </div>
</template>