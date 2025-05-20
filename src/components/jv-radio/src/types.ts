import { createNamespace } from '@/utils'

export const JVRADIO_NAME = 'JvRadio'
export const bem = createNamespace(JVRADIO_NAME)

export interface JvRadioProps {
  /** 绑定值 */
  modelValue?: string
  /** 单选框值 */
  label: string
  /** 单选框值 */
  value?: string | number | boolean
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
  /** 标签位置 */
  labelPosition?: 'left' | 'right'
  /** 标签与单选框的间距 */
  gap?: number | string
  /** 单选框自定义类名 */
  radioClass?: string
  /** 标签自定义类名 */
  labelClass?: string
  /** aria标签描述 */
  ariaLabel?: string
  /** 聚焦时是否显示特殊样式 */
  focusVisible?: boolean
}

export interface JvRadioEmits {
  /** 更新绑定值 */
  (e: 'update:modelValue', value: any): void
  /** 点击事件 */
  (e: 'click', event: MouseEvent): void
  /** 选中事件 */
  (e: 'change', value: any): void
  /** 获得焦点事件 */
  (e: 'focus', event: FocusEvent): void
  /** 失去焦点事件 */
  (e: 'blur', event: FocusEvent): void
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
  /**
   * 聚焦单选框
   */
  focus: () => void
  /**
   * 取消聚焦
   */
  blur: () => void
}

export interface RadioOption {
  /** 选项标签显示的文本 */
  label: string
  /** 选项的值 */
  value: string | number | boolean
  /** 是否禁用该选项 */
  disabled?: boolean
  /** 自定义样式 */
  style?: Record<string, string>
  /** 自定义类名 */
  class?: string
  /** 其他自定义属性 */
  [key: string]: any
}
