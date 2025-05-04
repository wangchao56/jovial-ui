import { createNamespace } from '@/utils'

export const JVRADIO_NAME = 'JvRadio'
export const bem = createNamespace(JVRADIO_NAME)

export interface JvRadioProps {
  // 定义组件属性
  modelValue: any
  label: any
  disabled: boolean
  name: string
}

export interface JvRadioEmits {
  (e: 'update:modelValue', value: any): void
}
