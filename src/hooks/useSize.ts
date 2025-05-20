import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { convertToUnit, isCssFontSize } from '@/utils'

/**
 * 尺寸映射表类型
 */
export type SizeMap = Record<string, number>

/**
 * 默认尺寸映射表
 */
export const defaultSizeMap: SizeMap = {
  tiny: 24,
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 64,
}

/**
 * 组件尺寸处理hooks
 *
 * @param size 尺寸值，可以是字符串、数字或CSS单位
 * @param sizeMap 尺寸映射表，用于将字符串尺寸名转换为数值
 * @param defaultValue 默认值，当转换失败时使用
 * @returns 返回计算好的尺寸值和格式化后的CSS单位字符串
 *
 * @example
 * // 在组件中使用
 * const { computedSize, sizeInPx, sizeWithUnit } = useSize(props.size)
 * // 如果props.size是'medium'，则computedSize为40，sizeWithUnit为'40px'
 * // 如果props.size是50，则computedSize为50，sizeWithUnit为'50px'
 * // 如果props.size是'2rem'，则computedSize为'2rem'，sizeWithUnit为'2rem'
 */
export function useSize(
  size: string | number | undefined,
  sizeMap: SizeMap = defaultSizeMap,
  defaultValue: number = 40,
): {
    computedSize: ComputedRef<number | string>
    sizeInPx: ComputedRef<number>
    sizeWithUnit: ComputedRef<string>
    //   当前size是否为内置的 字面量 比如 tiny small medium large xlarge
    isInnerSize: ComputedRef<boolean>
  } {
  // 计算实际尺寸值
  const computedSize = computed(() => {
    // 如果是字符串且在映射表中存在
    if (typeof size === 'string' && size in sizeMap) {
      return sizeMap[size]
    }

    // 如果是有效CSS尺寸字符串（如'2rem'、'16px'等）
    if (typeof size === 'string' && isCssFontSize(size)) {
      return size
    }

    // 如果是数字
    if (typeof size === 'number' && size > 0) {
      return size
    }

    // 默认值
    return defaultValue
  })

  // 转换为像素值（如果可能）
  const sizeInPx = computed(() => {
    const size = computedSize.value
    if (typeof size === 'number') {
      return size
    }

    // 尝试解析字符串中的数字
    if (typeof size === 'string') {
      const match = size.match(/^(\d+(\.\d+)?)/)
      if (match) {
        return Number.parseFloat(match[1])
      }
    }

    return defaultValue
  })

  // 确保返回的是带单位的字符串
  const sizeWithUnit = computed(() => {
    const size = computedSize.value

    // 如果已经是CSS单位字符串
    if (typeof size === 'string' && isCssFontSize(size)) {
      return size
    }

    // 转换为CSS单位字符串
    const result = convertToUnit(size)
    return result || `${defaultValue}px` // 提供默认值，确保返回字符串
  })

  return {
    computedSize,
    sizeInPx,
    sizeWithUnit,
    isInnerSize: computed(() => {
      return Object.keys(sizeMap).includes(size as string)
    }),
  }
}
