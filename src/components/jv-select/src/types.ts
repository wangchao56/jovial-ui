import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const COMPONENT_NAME = 'JvSelect'
export const bem = createNamespace(COMPONENT_NAME)
export const JVSELECT_NAME = 'JvSelect'

export interface JvSelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface JvSelectProps {
  /** 绑定值 */
  modelValue: string | number | string[] | number[]
  /** 选项列表 */
  options: JvSelectOption[]
  /** 占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否可清除 */
  clearable?: boolean
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 是否多选 */
  multiple?: boolean
  /** 是否内联 */
  inline?: boolean
}

export interface JvSelectEmits {
  (e: 'update:modelValue', value: string | number | string[] | number[]): void
  (e: 'change', value: string | number | string[] | number[]): void
  (e: 'clear'): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

export interface JvSelectSlots {
  default: Slot
  prefix: Slot
  suffix: Slot
}
