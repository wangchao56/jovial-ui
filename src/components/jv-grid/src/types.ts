import type { Breakpoint } from '@/hooks/useBreakpoints'
import { createNamespace } from '@/utils'

export const JVGRID_NAME = 'JvGrid'
export const bem = createNamespace(JVGRID_NAME)

export interface JvGridProps {
  // 列数
  cols?: number | string
  // 响应式列数
  responsiveCols?: Partial<Record<Breakpoint, number>>
  // 行数
  rows?: number | string
  // 响应式行数
  responsiveRows?: Partial<Record<Breakpoint, number>>
  // 行间距
  rowGap?: number | string
  // 响应式行间距
  responsiveRowGap?: Partial<Record<Breakpoint, number | string>>
  // 列间距
  colGap?: number | string
  // 响应式列间距
  responsiveColGap?: Partial<Record<Breakpoint, number | string>>
  // 栅格间距，可以是单个值或者[行间距, 列间距]
  gap?: GapType
  // 响应式间距
  responsiveGap?: Partial<
    Record<Breakpoint, number | string | [number | string, number | string]>
  >
  // 标题
  header?: string
  // 子标题
  subheader?: string
  // 自动填充
  autoFill?: boolean
  // 是否填充父容器
  fill?: boolean
  // 高度
  height?: number | string
  // 宽度
  width?: number | string
  // 内边距
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  // 圆角风格
  rounded?: 'rounded' | 'roundedSm' | 'roundedLg' | 'roundedXl' | 'roundedFull'
  // 是否有边框
  bordered?: boolean
  // 是否禁用
  disabled?: boolean
  // 是否可点击
  clickable?: boolean
  // 颜色类型
  colorType?: ColorType
  // 变体
  variant?: Extract<Variant, 'elevated' | 'outlined' | 'tonal'>
  // ARIA角色
  role?: string
}

export interface JvGridItemPosition {
  rowStart?: number | string
  rowEnd?: number | string
  colStart?: number | string
  colEnd?: number | string
  rowSpan?: number
  colSpan?: number
}

export interface JvGridSlots {
  // 头部插槽
  header?: (props: {}) => any
  // 子标题插槽
  subheader?: (props: {}) => any
  // 默认插槽
  default?: (props: {}) => any
  // 底部插槽
  footer?: (props: {}) => any
}
