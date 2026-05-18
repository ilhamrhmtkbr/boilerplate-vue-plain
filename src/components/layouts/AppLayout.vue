<script setup>
import {computed, ref} from "vue";

import BottomNav from "./components/BottomNav.vue";
import ContentHeader from "./components/ContentHeader.vue";
import Sidebar from "./components/Sidebar.vue";
import ContentFooter from "./components/ContentFooter.vue";
import ContentSection from "./components/ContentSection.vue";

const isSidebarCollapsed = ref(false)
const showSidebar = ref(true)

const containerPadLeft = computed(() => {
  if (showSidebar.value) {
    if (isSidebarCollapsed.value) {
      return 'p-[var(--m)_var(--m)_var(--m)_calc(var(--width-sidebar-collapse)+var(--m)*2)]'
    } else {
      return 'pl-[calc(var(--width-sidebar-expanded)+var(--m)*2)] max-[800px]:pl-[var(--m)]'
    }
  } else {
    return 'pl-[var(--m)]'
  }
})
</script>

<template>
  <BottomNav/>
  <Sidebar :isSidebarCollapsed="isSidebarCollapsed" @toggle="isSidebarCollapsed = !isSidebarCollapsed" :showSidebar="showSidebar"/>
  <main :class="[`transition-all duration-300 w-full max-w-[1920px] box-border
                min-h-[100dvh] mx-auto pr-[var(--m)] pt-[var(--m)] pb-[var(--m)]`, containerPadLeft]">
    <ContentHeader @toggle-show="showSidebar = !showSidebar"/>
    <ContentSection>
      <RouterView />
    </ContentSection>
    <ContentFooter />
  </main>
</template>
