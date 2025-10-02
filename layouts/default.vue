<template>
  <div
    :dir="direction"
    class="layout-root min-h-screen bg-surface-light text-slate-900 transition-colors duration-300 dark:bg-surface-dark dark:text-slate-100"
  >
    <header ref="headerRef" class="layout-header">
      <HeaderBar @toggle-sidebar="toggleSidebar" />
    </header>

    <div class="layout-main">
            <transition :name="slideTransition">
            <SidebarNav
              v-if="isSidebarOpen"
              :is-mobile="!isDesktop"
              @toggle="toggleSidebar"
              :class="[
                'order-1 lg:sticky lg:top-[var(--header-offset)] lg:w-[360px] lg:self-start',
                sidebarOrderClass
              ]"
            />
          </transition>
      <div class="relative flex-1 bg-surface-light/40 py-6 dark:bg-surface-dark/60">
        <div class="layout-shell flex w-full flex-col gap-6 px-0 lg:flex-row lg:items-start lg:gap-8">
    

          <main
            :dir="direction"
            :class="[
              'order-2 flex-1 min-h-[400px] rounded-3xl bg-white/80 p-1 shadow-soft dark:bg-surface-dark/80',
              mainOrderClass
            ]"
          >
            <div class="rounded-[calc(theme(borderRadius.3xl)+0.5rem)] bg-transparent p-5 lg:p-8">
              <slot />
            </div>
          </main>
        </div>

        <transition name="fade">
          <div
            v-if="isSidebarOpen && !isDesktop"
            class="fixed inset-0 z-40 bg-black/60"
            @click="toggleSidebar"
          ></div>
        </transition>
      </div>
    </div>

    <footer ref="footerRef" class="layout-footer" :dir="direction">
      <div class="mx-auto w-full max-w-7xl px-4 pb-6 pt-4 lg:px-6">
        <BottomBar />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue'
import HeaderBar from '~/components/layout/HeaderBar.vue'
import SidebarNav from '~/components/layout/SidebarNav.vue'
import BottomBar from '~/components/layout/BottomBar.vue'

useTheme()

const { direction } = useLocaleDirection()

const headerRef = ref<HTMLElement | null>(null)
const footerRef = ref<HTMLElement | null>(null)
const isDesktop = ref(false)
const isSidebarOpen = ref(true)
const slideTransition = computed(() => (direction.value === 'ltr' ? 'slide-left' : 'slide-right'))
const mainOrderClass = computed(() => (direction.value === 'ltr' ? 'lg:order-2' : 'lg:order-1'))
const sidebarOrderClass = computed(() => (direction.value === 'ltr' ? 'lg:order-1' : 'lg:order-2'))

const setOffsets = () => {
  if (!import.meta.client) return
  const headerHeight = headerRef.value?.offsetHeight ?? 0
  const footerHeight = footerRef.value?.offsetHeight ?? 0
  document.documentElement.style.setProperty('--header-offset', `${headerHeight}px`)
  document.documentElement.style.setProperty('--footer-offset', `${footerHeight}px`)
}

const updateViewport = () => {
  if (!import.meta.client) return
  const desktop = window.innerWidth >= 1024
  isDesktop.value = desktop
  isSidebarOpen.value = desktop
}

const handleResize = () => {
  updateViewport()
  nextTick(() => setOffsets())
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

watch(direction, () => {
  nextTick(() => setOffsets())
})

onMounted(async () => {
  updateViewport()
  await nextTick()
  setOffsets()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
:global(:root) {
  --header-offset: 0px;
  --footer-offset: 0px;
}

.layout-root {
  padding-top: var(--header-offset);
  padding-bottom: var(--footer-offset);
}

.layout-header {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 60;
}

.layout-footer {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 50;
}

.layout-main {
  min-height: calc(100vh - 1px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
