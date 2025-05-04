import type { ComponentRules } from '@/config/component-rules'
import { createComponentRules } from '@/config/component-rules'
import { useTheme } from '@/theme'
import { inject } from 'vue'
import { useLocale } from './use-locale'

/**
 * 组件规则注入键
 */
export const ComponentRulesSymbol = Symbol('jv-component-rules')

/**
 * 使用组件规则
 * @returns 组件规则
 */
export function useComponentRules(): ComponentRules {
  // 尝试从注入中获取组件规则
  const injectedRules = inject<ComponentRules | undefined>(
    ComponentRulesSymbol,
    undefined
  )

  if (injectedRules) {
    return injectedRules
  }

  // 如果未注入，则创建新的组件规则
  const { t, n, current, fallback, messages } = useLocale()

  // 创建一个最小的locale实例
  const locale = {
    name: 'jovial',
    current,
    fallback,
    messages,
    t,
    n,
    provide: () => locale
  }

  // 创建组件规则
  return createComponentRules(locale)
}

/**
 * 使用组件样式
 * @param componentName 组件名称
 * @returns 组件样式助手
 */
export function useComponentStyle(componentName: string) {
  const rules = useComponentRules()
  const theme = useTheme()

  const bem = rules.designRules.useBEM(componentName)

  /**
   * 获取主题颜色
   * @param colorName 颜色名称
   * @returns 颜色值
   */
  const getThemeColor = (colorName: string): string => {
    return rules.themeRules.getThemeColor(colorName)
  }

  /**
   * 使用主题变量
   * @param propName 属性名称
   * @returns CSS变量
   */
  const useThemeVariable = (propName: string): string => {
    return rules.themeRules.useThemeVariable(propName)
  }

  /**
   * 获取组件尺寸
   * @param size 尺寸名称
   * @returns 尺寸值
   */
  const getSizeValue = (
    size: keyof typeof rules.designRules.typography.fontSize
  ): string => {
    return rules.designRules.typography.fontSize[size]
  }

  /**
   * 获取圆角值
   * @param radius 圆角类型
   * @returns 圆角值
   */
  const getBorderRadius = (
    radius: keyof typeof rules.designRules.borderRadius
  ): string => {
    return rules.designRules.borderRadius[radius]
  }

  /**
   * 获取间距值
   * @param space 间距类型
   * @returns 间距值
   */
  const getSpacing = (
    space: keyof typeof rules.designRules.spacing
  ): string => {
    return rules.designRules.spacing[space]
  }

  /**
   * 获取阴影值
   * @param elevation 阴影类型
   * @returns 阴影值
   */
  const getElevation = (
    elevation: keyof typeof rules.designRules.elevation
  ): string => {
    return rules.designRules.elevation[elevation]
  }

  /**
   * 生成CSS变量
   * @param vars 变量映射
   * @returns CSS变量对象
   */
  const createCssVars = (
    vars: Record<string, string | number>
  ): Record<string, string | number> => {
    const result: Record<string, string | number> = {}

    for (const key in vars) {
      result[`--${key}`] = vars[key]
    }

    return result
  }

  return {
    bem,
    getThemeColor,
    useThemeVariable,
    getSizeValue,
    getBorderRadius,
    getSpacing,
    getElevation,
    createCssVars,
    isDark: theme.current.value.dark,
    themeName: theme.name.value
  }
}

/**
 * 使用指定了颜色类型的组件样式
 * @param componentName 组件名称
 * @returns 组件样式助手
 */
export function useColorTypeStyle(componentName: string) {
  const { bem, getThemeColor, useThemeVariable } =
    useComponentStyle(componentName)

  /**
   * 获取颜色类型的颜色变量
   * @param colorType 颜色类型
   * @returns CSS变量映射
   */
  const getColorTypeVars = (colorType: string): Record<string, string> => {
    // 默认为普通颜色
    if (colorType === 'default') {
      return {
        '--color-bg': useThemeVariable('background'),
        '--color-text': useThemeVariable('on-background'),
        '--color-border': useThemeVariable('neutral')
      }
    }

    // 使用主题颜色
    const themeColorMap: Record<string, string> = {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      info: 'info'
    }

    const color = themeColorMap[colorType] || 'primary'

    return {
      '--color-bg': getThemeColor(color),
      '--color-text': getThemeColor(`on-${color}`),
      '--color-border': getThemeColor(color)
    }
  }

  return {
    bem,
    getColorTypeVars
  }
}

/**
 * 创建use-locale hook，用于组件国际化
 */
export { useLocale } from './use-locale'
