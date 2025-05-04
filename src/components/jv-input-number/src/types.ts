import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVINPUTNUMBER_NAME = 'JvInputNumber'
export const bem = createNamespace(JVINPUTNUMBER_NAME)

export interface JvInputNumberProps {
  /**
   * 绑定值
   */
  modelValue: number

  /**
   * 最小值
   */
  min?: number

  /**
   * 最大值
   */
  max?: number

  /**
   * 步长
   */
  step?: number

  /**
   * 精度
   */
  precision?: number

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 是否只读
   */
  readonly?: boolean

  /**
   * 尺寸
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * 是否显示清除按钮
   */
  clearable?: boolean
}

export interface JvInputNumberEmits {
  /**
   * 更新绑定值时触发
   */
  (e: 'update:modelValue', value: number): void

  /**
   * 值变化时触发
   */
  (e: 'change', value: number): void

  /**
   * 输入时触发
   */
  (e: 'input', value: number): void

  /**
   * 失去焦点时触发
   */
  (e: 'blur', event: FocusEvent): void

  /**
   * 聚焦时触发
   */
  (e: 'focus', event: FocusEvent): void

  /**
   * 清除时触发
   */
  (e: 'clear', event: MouseEvent): void
}

export interface JvInputNumberSlots {
  /**
   * 默认插槽
   */
  default: Slot

  /**
   * 前置插槽
   */
  prepend: Slot

  /**
   * 后置插槽
   */
  append: Slot

  /**
   * 前缀插槽
   */
  prefix: Slot
}

export interface JvInputNumberExpose {
  /**
   * 获取输入框的值
   */
  getInputValue: () => string

  /**
   * 设置输入框的值
   */
  setInputValue: (value: string) => void

  /**
   * 清除输入框的值
   */
  clearInputValue: () => void
}
