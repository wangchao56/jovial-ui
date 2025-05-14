import { createNamespace } from '@/utils'

export const JVTYPOGRAPHY_NAME = 'JvTypography'
export const JVTEXT_NAME = 'JvText'
export const JVPARAGRAPH_NAME = 'JvParagraph'
export const JVLINK_NAME = 'JvLink'
export const bem = createNamespace(JVTYPOGRAPHY_NAME)

// Material Design文本类型
export type MaterialTextVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' // 标题类
  | 'subtitle1' | 'subtitle2' // 副标题类
  | 'body1' | 'body2' // 正文类
  | 'button' | 'caption' | 'overline' // 按钮与标签类

// 颜色类型
export type ColorType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'default' | string

// HTML文本标签类型
export type TextElementVariant =
  | 'p' | 'span' | 'div' | 'strong' | 'em' | 'mark' | 'small'
  | 'del' | 'ins' | 'sub' | 'sup' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

// 尺寸类型
export type SizeType = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'

// 字重类型
export type WeightType = 'light' | 'regular' | 'medium' | 'semibold' | 'bold'

// 行高类型
export type LineHeightType = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'

// 对齐类型
export type AlignType = 'left' | 'center' | 'right' | 'justify'

export interface JvTitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  color?: ColorType
  weight?: WeightType
  lineHeight?: LineHeightType
  align?: AlignType
  gutterBottom?: boolean
  text?: string
}

export interface JvTextProps {
  /**
   * 大小
   */
  size?: SizeType
  /**
   * Material Design文本变体
   * 设置后会使用Material Design的排版规范
   */
  variant?: TextElementVariant
  /**
   * 颜色
   */
  color?: ColorType
  /**
   * 是否为次要文本
   */
  secondary?: boolean
  /**
   * 字重
   */
  weight?: WeightType
  /**
   * 行高
   */
  lineHeight?: LineHeightType
  /**
   * 文本对齐方式
   */
  align?: AlignType
  /**
   * 文本内容
   */
  text?: string | number
  /**
   * 单行文本省略，设置大于0的数字表示最大行数
   */
  ellipsis?: number | boolean
  /**
   * 是否截断多余文本
   */
  truncate?: boolean
}

export interface JvParagraphProps {
  /**
   * 文本大小 默认14px
   */
  size?: SizeType | number | string
  /**
   * 颜色
   */
  color?: ColorType
  /**
   * Material Design文本变体
   */
  mdVariant?: MaterialTextVariant
  /**
   * 多行文本省略，设置大于0的数字表示最大行数
   */
  ellipsis?: number | boolean
  /**
   * 行高
   */
  lineHeight?: LineHeightType
  /**
   * 首行缩进 单位：em
   */
  indent?: number
  /**
   * 行数 默认不限制行数
   */
  lines?: number
  /**
   * 对齐方式 默认 justify
   */
  align?: AlignType
  /**
   * 文本内容
   */
  text?: string | number
}

export interface JvLinkProps {
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  size?: SizeType
  type?: ColorType
  underline?: boolean
  disabled?: boolean
}

/**
 * typography 属性
 * 用于显示typography
 */
export interface JvTypographyProps {

}

export interface JvTypographySlots {

}
