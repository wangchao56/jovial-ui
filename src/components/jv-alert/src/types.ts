import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVALERT_NAME = 'JvAlert'
export const bem = createNamespace(JVALERT_NAME)

/**
 * alert 属性
 * 用于显示alert
 */
export interface JvAlertProps {
  /**
   * 警告类型
   * @default 'info'
   */
  type?: 'success' | 'warning' | 'info' | 'error'
  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean
  /**
   * 警告标题
   */
  title?: string
  /**
   * 警告描述
   */
  description?: string
  /**
   * 图标名称
   */
  icon?: string
  /**
   * 是否显示图标
   * @default true
   */
  showIcon?: boolean
  /**
   * 警告样式
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined' | 'left-accent'
  /**
   * 形状
   * @default 'none'
   */
  rounded?: RoundedType
  /**
   * 是否显示
   * @default true
   */
  visible?: boolean
  /**
   * 自定义背景色
   * 优先级高于type
   */
  backgroundColor?: string
  /**
   * 自定义文本颜色
   * 优先级高于type
   */
  textColor?: string
}

export interface JvAlertEmits {
  /**
   * 关闭事件
   */
  (e: 'close'): void
  /**
   * 更新可见状态
   */
  (e: 'update:visible', value: boolean): void
}

export interface JvAlertSlots {
  /**
   * 默认插槽，警告内容
   */
  default: Slot
  /**
   * 标题插槽
   */
  title: Slot
  /**
   * 图标插槽
   */
  icon: Slot
  /**
   * 操作插槽，用于放置关闭按钮等
   */
  action: Slot
}
