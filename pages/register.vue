<script setup lang="ts">
import type { FetchError } from 'ofetch'

type UserType = 'admin' | 'user' | string

interface RegisterUser {
  id: number
  name: string
  email: string
  type?: UserType
  level_id?: number | null
  is_2fa_enabled?: number | boolean
}

interface RegisterResponse {
  access_token: string
  token_type: string
  expires_in: number
  user?: RegisterUser
}

interface RegisterError {
  message?: string
  errors?: Record<string, string | string[]>
}

const { t } = useI18n({ useScope: 'global' })
const { direction } = useLocaleDirection()
const runtimeConfig = useRuntimeConfig()

const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

const sessionCookie = useCookie<(RegisterResponse & { storedAt: string; expiresAt: string; user: RegisterUser }) | null>('auth_session', {
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  watch: false
})

const extractErrorMessage = (error: FetchError<RegisterError> | Error): string => {
  const fallback = t('auth.errors.unexpected')
  if ('data' in error && error.data) {
    const payload = error.data
    if (payload.message) {
      return payload.message
    }
    if (payload.errors) {
      const [, firstError] = Object.entries(payload.errors)[0] ?? []
      if (Array.isArray(firstError)) {
        return firstError[0] ?? fallback
      }
      if (typeof firstError === 'string') {
        return firstError
      }
    }
  }
  if ('statusCode' in error && error.statusCode === 422) {
    return t('auth.errors.validation')
  }
  return fallback
}

const validateForm = () => {
  if (!form.name.trim()) {
    errorMessage.value = t('auth.errors.missingName')
    return false
  }
  if (form.password !== form.passwordConfirmation) {
    errorMessage.value = t('auth.errors.passwordMismatch')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (loading.value) { return }
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const response = await $fetch<RegisterResponse>(runtimeConfig.public.apiBase + '/auth/register', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        password_confirmation: form.passwordConfirmation
      },
      headers: {
        Accept: 'application/json'
      }
    })

    const user: RegisterUser = response.user ?? {
      id: 0,
      name: form.name.trim(),
      email: form.email.trim(),
      type: 'user',
      level_id: null,
      is_2fa_enabled: 0
    }

    sessionCookie.value = {
      ...response,
      user,
      storedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + response.expires_in * 1000).toISOString()
    }

    await navigateTo('/')
  } catch (error: unknown) {
    errorMessage.value = extractErrorMessage(error as FetchError<RegisterError>)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface-dark flex items-center justify-center px-4 py-12" :dir="direction">
    <div class="w-full max-w-md rounded-3xl bg-surface shadow-card p-8 space-y-8">
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-semibold text-white">{{ t('auth.register.title') }}</h1>
        <p class="text-sm text-white/60">{{ t('auth.register.subtitle') }}</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label class="text-sm font-medium text-white/80" for="name">{{ t('auth.register.nameLabel') }}</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            autocomplete="name"
            :placeholder="t('auth.placeholders.name')"
            class="w-full rounded-xl bg-surface-dark px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-400 border border-white/10"
          >
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-white/80" for="email">{{ t('auth.register.emailLabel') }}</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            :placeholder="t('auth.placeholders.email', { at: '@' })"
            class="w-full rounded-xl bg-surface-dark px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-400 border border-white/10"
          >
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-white/80" for="password">{{ t('auth.register.passwordLabel') }}</label>
            <button
              type="button"
              class="text-xs text-brand-200 hover:text-brand-100 transition"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? t('auth.actions.hide') : t('auth.actions.show') }}
            </button>
          </div>
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            autocomplete="new-password"
            :placeholder="t('auth.placeholders.password')"
            class="w-full rounded-xl bg-surface-dark px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-400 border border-white/10"
          >
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-white/80" for="passwordConfirmation">{{ t('auth.register.passwordConfirmLabel') }}</label>
            <button
              type="button"
              class="text-xs text-brand-200 hover:text-brand-100 transition"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              {{ showConfirmPassword ? t('auth.actions.hide') : t('auth.actions.show') }}
            </button>
          </div>
          <input
            id="passwordConfirmation"
            v-model="form.passwordConfirmation"
            :type="showConfirmPassword ? 'text' : 'password'"
            required
            autocomplete="new-password"
            :placeholder="t('auth.placeholders.password')"
            class="w-full rounded-xl bg-surface-dark px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-400 border border-white/10"
          >
        </div>

        <p
          v-if="errorMessage"
          class="text-sm text-red-300 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="w-full rounded-xl bg-brand-500 hover:bg-brand-400 transition text-white font-medium py-3 flex items-center justify-center disabled:opacity-60"
          :disabled="loading"
        >
          <span v-if="!loading">{{ t('auth.register.submit') }}</span>
          <span v-else class="animate-pulse">{{ t('auth.register.loading') }}</span>
        </button>
      </form>

      <p class="text-center text-sm text-white/60">
        {{ t('auth.register.loginPrompt') }}
        <NuxtLink to="/login" class="text-brand-200 hover:text-brand-100 font-semibold">{{ t('auth.register.loginLink') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>
