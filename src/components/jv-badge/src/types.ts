import { createNamespace } from '@/utils'

export const JVBADGE_NAME = 'JvBadge'
export const bem = createNamespace(JVBADGE_NAME)

export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

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
   * @default 'danger'
   */
  type?: BadgeType
  /**
   * 自定义角标位置偏移，格式为 [x, y]
   */
  offset?: [number, number]
}
