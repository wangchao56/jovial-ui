import type { Slot } from 'vue'
import type { JvBadgeProps } from '@/components/jv-badge'
import type { JvIconProps } from '@/components/jv-icon/src/types'
import type { JvImageProps, JvImageSlots } from '@/components/jv-image'
import { createNamespace } from '@/utils'

export const JVAVATAR_NAME = 'JvAvatar'
export const bem = createNamespace(JVAVATAR_NAME)

/**
 * avatar 属性
 * 用于显示头像，支持图片、文本和图标类型
 */
export interface JvAvatarProps {
  /**
   * 头像图片地址
   * @default ''
   */
  image?: JvImageProps['src'] | JvImageProps

  /**
   * 头像图标
   * @default ''
   */
  icon?: JvIconProps['name'] | JvIconProps
  /**
   * 头像文本
   * @default ''
   */
  text?: string
  /**
   * 头像形状
   * @default 'circle'
   */
  shape?: 'circle' | 'square' | 'rounded'
  /**
   * 头像大小
   * @default 'medium'
   */
  size?: SizeType | number | string
  /**
   * 头像变体
   */
  variant?: 'filled' | 'outlined'
  /**
   * 徽标 默认显示在头像右上角 dot
   */
  badge?: JvBadgeProps | boolean
  /**
   * 是否禁用状态
   * @default false
   */
  disabled?: boolean
  /**
   * 边框宽度
   * @default 1
   */
  borderWidth?: number | string
  /**
   * 是否显示阴影 默认
   */
  elevated?: boolean
  /**
   * 文本颜色
   */
  textColor?: string
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 自定义样式
   */
  style?: Record<string, string>
}

/**
 * 头像组件插槽
 */
export interface JvAvatarSlots extends JvImageSlots {
  /**
   * 文本类型的内容插槽
   */
  text?: Slot
  /**
   * 图标类型的内容插槽
   */
  icon?: Slot
  /**
   * 默认占位符插槽
   */
  placeholder?: Slot
}

export interface JvAvatarEmits {
  /**
   * 点击事件
   */
  (e: 'click', event: Event): void
  /**
   * 图片加载成功事件
   */
  (e: 'load', event: Event): void
  /**
   * 图片加载失败事件
   */
  (e: 'error', event: Error): void
}
