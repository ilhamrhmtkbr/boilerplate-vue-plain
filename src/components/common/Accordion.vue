<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      {
        id: 1,
        title: "What is Lorem Ipsum?",
        subtitle: "Lorem Ipsum is simply dummy text.",
        content: "Lorem Ipsum has been the industry's standard..."
      },
      {
        id: 2,
        title: "Why do we use it?",
        subtitle: "It is a long established fact.",
        content: "It has roots in a piece of classical Latin literature..."
      }
    ]
  }
})
</script>

<!--
Usage:
<Accordion :items="[
  {
    id: 1,
    title: 'Title',
    subtitle: 'Subtitle',
    content: 'Content'
  }
]" />
-->

<template>
  <div class="space-y-4">
    <div
        v-for="item in items"
        :key="item.id"
        class="block p-[var(--m)] border-style-default rounded-[var(--radius-s)] max-w-[85dvw]"
    >
      <input
          type="checkbox"
          :id="'accordion-' + item.id"
          class="peer hidden"
      />

      <label
          :for="'accordion-' + item.id"
          class="grid cursor-pointer relative transition-all duration-300 text-[var(--m)]
               pb-0 border-b border-transparent
               peer-checked:pb-[var(--m)]
               peer-checked:border-line
               peer-checked:mb-[var(--m)]"
      >
        <div class="flex items-center justify-between">
          <p>{{ item.title }}</p>
          <span class="transition-transform duration-300 peer-checked:rotate-180">
            ▼
          </span>
        </div>

        <div class="text-[var(--s)] font-light">
          {{ item.subtitle }}
        </div>
      </label>

      <div
          class="max-h-0 overflow-hidden box-border pr-[var(--xxs)]
               transition-[max-height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
               peer-checked:max-h-[300px]
               peer-checked:overflow-y-auto"
      >
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>
