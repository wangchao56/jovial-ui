import type { CSSProperties, Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVOVERLAY_NAME = 'JvOverlay'

export const bem = createNamespace(JVOVERLAY_NAME)
export interface JvOverlayProps {
  // 定义组件属性
  target: 'viewport' | 'parent'
  /**
   * 是否显示遮罩层
   */
  showMask?: boolean
  /**
   * 遮罩层z-index
   */
  maskZIndex?: number
  /**
   * 默认z-index
   */
  defaultZIndex?: number
  /**
   * 自定义样式
   */
  class?: string
}

export interface JvOverlayEmits {
  (e: 'update:modelValue', value: boolean): void
  /**
   * 离开后触发
   */
  (e: 'closeAfter'): void
  /**
   * 打开后触发
   */
  (e: 'openAfter'): void

  /**
   * 点击遮罩层触发
   */
  (e: 'clickOverlay'): void
}

export interface JvOverlaySolts {
  default: Slot<{ style: CSSProperties }>
}

// 定义组件暴露的方法
export interface JvOverlayExpose {
  open: () => void
  close: () => void
}
