import type { Slot } from 'vue'
import type { JvIconProps } from '@/components/jv-icon/src/types'
import { createNamespace } from '@/utils'

export const JVBUTTON_NAME = 'JvButton' // 组件名称，用于注册组件，必须和文件名相同，否则会报错，并且组件名称必须是 PascalCase 形式，即首字母大写，例如：JvButton，JvButtonIte
export const bem = createNamespace(JVBUTTON_NAME) // 创建组件的 bem 命名空间，用于生成组件的 class 名称，例如：jv-button，jv-button--primary，jv-button__icon，jv-button__text

// 为ButtonGroup创建命名空间
export const JVBUTTONGROUP_NAME = 'JvButtonGroup'
export const bemGroup = createNamespace(JVBUTTONGROUP_NAME)

// 提取Variant类型 中的一部分 作为新的类型
export type JvButtonVariant = Extract<
  Variant,
  'text' | 'outlined' | 'tonal' | 'plain' | 'dashed' | 'elevated' | 'flat'
>
export type ButtonNativeType = 'button' | 'submit' | 'reset'
export interface JvButtonProps {
  /**
   * 按钮颜色
   * @default 'default'
   */
  color?: ColorType | string
  /**
   * 按钮尺寸
   * @default 'medium'
   */
  size?: SizeType
  /**
   * 按钮是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 设置按钮的border-radius 优先级低于shape
   */
  rounded?: RoundedType
  /**
   * 按钮变体
   * @default 'elevated'
   */
  variant?: JvButtonVariant
  /**
   * 按钮图标
   */
  icon?: JvIconProps['name'] | JvIconProps

  /**
   * 按钮是否块级
   * @default false
   */
  block?: boolean
  /**
   * 按钮前置图标
   */
  prependIcon?: JvIconProps['name'] | JvIconProps
  /**
   * 按钮后置图标
   */
  appendIcon?: JvIconProps['name'] | JvIconProps
  /**
   * 按钮是否堆叠
   * @default false
   */
  stacked?: boolean
  /**
   * 按钮是否自动聚焦
   * @default false
   */
  autofocus?: boolean
  /**
   * 按钮是否加载中
   * @default false
   */
  loading?: boolean
  /**
   * 按钮原生类型
   * @default 'button'
   */
  nativeType?: ButtonNativeType
  /**
   * 按钮内容
   */
  label?: string
}

export interface JvButtonEmits {
  /**
   * 按钮点击事件
   */
  (e: 'click', event: MouseEvent): void
  /**
   * 按钮聚焦事件
   */
  (e: 'focus', event: FocusEvent): void
  /**
   * 按钮失焦事件
   */
  (e: 'blur', event: FocusEvent): void
}

export interface JvButtonSlots {
  /**
   * 按钮默认插槽 按钮内容
   */
  default: Slot
  /**
   * 按钮前置图标插槽
   */
  prepend: Slot
  /**
   * 按钮后置图标插槽
   */
  append: Slot
  /**
   * 按钮图标插槽
   */
  icon: Slot
  /**
   * 按钮加载中插槽
   */
  loader: Slot
}

/**
 * 按钮组属性接口
 */
export interface JvButtonGroupProps {
  /**
   * 按钮组方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'

  /**
   * 按钮组中按钮的变体
   * @default 'elevated'
   */
  variant?: JvButtonVariant

  /**
   * 按钮组中按钮的尺寸
   * @default 'medium'
   */
  size?: SizeType

  /**
   * 按钮组中按钮的颜色
   * @default 'default'
   */
  color?: ColorType | string

  /**
   * 按钮组中按钮是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 按钮组形状
   * @default 'square'
   */
  shape?: ShapeType

  /**
   * 按钮组圆角
   */
  rounded?: RoundedType

  /**
   * 按钮间距
   * @default 2
   */
  gap?: number | string

  /**
   * 是否使用紧凑模式，紧凑模式下按钮之间无间距，边框合并
   * @default false
   */
  attached?: boolean

  /**
   * 自定义样式
   */
  customStyle?: Record<string, string>

  /**
   * 自定义类名
   */
  customClass?: string | string[] | Record<string, boolean>
}

/**
 * 按钮组插槽接口
 */
export interface JvButtonGroupSlots {
  /**
   * 默认插槽，用于放置按钮
   */
  default: Slot
}
