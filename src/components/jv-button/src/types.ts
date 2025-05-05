import type { InternalIconName } from '@/components/jv-icon/src/types'
import type { Shape } from '@/constants'
import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVBUTTON_NAME = 'JvButton' // 组件名称，用于注册组件，必须和文件名相同，否则会报错，并且组件名称必须是 PascalCase 形式，即首字母大写，例如：JvButton，JvButtonIte
export const bem = createNamespace(JVBUTTON_NAME) // 创建组件的 bem 命名空间，用于生成组件的 class 名称，例如：jv-button，jv-button--primary，jv-button__icon，jv-button__text

// 提取Variant类型 中的一部分 作为新的类型
export type JvButtonVariant = Extract<
  Variant,
  'text' | 'outlined' | 'tonal' | 'plain' | 'dashed' | 'elevated' | 'flat'
>
export type ButtonNativeType = 'button' | 'submit' | 'reset'
export interface JvButtonProps {
  /**
   * 按钮类型
   * @default 'primary'
   */
  colorType?: ColorType
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
   * 按钮形状
   * @default 'square'
   */
  shape?: Shape
  /**
   * 按钮变体
   * @default 'text'
   */
  variant?: JvButtonVariant
  /**
   * 按钮图标
   */
  icon?: InternalIconName | string

  /**
   * 按钮是否块级
   * @default false
   */
  block?: boolean
  /**
   * 按钮前置图标
   */
  prependIcon?: string
  /**
   * 按钮后置图标
   */
  appendIcon?: string
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
  content?: string
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
