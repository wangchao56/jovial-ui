import type { App } from 'vue'
import type { LocaleInstance, LocaleOptions } from './types'
// 导出类型
// 导入适配器
import { inject } from 'vue'
import { consoleWarn, getCurrentInstance } from '@/utils'
import { createJovialAdapter, LocaleSymbol } from './adapters/jovial'
import { createVueI18nAdapter } from './adapters/vue-i18n'

export * from './types'

// 导出符号
export { LocaleSymbol }
export { createJovialAdapter }
export { createVueI18nAdapter }

/**
 * 创建国际化实例
 *
 * 如果用户安装了Vue-i18n，将使用createVueI18nAdapter创建实例
 * 否则使用createJovialAdapter创建实例
 *
 * @param options 国际化选项
 * @returns 国际化实例
 */
export function createLocale(options?: LocaleOptions): LocaleInstance {
  // 检查Vue-i18n是否可用
  let hasVueI18n = false
  try {
    hasVueI18n = true
  }
  catch {
    // Vue-i18n未安装，使用jovial适配器
    hasVueI18n = false
  }

  // 根据是否有Vue-i18n选择适配器
  if (hasVueI18n) {
    consoleWarn('[jovial-ui] Vue-i18n detected, using vue-i18n adapter')
    return createVueI18nAdapter(options)
  }
  else {
    consoleWarn('[jovial-ui] Vue-i18n not detected, using jovial adapter')
    return createJovialAdapter(options)
  }
}

export function useLocale(): LocaleInstance {
  getCurrentInstance('useLocale')

  const locale = inject(LocaleSymbol, null) as LocaleInstance

  if (!locale)
    throw new Error('Could not find Jovial locale injection')

  return locale
}

/**
 * 安装国际化插件到Vue应用
 *
 * @param app Vue应用实例
 * @param locale 国际化实例
 */
export function installLocale(app: App, locale: LocaleInstance): void {
  if (locale.install) {
    locale.install(app)
  }
  // 如果没有install方法，直接提供实例
  app.provide(LocaleSymbol, locale)
}
