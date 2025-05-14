import type { App, Ref } from 'vue'

export interface LocaleMessages {
  [key: string]: string | Record<string, any>
}

export interface LocaleOptions extends Record<string, unknown> {
  locale?: string | 'zh-Hans' | 'zh-Hant' | 'en'
  fallback?: string
  messages?: LocaleMessages
}

export interface LocaleInstance {
  localeClass: string
  name: string
  current: Ref<string>
  fallback: Ref<string>
  messages: Ref<LocaleMessages>
  t: (key: string, ...params: unknown[]) => string
  n: (value: number, options?: Intl.NumberFormatOptions) => string
  d: (date: Date | number, options?: Intl.DateTimeFormatOptions) => string
  switchLocale: (locale: string) => void
  install: (app: App) => void
}
