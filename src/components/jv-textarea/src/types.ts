import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVTEXTAREA_NAME = 'JvTextarea'
export const bem = createNamespace(JVTEXTAREA_NAME)

export interface JvTextareaProps {
  /** 绑定值 */
  modelValue?: string
  /** 占位符 */
  placeholder?: string
  /** 禁用 */
  disabled?: boolean
  /** 只读 */
  readonly?: boolean
  /** 可清除 */
  clearable?: boolean
  /** 变体 */
  variant?: 'outlined' | 'default'
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  /** 自动调整高度 */
  autosize?: boolean | { minRows?: number, maxRows?: number }
  /** 最大长度 */
  maxLength?: number
  /** 显示计数 */
  showCount?: boolean
  /** 行数 */
  rows?: number
  /** 最小行数 */
  minRows?: number
  /** 最大行数 */
  maxRows?: number
  /** 调整大小 */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

export interface JvTextareaEmits {
  /** 更新绑定值 */
  (e: 'update:modelValue', value: string): void
  /** 清除 */
  (e: 'clear'): void
  /** 聚焦 */
  (e: 'focus', event: FocusEvent): void
  /** 失焦 */
  (e: 'blur', event: FocusEvent): void
  /** 输入 */
  (e: 'input', value: string): void
  /** 改变 */
  (e: 'change', value: string): void
}

export interface JvTextareaSlots {
  /** 前置插槽 */
  prepend?: Slot
  /** 后置插槽 */
  append?: Slot
  /** 前缀插槽 */
  prefix?: Slot
  /** 后缀插槽 */
  suffix?: Slot
}

export interface JvTextareaExpose {
  /** 聚焦 */
  focus: () => void
  /** 失焦 */
  blur: () => void
  /** 清除 */
  clear: () => void
}
