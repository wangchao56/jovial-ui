import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVBADGE_NAME = 'JvBadge'
export const bem = createNamespace(JVBADGE_NAME)

/**
 * Badge位置类型
 */
export type BadgePlacementType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

/**
 * Badge颜色类型
 */
export type ColorType = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'secondary'

/**
 * JvBadge 属性
 * 用于显示角标或数量标记
 */
export interface JvBadgeProps {
  /**
   * 显示的值
   */
  value?: string | number
  /**
   * 最大值，超过最大值会显示 '{max}+'
   * @default 99
   */
  max?: number
  /**
   * 是否为圆点
   * @default false
   */
  dot?: boolean
  /**
   * 角标大小
   * @default 'medium'
   */
  size?: SizeType | number | string
  /**
   * 是否隐藏角标
   * @default false
   */
  hidden?: boolean
  /**
   * 角标偏移量 [x, y]  [4%,4%] | [4,4]
   */
  offset?: [number, number] | [string, string]
  /**
   * 角标颜色
   * @default 'error'
   */
  color?: ColorType | string
  /**
   * 位置
   * @default 'top-right'
   */
  placement?: BadgePlacementType
}
export interface JvBadgeSlots {
  /**
   * 默认插槽
   * @default 徽标
   */
  default: Slot
}
