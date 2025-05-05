import { createNamespace } from '@/utils'

export const JVFLEX_NAME = 'JvFlex'
export const bem = createNamespace(JVFLEX_NAME)

/**
 * Flex布局组件
 * 提供灵活的布局能力，基于CSS Flexbox实现
 */
export interface JvFlexProps {
  /**
   * 布局方向
   * @default 'horizontal'
   */
  direction?: DirectionType
  /**
   * 主轴对齐方式
   * @default undefined
   */
  justify?: JustifyType
  /**
   * 交叉轴对齐方式
   * @default undefined
   */
  align?: AlignType
  /**
   * 是否换行
   * @default false
   */
  wrap?: boolean
  /**
   * 元素间距，可以是数字（会自动转换为像素）或者一个数组 [水平间距, 垂直间距]
   * @default 0
   */
  gap?: GapType
  /**
   * 是否为行内布局
   * @default false
   */
  inline?: boolean
  /**
   * 是否翻转布局方向
   * @default false
   */
  reverse?: boolean
  /**
   * 元素间对齐方式（flex-wrap为wrap时的cross-axis对齐）
   * @default undefined
   */
  contentAlign?: ContentAlignType
}
