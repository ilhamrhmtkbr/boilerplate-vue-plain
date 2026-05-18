<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
    // Format: ['No', 'Title', 'Actions']
  },
  items: {
    type: Array,
    required: true
    // Format data disesuaikan dengan kebutuhan
  }
})

/** Cara Pakai
 * <Table
 *   :headers="['No', 'Title', 'Actions']"
 *   :items="dataList"
 * >
 *   <!-- Gunakan scoped slots untuk custom kolom -->
 *   <template #row="{ item, index }">
 *      <td class="text-center">{{ index + 1 }}.</td>
 *      <td class="fit whitespace-normal break-words min-w-[175px]">{{ item.title }}</td>
 *      <td class="flex items-center justify-around gap-[var(--s)]">
 *         <a class="text-primary hover:underline cursor-pointer font-medium uppercase text-[var(--s)]">Save</a>
 *         <div class="text-success hover:underline cursor-pointer font-medium uppercase text-[var(--s)]">Edit</div>
 *         <button class="text-warning hover:underline font-medium uppercase text-[var(--s)]">Delete</button>
 *      </td>
 *   </template>
 * </Table>
 */
</script>

<template>
  <div class="table-content max-w-full overflow-auto text-[var(--s)] custom-scrollbar">
    <table class="w-full whitespace-nowrap border-separate border-spacing-0">
      <thead>
      <tr>
        <th
            v-for="(header, i) in headers"
            :key="i"
            class="bg-sidebar border-y border-line min-h-[63px] h-[63px] px-[var(--xs)] vertical-middle font-bold
                   first:border-l first:rounded-l-[var(--radius-m)] text-center
                   last:border-r last:rounded-r-[var(--radius-m)]"
        >
          {{ header }}
        </th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="(item, index) in items"
          :key="index"
          class="even:bg-sidebar hover:bg-sidebar-hover transition-colors"
      >
        <!-- Slot ini biar isi TD-nya fleksibel tapi layout TR-nya tetep dari komponen -->
        <slot name="row" :item="item" :index="index"></slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Scrollbar sesuai CSS lu */
.custom-scrollbar::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

/* Selector khusus untuk TD hover yang warnanya beda sendiri */
td:hover {
  background-color: var(--transsecond-primary-color);
}

/* Karena td action lu pake selector :hover { underline } */
td.action :hover {
  text-decoration: underline;
}
</style>
