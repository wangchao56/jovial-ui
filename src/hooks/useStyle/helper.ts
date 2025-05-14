import type { CSSProperties } from 'vue'
import { createNamespace } from '@/utils'
import { computed } from 'vue'

interface ColorTypeVars {
  background: string
  color: string
  borderColor?: string
  hoverBackground?: string
  hoverColor?: string
}

/**
 * 使用颜色类型样式
 * @param componentName 组件名称
 * @returns bem命名和颜色类型变量
 */
function useColorTypeStyle(componentName: string) {
  const bem = createNamespace(componentName)

  // 获取主题颜色类型变量
  const getColorTypeVars = (type: string, variant: string = 'default'): ColorTypeVars => {
    const isDefault = type === 'default'
    // 根据不同变体返回不同样式
    switch (variant) {
      case 'filled':
        return {
          background: isDefault ? 'var(--jv-theme-surface)' : `var(--jv-theme-${type})`,
          color: isDefault ? 'var(--jv-theme-on-surface)' : `var(--jv-theme-on-${type})`,
          hoverBackground: isDefault ? 'var(--jv-theme-surface-hover)' : `var(--jv-theme-${type}-dark)`,
        }
      case 'outlined':
        return {
          background: 'transparent',
          color: isDefault ? 'var(--jv-theme-on-surface)' : `var(--jv-theme-${type})`,
          borderColor: isDefault ? 'var(--jv-theme-outline)' : `var(--jv-theme-${type})`,
          hoverBackground: isDefault ? 'var(--jv-theme-surface-hover)' : `var(--jv-theme-${type}-light)`,
        }
      case 'text':
        return {
          background: 'transparent',
          color: isDefault ? 'var(--jv-theme-on-surface)' : `var(--jv-theme-${type})`,
          hoverBackground: isDefault ? 'var(--jv-theme-surface-hover)' : `var(--jv-theme-${type}-light)`,
        }
      default:
        return {
          background: isDefault ? 'var(--jv-theme-surface)' : `var(--jv-theme-${type})`,
          color: isDefault ? 'var(--jv-theme-on-surface)' : `var(--jv-theme-on-${type})`,
        }
    }
  }

  return {
    bem,
    getColorTypeVars,
  }
}

/**
 * 获取主题颜色
 * @param colorName 颜色名称
 * @returns 颜色变量
 */
function getThemeColor(colorName: string): string {
  return `var(--jv-theme-${colorName})`
}

/**
 * 获取边框圆角
 * @param size 圆角大小
 * @returns 圆角变量
 */
function getBorderRadius(size: 'rounded' | 'roundedSm' | 'roundedMd' | 'roundedLg' | 'roundedXl' | 'roundedFull'): string {
  const radiusMap = {
    rounded: 'var(--jv-rounded)',
    roundedSm: 'var(--jv-rounded-sm)',
    roundedMd: 'var(--jv-rounded-md)',
    roundedLg: 'var(--jv-rounded-lg)',
    roundedXl: 'var(--jv-rounded-xl)',
    roundedFull: 'var(--jv-rounded-full)',
  }
  return radiusMap[size] || radiusMap.rounded
}

/**
 * 获取间距
 * @param size 间距大小
 * @returns 间距变量
 */
function getSpacing(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const spacingMap = {
    xs: 'var(--jv-spacing-xs, 4px)',
    sm: 'var(--jv-spacing-sm, 8px)',
    md: 'var(--jv-spacing-md, 16px)',
    lg: 'var(--jv-spacing-lg, 24px)',
    xl: 'var(--jv-spacing-xl, 32px)',
  }
  return spacingMap[size] || spacingMap.md
}

/**
 * 获取字体大小
 * @param size 字体大小
 * @returns 字体大小变量
 */
function getFontSize(size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'): string {
  const fontSizeMap = {
    'xs': 'var(--jv-font-size-xs)',
    'sm': 'var(--jv-font-size-sm)',
    'base': 'var(--jv-font-size-base)',
    'lg': 'var(--jv-font-size-lg)',
    'xl': 'var(--jv-font-size-xl)',
    '2xl': 'var(--jv-font-size-2xl)',
  }
  return fontSizeMap[size] || fontSizeMap.base
}

/**
 * 获取字体粗细
 * @param weight 字体粗细
 * @returns 字体粗细变量
 */
function getFontWeight(weight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'): string {
  const fontWeightMap = {
    light: 'var(--jv-font-weight-light)',
    normal: 'var(--jv-font-weight-normal)',
    medium: 'var(--jv-font-weight-medium)',
    semibold: 'var(--jv-font-weight-semibold)',
    bold: 'var(--jv-font-weight-bold)',
  }
  return fontWeightMap[weight] || fontWeightMap.normal
}

/**
 * 获取阴影
 * @param elevation 阴影级别
 * @returns 阴影变量
 */
function getElevation(elevation: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const elevationMap = {
    none: 'none',
    xs: 'var(--jv-elevation-1)',
    sm: 'var(--jv-elevation-2)',
    md: 'var(--jv-elevation-4)',
    lg: 'var(--jv-elevation-6)',
    xl: 'var(--jv-elevation-8)',
  }
  return elevationMap[elevation] || elevationMap.none
}

/**
 * 创建CSS变量样式对象
 * @param vars 变量对象
 * @returns CSS样式对象
 */
function createCssVars(vars: Record<string, string | number>): CSSProperties {
  const style: CSSProperties = {}
  Object.entries(vars).forEach(([key, value]) => {
    style[`--jv-${key}`] = value
  })
  return style
}

/**
 * 获取响应式尺寸变量
 * @param size 尺寸
 * @param sizeMap 尺寸映射
 * @returns 尺寸变量值
 */
function getSizeVar(
  size: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge',
  sizeMap: Record<string, any>,
): any {
  return computed(() => {
    const sizeValues = {
      tiny: sizeMap.tiny || sizeMap.small || sizeMap.medium,
      small: sizeMap.small || sizeMap.medium,
      medium: sizeMap.medium,
      large: sizeMap.large || sizeMap.medium,
      xlarge: sizeMap.xlarge || sizeMap.large || sizeMap.medium,
    }
    return sizeValues[size] || sizeValues.medium
  })
}

export {
  createCssVars,
  getBorderRadius,
  getElevation,
  getFontSize,
  getFontWeight,
  getSizeVar,
  getSpacing,
  getThemeColor,
  useColorTypeStyle,
}
