import type { RuleItem as AsyncValidatorRuleItem } from 'async-validator'
import type { InjectionKey } from 'vue'
import { createNamespace } from '@/utils'

export const JVFORM_NAME = 'JvForm'
export const bem = createNamespace(JVFORM_NAME)

// 表单项的值类型
export type FormItemValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | any[]
  | Record<string, any>

// 扩展async-validator的规则类型，添加trigger属性
export interface FormValidateRule extends AsyncValidatorRuleItem {
  // 触发方式
  trigger?: 'blur' | 'change' | 'submit' | ('blur' | 'change' | 'submit')[]
}

// 表单校验状态
export type FormValidateStatus = 'success' | 'error' | 'validating' | ''

// 表单校验回调
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: Record<string, FormValidateError[]>
) => void

// 表单校验错误
export interface FormValidateError {
  message: string
  field: string
  rule: FormValidateRule
}

// 表单校验结果
export interface FormValidateResult {
  valid: boolean
  errors: FormValidateError[]
  fields: Record<string, FormValidateError[]>
}

// 表单项上下文
export interface JvFormItemContext {
  prop: string
  validate: (trigger?: string) => Promise<FormValidateResult>
  resetField: () => void
  clearValidate: () => void
}

// 自定义的Rules类型，使用FormValidateRule
export interface JvFormRules {
  [field: string]: FormValidateRule | FormValidateRule[]
}

// 表单组件属性
export interface JvFormProps {
  // 表单数据对象
  model?: Record<string, any>
  // 表单验证规则
  rules?: JvFormRules
  // 标签宽度
  labelWidth?: string | number
  // 标签位置：top, left, right
  labelPosition?: 'top' | 'left' | 'right'
  // 是否禁用表单
  disabled?: boolean
  // 是否行内表单
  inline?: boolean
  // 是否显示校验错误信息
  showMessage?: boolean
  // 规则变化时是否触发校验
  validateOnRuleChange?: boolean
  // 隐藏必填星号
  hideRequiredAsterisk?: boolean
  // 必填星号位置
  requireAsteriskPosition?: 'left' | 'right'
  // 校验错误时是否滚动到错误处
  scrollToError?: boolean
  // 尺寸
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  // aria标签
  ariaLabel?: string
}

// 表单组件事件
export interface JvFormEmits {
  (e: 'validate', prop: string, isValid: boolean, message: string): void
  (e: 'update:model', model: Record<string, any>): void
}

export interface JvFormExpose {
  /**
   *  重置表单
   */
  resetFields: () => void
  /**
   * 校验表单
   */
  validate: () => Promise<FormValidateResult>
  /**
   * 校验指定字段
   */
  validateField: (
    props: string | string[],
    callback?: FormValidateCallback
  ) => Promise<FormValidateResult>
  /**
   * 清除指定字段的校验结果
   */
  clearValidate: (props?: string | string[]) => void
  /**
   * 清除所有校验结果
   */
  clearValidateAll: () => void
  /**
   * 获取表单数据
   */
  getFieldsValue: () => Record<string, any>
  /**
   * 设置表单数据
   */
  setFieldsValue: (fields: Record<string, any>) => void
}

// 表单上下文
export interface JvFormContext {
  model?: Record<string, any>
  rules?: JvFormRules
  labelWidth?: string | number
  labelPosition?: 'top' | 'left' | 'right'
  disabled?: boolean
  inline?: boolean
  showMessage?: boolean
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  requireAsteriskPosition?: 'left' | 'right'
  scrollToError?: boolean
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  addField: (field: JvFormItemContext) => void
  removeField: (field: JvFormItemContext) => void
  validateField: (
    props: string | string[],
    callback?: FormValidateCallback
  ) => Promise<FormValidateResult>
}
export const JvFormContextKey: InjectionKey<JvFormContext> =
  Symbol('JvFormContext')
