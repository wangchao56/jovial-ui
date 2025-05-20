import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVDROPDOWN_NAME = 'JvDropdown'
export const JVDROPDOWNITEM_NAME = 'JvDropdownItem'
export const bem = createNamespace(JVDROPDOWN_NAME)

/**
 * 放置策略类型
 */
export type PlacementStrategy = 'flip' | 'prevent-overflow' | 'auto' | 'fixed'

/**
 * dropdown 属性
 * 用于显示下拉菜单
 */
export interface JvDropdownProps {
  /** 是否手动控制 */
  manual?: boolean
  /** 位置 */
  placement?: PlacementType
  /** 是否显示箭头 */
  arrow?: boolean
  /** 偏移量 */
  offset?: number | [number, number]
  /** 是否显示 */
  show?: boolean
  /** 放置策略：flip(翻转), prevent-overflow(防止溢出), auto(自动), fixed(固定) */
  placementStrategy?: PlacementStrategy
  /** 箭头尺寸 */
  arrowSize?: number
  /** 触发方式 */
  trigger?: 'click' | 'hover' | 'manual'
  /** 延迟关闭时间(毫秒) */
  hideDelay?: number
  /** 下拉菜单宽度，'auto'表示自动适应内容宽度，'trigger'表示与触发元素同宽 */
  width?: number | 'auto' | 'trigger'
  /** 是否禁用 */
  disabled?: boolean
}

/**
 * dropdown 触发事件
 */
export interface JvDropdownEmits {
  /** 更新显示状态 (自控) */
  (e: 'update:show', value: boolean): void
  /** 选项被点击时触发 */
  (e: 'select', value: any): void
  /** 下拉菜单显示后触发 */
  (e: 'shown'): void
  /** 下拉菜单隐藏后触发 */
  (e: 'hidden'): void
}

/**
 * dropdown 插槽
 */
export interface JvDropdownSlots {
  /** 默认插槽，下拉菜单内容 */
  default: Slot
  /** 触发器插槽 */
  trigger: Slot
  /** 空状态插槽，当没有选项时显示 */
  empty?: Slot
}

/**
 * dropdown 暴露方法
 */
export interface JvDropdownExpose {
  /** 切换显示状态 */
  toggle: (force?: boolean) => void
  /** 显示下拉菜单 */
  show: () => void
  /** 隐藏下拉菜单 */
  hide: () => void
}

/**
 * dropdown-item 属性
 */
export interface JvDropdownItemProps {
  /** 是否禁用 */
  disabled?: boolean
  /** 是否为当前激活项 */
  active?: boolean
  /** 选项值 */
  value?: any
  /** 是否为分隔线 */
  divider?: boolean
}

/**
 * dropdown-item 事件
 */
export interface JvDropdownItemEmits {
  /** 点击事件 */
  (e: 'click', value?: any): void
}

/**
 * dropdown-item 插槽
 */
export interface JvDropdownItemSlots {
  /** 默认插槽 */
  default: Slot
}
