<script setup>
import {useRoute} from "vue-router";

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

// ✅ Data nav
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

const linkClass = 'p-[var(--xxs)_var(--m)] rounded-[var(--radius-s)] box-border hover:bg-primary hover:text-white'
const activeLinkClass = 'bg-primary text-white'
</script>

<template>
  <nav class="hidden items-center justify-between flex-wrap h-max gap-[var(--m)]
            fixed left-0 right-0 bottom-0 m-[var(--m)] p-[var(--xs)]
            bg-surface shadow-[var(--box-shadow)]
            border border-line
            rounded-[var(--radius-m)] z-[77] max-[800px]:flex">

    <template v-for="item in navItems" :key="item.text">

      <!-- ✅ Type: link -->
      <router-link
          v-if="item.type === 'link'"
          :to="item.to"
          :class="[linkClass, isActive(item.to) ? activeLinkClass : 'bg-transprimary']">
        {{ item.text }}
      </router-link>

      <!-- ✅ Type: dropdown -->
      <div v-else-if="item.type === 'dropdown'">
        <label :for="[`navigation-items-check-${item.text}`]"
               :class="[linkClass, item.links.some(l => isActive(l.to)) ? activeLinkClass : 'bg-transprimary']">
          {{ item.text }}
        </label>
        <input type="checkbox" class="hidden peer" :id="[`navigation-items-check-${item.text}`]">
        <div class="fixed inset-0 bg-transtext hidden z-[99] peer-checked:flex">
          <div class="grid m-auto bg-surface shadow-[var(--box-shadow)]
                    border border-line rounded-[var(--radius-m)]
                    min-w-[77dvw] max-w-[77dvw] min-h-[77dvh] max-h-[77dvh]
                    grid-cols-1 auto-rows-max gap-[var(--m)] place-items-center box-border
                    p-[var(--m)] overflow-auto">
            <label class="bg-danger text-end
                          min-w-[22px] max-w-[22px] min-h-[22px] max-h-[22px]
                          flex align-center justify-center font-['Medium',_sans-serif]
                          text-white rounded-full justify-self-end"
                   :for="[`navigation-items-check-${item.text}`]">&Cross;</label>
            <router-link
                v-for="child in item.links"
                :key="child.to"
                :to="child.to"
                :class="[linkClass, 'w-full', isActive(child.to) ? activeLinkClass : 'bg-transprimary']">
              {{ child.text }}
            </router-link>
          </div>
        </div>
      </div>

    </template>

  </nav>
</template>
