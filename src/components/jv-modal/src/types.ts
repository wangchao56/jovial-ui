import type { JvCardHeaderProps } from '@/components/jv-card'
import type { JvIconProps } from '@/components/jv-icon/src/types'
import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVMODAL_NAME = 'JvModal'
export const bem = createNamespace(JVMODAL_NAME)

/**
 * 弹窗组件属性
 */
export interface JvModalProps {
  /**
   * 标题
   */
  title?: JvCardHeaderProps['title']
  /**
   * 描述
   */
  description?: string
  /**
   * 图标
   */
  icon?: JvIconProps['name'] | JvIconProps
  /**
   * 是否显示
   * @default false
   */
  modelValue?: boolean
  /**
   * 是否可关闭
   * @default true
   */
  closeable?: boolean
  /**
   * 关闭图标
   * @default '$close'
   */
  closeIcon?: string
  /**
   * 是否点击遮罩关闭
   * @default true
   */
  maskClosable?: boolean
  /**
   * 取消按钮文本
   */
  cancelText?: string
  /**
   * 确认按钮文本
   */
  confirmText?: string
}
/**
 * 弹窗组件事件
 */
export interface JvModalEmits {
  (e: 'update:modelValue', value: boolean): void
  /**
   * 关闭
   */
  (e: 'close'): void
  /**
   * 取消
   */
  (e: 'cancel'): void
  /**
   * 确认
   */
  (e: 'confirm'): void
  /**
   * 打开后
   */
  (e: 'openAfter'): void
  /**
   * 关闭后
   */
  (e: 'closeAfter'): void
}

/**
 * 弹窗组件插槽
 */
export interface JvModalSlots {
  default: Slot
  /**
   * 触发器
   */
  trigger: Slot
  /**
   * 头部
   */
  header: Slot
  /**
   * 标题
   */
  title: Slot
  /**
   * 内容
   */
  content: Slot
  /**
   * 底部
   */
  footer: Slot
}

/**
 * 弹窗组件暴露的方法
 */
export interface JvModalExpose {
  open: () => void
  close: () => void
}
