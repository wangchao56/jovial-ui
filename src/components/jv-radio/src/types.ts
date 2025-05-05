import { createNamespace } from '@/utils'

export const JVRADIO_NAME = 'JvRadio'
export const bem = createNamespace(JVRADIO_NAME)

export interface JvRadioProps {
  /** 绑定值 */
  modelValue: any
  /** 单选框值 */
  label: any
  /** 是否禁用 */
  disabled?: boolean
  /** 原生name属性 */
  name?: string
  /** 单选框颜色 */
  color?: string
  /** 是否有动画效果 */
  animated?: boolean
  /** 尺寸大小 */
  size?: 'small' | 'medium' | 'large'
  /** 边框样式 */
  bordered?: boolean
  /** 是否显示波纹效果 */
  ripple?: boolean
}

export interface JvRadioEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'click', event: MouseEvent): void
  (e: 'change', value: any): void
}

export interface JvRadioExpose {
  /**
   * 触发选中
   */
  check: () => void
  /**
   * 获取是否选中
   */
  isChecked: () => boolean
}
