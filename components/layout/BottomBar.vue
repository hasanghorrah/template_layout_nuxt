<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 mx-auto mb-4 flex w-[min(480px,100%-1.5rem)] items-center justify-around rounded-3xl bg-[#142524]/95 px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur"
  >
    <button
      v-for="item in items"
      :key="item.label"
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-full text-xl text-slate-200 transition hover:scale-110 hover:text-white"
      :class="item.active ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg' : 'bg-transparent'"
    >
      <span class="sr-only">{{ item.label }}</span>
      <span aria-hidden="true">{{ item.icon }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
const items = [
  { label: 'بحث', icon: '🔍' },
  { label: 'طلبات', icon: '🛒' },
  { label: 'إشعارات', icon: '🔔' },
  { label: 'محفظة', icon: '💼' },
  { label: 'الرئيسية', icon: '🏠', active: true }
]
</script>
