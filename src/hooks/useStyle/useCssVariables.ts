import { camelToKebab, createNamespace } from '@/utils'
// hooks/useComponentStyle.ts
import { computed, ref } from 'vue'
import { useStylesheet } from './useStylesheet'

/**
 * 自动为组件生成唯一class和css变量样式
 * @param componentName 组件名常量（如JVIMAGE_NAME）
 * @param styleGenerator (props) => 变量对象，变量名用驼峰式
 * @example
 * const { uniqueClass, styleId } = useComponentStyle(JVIMAGE_NAME, (props) => ({
 *   '--jv-image-width': props.width,
 *   '--jv-image-height': props.height,
 * }))
 *
 * // 在组件中使用
 * <div :class="uniqueClass">
 *   <jv-image :src="src" :width="width" :height="height" />
 * </div>
 */
export function useCssVariables(
  componentName: string,
  styleGenerator: () => Record<string, string | number | undefined>,
) {
  // 自动转为class名 如jv-image
  const baseClass = createNamespace(componentName).b()
  const uniqueClass = ref(`${baseClass}-${Math.random().toString(36).substring(2, 9)}`)

  const cssProperties = computed(() => {
    const styles = styleGenerator()
    return Object.entries(styles)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `  --${baseClass}-${camelToKebab(key)}: ${value};`)
      .join('\n')
  })

  const { styleId } = useStylesheet(() => `
.${uniqueClass.value} {
${cssProperties.value}
}
  `, [cssProperties])

  return {
    uniqueClass,
    styleId,
  }
}
