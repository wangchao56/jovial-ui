import type { App, DeepReadonly, Ref } from 'vue'
import { getCurrentInstance } from '@/utils'
import { computed, inject, provide, ref } from 'vue'

const THEME_PREFIX = 'jv-theme'
const THEME_CLASS = `${THEME_PREFIX}`

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

/** 基础颜色定义 */
interface BaseColors {
  /** 背景色 */
  background: string
  /** 表面色/前景色 */
  surface: string
  /** 主色 */
  primary: string
  /** 强调 */
  accent: string
  /** 次色 */
  secondary: string
  /** 中性色 */
  neutral: string
  /** 成功色 */
  success: string
  /** 警告色 */
  warning: string
  /** 错误色 */
  danger: string
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
  /** 强调 */
  'on-accent': string
  /** 中性色 */
  'on-neutral': string
  /** 成功色 */
  'on-success': string
  /** 警告色 */
  'on-warning': string
  /** 错误色 */
  'on-danger': string
  /** 信息色 */
  'on-info': string
}

export interface Colors extends BaseColors, OnColors {
  [key: string]: string
}

// 定义一个类型别名ThemeOptions，它是一个对象类型
// 该对象可以包含以下属性：
interface InternalThemeDefinition {
  /** 是否为暗色主题 */
  dark: boolean
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
  readonly themes: Ref<Record<string, InternalThemeDefinition>>
  /** 主题类名 */
  readonly themeClasses: Readonly<Ref<string | undefined>>
  /** 样式 */
  readonly styles: Readonly<Ref<string>>
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

// 创建主题提供键
export const ThemeSymbol = Symbol('jv-theme')

/**
 * 提供主题
 * @param props 主题
 * @param props.theme 主题名称
 * @returns 主题
 */
export function provideTheme(props: { theme?: string }): ThemeInstance {
  getCurrentInstance('provideTheme')

  const theme = inject(ThemeSymbol) as ThemeInstance

  if (!theme) throw new Error('Could not find Vuetify theme injection')

  const name = computed<string>(() => {
    return props.theme ?? theme.name.value
  })
  const current = computed(() => theme.themes.value[name.value])

  const themeClasses = computed(() =>
    theme.isDisabled ? undefined : `${THEME_CLASS}--${name.value}`
  )

  const newTheme: ThemeInstance = {
    ...theme,
    name,
    current,
    themeClasses
  }

  provide(ThemeSymbol, newTheme) // 使用provide提供主题实例 覆盖全局的theme

  return newTheme
}

// 创建使用主题的composable
export function useTheme(): ThemeInstance {
  const theme = inject<ThemeInstance>(ThemeSymbol)

  if (!theme) {
    throw new Error('useTheme() 必须在 JvThemeProvider 内部使用')
  }

  return theme
}

// 创建主题 通过js计算符合WCAG标准的对比度等 将js对象转换为css规则 插入css规则表中
export function createThemeManager(options?: ThemeOptions): ThemeInstance {
  const { defaultTheme = 'light', themes = {} } = options || {}

  // 完整的Colors字段默认值
  const defaultColors: Colors = {
    background: '#ffffff',
    surface: '#ffffff',
    primary: '#1976d2',
    accent: '#e91e63',
    secondary: '#424242',
    neutral: '#f5f5f5',
    success: '#4caf50',
    warning: '#ff9800',
    danger: '#f44336',
    info: '#2196f3',
    'on-background': '#000000',
    'on-surface': '#000000',
    'on-primary': '#ffffff',
    'on-secondary': '#ffffff',
    'on-accent': '#ffffff',
    'on-neutral': '#000000',
    'on-success': '#ffffff',
    'on-warning': '#ffffff',
    'on-danger': '#ffffff',
    'on-info': '#ffffff'
  }

  // 合并主题
  const mergedThemes: Record<string, InternalThemeDefinition> = {}
  for (const key in themes) {
    const theme = themes[key] || {}
    const mergedColors: Colors = {
      ...defaultColors,
      ...(theme.colors || {})
    } as Colors
    const mergedVariables: Record<string, string | number> = {}
    if (theme.variables) {
      for (const k in theme.variables) {
        if (theme.variables[k] !== undefined)
          mergedVariables[k] = theme.variables[k] as string | number
      }
    }
    mergedThemes[key] = {
      dark: !!theme.dark,
      colors: mergedColors,
      variables: mergedVariables
    }
  }
  if (!mergedThemes[defaultTheme]) {
    mergedThemes[defaultTheme] = {
      dark: false,
      colors: { ...defaultColors },
      variables: {}
    }
  }

  const name = ref(defaultTheme)
  const current = computed(() => mergedThemes[name.value])
  const themeClasses = computed(() => `${THEME_CLASS}--${name.value}`)

  return {
    install: (_app: App): void => {},
    isDisabled: false,
    name,
    current,
    themes: ref(mergedThemes),
    themeClasses,
    styles: computed(() => ``),
    global: {
      name,
      current
    },
    switch: (themeName: string) => {
      if (mergedThemes[themeName]) name.value = themeName
    }
  }
}
