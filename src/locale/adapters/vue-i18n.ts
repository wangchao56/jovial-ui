import type { App, InjectionKey } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import type { LocaleInstance } from '../types'
import { consoleWarn } from '@/utils'
import { computed, inject, ref } from 'vue'
import { createI18n } from 'vue-i18n'
import { isRTLLanguage } from '../helpers'
import ar from '../language/ar'
import en from '../language/en'
import zhHans from '../language/zh-Hans'

export const LocaleSymbol: InjectionKey<LocaleInstance>
  = Symbol.for('jovial-ui-locale')

interface LocaleOptions {
  locale: string // 当前语言
  messages: Record<string, any> // 语言包
  fallbackLocale: string // 回退语言
  numberFormats: Record<string, any> // 数字格式
  dateTimeFormats: Record<string, any> // 日期时间格式
  pluralizationRules: Record<string, any> // 复数规则
}

const messages = {
  'zh-Hans': zhHans,
  'en': en,
  'ar': ar,
}

const defaultDateTimeFormats = {
  'en': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    },
  },
  'zh-Hans': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    },
  },
  'ar': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  },
}

const defaultNumberFormats = {
  'en': {
    currency: {
      style: 'currency',
      currency: 'USD',
    },
  },
  'zh-Hans': {
    currency: {
      style: 'currency',
      currency: 'CNY',
    },
  },
  'ar': {
    currency: {
      style: 'currency',
      currency: 'AED',
    },
  },
}

const defaultOptions: Partial<LocaleOptions> = {
  locale: 'zh-Hans',
  messages,
  fallbackLocale: 'zh-Hans',
  numberFormats: defaultNumberFormats,
  dateTimeFormats: defaultDateTimeFormats,
}

export function createLocale(options: Partial<LocaleOptions> = defaultOptions): LocaleInstance {
  const currentLocale = ref(options.locale || 'zh-Hans')
  const fallbackLocale = ref(options.fallbackLocale || 'zh-Hans')
  const messages = ref(options.messages || {})

  const initOptions = computed<I18nOptions>(() => ({
    locale: currentLocale.value,
    messages: messages.value,
    legacy: false,
    fallbackLocale: fallbackLocale.value,
    globalInjection: true,
    numberFormats: {
      ...defaultOptions.numberFormats,
      ...options?.numberFormats,
    },
    datetimeFormats: {
      ...defaultOptions.dateTimeFormats,
      ...options?.dateTimeFormats,
    },
    pluralizationRules: options?.pluralizationRules,
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
    fallback: fallbackLocale,
    messages,
    switchLocale: (locale: string) => {
      currentLocale.value = locale
      i18n.global.locale = locale
    },
    install: (app: App) => {
      app.use(i18n)
    },
  }
}

// 使用i18n
export function useLocale(): LocaleInstance | undefined {
  const locale = inject<LocaleInstance>(LocaleSymbol)
  if (!locale) {
    consoleWarn('locale is not provided')
  }
  return locale || createLocale()
}
