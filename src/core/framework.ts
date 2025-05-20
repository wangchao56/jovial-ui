import type { App, Component, Directive } from 'vue'
import type { DefaultsOptions } from './default'
import type { LocaleInstance, LocaleOptions } from '@/locale/types'
import type { ThemeInstance, ThemeOptions } from '@/theme/config/types'
import { createLocale, LocaleSymbol } from '@/locale'
import { createTheme, ThemeSymbol } from '@/theme/config'
import { getUid } from '@/utils'
import { createDefaults, DefaultsSymbol } from './default'

export interface JovialOptions {
  aliases?: Record<string, unknown>
  components?: Record<string, unknown>
  directives?: Record<string, unknown>
  defaults?: DefaultsOptions
  // display?: DisplayOptions
  theme?: ThemeOptions
  locale?: LocaleOptions // 添加国际化选项
}
export interface JovialInstance {
  install: (app: App) => void
  defaults: DefaultsOptions
  theme: ThemeInstance
  locale: LocaleInstance
}
/**
 *  创建Jovial
 */
export function createJovialUI(jovial: JovialOptions = {}): JovialInstance {
  // 注入组件
  // 主题
  // in8
  // 自定义指令
  // icons
  // 将这些内容全部注入到项目的app中,共后代组件使用
  // 注册方法app.use(Jovial)
  const { ...rest } = jovial
  const options: JovialOptions = rest
  const { components = {}, directives = {}, locale: localeOptions } = options

  const defaults = createDefaults(options.defaults)
  const theme = createTheme(options.theme)
  // 创建国际化实例
  // 1. 自动检测是否安装了vue-i18n
  // 2. 如果安装了vue-i18n，使用vue-i18n适配器
  // 3. 否则使用内置的jovial适配器
  const locale = createLocale(localeOptions) // 创建国际化实例

  const install = (app: App): void => {
    for (const key in directives) {
      app.directive(key, directives[key] as Directive) // 安装指令
    }
    for (const key in components) {
      app.component(key, components[key] as Component) // 安装组件
    }
    theme.install(app) // 安装主题
    // 安装国际化实例
    // 1. 如果适配器有install方法，调用它（如vue-i18n适配器会调用app.use(i18n)）
    // 2. 将国际化实例注入到应用中，使组件可以通过useLocale()访问
    app.provide(DefaultsSymbol, defaults)
    app.provide(ThemeSymbol, theme)
    app.provide(LocaleSymbol, locale)

    getUid.reset()
  }

  return {
    install,
    defaults,
    theme,
    locale, // 导出国际化实例
  }
}
