import type { App, InjectionKey } from 'vue'
import type { InternalThemeDefinition, ThemeInstance, ThemeOptions } from './types'
import { getCurrentInstance } from '@/utils'
import { computed, inject, provide, ref } from 'vue'
import { getForeground, THEME_CLASS } from '../helpers'
import { convertColorsToCssRules, insertCssRulesToHead } from './types'

// 主题注入键
export const ThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('jv-theme')

function genThemeOptions() {
  return {
    defaultTheme: 'light',
    themes: {
      light: {
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
  const current = computed(() => initThemeOptions.themes[name.value] as InternalThemeDefinition || {
    darkMode: false,
    colors: {},
    variables: {},
  })
  const themMode = computed(() => {
    return current.value.darkMode ? 'dark' : 'light'
  })
  const themeClass = computed(() => {
    return `jv-theme-${themMode.value}`
  })
  const themes = ref(initThemeOptions.themes)
  //   const themeColors = new Set<string>(
  //     Object.values(themes.value).flatMap(theme => Object.keys(theme.colors)),
  //   )

  const colors = computed(() => {
    // 获取前景色
    const fglines: Record<string, string> = {}
    const bglines: Record<string, string> = {}
    Object.entries(current.value.colors).forEach(([key, value]) => {
      if (!key.startsWith('on-')) {
        fglines[`on-${key}`] = getForeground(value)
      }
      bglines[key] = value
    })

    return {
      ...current.value.colors,
      ...bglines,
      ...fglines,
    }
  })

  function updateStyles() {
    const cssRules = convertColorsToCssRules(colors.value, themeClass.value)
    insertCssRulesToHead(cssRules, themeClass.value)
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
