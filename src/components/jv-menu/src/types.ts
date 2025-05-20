import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVMENU_NAME = 'JvMenu'
export const bem = createNamespace(JVMENU_NAME)

/**
 * 菜单项类型
 */
export type MenuItemType = 'item' | 'group' | 'submenu' | 'divider'

/**
 * 菜单项数据结构
 * 支持普通菜单项、分组、子菜单和分割线
 */
export interface MenuItem {
  /**
   * 菜单项类型
   * - item: 普通菜单项
   * - group: 菜单分组
   * - submenu: 子菜单
   * - divider: 分割线
   */
  type: MenuItemType
  /**
   * 菜单项ID
   */
  id?: string
  /**
   * 菜单项标题/文本
   */
  title?: string
  /**
   * 图标名称
   */
  icon?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否选中/激活
   */
  active?: boolean
  /**
   * 子菜单项
   */
  children?: MenuItem[]
  /**
   * 子菜单是否展开（仅type为submenu时有效）
   */
  expanded?: boolean
  /**
   * 是否显示箭头（仅type为submenu时有效）
   */
  showArrow?: boolean
  /**
   * 点击处理函数
   */
  onClick?: (item: MenuItem) => void
  /**
   * 附加数据
   */
  data?: Record<string, any>
}

/**
 * menu 属性
 * 用于显示menu
 */
export interface JvMenuProps {
  /**
   * 菜单项
   */
  items?: MenuItem[]
  /**
   * 菜单是否可见
   */
  modelValue?: boolean
  /**
   * 菜单位置
   */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  /**
   * 触发方式
   */
  trigger?: 'click' | 'hover' | 'manual'
  /**
   * 菜单偏移量
   */
  offset?: number
  /**
   * 是否显示箭头
   */
  arrow?: boolean
  /**
   * 是否禁用菜单
   */
  disabled?: boolean
  /**
   * 菜单宽度
   */
  width?: string | number
  /**
   * 菜单最大高度
   */
  maxHeight?: string | number
  /**
   * z-index
   */
  zIndex?: number
  /**
   * 点击外部是否关闭菜单
   */
  closeOnClickOutside?: boolean
  /**
   * 按ESC键是否关闭菜单
   */
  closeOnEsc?: boolean
  /**
   * 过渡动画名称
   */
  transition?: string
  /**
   * 传送门挂载位置
   */
  teleport?: string
}

export interface JvMenuEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
  /**
   * 点击菜单外部时触发
   */
  (e: 'clickOutside', event: MouseEvent): void
  /**
   * 菜单项点击事件
   */
  (e: 'itemClick', item: MenuItem): void
}

export interface JvMenuSlots {
  /**
   * 默认插槽，用于菜单触发元素
   */
  header: Slot
  /**
   * 菜单内容插槽
   */
  content: Slot
  /**
   * 自定义箭头插槽
   */
  arrow?: Slot
  /**
   * 自定义菜单项渲染
   */
  item?: Slot
  /**
   * 自定义菜单组渲染
   */
  group?: Slot
  /**
   * 自定义子菜单渲染
   */
  submenu?: Slot
  /**
   * 空状态插槽
   */
  empty?: Slot
}

// 为JvMenuGroup添加类型定义
export interface JvMenuGroupProps {
  /**
   * 分组标题
   */
  title?: string
  /**
   * 是否禁用整个分组
   */
  disabled?: boolean
}

export interface JvMenuGroupSlots {
  /**
   * 默认插槽，用于菜单项内容
   */
  default: Slot
  /**
   * 标题插槽，用于自定义标题
   */
  title?: Slot
}

// 为JvSubMenu添加类型定义
export interface JvSubMenuProps {
  /**
   * 子菜单ID，用于aria-labelledby属性
   */
  id?: string
  /**
   * 子菜单标题
   */
  title?: string
  /**
   * 是否禁用子菜单
   */
  disabled?: boolean
  /**
   * 是否默认展开
   */
  expanded?: boolean
  /**
   * 子菜单图标
   */
  icon?: string
  /**
   * 是否显示箭头图标
   */
  showArrow?: boolean
  /**
   * 是否懒加载子菜单内容
   * @default true
   */
  lazy?: boolean
}

export interface JvSubMenuSlots {
  /**
   * 默认插槽，用于子菜单内容
   */
  default: Slot
  /**
   * 标题插槽，用于自定义标题
   */
  title?: Slot
  /**
   * 箭头插槽，用于自定义箭头
   */
  arrow?: Slot
}

// 为JvMenuItem添加类型定义
export interface JvMenuItemProps {
  /**
   * 菜单项ID
   */
  id?: string
  /**
   * 菜单项标题
   */
  title?: string
  /**
   * 菜单项图标
   */
  icon?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否选中
   */
  active?: boolean
  /**
   * 附加数据
   */
  data?: Record<string, any>
}

export interface JvMenuItemEmits {
  /**
   * 点击菜单项时触发
   */
  (e: 'click', item: JvMenuItemProps): void
}

export interface JvMenuItemSlots {
  /**
   * 默认插槽，用于菜单项内容
   */
  default: Slot
  /**
   * 图标插槽
   */
  icon?: Slot
}
