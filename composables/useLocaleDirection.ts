import { computed, watch } from 'vue'

export const useLocaleDirection = () => {
  const { locale, locales, setLocale } = useI18n({ useScope: 'global' })

  const direction = computed(() =>
    locales.value.find((entry) => entry.code === locale.value)?.dir ?? 'rtl'
  )

  const applyDir = (dir: string) => {
    if (!import.meta.client) return
    document.documentElement.dir = dir
  }

  const applyLang = (code: string) => {
    if (!import.meta.client) return
    document.documentElement.lang = code
  }

  const initialized = useState('locale-direction-init', () => false)

  if (!initialized.value) {
    if (import.meta.client) {
      applyDir(direction.value)
      applyLang(locale.value)
    }

    watch(direction, (dir) => {
      applyDir(dir)
    })

    watch(locale, (code) => {
      applyLang(code)
    })

    initialized.value = true
  }

  return {
    locale,
    locales,
    direction,
    setLocale
  }
}
