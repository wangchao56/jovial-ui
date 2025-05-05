import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVCARD_NAME = 'JvCard'
export const JVCARDACTIONS_NAME = 'JvCardActions'
export const JVCARDHEADER_NAME = 'JvCardHeader'
export const JVCARDCONTENT_NAME = 'JvCardContent'
export const JVCARDFOOTER_NAME = 'JvCardFooter'
export const bem = createNamespace(JVCARD_NAME)

export interface JvCardProps {
  /**
   * 卡片标题
   */
  title?: string
  /**
   * 卡片副标题
   */
  subtitle?: string
  /**
   * 卡片内容
   */
  content?: string
  /**
   * 卡片宽度
   */
  maxWidth?: string | number
  /**
   * 卡片颜色类型
   * @default 'default'
   */
  colorType?: ColorType
  /**
   * 卡片变体
   * @default 'elevated'
   */
  variant?: 'elevated' | 'outlined' | 'tonal'
  /**
   * 卡片圆角
   * @default 'rounded'
   */
  rounded?: string
  /**
   * 卡片是否有边框
   * @default false
   */
  bordered?: boolean
  /**
   * 卡片是否可点击
   * @default false
   */
  clickable?: boolean
  /**
   * 卡片是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 卡片内边距
   * @default 'md'
   */
  padding?: string
  /**
   * 操作按钮布局
   */
  actionsAlign?: 'start' | 'end' | 'center'
}

/**
 * 卡片头部属性
 */
export interface JvCardHeaderProps {
  /**
   * 卡片标题
   */
  title?: string
  /**
   * 卡片副标题
   */
  subtitle?: string
}

/**
 * 卡片内容属性
 */
export interface JvCardContentProps {
  /**
   * 卡片内容
   */
  content?: string
}

/**
 * 卡片底部属性
 */
export interface JvCardFooterProps {
  /**
   * 自定义类名
   */
  class?: string
}

/**
 * 卡片操作区属性
 */
export interface JvCardActionsProps {
  /**
   * 操作按钮对齐方式
   * @default 'end'
   */
  align?: 'start' | 'end' | 'center'
}

export interface JvCardEmits {
  (e: 'click', event: MouseEvent): void
}

export interface JvCardSlots {
  default?: Slot
  header?: Slot
  title?: Slot
  subtitle?: Slot
  media?: Slot
  content?: Slot
  actions?: Slot
  footer?: Slot
}
