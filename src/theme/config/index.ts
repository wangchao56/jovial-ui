import type { App, InjectionKey } from 'vue'
import type { Colors, InternalThemeDefinition, ThemeInstance, ThemeOptions } from './types'
import { computed, inject, provide, ref } from 'vue'
import { getCurrentInstance } from '@/utils'
import { getForeground, THEME_CLASS } from '../helpers'
import { convertColorsToCssRules, insertCssRulesToHead } from './types'

// 主题注入键
export const ThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('jv-theme')

function genThemeOptions() {
  return {
    defaultTheme: 'light',
    themes: {
      light: {
        darkMode: false,
        colors: {
          'primary': '#067d75',
          'secondary': '#015751',
          'neutral': '#f0f0f0',
          'error': '#b50c00',
          'warning': '#b84214',
          'success': '#005617',
          'info': '#0056b8',
          'background': '#f5f5f5',
          'surface': '#ffffff',
          'on-primary': '#fff',
          'on-secondary': '#fff',
          'on-accent': '#fff',
          'on-neutral': '#fff',
          'on-error': '#fff',
          'on-warning': '#fff',
          'on-success': '#fff',
          'on-info': '#fff',
          'on-background': '#282828',
          'on-surface': '#121212',
        },
      },
      dark: {
        darkMode: true,
        colors: {
          'primary': '#4cada4',
          'secondary': '#00b2a6',
          'neutral': '#f0f0f0',
          'error': '#ff564c',
          'warning': '#ec6e33',
          'success': '#0cd748',
          'info': '#07f',
          'background': '#282828',
          'surface': '#121212',
          'on-primary': '#fff',
          'on-secondary': '#fff',
          'on-accent': '#fff',
          'on-neutral': '#fff',
          'on-error': '#fff',
          'on-warning': '#fff',
          'on-success': '#fff',
          'on-info': '#fff',
          'on-background': '#fff',
          'on-surface': '#fff',
        },
      },
    },
  }
}
export function createTheme(themeOptions?: ThemeOptions): ThemeInstance {
  const initThemeOptions = themeOptions || genThemeOptions() as ThemeOptions
  const name = ref(initThemeOptions.defaultTheme || 'light')

  // 计算当前主题
  const current = computed(() => initThemeOptions.themes[name.value] as InternalThemeDefinition || {
    darkMode: false,
    colors: {},
    variables: {},
  })

  // 计算主题模式
  //   const themMode = computed(() => current.value.darkMode ? 'dark' : 'light')

  // 计算主题类名
  const themeClass = computed(() => `jv-theme-${name.value}`)

  // 所有主题配置
  const themes = computed(() => initThemeOptions.themes)

  // 计算所有主题的颜色
  const colors = computed<Record<string, Colors>>(() => {
    const _colors: Record<string, Colors> = {}
    Object.entries(themes.value).forEach(([key, value]) => {
      _colors[key] = parseThemesColors(value)
    })
    return _colors
  })

  /**
   * 解析主题颜色
   * @param theme 主题定义
   * @returns 处理后的颜色对象
   */
  function parseThemesColors(theme: DeepPartial<InternalThemeDefinition>): Colors {
    if (!theme.colors)
      return { ...current.value.colors }

    const fglines: Record<string, string> = {}
    const bglines: Record<string, string> = {}

    Object.entries(theme.colors).forEach(([key, value]) => {
      // 为背景色自动生成前景色
      if (!key.startsWith('on-') && value) {
        fglines[`on-${key}`] = getForeground(value as string)
      }

      if (value) {
        bglines[key] = value
      }
    })

    return {
      ...current.value.colors,
      ...bglines,
      ...fglines,
    }
  }

  /**
   * 更新样式
   */
  function updateStyles() {
    let cssRules = ''

    // 生成每个主题的CSS规则
    Object.entries(colors.value).forEach(([key, value]) => {
      cssRules += convertColorsToCssRules(
        value,
        `.jv-theme-${key}`,
        key === 'dark' || (themes.value[key] as InternalThemeDefinition)?.darkMode === true,
      )
    })

    // 添加根元素的默认主题
    cssRules += convertColorsToCssRules(current.value.colors, ':root', false)

    // 插入到文档中
    insertCssRulesToHead(cssRules, 'jv-theme-styles')
  }

  return {
    install: (_app: App) => {
      updateStyles()
    },
    isDisabled: false,
    name,
    current,
    themeClasses: themeClass,
    global: {
      name,
      current,
    },
    switch: (themeName: string) => {
      name.value = themeName
      updateStyles()
    },
    themes,
  }
}

/**
 * 提供主题
 * @param props 主题
 * @param props.theme 主题名称
 * @returns 主题
 */
export function provideTheme(props: { theme?: string }): ThemeInstance {
  getCurrentInstance('provideTheme')

  const theme = inject(ThemeSymbol) as ThemeInstance

  if (!theme)
    throw new Error('Could not find Vuetify theme injection')

  const name = computed<string>(() => {
    return props.theme ?? theme.name.value
  })

  const current = computed(() => {
    const themeValue = theme.themes.value[name.value || 'light'] || {}
    return {
      darkMode: false,
      colors: {
        'background': '',
        'surface': '',
        'primary': '',
        'secondary': '',
        'neutral': '',
        'success': '',
        'warning': '',
        'error': '',
        'info': '',
        'on-background': '',
        'on-surface': '',
        'on-primary': '',
        'on-secondary': '',
        'on-success': '',
        'on-warning': '',
        'on-error': '',
        'on-info': '',
        ...themeValue.colors,
      },
      variables: themeValue.variables || {},
    } as InternalThemeDefinition
  })

  const themeClasses = computed(() =>
    theme.isDisabled ? undefined : `${THEME_CLASS}-${name.value}`,
  )

  const newTheme: ThemeInstance = {
    ...theme,
    name,
    current,
    themeClasses,
  }

  provide(ThemeSymbol, newTheme) // 使用provide提供主题实例 覆盖全局的theme

  return newTheme
}

// 创建使用主题的composable
export function useTheme(): ThemeInstance {
  const theme = inject<ThemeInstance>(ThemeSymbol) as ThemeInstance

  if (!theme) {
    throw new Error('useTheme() 必须在 JvThemeProvider 内部使用')
  }

  return theme
}
