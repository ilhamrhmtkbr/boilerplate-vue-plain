<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";

const props = defineProps({
  isSidebarCollapsed: Boolean,
  showSidebar: Boolean,
  navItems: Array
})

const emit = defineEmits(['toggle'])

const toggleSidebar = () => {
  emit('toggle')
}

// ✅ Data sidebar, tinggal di sesuaikan aja di parent/App Layout
// const navItems = [
//   { type: 'link', to: '/profile', svg: 'profile', text: 'Profile' },
//   { type: 'link', to: '/dashboard', svg: 'dashboard', text: 'Dashboard' },
//   {
//     type: 'sublinks', svg: 'courses', text: 'Courses',
//     links: [
//       { to: '/courses/progress', svg: 'progress', text: 'Progress' },
//       { to: '/courses/sections', svg: 'sections', text: 'Sections' },
//     ]
//   },
//   {
//     type: 'sublinks', svg: 'dimen', text: 'Elements',
//     links: [
//       { to: '/elements/item3', text: 'Item 3' },
//       { to: '/elements/item4', text: 'Item 4' },
//     ]
//   },
// ]

const sidebarWidth = computed(() =>
    props.isSidebarCollapsed ? 'w-[var(--width-sidebar-collapse)]' : 'w-[var(--width-sidebar-expanded)] max-[800px]:w-[95dvw]'
)

const showSidebarClass = computed(() =>
    props.showSidebar ? 'max-[800px]:left-[0]' : 'max-[800px]:left-[-275px]'
)

const route = useRoute()

const sidebarLinkActive = (to) => {
  return route?.path.includes(to) ? 'text-secondary font-medium bg-transbg' : ''
}

const sidebarLinkActiveSvg = (to) => {
  return route?.path.includes(to) ? 'fill-secondary' : ''
}

const isSublinksActive = (links) => {
  return links.some(link => route?.path.includes(link.to))
}

const sidebarTooltip = computed(() =>
    `after:content-[attr(data-title)]
    after:invisible after:opacity-0
    after:bg-surface after:text-text
    after:rounded-[var(--radius-l)]
    after:px-[var(--x)] after:py-[var(--xxx)]
    after:fixed after:z-[999]
    after:whitespace-nowrap
    after:text-[var(--xx)]
    after:left-1/2 after:top-[20dvh]
    after:-translate-x-1/2
    after:transition-[opacity,visibility] after:duration-300
    after:shadow-[var(--box-shadow)]
    after:border-[var(--border)]
    after:font-[Medium,ui-sans-serif]
    ${props.isSidebarCollapsed ? 'hover:after:visible hover:after:opacity-100' : ''}`
)

const linkClass = `flex items-center gap-[var(--m)] h-max
  rounded-[var(--radius-m)] cursor-pointer box-border border border-transparent group
  hover:font-medium hover:bg-transbg`

const sublinkClass = `flex items-center gap-[var(--m)] h-max
  rounded-[var(--radius-m)] cursor-pointer box-border border border-transparent group
  hover:font-medium hover:bg-transbg`
</script>

<template>
  <aside :class="[`bg-sidebar fixed m-[var(--m)] p-[var(--m)] rounded-[var(--radius-m)]
                box-border h-[97dvh] grid grid-cols-1 grid-rows-[max-content_1fr_max-content]
                transition-all duration-300 z-[99]`, sidebarWidth, showSidebarClass]">

    <!-- Header -->
    <div class="flex items-center gap-[var(--m)] border-b border-line pb-[var(--m)]">
      <div class="p-[var(--xxs)] bg-white rounded-full">
        <img class="max-w-[20px] max-h-[20px] min-w-[20px] min-h-[20px] object-contain" alt="logo" src="/iamra-logo.svg">
      </div>
      <div :class="['font-bold text-[var(--l)]', props.isSidebarCollapsed ? 'hidden' : '']">Iamra</div>
    </div>

    <!-- Nav Items -->
    <div class="h-[95%] overflow-y-auto overflow-x-hidden pr-[var(--xxs)]
                my-[var(--m)] box-border [&::-webkit-scrollbar]:w-[7px_!important]
                grid grid-cols-1 gap-[var(--xxs)] auto-rows-max">

      <template v-for="item in props.navItems" :key="item.text">

        <!-- ✅ Type: link -->
        <router-link
            v-if="item.type === 'link'"
            :to="item.to"
            :class="[linkClass, sidebarLinkActive(item.to), sidebarTooltip, props.isSidebarCollapsed ? 'p-[var(--xxs)_0] justify-center hover:bg-transparent': 'px-[var(--m)] py-[var(--xs)]']"
            :data-title="item.text"
        >
          <svg :class="['max-w-[var(--l)] max-h-[var(--l)] fill-scrollthumb group-hover:fill-secondary', sidebarLinkActiveSvg(item.to)]">
            <use :href="`/sprite.svg#${item.svg}`"></use>
          </svg>
          <span :class="['group-hover:text-secondary', props.isSidebarCollapsed ? 'hidden' : '']">{{ item.text }}</span>
        </router-link>

        <!-- ✅ Type: sublinks -->
        <details
            v-else-if="item.type === 'sublinks'"
            class="rounded-[var(--radius-m)] open:bg-sidebar-hover"
            :open="isSublinksActive(item.links)"
        >
          <summary
              :class="[linkClass, sidebarLinkActive(item.to), sidebarTooltip, props.isSidebarCollapsed ? 'p-[var(--xxs)_0] justify-center hover:bg-transparent': 'px-[var(--m)] py-[var(--xs)]']"
              :data-title="item.text"
          >
            <svg :class="['max-w-[var(--l)] max-h-[var(--l)] fill-scrollthumb group-hover:fill-secondary', sidebarLinkActiveSvg(item.to)]">
              <use :href="`/sprite.svg#${item.svg}`"></use>
            </svg>
            <span :class="['group-hover:text-secondary', props.isSidebarCollapsed ? 'hidden' : '']">{{ item.text }}</span>
          </summary>

          <div>
            <router-link
                v-for="child in item.links"
                :key="child.to"
                :to="child.to"
                :class="[sublinkClass, sidebarLinkActive(child.to), sidebarTooltip, props.isSidebarCollapsed ? 'p-[var(--xxs)_0] justify-center hover:bg-transparent' : 'px-[var(--m)] py-[var(--xs)] pl-[calc(var(--l)*2+var(--s))]']"
                :data-title="child.text"
            >
              <svg :class="['max-w-[var(--l)] max-h-[var(--l)] fill-scrollthumb group-hover:fill-secondary', sidebarLinkActiveSvg(item.to)]">
                <use :href="`/sprite.svg#${child.svg}`"></use>
              </svg>
              <span :class="['group-hover:text-secondary', props.isSidebarCollapsed ? 'hidden' : '']">{{ child.text }}</span>
            </router-link>
          </div>
        </details>

      </template>
    </div>

    <!-- Toggle Button -->
    <div :class="[linkClass, 'px-[var(--m)] py-[var(--xs)]']" @click="toggleSidebar()">
      <svg class="max-w-[var(--l)] max-h-[var(--l)] fill-scrollthumb group-hover:fill-secondary" xmlns="http://www.w3.org/2000/svg" width="35.52" height="35.52"
           viewBox="0 0 20 20" shape-rendering="geometricPrecision" image-rendering="optimizeQuality"
           fill-rule="evenodd">
        <path d="M10 0h9s1 1 1 2v17l-1 1h-9l-1-1V2c0-1 1-2 1-2zm8 14v2 1h-1l-2-1v-1l2-1c0-1 0-1 1-1v1z"/>
        <rect width="7.211" height="20.232" rx="2" ry="4"/>
      </svg>
      <span :class="['group-hover:text-secondary', props.isSidebarCollapsed ? 'hidden' : '']">Hide</span>
    </div>

  </aside>
</template>

<style>

</style>
