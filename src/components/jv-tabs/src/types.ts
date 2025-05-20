import type { InjectionKey, Ref, Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVTABS_NAME = 'JvTabs'
export const bem = createNamespace(JVTABS_NAME)

/**
 * 标签数据项
 */
export interface TabNavItem {
  /**
   * 标签的唯一值
   */
  value: string | number
  /**
   * 标签显示的文本
   */
  label: string
  /**
   * 是否禁用标签
   */
  disabled?: boolean
  /**
   * 标签图标
   */
  icon?: string
  /**
   * 标签徽标内容
   */
  badge?: number | string | boolean
  /**
   * 标签对应的内容
   */
  content?: string | (() => any)
}

/**
 * tabs 属性
 * 用于显示tabs
 */
export interface JvTabsProps {
  /**
   * 当前激活的标签值，支持v-model
   * @default undefined
   */
  modelValue?: string | number
  /**
   * 标签样式变体
   * @default 'default'
   */
  variant?: 'default' | 'segmented' | 'pills' | 'underline'
  /**
   * 标签颜色
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  /**
   * 标签对齐方式
   * @default 'start'
   */
  alignTabs?: 'start' | 'center' | 'end' | 'stretch'
  /**
   * 标签是否自动增长填充可用空间
   * @default false
   */
  grow?: boolean
  /**
   * 是否垂直排列标签
   * @default false
   */
  vertical?: boolean
  /**
   * 是否启用切换动画
   * @default true
   */
  animated?: boolean
  /**
   * 标签数据项数组，用于自动生成标签和面板
   * @default []
   */
  items?: TabNavItem[]
  /**
   * 面板是否启用延迟加载，仅在激活时加载内容
   * @default false
   */
  lazy?: boolean
}

export interface JvTabsSlots {
  /**
   * 默认插槽，用于放置JvTabNav和JvTabPanel组件
   */
  default: () => any
}

export interface JvTabsEmits {
  /**
   * 更新modelValue事件
   */
  (e: 'update:modelValue', value: string | number): void
  /**
   * 标签变更事件
   */
  (e: 'change', newValue: string | number, oldValue: string | number): void
}

export interface JvTabsExpose {
  /**
   * 使组件获得焦点
   */
  focus: () => void
}

export interface JvTabNavProps {
  /**
   * 滑块指示器位置
   * @default 'bottom'
   */
  sliderPosition?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * 是否显示滑块指示器
   * @default true
   */
  sliderVisible?: boolean
  /**
   * 标签超出容器时是否可滚动
   * @default true
   */
  scrollable?: boolean
  /**
   * 标签数据项数组，用于自动生成标签
   * @default []
   */
  items?: TabNavItem[]
}

export interface JvTabNavSlots {
  /**
   * 默认插槽，用于放置JvTab组件
   */
  default: Slot
}

export interface JvTabPanelProps {
  /**
   * 面板的唯一值，与对应标签的value匹配
   */
  value?: string | number
  /**
   * 面板的名称
   */
  name?: string
  /**
   * 是否启用延迟加载，仅在激活时加载内容
   */
  lazy?: boolean
}

/**
 * tabs 上下文
 */
export interface JvTabsContext {
  activeTab: Ref<string | number>
  updateActiveTab: (value: string | number) => void
  variant: Ref<'default' | 'segmented' | 'pills' | 'underline'>
  color: Ref<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'>
  vertical: Ref<boolean>
  // 布局方向
  direction: Ref<'horizontal' | 'vertical'>
  // 标签位置
  labelPosition: Ref<'top' | 'bottom' | 'left' | 'right'>
  // 更新tabs
  updateTabs: (tabs: JvTabPanelProps[]) => void
  // 添加tabPanel
  addTabPanel: (tabPanel: JvTabPanelProps) => void
  // 移除tabPanel
  removeTabPanel: (tabPanel: JvTabPanelProps) => void
  // 更新navItem的offset
  updateNavItemOffset: (offset: {
    offsetLeft: number
    offsetTop: number
    offsetWidth: number
    offsetHeight: number
  }) => void
}

export const JvTabsContextKey: InjectionKey<JvTabsContext> = Symbol('jv-tabs-context')
