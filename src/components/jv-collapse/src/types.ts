import type { InjectionKey, Ref, Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVCOLLAPSE_NAME = 'JvCollapse'
export const JVCOLLAPSEGROUP_NAME = 'JvCollapseGroup'
export const bem = createNamespace(JVCOLLAPSE_NAME)
export const bemGroup = createNamespace(JVCOLLAPSEGROUP_NAME)
/**
 * collapse 属性
 * 用于显示可折叠的内容区域
 */
export interface JvCollapseProps {
  /**
   * 是否展开
   */
  modelValue?: boolean
  /**
   * 折叠区域标题
   */
  title?: string
  /**
   * 标题图标
   */
  icon?: string
  /**
   * 样式变体
   */
  variant?: 'default' | 'outlined'
  /**
   * 是否显示箭头
   */
  showArrow?: boolean
  /**
   * 动画持续时间，单位毫秒
   */
  duration?: number
  /**
   * 是否懒加载内容
   */
  lazy?: boolean
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
}

export interface JvCollapseEmits {
  /**
   * 更新展开状态
   */
  (e: 'update:modelValue', value: boolean): void
  /**
   * 展开事件
   */
  (e: 'expand'): void
  /**
   * 折叠事件
   */
  (e: 'collapse'): void
}

export interface JvCollapseSlots {
  /**
   * 默认插槽，折叠区域内容
   */
  default: Slot
  /**
   * 头部插槽
   */
  header?: Slot<{
    /**
     * 是否展开
     */
    expanded?: boolean
    /**
     * 是否禁用
     */
    disabled?: boolean
  }>
  /**
   * 标题插槽
   */
  title?: Slot
  /**
   * 图标插槽
   */
  prepend?: Slot
  /**
   * 箭头图标插槽
   */
  append?: Slot
}
export interface JvCollapseGroupProps {
  /**
   * 是否手风琴模式（同时只能展开一个面板）
   */
  accordion?: boolean
  /**
   * 当前展开的折叠面板的 name 列表
   */
  modelValue?: string[]
  /**
   * 样式变体
   */
  variant?: 'default' | 'outlined'
  /**
   * 是否显示分割线
   */
  divider?: boolean
  /**
   * 是否圆角
   */
  rounded?: boolean
  /**
   * 是否使用阴影
   */
  elevated?: boolean
}

export interface JvCollapseGroupEmits {
  /**
   * 展开状态变化时触发
   */
  (e: 'update:modelValue', names: string[]): void
  /**
   * 当展开状态变化时触发
   */
  (e: 'change', names: string[]): void
}

export interface CollapseGroupContext {
  accordion: boolean
  expandedItems: Ref<string[]>
  handleItemToggle: (name: string, expanded: boolean) => void
}
export const collapseGroupInjectionKey: InjectionKey<CollapseGroupContext> = Symbol('collapseGroup')
