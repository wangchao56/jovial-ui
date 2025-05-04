import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVDRAWER_NAME = 'JvDrawer'
export const bem = createNamespace(JVDRAWER_NAME)

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export interface JvDrawerProps {
  /**
   * 是否显示
   */
  modelValue?: boolean
  /**
   * 位置
   */
  placement?: DrawerPlacement
  /**
   * 大小
   */
  size?: string | number
  /**
   * 标题
   */
  title?: string
  /**
   * 关闭图标
   */
  closeIcon?: string
  /**
   * 是否可关闭
   */
  closeable?: boolean
  /**
   * 是否点击遮罩关闭
   */
  maskClosable?: boolean
  /**
   * 遮罩层z-index
   */
  zIndex?: number
}

export interface JvDrawerEmits {
  /**
   * 更新是否显示
   */
  (e: 'update:modelValue', value: boolean): void
  /**
   * 打开
   */
  (e: 'open'): void
  /**
   * 关闭
   */
  (e: 'close'): void
  /**
   * 打开后
   */
  (e: 'openAfter'): void
  /**
   * 关闭后
   */
  (e: 'closeAfter'): void
}

export interface JvDrawerSolts {
  default: Slot
}
export interface JvDrawerExpose {
  open: () => void
  close: () => void
}
