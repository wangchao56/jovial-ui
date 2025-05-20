import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVPROGRESS_NAME = 'JvProgress'
export const JVCIRCLESVG_NAME = 'CircleSvg'
export const JVLINESVG_NAME = 'LineSvg'
export const bem = createNamespace(JVPROGRESS_NAME)
export const bemCircle = createNamespace(JVCIRCLESVG_NAME)
export const bemLine = createNamespace(JVLINESVG_NAME)

export interface CircleSvgProps {
  /**
   * 进度值（0-100）
   */
  progress?: number
  /**
   * 圆环颜色
   */
  color?: string
  /**
   * 组件宽度
   */
  width?: number
  /**
   * 圆环粗细
   */
  strokeWidth?: number
  /**
   * 轨道颜色
   */
  trackColor?: string
  /**
   * 是否为不确定模式
   */
  indeterminate?: boolean
  /**
   * 描述进度条的元素ID
   */
  ariaDescribedby?: string
  /**
   * 动画持续时间
   */
  animationDuration?: number
}
export interface LineSvgProps {
  /**
   * 进度值（0-100）
   */
  progress?: number
  /**
   * 进度条颜色
   */
  color?: string
  /**
   * 组件宽度
   */
  width?: number
  /**
   * 进度条高度
   */
  height?: number
  /**
   * 轨道颜色
   */
  trackColor?: string
  /**
   * 是否为不确定模式
   */
  indeterminate?: boolean
  /**
   * 是否显示缓冲条
   */
  buffer?: boolean
  /**
   * 缓冲进度（0-100）
   */
  bufferProgress?: number
  /**
   * 缓冲条颜色
   */
  bufferColor?: string
  /**
   * 描述进度条的元素ID
   */
  ariaDescribedby?: string
  /**
   * 是否显示圆角
   */
  rounded?: RoundedType
}
/**
 * progress 属性
 * 用于显示progress
 */
export interface JvProgressProps {
  /**
   * 进度
   */
  progress?: number
  /**
   * 进度条颜色
   */
  color?: string
  /**
   * 进度条宽度
   */
  width?: number
  /**
   * 进度条高度
   */
  height?: number
  /**
   * 进度条形状
   */
  shape?: 'line' | 'circle'
  /**
   * 轨道宽度
   */
  strokeWidth?: number

  /**
   * 轨道颜色
   */
  trackColor?: string
  /**
   * 是否为不确定模式
   */
  indeterminate?: boolean
  /**
   * 是否显示缓冲条
   */
  buffer?: boolean
  /**
   * 缓冲进度（0-100）
   */
  bufferProgress?: number
  /**
   * 缓冲条颜色
   */
  bufferColor?: string
  /**
   * 描述进度条的元素ID
   */
  ariaDescribedby?: string
  /**
   * 是否显示圆角
   */
  rounded?: RoundedType
}
export interface JvProgressSlots {
  text?: Slot
}
