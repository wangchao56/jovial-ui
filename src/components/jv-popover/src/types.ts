import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVPOPOVER_NAME = 'JvPopover'
export const bem = createNamespace(JVPOPOVER_NAME)

/** 触发方式 */
export enum JvTriggerMethod {
  CLICK = 'click',
  HOVER = 'hover',
  FOCUS = 'focus',
  CONTEXTMENU = 'contextmenu',
  BLUR = 'blur'
}

export type PlacementType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'

/** 放置策略类型 */
export type PlacementStrategy = 'flip' | 'prevent-overflow' | 'auto' | 'fixed'

export interface JvPopoverProps {
  /** 是否手动控制 */
  manual?: boolean
  /** 位置 */
  placement?: PlacementType
  /** 是否显示箭头 */
  arrow?: boolean
  /** 偏移量 */
  offset?: number | [number, number]
  /** 偏移方式1：相对于触发者定位进行fixed定位 2：相对于视口fixed定位  */
  offsetTarget?: 'trigger' | 'viewport'
  /** 是否显示 */
  show?: boolean
  /** 参考矩形区域，提供此参数将不使用触发器元素 */
  referenceRect?: DOMRect | null
  /** 放置策略：flip(翻转), prevent-overflow(防止溢出), auto(自动), fixed(固定) */
  placementStrategy?: PlacementStrategy
  /** 箭头尺寸 */
  arrowSize?: number
}

export interface JvPopoverEmits {
  /** 更新显示状态 (自控) */
  (e: 'update:show', value: boolean): void
  /** 更新实际放置位置 */
  (e: 'update:actualPlacement', value: string): void
}

export interface JvPopoverSlots {
  /** 内容 */
  default: Slot
}

export interface JvPopoverExpose {
  /** 更新显示状态 (自控) */
  toggle: (force?: boolean) => void
  /** 更新显示状态 (自控) */
  show: () => void
  /** 更新显示状态 (自控) */
  hide: () => void
}
