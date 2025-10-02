<template>
  <header class="bg-[#165f56] text-white shadow-[0_20px_45px_rgba(0,0,0,0.25)]">
    <div
      class="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6"
    >
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl transition hover:bg-white/20"
          @click="$emit('toggleSidebar')"
        >
          ☰
        </button>
  
        <div class="hidden items-center gap-3 rounded-[999px] bg-white/10 px-4 py-2 text-sm lg:flex">
          <span>{{ t('header.balance') }}</span>
          <span class="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">USD 132.04</span>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3 text-sm">
       
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-white/20"
        >
          🔔
        </button>
        <LanguageSwitcher />
      </div>
    </div>
    <div class="bg-[#f4b919] text-slate-900">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 text-sm lg:px-6">
        <span>{{ t('header.reminder') }}</span>
        <button
          type="button"
          class="hidden rounded-full bg-slate-900/20 px-4 py-1 text-xs font-semibold text-slate-900 lg:block"
        >
          {{ t('header.details') }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })
</script>

