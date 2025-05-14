// hooks/useThemeVariables.ts
import { reactive, ref, watchEffect } from 'vue'
import { useStylesheet } from './useStylesheet'
/**
 * 用于管理主题变量的自定义Hook
 *
 * 此Hook允许组件动态生成和应用主题变量，使组件样式更加灵活可配置。
 * 它会创建一个带有唯一ID的样式标签，并将生成的主题变量应用到指定的选择器上。
 *
 * @param themeNamespace - 主题命名空间，用于区分不同主题的变量
 * @returns 包含主题变量对象和样式ID的对象
 *
 * @example
 * const { setVariable, removeVariable, variables, styleId } = useThemeVariables('jv')
 *
 * // 在组件中使用
 * const props = defineProps({
 *   color: String,
 *   fontSize: [String, Number]
 * })
 *
 * const { uniqueId } = useCssVariables('jv-button', props, (props) => ({
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
 * .jv-button {
 *   color: var(--jv-button-color);
 *   font-size: var(--jv-button-font-size);
 * }
 */
export function useThemeVariables(themeNamespace = 'jv') {
  const variables = reactive<Record<string, string>>({})
  const styleContent = ref('')

  const setVariable = (name: string, value: string) => {
    variables[name] = value
  }

  const removeVariable = (name: string) => {
    delete variables[name]
  }

  watchEffect(() => {
    const vars = Object.entries(variables)
      .map(([name, value]) => `  --${themeNamespace}-${name}: ${value};`)
      .join('\n')

    styleContent.value = `:root {\n${vars}\n}`
  })

  const { styleId } = useStylesheet(() => styleContent.value, [styleContent])

  return {
    setVariable,
    removeVariable,
    variables,
    styleId,
  }
}
