import { createNamespace } from '@/utils'

export const JVMESSAGE_NAME = 'JvMessage'
export const bem = createNamespace(JVMESSAGE_NAME)

export type MessageType = 'info' | 'success' | 'warning' | 'error'
export type MessageVariant = 'outlined' | 'filled' | ''

/**
 * JvMessage 属性
 * 用于显示全局提示信息
 */
export interface JvMessageProps {
  /**
   * 消息类型
   * @default 'info'
   */
  type?: MessageType
  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean

  /**
   * 自动关闭 默认true
   *
   */
  autoClose?: boolean

  /**
   * 是否显示图标
   * @default true
   */
  showIcon?: boolean
  /**
   * 显示时间，单位毫秒，设为 0 则不自动关闭
   * @default 3000
   */
  duration?: number
  /**
   * 是否居中显示
   * @default false
   */
  center?: boolean
  /**
   * 变体类型
   * @default 'outlined'
   */
  variant?: MessageVariant
}

export interface JvMessageEmits {
  (e: 'close'): void
}

export interface JvMessageExpose {
  close: () => void
}
