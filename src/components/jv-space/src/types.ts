import { createNamespace } from '@/utils'

export const JVSPACE_NAME = 'JvSpace'
export const bem = createNamespace(JVSPACE_NAME)

export interface JvSpaceProps {
  // 间距大小
  gap?: number | [number, number]
  // 排列方向
  direction?: 'horizontal' | 'vertical'
  // 对齐方式
  align?: 'start' | 'end' | 'center' | 'baseline'
  // 主轴对齐方式
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  // 是否换行
  wrap?: boolean
  // 是否填充父容器
  fill?: boolean
  // ARIA角色
  role?: string
  // ARIA标签
  ariaLabel?: string
  // ARIA标签ID
  ariaLabelledby?: string
  // ARIA描述ID
  ariaDescribedby?: string
}
