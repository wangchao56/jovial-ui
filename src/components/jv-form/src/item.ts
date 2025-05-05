import type { FormValidateRule } from './types'
import { createNamespace } from '@/utils'

export const JVFORMITEM_NAME = 'JvFormItem'
export const bem = createNamespace(JVFORMITEM_NAME)

/**
 * 表单项属性
 */
export interface JvFormItemProps {
  /**
   * 标签
   */
  label?: string
  /**
   * 绑定的表单字段名
   */
  prop?: string
  /**
   * 是否必填
   */
  required?: boolean
  /**
   * 校验规则
   */
  rules?: FormValidateRule | FormValidateRule[]
  /**
   * 标签宽度
   */
  labelWidth?: string | number
  /**
   * 是否显示错误消息
   */
  showMessage?: boolean
  /**
   * 错误消息位置
   */
  errorPosition?: 'top' | 'right' | 'bottom'
  /**
   * 是否内联显示
   */
  inline?: boolean
  /**
   * 标签位置
   */
  labelPosition?: 'top' | 'left' | 'right'
  /**
   * 尺寸
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否使用label标签包裹input
   * 当为true时，不需要设置for和id属性
   * 当为false时，使用for和id关联
   * @default true
   */
  wrapInput?: boolean
}

/**
 * 表单项事件
 */
export interface JvFormItemEmits {
  (e: 'validate', isValid: boolean, message: string): void
}
