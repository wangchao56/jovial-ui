import { createNamespace } from '@/utils'

export const JVDIVIDER_NAME = 'JvDivider'
export const bem = createNamespace(JVDIVIDER_NAME)

export interface JvDividerProps {
  /**
   * 分割线颜色
   * @default 'var(--jv-theme-border)'
   */
  color?: string

  /**
   * 分割线粗细
   * @default '1px'
   */
  size?: string

  /**
   * 是否垂直分割线
   * @default false
   */
  vertical?: boolean

  /**
   * 是否虚线
   * @default false
   */
  dashed?: boolean

  /**
   * 是否内嵌
   * @default false
   */
  inset?: boolean

  /**
   * 分割线长度
   */
  length?: string | number

  /**
   * 透明度
   * @default 1
   */
  opacity?: number

  /**
   * 分割线变体
   * @default 'solid'
   */
  variant?: 'solid' | 'dashed' | 'dotted' | 'double'

  /**
   * 间距大小
   * @default 'md'
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * 自定义类名
   */
  class?: string | string[] | Record<string, boolean>

  /**
   * 自定义样式
   */
  style?: string | Record<string, string>
}

export interface JvDividerSlots {
  /**
   * 默认插槽，用于显示文本内容
   */
  default?: (props: {}) => any
}
