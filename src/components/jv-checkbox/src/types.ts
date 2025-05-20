import type { InjectionKey, Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVCHECKBOX_NAME = 'JvCheckbox'
export const bem = createNamespace(JVCHECKBOX_NAME)

export const JVCHECKBOXGROUP_NAME = 'JvCheckboxGroup'
export const bemGroup = createNamespace(JVCHECKBOXGROUP_NAME)

export interface JvCheckboxProps {
  /**
   * 复选框绑定值
   * - 当为布尔值时，表示选中状态
   * - 当为数组时，包含所有选中的label值
   */
  modelValue?: string | number | boolean
  /**
   * 复选框绑定值
   * - 当为布尔值时，表示选中状态 (在group中才有效)
   * - 当为数组时，包含所有选中的label值
   */
  value?: string | number
  /**
   * 复选框标签，也用作数组模式下的值
   */
  label?: string | number
  /**
   * 选中时的值，用于自定义值模式
   */
  trueValue?: any
  /**
   * 未选中时的值，用于自定义值模式
   */
  falseValue?: any
  /**
   * 是否禁用复选框
   * @default false
   */
  disabled?: boolean
  /**
   * 是否为不确定状态（半选状态）
   * @default false
   */
  indeterminate?: boolean
  /**
   * 原生name属性
   */
  name?: string
  /**
   * 复选框尺寸
   * @default 'medium'
   */
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'
  /**
   * 是否选中
   * @default false
   */
  checked?: boolean
}

export interface JvCheckboxEmits {
  /**
   * 点击复选框时触发
   */
  (e: 'click', event: MouseEvent): void
  /**
   * 复选框值变化时触发
   */
  (e: 'update:modelValue', value: string | number): void
  (e: 'checked', checked: boolean): void
  /**
   * 值变化时触发
   */
  (e: 'change'): void
}

export interface JvCheckboxSlots {
  /**
   * 默认插槽，用于自定义标签内容
   */
  default: Slot
}

export interface JvCheckboxExpose {
  /**
   * 使复选框获取焦点
   */
  focus: () => void
  /**
   * 使复选框失去焦点
   */
  blur: () => void
}

export interface JvCheckboxGroupProps {
  /**
   * 选中的值数组
   */
  modelValue?: (string | number)[]
  /**
   * 是否禁用整个复选框组
   * @default false
   */
  disabled?: boolean
  /**
   * 尺寸，会被应用到所有子复选框
   * @default 'medium'
   */
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'
  /**
   * 复选框组方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 最大可选数量
   */
  max?: number
  /**
   * 子选项之间的间距
   * @default 12
   */
  gap?: number | string
  /**
   * 自定义样式
   */
  customStyle?: Record<string, string>
  /**
   * 自定义类名
   */
  customClass?: string | string[] | Record<string, boolean>
}

export interface JvCheckboxGroupEmits {
  /**
   * 复选框组值变化时触发
   */
  (e: 'update:modelValue', value: (string | number)[]): void
  /**
   * 复选框组值变化时触发
   */
  (e: 'change', value: (string | number)[]): void
}

export interface JvCheckboxGroupSlots {
  /**
   * 默认插槽，用于放置复选框
   */
  default: Slot
}

export interface CheckboxGroupContext {
  name: string
  modelValue: { value: (string | number)[] }
  disabled: { value: boolean }
  size: { value: SizeType }
  max?: { value: number | undefined }
  isMaxLimit: { value: boolean }
  updateModel: (val: string | number | boolean, checked: boolean) => void
}

export const JvCheckboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol('JvCheckboxGroupContextKey')
