import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVEDITER_NAME = 'JvEditer'
export const bem = createNamespace(JVEDITER_NAME)

/**
 * editer 属性
 * 用于显示editer
 */
export interface JvEditerProps {
  modelValue: string
}
export interface JvEditerEmits {
  (e: 'update:modelValue', value: string): void
}

/**
 * editer 插槽
 * 用于显示editer
 */
export interface JvEditerSlots {
  tools: Slot
  bottom: Slot
}
