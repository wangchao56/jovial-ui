import { createNamespace } from '@/utils'

export const JVLIST_NAME = 'JvList'
export const bem = createNamespace(JVLIST_NAME)

/**
 * list 属性
 * 用于显示list
 */
export interface JvListProps {
  /**
   * 列表边框类型
   */
  bordered?: boolean
  /**
   * 列表形状：方形、圆角
   */
  rounded?: boolean | string
  /**
   * 列表密度
   */
  dense?: boolean
  /**
   * 列表禁用状态
   */
  disabled?: boolean
  /**
   * 列表分割线
   */
  divided?: boolean
  /**
   * 列表背景色类型
   */
  color?: string
  /**
   * 列表悬浮效果
   */
  hover?: boolean
  /**
   * 列表最大高度
   */
  maxHeight?: string | number
}

export interface JvListSlots {
  /**
   * 默认插槽，用于放置列表项
   */
  default: () => any
  /**
   * 列表头部插槽
   */
  header?: () => any
  /**
   * 列表底部插槽
   */
  footer?: () => any
  /**
   * 列表空状态插槽
   */
  empty?: () => any
}
