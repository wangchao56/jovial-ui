import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVBREADCRUMBS_NAME = 'JvBreadcrumbs'
export const JVBREADCRUMB_ITEM_NAME = 'JvBreadcrumbItem'
export const bem = createNamespace('jv-breadcrumbs')
export const itemBem = createNamespace('jv-breadcrumb-item')

/**
 * 面包屑项的配置接口
 */
export interface BreadcrumbItem {
  /**
   * 面包屑项文本
   */
  text: string
  /**
   * 面包屑项链接
   */
  to?: string
  /**
   * 路由匹配是否精确
   */
  exact?: boolean
  /**
   * 自定义图标
   */
  icon?: string
  /**
   * 禁用状态
   */
  disabled?: boolean
  /**
   * 附加数据
   */
  [key: string]: any
}

/**
 * breadcrumbs 属性
 * 用于显示breadcrumbs
 */
export interface JvBreadcrumbsProps {
  /**
   * 面包屑项数组
   */
  items?: BreadcrumbItem[]
  /**
   * 分隔符
   */
  separator?: string
  /**
   * 是否使用图标作为分隔符
   */
  separatorIcon?: string
  /**
   * 是否显示首页
   */
  showHome?: boolean
  /**
   * 首页文本
   */
  homeText?: string
  /**
   * 首页链接
   */
  homeTo?: string
  /**
   * 首页图标
   */
  homeIcon?: string
  /**
   * 最大显示层级
   */
  maxItems?: number
}

export interface JvBreadcrumbsSlots {
  /**
   * 默认插槽
   */
  default: Slot
  /**
   * 分隔符插槽
   */
  separator: Slot
  /**
   * 首页插槽
   */
  home: Slot
}

export interface JvBreadcrumbItemProps {
  /**
   * 链接
   */
  to?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否为当前项
   */
  active?: boolean
  /**
   * 文本
   */
  text?: string
  /**
   * 图标
   */
  icon?: string
}

export interface JvBreadcrumbItemSlots {
  /**
   * 默认插槽
   */
  default: Slot
  /**
   * 图标插槽
   */
  icon: Slot
}

export interface JvBreadcrumbItemEmits {
  (e: 'click', event: MouseEvent): void
}
