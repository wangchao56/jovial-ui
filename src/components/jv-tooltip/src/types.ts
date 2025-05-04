import type { PlacementStrategy } from '@/components/jv-popover/src/types'
import { createNamespace } from '@/utils'

export const JVTOOLTIP_NAME = 'JvTooltip'
export const bem = createNamespace(JVTOOLTIP_NAME)

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

export type TriggerMethodType =
  | 'hover'
  | 'click'
  | 'focus'
  | 'contextmenu'
  | 'blur'

export interface JvTooltipProps {
  /**
   * 提示内容
   */
  content?: string
  /**
   * 提示位置
   */
  placement?: PlacementType
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 最大宽度
   */
  maxWidth?: string | number
  /**
   * 触发方式
   */
  triggerMethod?: TriggerMethodType
  /**
   * 是否显示箭头
   */
  showArrow?: boolean
  /**
   * 偏移量
   */
  offset?: number | [number, number]
  /**
   * 参考矩形区域，提供此参数将不使用触发器元素
   */
  referenceRect?: DOMRect | null
  /**
   * 是否显示
   */
  show?: boolean
  /**
   * 放置策略：flip(翻转), prevent-overflow(防止溢出), auto(自动), fixed(固定)
   */
  placementStrategy?: PlacementStrategy
}
