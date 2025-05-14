import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export type InputType =
  | 'text'
  | 'password'
  | 'number'
  | 'email'
  | 'tel'
  | 'url'
  | 'search'
  | 'textarea'

export const JVINPUT_NAME = 'JvTextfield'
export const bem = createNamespace(JVINPUT_NAME)

export interface JvTextfieldProps {
  /** 绑定值 */
  modelValue: string
  /** 占位符 */
  placeholder?: string
  /** 禁用 */
  disabled?: boolean
  /** 只读 */
  readonly?: boolean
  /** 可清除 */
  clearable?: boolean
  /** 显示密码 */
  showPassword?: boolean
  /** 类型 */
  type?: 'text' | 'password' | 'email'
  /** 变体 */
  variant?: 'outlined' | 'default'
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  /** 前缀图标 */
  prefixIcon?: string
  /** 后缀图标 */
  suffixIcon?: string
  /** 最大长度 */
  maxLength?: number
  /** 显示计数 */
  showCount?: boolean
}

export interface JvTextfieldEmits {
  /** 更新绑定值 */
  (e: 'update:modelValue', value: string): void
  /** 清除 */
  (e: 'clear'): void
  /** 聚焦 */
  (e: 'focus', event: FocusEvent): void
  /** 失焦 */
  (e: 'blur', event: FocusEvent): void
}

export interface JvTextfieldSlots {
  /** 前置插槽 */
  prepared: Slot
  /** 后置插槽 */
  append: Slot
  /** 前缀插槽 */
  prefix: Slot
  /** 后缀插槽 */
  suffix: Slot
}

export interface JvTextfieldExpose {
  /** 聚焦 */
  focus: () => void
  /** 失焦 */
  blur: () => void
  /** 清除 */
  clear: () => void
}
