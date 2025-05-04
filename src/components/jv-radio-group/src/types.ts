import type { InjectionKey } from 'vue'
import { createNamespace } from '@/utils'

export const JVRADIOGROUP_NAME = 'JvRadiogroup'
export const bem = createNamespace(JVRADIOGROUP_NAME)

export interface JvRadioGroupProps {
  /**
   * 绑定值
   */
  modelValue?: string | number
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * 名称
   */
  name?: string
}

export interface JvRadioGroupEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}
export interface JvRadioGroupContext {
  name: string
  modelValue: string | number
  disabled: boolean
  updateValue: (value: string | number) => void
}
export const radioGroupKey: InjectionKey<JvRadioGroupContext>
  = Symbol('radioGroupKey')
