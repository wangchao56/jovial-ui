import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVBADGE_NAME = 'JvBadge'
export const bem = createNamespace(JVBADGE_NAME)

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
   * 是否隐藏角标
   * @default false
   */
  hidden?: boolean
  /**
   * 角标类型
   */
  type?: ColorType

  offset?: [number, number] | string
}
export interface JvBadgeSlots {
  /**
   * 默认插槽
   * @default 徽标
   */
  default: Slot
}
