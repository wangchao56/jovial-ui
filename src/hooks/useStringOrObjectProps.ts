import type { ComputedRef } from 'vue'
import { computed } from 'vue'

/**
 * 处理可以是字符串、数字、布尔值或对象类型的props
 * - 如果是字符串或数字，将其转换为对象，并将值赋给指定的属性名
 * - 如果是布尔值true，则使用提供的默认选项
 * - 如果是对象，则使用该对象（与默认选项合并，如果有提供）
 *
 * @param prop 传入的prop值，可以是字符串、数字、布尔值或对象
 * @param textPropName 当prop是字符串或数字时，将值赋给的属性名，默认为'text'
 * @param options 当prop是布尔值时，使用的默认选项
 * @returns 计算属性，返回处理后的对象
 *
 * @example
 * // 在组件中使用
 * const subtitleProps = useStringOrObjectProps(subtitle)
 * // 如果subtitle是字符串 'Hello'，返回 { text: 'Hello' }
 * // 如果subtitle是数字 123，返回 { text: 123 }
 * // 如果subtitle是对象 { text: 'Hello', color: 'red' }，返回 { text: 'Hello', color: 'red' }
 *
 * // 使用自定义属性名
 * const iconProps = useStringOrObjectProps(icon, 'name')
 * // 如果icon是字符串 'user'，返回 { name: 'user' }
 */
/**
 * 处理字符串或数字类型的props，将其转换为对象
 * @param prop 传入的prop值，可以是字符串或数字
 * @param textPropName 当prop是字符串或数字时，将值赋给的属性名
 */
export function useStringOrObjectProps<T extends Record<string, any>>(
  prop: string | number | undefined,
  textPropName?: string
): ComputedRef<T>
/**
 * 处理布尔类型的props，使用默认配置
 * @param prop 传入的prop值，可以是布尔值
 * @param defaultOptions 当prop是布尔值时，使用的默认配置
 */
export function useStringOrObjectProps<T extends Record<string, any>>(
  prop: boolean | undefined,
  defaultOptions: T
): ComputedRef<T>

/**
 * 处理可以是字符串、数字、布尔值或对象类型的props
 */
export function useStringOrObjectProps<T extends Record<string, any>>(
  prop: string | number | T | undefined,
  textPropName?: string
): ComputedRef<T>
export function useStringOrObjectProps<T extends Record<string, any>>(
  prop: boolean | T | undefined,
  defaultOptions: T
): ComputedRef<T>
export function useStringOrObjectProps<T extends Record<string, any>>(
  prop: string | number | boolean | T | undefined,
  options?: string | T,
): ComputedRef<T> {
  return computed(() => {
    const innerProps = {} as T

    // 处理字符串或数字
    if (typeof prop === 'string' || typeof prop === 'number') {
      const textPropName = typeof options === 'string' ? options : 'text'
      innerProps[textPropName as keyof T] = prop as any
    }
    // 处理布尔值为true
    else if (typeof prop === 'boolean' && options && typeof options !== 'string') {
      return { ...options }
    }
    // 处理对象
    else if (prop && typeof prop === 'object') {
      if (options && typeof options !== 'string') {
        // 有默认选项，合并
        return { ...options, ...prop }
      }
      else {
        // 无默认选项，直接使用对象
        Object.assign(innerProps, prop)
      }
    }

    return innerProps
  })
}
