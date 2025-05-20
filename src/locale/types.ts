import type { App, Ref } from 'vue'
import type { I18nOptions } from 'vue-i18n'

export interface LocaleMessages {
  [key: string]: string | Record<string, any>
}

export type LocaleOptions = {
  locale?: string | 'zh-Hans' | 'zh-Hant' | 'en'
  fallback?: string
  messages?: LocaleMessages
} & I18nOptions

export interface LocaleInstance {
  localeClass?: string
  name: string
  current: Ref<string>
  fallback: Ref<string>
  messages: Ref<LocaleMessages>
  t: (key: string, ...params: unknown[]) => string
  n: (value: number, options?: Intl.NumberFormatOptions) => string
  d?: (date: Date | number, options?: Intl.DateTimeFormatOptions) => string
  switchLocale?: (locale: string) => void
  provide?: (props: LocaleOptions) => LocaleInstance
  install?: (app: App) => void
}
