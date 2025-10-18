<template>
  <header class="bg-white text-slate-900 border-b border-slate-200 shadow-soft dark:bg-[#165f56] dark:text-white dark:border-transparent">
    <div
      class="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 lg:gap-3 lg:px-6 lg:py-4"
    >
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          class="flex h-12 w-12 items-center justify-center rounded-full text-2xl transition bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
          @click="$emit('toggleSidebar')"
        >
        ☰
        </button>
        <NuxtLink to="/" class="inline-flex items-center gap-2 select-none" aria-label="Home">
          <img src="/logo.png" alt="Logo" class="h-8 w-auto" />
        </NuxtLink>

      </div>

      <div class="flex items-center gap-2 text-sm flex-nowrap whitespace-nowrap shrink-0">
        
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full text-xl transition bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white md:h-11 md:w-11"
        >
         🔔
        </button>
        <LanguageSwitcher />
      </div>
    </div>
    <!-- Reminder banner removed per request -->
  </header>
  
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })
</script>
