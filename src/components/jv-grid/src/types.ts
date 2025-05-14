import type { Breakpoint } from '@/hooks/useBreakpoints'
import { createNamespace } from '@/utils'

export const JVGRID_NAME = 'JvGrid'
export const bem = createNamespace(JVGRID_NAME)

export type GridGap = number | string | [number | string, number | string]

export interface JvGridProps {
  // 列数
  cols?: number
  // 响应式列数
  responsiveCols?: Partial<Record<Breakpoint, number>>
  // 行数
  rows?: number
  // 栅格间距
  gap?: GridGap
  // 响应式间距
  responsiveGap?: Partial<Record<Breakpoint, GridGap>>
  // 是否填充父容器
  fill?: boolean
  // 高度
  height?: number | string
  // 宽度
  width?: number | string
}

export interface JvGridItemPosition {
  rowStart?: number
  rowEnd?: number
  colStart?: number
  colEnd?: number
  rowSpan?: number
  colSpan?: number
}

export interface JvGridSlots {
  // 默认插槽
  default?: (props: {}) => any
}
