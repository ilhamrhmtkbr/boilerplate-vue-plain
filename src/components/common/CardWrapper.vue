<script setup>
defineProps({
  replaceShadowWithBorder: {
    type: Boolean,
    default: false,
  },
})
</script>
<!--
CardWrapper — reusable card component

Props:
  replaceShadowWithBorder (Boolean) — ganti box-shadow jadi border outline

Slots:
  default   — konten utama card (bebas, fleksibel)
  actions   — tombol / link di bagian bawah (opsional)
  datetime  — timestamp / label waktu (opsional)

Contoh pakai:

<div class="grid grid-cols-[repeat(auto-fit,_minmax(325px,_1fr))] gap-[var(--x)_var(--l)] box-border max-[800px]:grid-cols-1">
 <CardWrapper replace-shadow-with-border>
     <div>
       <div class="text-[length:var(--x)] font-medium">Ilham Rahmat Akbar</div>
       <p>Fullstack Dev</p>
       <small class="text-[length:var(--s)] font-light text-link">Jakarta</small>
     </div>
     <template #actions>
       <a class="text-primary hover:font-medium hover:text-underline">Hire</a>
       <a class="text-success hover:font-medium hover:text-underline">Contact</a>
     </template>
     <template #datetime>
       <p class="text-link text-[length:var(--s)] font-light">5 min ago</p>
     </template>
   </CardWrapper>
</div>
-->

<template>
  <div
      class="box-border grid auto-rows-max gap-[var(--m)] p-[var(--l)] rounded-[var(--radius-m)] shadow-box"
      :class="replaceShadowWithBorder ? '' :'shadow-none [border:var(--border)]'"
  >

    <!-- Slot default: isi utama card -->
    <slot/>

    <!-- Slot actions: tombol / link aksi -->
    <div
        v-if="$slots.actions"
        class="flex items-center justify-end flex-wrap gap-[var(--m)] w-full text-[var(--s)] mt-[var(--xx)] [&>*]:cursor-pointer [&>*:hover]:underline"
    >
      <slot name="actions"/>
    </div>

    <!-- Slot datetime: timestamp / label waktu -->
    <p
        v-if="$slots.datetime"
        class="text-[var(--xs)] italic font-thin text-link"
    >
      <slot name="datetime"/>
    </p>

  </div>
</template>
