<template>
  <footer
    class="mt-8 rounded-3xl bg-white/70 px-6 py-4 text-sm text-slate-600 shadow-soft backdrop-blur dark:bg-surface-dark/80 dark:text-slate-300"
  >
    <div
      class="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-right"
      dir="rtl"
    >
      <p>© {{ new Date().getFullYear() }} ??? ????. ???? ?????? ??????.</p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a href="#" class="transition hover:text-brand-600 dark:hover:text-brand-200">????? ????????</a>
        <a href="#" class="transition hover:text-brand-600 dark:hover:text-brand-200">?????? ????????</a>
        <a href="mailto:support@example.com" class="transition hover:text-brand-600 dark:hover:text-brand-200">????? ?????</a>
      </div>
    </div>
  </footer>
</template>