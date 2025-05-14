import type { JvAvatarProps } from '@/components/jv-avatar/src/types'
import type { JvIconProps } from '@/components/jv-icon/src/types'
import type { JvImageProps } from '@/components/jv-image/src/types'
import type { JvTextProps, JvTitleProps } from '@/components/jv-typography'
import type { InjectionKey, Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVCARD_NAME = 'JvCard'
export const JVCARDACTIONS_NAME = 'JvCardActions'
export const JVCARDHEADER_NAME = 'JvCardHeader'
export const JVCARDCONTENT_NAME = 'JvCardContent'
export const JVCARDMEDIA_NAME = 'JvCardMedia'
export const bem = createNamespace(JVCARD_NAME)

export type CardVariant = 'elevated' | 'outlined' | 'tonal' | 'filled' | 'flat' | 'link'
export type CardColorType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type CardRounded = 'rounded' | 'roundedSm' | 'roundedLg' | 'roundedXl' | 'roundedFull' | 'none'
export type CardActionsAlign = 'start' | 'end' | 'center' | 'space-between' | 'space-around'
export type CardOrientation = 'vertical' | 'horizontal'

export interface JvCardProps {
  /**
   * 卡片标签
   * @default 'div'
   */
  tag?: string

  /**
   * 卡片链接
   */
  href?: string

  /**
   * 卡片链接目标
   */
  target?: '_blank' | '_self' | '_parent' | '_top'

  /**
   * 卡片链接 alt 属性
   */
  alt?: string

  /**
   * 卡片标题
   */
  title?: string

  /**
   * 卡片副标题
   */
  subtitle?: string

  /**
   * 卡片描述
   * 用于在卡片头部提供详细说明文本
   */
  description?: string

  /**
   * 卡片内容
   */
  content?: string

  /**
   * 卡片最大宽度
   */
  maxWidth?: number

  /**
   * 卡片最小宽度
   */
  minWidth?: number

  /**
   * 卡片高度
   */
  height?: number

  /**
   * 卡片图片
   */
  image?: string | JvImageProps

  /**
   * 卡片颜色类型
   * @default 'default'
   */
  color?: CardColorType
  /**
   * 卡片变体
   * @default 'elevated'
   */
  variant?: CardVariant

  /**
   * 卡片圆角
   * @default 'rounded'
   */
  rounded?: CardRounded

  /**
   * 卡片是否有边框
   * @default false
   */
  bordered?: boolean

  /**
   * 卡片是否可点击
   * @default false
   */
  clickable?: boolean

  /**
   * 卡片是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 卡片内边距
   * @default 'md'
   */
  padding?: CardPadding

  /**
   * 操作按钮布局
   * @default 'end'
   */
  actionsAlign?: CardActionsAlign

  /**
   * 卡片方向
   * @default 'vertical'
   */
  orientation?: CardOrientation

  /**
   * 卡片阴影
   * @default true
   */
  elevation?: boolean | number

  /**
   * 卡片是否平面（无阴影）
   * @default false
   */
  flat?: boolean

  /**
   * 卡片是否加载中
   * @default false
   */
  loading?: boolean

  /**
   * 填充模式
   * @default 'cover'
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'

  /**
   * 卡片头部属性
   */
  headerProps?: JvCardHeaderProps

  /**
   * 卡片内容属性
   */
  contentProps?: JvCardContentProps

  /**
   * 卡片操作区属性
   */
  actionsProps?: JvCardActionsProps
}

/**
 * 卡片头部属性
 */
export interface JvCardHeaderProps {
  /**
   * 卡片标题
   */
  title?: JvTitleProps['text'] | JvTitleProps

  /**
   * 卡片副标题
   */
  subtitle?: JvTextProps['text'] | JvTextProps
  /**
   * 卡片描述
   */
  description?: string

  /**
   * 卡片变体
   * @default 'elevated'
   */
  variant?: 'elevated' | 'outlined' | 'tonal' | 'flat'
  /**
   * 卡片图标
   */
  icon?: JvIconProps['name'] | JvIconProps

  /**
   * 卡片头像
   */
  avatar?: JvAvatarProps['image'] | JvAvatarProps
  /**
   * 卡片头部图片
   */
  image?: string | JvImageProps
  /**
   * 是否显示分割线
   * @default false
   */
  divider?: boolean
}

export interface JvCardHeaderSlots {
  /**
   * 卡片头部标题
   */
  prepend?: Slot
  /**
   * 卡片头部副标题
   */
  append?: Slot
  /**
   * 卡片头部标题
   */
  title?: Slot
  /**
   * 卡片头部副标题
   */
  subtitle?: Slot
  /**
   * 卡片头部描述
   */
  description?: Slot
}

/**
 * 卡片内容属性
 */
export interface JvCardContentProps {
  /**
   * 卡片内容
   */
  content?: string

  /**
   * 内容内边距
   * @default 'md'
   */
  padding?: CardPadding

  /**
   * 是否显示分割线
   * @default false
   */
  divider?: boolean
}
/**
 * 卡片操作区属性
 */
export interface JvCardActionsProps {
  /**
   * 操作按钮对齐方式
   * @default 'end'
   */
  align?: CardActionsAlign

  /**
   * 是否显示分割线
   * @default false
   */
  divider?: boolean

  /**
   * 操作区内边距
   * @default 'sm'
   */
  padding?: CardPadding

  /**
   * 操作按钮间距
   * @default 8
   */
  gap?: number | string
}

/**
 * 卡片媒体属性
 */
export interface JvCardMediaProps {
  /**
   * 媒体高度
   */
  height?: string | number

  /**
   * 媒体宽度
   */
  width?: string | number

  /**
   * 媒体图片
   */
  image?: string | JvImageProps
  /**
   * 媒体宽高比
   * @default '16 / 9'
   */
  aspectRatio?: string
  /**
   * 填充模式
   * @default 'cover'
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'

  /**
   * 是否显示分割线
   * @default false
   */
  divider?: boolean
}

export interface JvCardEmits {
  (e: 'click', event: MouseEvent): void
}

export interface JvCardSlots {
  /**
   * 卡片默认内容
   */
  default?: Slot
  /**
   * 内容
   */
  content?: Slot
  /**
   * 操作区
   */
  actions?: Slot
  /**
   * 卡片头部标题
   */
  title?: Slot
  /**
   * 卡片头部副标题
   */
  subtitle?: Slot
  /**
   * 卡片头部描述
   */
  description?: Slot
  /**
   *  媒体
   */
  media?: Slot
}

export const JvCardContextKey: InjectionKey<{
  cardId: string
}> = Symbol('jv-card')
