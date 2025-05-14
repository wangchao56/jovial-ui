import type { App, DeepReadonly, Ref } from 'vue'

// 添加 DeepPartial 类型定义
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** 基础颜色定义 */
interface BaseColors {
  /** 背景色 */
  background: string
  /** 表面色/前景色 */
  surface: string
  /** 主色 */
  primary: string
  /** 次色 */
  secondary: string
  /** 中性色 */
  neutral: string
  /** 成功色 */
  success: string
  /** 警告色 */
  warning: string
  /** 错误色 */
  error: string
  /** 信息色 */
  info: string
}
/** 前景色 (文字颜色) */
interface OnColors {
  /** 背景色 */
  'on-background': string
  /** 表面色/前景色 */
  'on-surface': string
  /** 主色 */
  'on-primary': string
  /** 次色 */
  'on-secondary': string
  /** 成功色 */
  'on-success': string
  /** 警告色 */
  'on-warning': string
  /** 错误色 */
  'on-error': string
  /** 信息色 */
  'on-info': string
}

export interface Colors extends BaseColors, OnColors {
  [key: string]: string
}

export interface Variables extends Record<string, string | number> {
  [key: string]: string | number
}
// 该对象可以包含以下属性：
export interface InternalThemeDefinition {
  /** 是否为暗色主题 */
  darkMode: boolean
  /** 颜色配置 */
  colors: Colors
  /** 变量配置 */
  variables?: Record<string, string | number>
}
/** 主题选项 */
export interface ThemeOptions {
  /** 默认主题 */
  defaultTheme: string
  /** 主题配置 */
  themes: Record<string, DeepPartial<InternalThemeDefinition>>
}

/** 主题实例接口 */
export interface ThemeInstance {
  /** 安装主题 */
  install: (app: App) => void
  /** 禁用主题 */
  readonly isDisabled: boolean
  /** 主题名称 */
  readonly name: Readonly<Ref<string>>
  /** 主题类名 */
  readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  /** 主题配置 */
  readonly themes: Ref<Record<string, DeepPartial<InternalThemeDefinition>>>
  /** 主题类名 */
  readonly themeClasses: Readonly<Ref<string | undefined>>
  /** 样式 */
  //   readonly styles: Readonly<Ref<string>>
  /** 全局配置 */
  readonly global: {
    /** 主题名称 */
    readonly name: Ref<string>
    /** 当前主题 */
    readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  }
  /** 切换主题 */
  switch: (themeName: string) => void
}
export interface VariationsOptions {
  colors: string[]
  lighten: number
  darken: number
}
export interface InternalThemeOptions {
  cspNonce?: string
  isDisabled: boolean
  defaultTheme: string
  variations: false | VariationsOptions
  themes: Record<string, InternalThemeDefinition>
}

/**
 * 将颜色配置转换为CSS规则
 * @param colors 颜色配置
 * @returns CSS规则
 * @example
 *
 *  const colors = {
 *    primary: '#000000',
 *    secondary: '#000000',
 *  }
 *  const cssRules = convertColorsToCssRules(colors)
 *  console.log(cssRules) // .theme-color: --jv-theme-primary: #000000; --jv-theme-secondary: #000000;
 */
export function convertColorsToCssRules(colors: Colors, className: string): string {
  const variables = Object.entries(colors).reduce((acc, [key, value]) => {
    acc += `--jv-theme-${key}: ${value};`
    return acc
  }, '\n')
  return `.${className}{${variables}}`
}

/**
 * 将CSS规则插入到head 的style标签中
 * @param cssRules CSS规则
 * @param styleSheetId style标签的id
 */
export function insertCssRulesToHead(cssRules: string, styleSheetId: string) {
  let styleDom = document.getElementById(styleSheetId)
  // 没有style标签，则创建一个
  if (styleDom) {
    styleDom.textContent = cssRules
    return
  }
  styleDom = document.createElement('style')
  styleDom.textContent = cssRules
  styleDom.id = styleSheetId
  document.head.appendChild(styleDom)
}
