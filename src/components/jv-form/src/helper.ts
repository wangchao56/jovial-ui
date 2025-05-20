import type { FormItemValue, FormValidateRule } from './types'
import Schema from 'async-validator'
import { isArray } from '@/utils'

/**
 * 获取嵌套属性值
 * @param obj 对象
 * @param path 路径，例如 'user.name'
 * @returns 属性值
 */
export function getNestedValue(
  obj: Record<string, any>,
  path: string,
): FormItemValue {
  if (!obj || !path) {
    return undefined
  }

  const props = path.split('.')
  let value = obj

  for (const prop of props) {
    if (value === null || value === undefined) {
      return undefined
    }

    if (typeof value !== 'object') {
      return undefined
    }

    value = value[prop]
  }

  return value
}

/**
 * 设置嵌套属性值
 * @param obj 对象
 * @param path 路径，例如 'user.name'
 * @param value 要设置的值
 * @param autoCreate 是否自动创建中间路径对象，默认为false
 * @returns 是否设置成功
 */
export function setNestedValue(
  obj: Record<string, any>,
  path: string,
  value: FormItemValue,
  autoCreate = false,
): boolean {
  if (!obj || !path) {
    return false
  }

  const props = path.split('.')
  let current = obj

  // 遍历路径直到倒数第二个属性
  for (let i = 0; i < props.length - 1; i++) {
    const prop = props[i]

    if (!(prop in current)) {
      if (autoCreate) {
        current[prop] = {}
      }
      else {
        return false
      }
    }

    current = current[prop]
    if (current === null || typeof current !== 'object') {
      if (autoCreate) {
        current = {}
      }
      else {
        return false
      }
    }
  }

  // 设置最后一个属性的值
  const lastProp = props[props.length - 1]
  current[lastProp] = value
  return true
}

/**
 * 合并规则
 * @param propRules 组件规则
 * @param formRules 表单规则
 * @returns 合并后的规则数组
 */
export function mergeRules(
  propRules: FormValidateRule | FormValidateRule[] | undefined,
  formRules: FormValidateRule | FormValidateRule[] | undefined,
): FormValidateRule[] {
  const rules: FormValidateRule[] = []

  // 添加组件规则
  if (propRules) {
    rules.push(...(Array.isArray(propRules) ? propRules : [propRules]))
  }

  // 添加表单规则
  if (formRules) {
    rules.push(...(Array.isArray(formRules) ? formRules : [formRules]))
  }

  return rules
}

/**
 * 过滤触发方式的规则
 * @param rules 规则数组
 * @param trigger 触发方式
 * @returns 过滤后的规则数组
 */
export function filterRulesByTrigger(
  rules: FormValidateRule[],
  trigger?: string,
): FormValidateRule[] {
  if (!trigger)
    return rules

  return rules.filter((rule) => {
    if (!rule.trigger)
      return false
    if (isArray(rule.trigger)) {
      return rule.trigger.includes(trigger as any)
    }
    return rule.trigger === trigger
  })
}

/**
 * 执行校验
 * @param prop 属性名
 * @param value 属性值
 * @param rules 校验规则
 * @returns 校验结果
 */
export async function validateField(
  prop: string,
  value: FormItemValue,
  rules: FormValidateRule[],
) {
  const validator = new Schema({ [prop]: rules })
  const data = { [prop]: value }

  try {
    await validator.validate(data)
    return {
      valid: true,
      errors: [],
      fields: {},
      message: '',
    }
  }
  catch (errors: any) {
    const validationErrors = errors.errors || []
    const fields = errors.fields || {}
    const message = validationErrors[0]?.message || ''

    const formErrors = validationErrors.map((err: any) => ({
      message: err.message,
      field: err.field,
      rule: err.rule || {},
    }))

    return {
      valid: false,
      errors: formErrors,
      fields,
      message,
    }
  }
}

/**
 * 检查是否为必填字段
 * @param required 是否必填属性
 * @param rules 校验规则
 * @returns 是否必填
 */
export function isRequiredField(
  required: boolean | undefined,
  rules: FormValidateRule[],
): boolean {
  if (required !== undefined) {
    return required
  }

  return rules.some(rule => rule.required)
}

/**
 * 计算标签宽度样式
 * @param width 标签宽度
 * @param position 标签位置
 * @returns 样式对象
 */
export function computeLabelWidthStyle(
  width: string | number | undefined,
  position: string | undefined,
): Record<string, string> {
  if (!width || position === 'top') {
    return {}
  }

  return { width: typeof width === 'number' ? `${width}px` : width }
}
