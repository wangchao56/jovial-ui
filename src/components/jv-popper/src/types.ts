import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVPOPPER_NAME = 'JvPopper'
export const bem = createNamespace(JVPOPPER_NAME)

export type Rect = Omit<DOMRect, 'toJSON'> & {
  [key: string]: any
}
/**
 * popper 属性
 * 用于显示popper
 */
export interface JvPopperProps {
  referenceRect: Rect
  popperRect?: Rect
  arrow?: boolean
  offset?: number | [number, number]
  placement?: PlacementType
  transition?: string
  background?: string
  borderColor?: string
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}
export interface JvPopperSlots {
  /**
   * 内容
   */
  default: Slot
}
export interface JvPopperEmits {
  /**
   * 显示之后
   */
  (e: 'afterShow'): void
  /**
   * 隐藏之后
   */
  (e: 'afterHide'): void
}

export interface JvPopperInstance {
  /**
   * 显示
   */
  show: () => void
  /**
   * 隐藏
   */
  hide: () => void
}
