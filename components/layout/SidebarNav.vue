<template>
  <aside
    :dir="direction"
    :class="[
      'flex h-full w-full max-w-sm flex-col gap-6 rounded-3xl bg-[#102322]/95 px-6  text-slate-100 shadow-[0_35px_60px_rgba(0,0,0,0.45)] backdrop-blur transition-transform duration-300',
      isMobile ? mobilePositionClass : 'lg:max-w-none'
    ]"
  >
    <div class="flex items-center justify-between" v-if="isMobile">
      <span class="text-sm font-semibold text-brand-100">{{ t('sidebar.menu') }}</span>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/20"
        @click="$emit('toggle')"
      >
        ✕
      </button>
    </div>

    <div class="flex flex-col items-center gap-5 rounded-3xl bg-[#112c28] p-6 text-center shadow-[0_25px_50px_rgba(0,0,0,0.35)]">
      <div class="h-24 w-24 overflow-hidden rounded-full border-4 border-brand-400/70 shadow-card">
        <img
          src="https://i.pravatar.cc/150?img=64"
          alt="User avatar"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="flex flex-col items-center gap-2">
        <div class="flex items-center gap-2 text-xs text-slate-300">
          <span>{{ t('sidebar.badges.id', { id: '#' + userId }) }}</span>
          <span class="rounded-full bg-amber-400/80 px-3 py-1 font-bold text-slate-900">{{ t('sidebar.badges.vip') }}</span>
        </div>
        <p class="text-xl font-semibold">{{ displayName }}</p>
        <span class="text-sm font-bold text-emerald-400">USD 132.04</span>
      </div>
      <div class="flex w-full items-center justify-around text-lg text-brand-100">
        <button
          v-for="action in quickActions"
          :key="action"
          type="button"
          class="rounded-full bg-white/10 p-3 transition hover:bg-white/20"
        >
          {{ action }}
        </button>
      </div>
    </div>

    <nav class="space-y-3">
      <button
        v-for="item in navItems"
        :key="item.key"
        type="button"
        class="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#152f2b]/80 px-5 py-4 text-sm font-semibold text-slate-200 transition hover:border-brand-400/80 hover:bg-brand-500/20 hover:text-white"
        :class="item.active ? 'border-brand-500 bg-brand-500/90 text-white shadow-[0_25px_45px_rgba(37,159,139,0.45)]' : ''"
      >
        <span class="flex items-center gap-4">
          <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1b3a35] text-lg text-brand-100 group-hover:bg-brand-400 group-hover:text-white">
            {{ item.icon }}
          </span>
          {{ item.label }}
        </span>
        <span class="text-xl font-bold text-brand-200 group-hover:text-white">‹</span>
      </button>
    </nav>

    <div class="mt-auto space-y-4">
      <button
        v-if="isLoggedIn"
        type="button"
        class="flex items-center justify-between rounded-2xl bg-red-500/20 px-5 py-4 text-sm font-semibold text-red-200 transition hover:bg-red-500/35 hover:text-white"
        @click="logout"
      >
        <span class="flex items-center gap-3">
          <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/30 text-lg text-red-100">X</span>
          تسجيل الخروج
        </span>
        <span class="text-xl font-bold text-red-200"></span>
      </button>
      <button
        type="button"
        class="flex items-center justify-between rounded-2xl bg-[#152f2b]/80 px-5 py-4 text-sm font-semibold"
        @click="toggleTheme"
      >
        <div>
          <p>{{ t('sidebar.themeToggle') }}</p>
          <span class="text-xs font-normal text-slate-400">{{ t('sidebar.themeHint') }}</span>
        </div>
        <span
          :class="[
            'relative inline-flex h-8 w-16 items-center rounded-full bg-slate-500/60 transition',
            theme === 'dark' ? 'bg-emerald-500' : ''
          ]"
        >
          <span
            class="absolute left-1 h-6 w-6 rounded-full bg-white shadow transition-transform"
            :class="theme === 'dark' ? 'translate-x-8' : 'translate-x-0'"
          ></span>
        </span>
      </button>

      <div class="rounded-2xl bg-[#152f2b]/80 px-5 py-4 text-xs text-slate-400">
        <p class="mb-3 text-sm font-semibold text-slate-200">{{ t('sidebar.connect') }}</p>
        <div class="flex items-center justify-between">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/15 text-lg text-brand-200 transition hover:bg-brand-400 hover:text-white"
            target="_blank"
            rel="noopener"
          >
            <span aria-hidden="true">{{ social.icon }}</span>
            <span class="sr-only">{{ social.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ isMobile: boolean }>()

interface AuthSessionUser {
  id: number
  name: string
  email: string
  type?: string
  level_id?: number | null
  is_2fa_enabled?: number | boolean
}

interface AuthSession {
  access_token: string
  token_type: string
  expires_in: number
  storedAt?: string
  expiresAt?: string
  user: AuthSessionUser
}

const authSession = useCookie<AuthSession | null>('auth_session')

const displayName = computed(() => authSession.value?.user?.name ?? 'Hi Jawwad')
const userId = computed(() => String(authSession.value?.user?.id ?? '9237'))
const isLoggedIn = computed(() => Boolean(authSession.value?.access_token))

const router = useRouter()

const logout = async () => {
  authSession.value = null
  await router.push('/login')
}

const { theme, toggleTheme } = useTheme()
const { t } = useI18n({ useScope: 'global' })
const { direction } = useLocaleDirection()

const isMobile = computed(() => props.isMobile)

const mobilePositionClass = computed(() =>
  direction.value === 'ltr'
    ? 'fixed inset-y-0 left-0 z-50 overflow-y-auto px-6 py-8 lg:static'
    : 'fixed inset-y-0 right-0 z-50 overflow-y-auto px-6 py-8 lg:static'
)

const quickActions = ['📄', '👤', '❤️']

const navItems = computed(() => [
  { key: 'home', icon: '🏠', label: t('sidebar.sections.home'), active: true },
  { key: 'topup', icon: '🪙', label: t('sidebar.sections.topup') },
  { key: 'payments', icon: '💳', label: t('sidebar.sections.payments') },
  { key: 'wallet', icon: '💼', label: t('sidebar.sections.wallet') },
  { key: 'orders', icon: '🛒', label: t('sidebar.sections.orders') },
  { key: 'agents', icon: '🤝', label: t('sidebar.sections.agents') },
  { key: 'security', icon: '🛡️', label: t('sidebar.sections.security') },
  { key: 'api', icon: '🧩', label: t('sidebar.sections.api') },
  { key: 'about', icon: 'ℹ️', label: t('sidebar.sections.about') }
])

const socials = [
  { label: 'WhatsApp', icon: '🟢', href: 'https://wa.me/' },
  { label: 'YouTube', icon: '▶️', href: 'https://youtube.com/' },
  { label: 'Telegram', icon: '✈️', href: 'https://t.me/' },
  { label: 'Facebook', icon: '📘', href: 'https://facebook.com/' }
]
</script>




