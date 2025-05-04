import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVTAG_NAME = 'JvTag'
export const bem = createNamespace('jv-tag')

export type TagType = 'primary' | 'success' | 'warning' | 'error' | 'info'
export type TagSize = 'large' | 'medium' | 'small'

export interface JvTagProps {
  /**
   * 类型
   */
  type?: TagType
  /**
   * 大小
   */
  size?: TagSize
  /**
   * 形状 药丸
   */
  shape?: 'square' | 'pill'
  /**
   * 颜色
   */
  color?: string
  /**
   * 可关闭
   */
  closable?: boolean
  /**
   * 内容
   */
  content?: string
  /**
   * 变体
   */
  variant?: 'filled' | 'outlined' | 'tonal'
  /**
   * 可选择
   */
  selectable?: boolean
  /**
   * 已选择
   */
  selected?: boolean
}

export interface JvTagEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'close', event: MouseEvent): void
  (e: 'select', selected: boolean): void
}

export interface JvTagSlots {
  default: Slot
}

export interface JvTagExpose {
  focus: () => void
  blur: () => void
}
