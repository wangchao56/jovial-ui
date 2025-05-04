import type { ComputedRef, Ref } from 'vue'

interface ThemeDefinition {
  // 是否为暗色主题
  dark: boolean
  // 基础颜色配置
  colors: {
    // 主要颜色
    'primary': string
    'secondary': string
    'accent': string
    // 功能颜色
    'success': string
    'info': string
    'warning': string
    'error': string
    // 背景/表面颜色
    'background': string
    'surface': string
    // 文字颜色(前景色)
    'on-primary': string
    'on-secondary': string
    'on-accent': string
    'on-success': string
    'on-info': string
    'on-warning': string
    'on-error': string
    'on-background': string
    'on-surface': string
  }
  // 自定义变量
  variables?: Record<string, string | number>
}
export interface ThemeManager {
  // 当前主题名称
  readonly name: Ref<string>
  // 当前主题配置
  readonly current: ComputedRef<ThemeDefinition>
  // 所有注册的主题
  readonly themes: Record<string, ThemeDefinition>
  // 主题类名
  readonly themeClasses: ComputedRef<string>
  // 是否为暗色模式
  readonly isDark: ComputedRef<boolean>
  // 切换主题
  setTheme: (theme: string) => void
  // 切换暗色/亮色模式
  toggleDarkMode: () => void
}
