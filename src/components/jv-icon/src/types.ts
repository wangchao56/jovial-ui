import type { _internalIcons } from '@components/internal-icon'
import type { IconifyIcon } from '@iconify/vue'
import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export type InternalIconName = keyof typeof _internalIcons
export const JVICON_NAME = 'JvIcon'
export const bem = createNamespace(JVICON_NAME)
// 处理预设尺寸
export const sizeOptions = ['small', 'medium', 'large', 'xlarge'] as const

export interface JvIconProps {
  /** 图标名称 */
  name?: InternalIconName | string | IconifyIcon
  /** 图标大小 */
  size?: SizeType
  /** 图标颜色 */
  color?: string
  /** 图标颜色类型 */
  colorType?: ColorType
  /** 图标是否自动聚焦 */
  autofocus?: boolean
  /** 翻转 */
  flip?: boolean
  /** 旋转角度 */
  rotate?: number
  /** 旋转 */
  spin?: boolean
  /** 是否禁用 */
  disabled?: boolean
}
export interface JvIconEmits {
  (e: 'click', event: MouseEvent): void
}

export interface JvIconSlots {
  default: Slot
}
