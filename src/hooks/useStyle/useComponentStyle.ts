import { camelToKebab, pascalToKebab } from '@/utils'
// hooks/useCssVariables.ts
import { computed } from 'vue'
import { useStylesheet } from './useStylesheet'
/**
 * 用于管理CSS变量的自定义Hook
 *
 * 此Hook允许组件动态生成和应用CSS变量，使组件样式更加灵活可配置。
 * 它会创建一个带有唯一ID的样式标签，并将生成的CSS变量应用到指定的选择器上。
 *
 * @param selector - CSS选择器，用于确定应用CSS变量的DOM元素
 * @param variablesGenerator - 函数，接收props并返回CSS变量键值对
 * @returns 包含唯一ID和样式ID的对象，可用于标识应用了CSS变量的元素
 *
 * @example
 * // 在组件中使用
 * const props = defineProps({
 *   color: String,
 *   fontSize: [String, Number]
 * })
 *
 * const { uniqueId } = useCssVariables(JVBUTTON_NAME, () => ({
 *   '--jv-button-color': props.color,
 *   '--jv-button-font-size': typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize
 * }))
 *
 * // 在模板中应用
 * <div :id="uniqueId">
 *   <!-- 这个元素及其子元素将应用定义的CSS变量 -->
 * </div>
 *
 * // 在CSS中使用
 * .my-component {
 *   color: var(--jv-button-color);
 *   font-size: var(--jv-button-font-size);
 * }
 */
export function useComponentStyle(
  selector: string,
  variablesGenerator: () => Record<string, string | number | undefined>,
) {
  // 自动转为class名 如jv-button
  const baseClass = pascalToKebab(selector)
  const uniqueId = `${baseClass}-${Math.random().toString(36).substring(2, 9)}`

  const cssVariables = computed(() => {
    const variables = variablesGenerator()
    return Object.entries(variables)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `  ${camelToKebab(key)}: ${value};`)
      .join('\n')
  })

  const { styleId } = useStylesheet(() => `
#${uniqueId} {
${cssVariables.value}
}
  `, [cssVariables])

  return {
    uniqueId,
    styleId,
  }
}
