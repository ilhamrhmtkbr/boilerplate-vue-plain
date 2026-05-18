<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";

const showSidebar = ref(false)

const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark")
}

const emit = defineEmits(['toggle-show'])
const showMenu = () => {
  showSidebar.value = !showSidebar.value
  emit('toggle-show')
}

const route = useRoute()
const isActive = (path) => {
  if (route?.fullPath === '/' && path === '/') {
    return true
  } else {
    if (path === '/') {
      return false
    } else {
      return route?.fullPath?.includes(path)
    }
  }
}

// ✅ Data nav di sini
const navItems = [
  { type: 'link', to: '/', text: 'Components' },
  { type: 'link', to: '/auth/login', text: 'Login' },
  {
    type: 'dropdown', text: 'Admin',
    links: [
      { to: '/admin/dashboard', text: 'Dashboard' },
      { to: '/admin/profile', text: 'Profile' },
      { to: '/admin/product', text: 'Product' },
    ]
  },
]

const spanClass = `relative before:content-[''] before:absolute before:w-0 before:h-[3px]
  before:bottom-0 before:left-1/2 before:-translate-x-1/2
  before:rounded-[4px] before:bg-primary
  before:transition-[width,left] before:duration-300 before:ease-in-out
  group-hover:before:w-full`
</script>

<template>
  <header class="sticky top-[var(--m)] box-border
                  min-h-[var(--height-container-header)] max-h-[var(--height-container-header)]
                  bg-sidebar backdrop-blur-sm flex items-center justify-between
                  px-[var(--m)] rounded-[var(--radius-m)]">

    <div class="cursor-pointer text-link hover:underline" @click="toggleDarkMode()">Dark Mode</div>

    <!-- Nav Desktop -->
    <div class="flex items-center gap-[var(--m)] h-[var(--height-container-header)] max-[800px]:hidden">

      <template v-for="item in navItems" :key="item.text">

        <!-- ✅ Type: link -->
        <router-link v-if="item.type === 'link'"
           :to="item.to"
           :class="['relative cursor-pointer flex items-center h-[var(--height-container-header)] group']">
          <span :class="[spanClass, isActive(item.to) ? 'before:w-full' : '']">{{ item.text }}</span>
        </router-link>

        <!-- ✅ Type: dropdown -->
        <div v-else-if="item.type === 'dropdown'" class="relative group/menu">
          <div class="relative cursor-pointer flex items-center h-[var(--height-container-header)]">
            {{ item.text }}
          </div>
          <div class="hidden absolute bg-surface
                      shadow-[var(--box-shadow)] rounded-[var(--radius-m)]
                      border border-line
                      top-[var(--height-container-header)] right-0
                      box-border p-[var(--m)] group-hover/menu:block">
            <router-link v-for="child in item.links" :key="child.to"
               :to="child.to"
               :class="['relative cursor-pointer flex items-center group/item h-max p-[var(--xxs)_0]']">
              <span :class="[spanClass.replace('group-hover:before:w-full', 'group-hover/item:before:w-full'), isActive(child.to) ? 'before:w-full' : '']">
                {{ child.text }}
              </span>
            </router-link>
          </div>
        </div>

      </template>
    </div>

    <!-- Hamburger -->
    <div class='bg-transparent border-0 cursor-pointer p-0 hidden max-[800px]:block' @click="showMenu()">
      <svg id='get-menu' viewBox="0 0 100 100" class="min-w-[31px] min-h-[31px] max-w-[31px] max-h-[31px]">
        <path
            :class="['fill-none stroke-text stroke-[8] transition-[stroke-dasharray,stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] [stroke-dasharray:60_207]', !showSidebar ? '[stroke-dasharray:90_207] [stroke-dashoffset:-134]': '']"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
        <path
            :class="['fill-none stroke-text stroke-[8] transition-[stroke-dasharray,stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] [stroke-dasharray:60_60]', !showSidebar ? '[stroke-dasharray:1_60] [stroke-dashoffset:-60]': '']"
            d="M 20,50 H 80"/>
        <path
            :class="['fill-none stroke-text stroke-[8] transition-[stroke-dasharray,stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] [stroke-dasharray:60_207]', !showSidebar ? '[stroke-dasharray:90_207] [stroke-dashoffset:-134]': '']"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
      </svg>
    </div>

  </header>
</template>
