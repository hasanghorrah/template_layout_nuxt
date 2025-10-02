<template>
  <div ref="switcherRef" class="relative">
    <button
      type="button"
      class="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
      @click="toggleMenu"
    >
      <span>{{ currentLocale?.name }}</span>
      <span class="text-xs">⇆</span>
    </button>
    <transition name="fade">
      <ul
        v-if="isOpen"
        class="absolute end-0 mt-2 w-36 rounded-xl bg-white/95 py-2 text-slate-700 shadow-xl dark:bg-surface-dark/95 dark:text-slate-100"
      >
        <li
          v-for="entry in locales"
          :key="entry.code"
          class="px-4 py-2 text-sm transition hover:bg-brand-500/10 hover:text-brand-700 dark:hover:bg-brand-500/20 dark:hover:text-white"
        >
          <button type="button" class="w-full text-start" @click="switchTo(entry.code)">
            {{ entry.name }}
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useLocaleDirection()

const isOpen = ref(false)
const switcherRef = ref<HTMLElement | null>(null)

const currentLocale = computed(() => locales.value.find((entry) => entry.code === locale.value))

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const switchTo = async (code: string) => {
  await setLocale(code)
  isOpen.value = false
}

const handleDocumentClick = (event: MouseEvent) => {
  if (!switcherRef.value) return
  if (!switcherRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
