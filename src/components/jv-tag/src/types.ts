import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVTAG_NAME = 'JvTag'
export const bem = createNamespace('jv-tag')

export type TagType = 'primary' | 'success' | 'warning' | 'error' | 'info'

export interface JvTagProps {
  /**
   * 类型
   */
  type?: TagType
  /**
   * 大小
   */
  size?: SizeType
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
   * 后置内容
   */
  closeIcon?: string
  /**
   * 前置内容
   */
  prependIcon?: string
  /**
   * 内容
   */
  label?: string
  /**
   * 变体
   */
  variant?: 'filled' | 'outlined' | 'tonal'
}

export interface JvTagEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'clickClose', event: MouseEvent): void
}

export interface JvTagSlots {
  prepend: Slot
}

export interface JvTagExpose {
  focus: () => void
  blur: () => void
}
