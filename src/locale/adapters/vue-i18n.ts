import type { App, Ref } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import type { LocaleInstance, LocaleOptions } from '../types'
import { computed, ref } from 'vue'
import { createI18n } from 'vue-i18n'
import { isRTLLanguage } from '../helpers'
import ar from '../language/ar'
import en from '../language/en'
import zhHans from '../language/zh-Hans'

const messages = {
  'zh-Hans': zhHans,
  'en': en,
  'ar': ar,
}

const defaultDateTimeFormats = {
  'en': {
    short: {
      year: 'numeric' as const,
      month: 'short' as const,
      day: 'numeric' as const,
    },
    long: {
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
      weekday: 'long' as const,
    },
  },
  'zh-Hans': {
    short: {
      year: 'numeric' as const,
      month: 'short' as const,
      day: 'numeric' as const,
    },
    long: {
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
      weekday: 'long' as const,
    },
  },
  'ar': {
    short: {
      year: 'numeric' as const,
      month: 'short' as const,
      day: 'numeric' as const,
    },
  },
}

const defaultNumberFormats = {
  'en': {
    currency: {
      style: 'currency' as const,
      currency: 'USD',
    },
  },
  'zh-Hans': {
    currency: {
      style: 'currency' as const,
      currency: 'CNY',
    },
  },
  'ar': {
    currency: {
      style: 'currency' as const,
      currency: 'AED',
    },
  },
}

const defaultOptions: Partial<LocaleOptions> = {
  locale: 'zh-Hans',
  messages,
  fallbackLocale: 'zh-Hans',
  numberFormats: defaultNumberFormats,
  datetimeFormats: defaultDateTimeFormats,
}

export function createVueI18nAdapter(options: Partial<LocaleOptions> = defaultOptions): LocaleInstance {
  const currentLocale = ref(options.locale || 'zh-Hans')
  const fallbackLocale = ref(options.fallbackLocale as string || 'zh-Hans')
  const messages = ref(options.messages || {})

  const initOptions = computed<I18nOptions>(() => ({
    locale: currentLocale.value,
    messages: messages.value,
    legacy: false,
    fallbackLocale: fallbackLocale.value,
    numberFormats: {
      ...defaultOptions.numberFormats,
      ...options?.numberFormats,
    },
    datetimeFormats: {
      ...defaultOptions.datetimeFormats,
      ...options?.datetimeFormats,
    },
    missingWarn: false,
    silentTranslationWarn: true,
  }))
  const i18n = createI18n(initOptions.value)
  const localeClass = `direction-${isRTLLanguage(currentLocale.value) ? 'rtl' : 'ltr'}`
  return {
    localeClass,
    name: 'vue-i18n',
    t: i18n.global.t,
    n: i18n.global.n,
    d: i18n.global.d,
    current: currentLocale,
    fallback: fallbackLocale as Ref<string>,
    messages,
    switchLocale: (locale: string) => {
      currentLocale.value = locale
      try {
        i18n.global.locale = locale
      }
      catch (e) {
        console.error('Failed to set i18n locale', e)
      }
    },
    install: (app: App) => {
      app.use(i18n)
    },
  }
}
