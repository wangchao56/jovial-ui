import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVCHECKBOX_NAME = 'JvCheckbox'
export const bem = createNamespace(JVCHECKBOX_NAME)

export interface JvCheckboxProps {
  /**
   * 绑定值
   */
  modelValue?: boolean | Array<string | number>
  /**
   * 标签
   */
  label?: string | number
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * 必填
   */
  required?: boolean
  /**
   * 不确定
   */
  indeterminate?: boolean
  /**
   * 名称
   */
  name?: string
  /**
   * 真值
   */
  trueValue?: any
  /**
   * 假值
   */
  falseValue?: any
  /**
   * 大小
   */
  size?: 'small' | 'medium' | 'large'
}

export interface JvCheckboxEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'update:modelValue', value: any): void
}

export interface JvCheckboxSlots {
  default: Slot
}

export interface JvCheckboxExpose {
  focus: () => void
  blur: () => void
}
