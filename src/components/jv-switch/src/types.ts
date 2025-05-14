import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVSWITCH_NAME = 'JvSwitch'
export const bem = createNamespace(JVSWITCH_NAME)

/**
 * switch 属性
 * 用于显示switch
 */
export interface JvSwitchProps {
  /**
   * 开关值
   */
  modelValue?: boolean
  /**
   * 开关禁用状态
   */
  disabled?: boolean
  /**
   * 开关只读状态
   */
  readonly?: boolean
  /**
   * 开关尺寸，可选值：'tiny', 'small', 'medium', 'large', 'xlarge'
   */
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'
  /**
   * 开关颜色类型，可选值：'default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'
   */
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  /**
   * 开关打开时显示的文字
   */
  activeText?: string
  /**
   * 开关关闭时显示的文字
   */
  inactiveText?: string
  /**
   * 开关打开时的值
   */
  activeValue?: boolean | string | number
  /**
   * 开关关闭时的值
   */
  inactiveValue?: boolean | string | number
  /**
   * 是否显示内部图标
   */
  showIcon?: boolean
  /**
   * 加载状态
   */
  loading?: boolean
  /**
   * 是否使用方形开关
   */
  square?: boolean
  /**
   * 开关名称，用于表单
   */
  name?: string

  /**
   * 开关样式类型，可选值：'inside' | 'outside'
   */
  variant?: 'inside' | 'outside'

  /**
   * 是否启用涟漪效果
   * @default true
   */
  ripple?: boolean
}

/**
 * switch 事件
 */
export interface JvSwitchEmits {
  (e: 'update:modelValue', value: boolean | string | number): void
  (e: 'change', value: boolean | string | number): void
  (e: 'click', event: MouseEvent): void
}

/**
 * switch 插槽
 */
export interface JvSwitchSlots {
  /**
   * 开关打开状态内容插槽
   */
  activeIcon?: Slot
  /**
   * 开关关闭状态内容插槽
   */
  inactiveIcon?: Slot
}
