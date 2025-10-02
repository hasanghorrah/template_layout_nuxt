import { useState } from '#app'
import { onMounted, watch } from 'vue'

type Theme = 'light' | 'dark'

export const useTheme = () => {
  const theme = useState<Theme>('app-theme', () => 'dark')

  const applyTheme = (value: Theme) => {
    if (!import.meta.client) {
      return
    }

    const root = document.documentElement
    root.classList.toggle('dark', value === 'dark')
    root.dataset.theme = value
    root.style.colorScheme = value
    localStorage.setItem('app-theme', value)
  }

  if (import.meta.client) {
    onMounted(() => {
      const stored = localStorage.getItem('app-theme') as Theme | null
      if (stored) {
        theme.value = stored
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.value = 'dark'
      }
      applyTheme(theme.value)
    })

    watch(theme, (value) => {
      applyTheme(value)
    })
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    toggleTheme
  }
}