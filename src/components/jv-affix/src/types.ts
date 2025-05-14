export const JVAFFIX_NAME = 'JvAffix'

/**
 * 固钉组件
 * 用于将内容固定在页面的特定位置
 */
export interface JvAffixProps {
  /**
   * 距离窗口顶部的偏移量（单位：像素）
   * @default undefined
   */
  top?: number

  /**
   * 距离窗口底部的偏移量（单位：像素）
   * @default undefined
   */
  bottom?: number

  /**
   * 距离窗口左侧的偏移量（单位：像素）
   * @default undefined
   */
  left?: number

  /**
   * 距离窗口右侧的偏移量（单位：像素）
   * @default undefined
   */
  right?: number

  /**
   * 指定固钉的容器元素，默认为 window
   * @default undefined
   */
  target?: 'window' | 'body' | HTMLElement

  /**
   * 固定时的 z-index
   * @default 100
   */
  zIndex?: number

  /**
   * 固定的定位方式
   * @default 'fixed'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export interface JvAffixEmits {
  /**
   * 固钉状态改变时触发
   */
  (e: 'change', fixed: boolean): void

  /**
   * 滚动时触发
   */
  (e: 'scroll', event: Event, scrollInfo: { scrollTop: number, fixed: boolean }): void
}

export interface JvAffixSlots {
  /**
   * 默认插槽，固钉内容
   */
  default: () => any
}

export interface JvAffixExpose {
  /**
   * 手动更新固钉位置
   */
  updatePosition: () => void

  /**
   * 刷新固钉状态和位置
   */
  refresh: () => void
}
