// hooks/useStyleOverride.ts
import { ref, watch } from 'vue'
import { useStylesheet } from './useStylesheet'

/**
 * 用于管理CSS样式覆盖的自定义Hook
 *
 * 此Hook允许组件动态生成和应用CSS样式覆盖规则，使组件样式更加灵活可配置。
 * 它会创建一个带有唯一ID的样式标签，并将生成的CSS样式覆盖规则应用到指定的选择器上。
 *
 * @param targetSelector - CSS选择器，用于确定应用CSS样式覆盖规则的DOM元素
 * @param getStyleRules - 函数，接收props并返回CSS样式覆盖规则键值对
 * @param deps - 依赖项数组，用于监听依赖变化
 * @returns 包含唯一ID和样式ID的对象，可用于标识应用了CSS样式覆盖规则的元素
 *
 * @example
 * const { styleId } = useStyleOverride('jv-button', (props) => ({
 *   '.jv-button-primary': {
 *     color: props.color,
 *   },
 * }))
 */
export function useStyleOverride(
  targetSelector: string,
  getStyleRules: () => Record<string, string | Record<string, string>>,
  deps: any[] = [],
) {
  const cssRules = ref('')

  const generateCss = () => {
    const rules = getStyleRules()
    let css = ''

    Object.entries(rules).forEach(([selector, styles]) => {
      if (typeof styles === 'string') {
        css += `${targetSelector} ${selector} { ${styles} }\n`
      }
      else {
        css += `${targetSelector} ${selector} {\n`
        Object.entries(styles).forEach(([prop, value]) => {
          css += `  ${prop}: ${value};\n`
        })
        css += `}\n`
      }
    })

    return css
  }

  const updateRules = () => {
    cssRules.value = generateCss()
  }

  // 初始生成CSS
  updateRules()

  // 监听依赖变化
  deps.forEach((dep) => {
    if (typeof dep === 'object' && dep && 'value' in dep) {
      watch(() => dep.value, updateRules, { deep: true })
    }
  })

  const { styleId } = useStylesheet(() => cssRules.value, [cssRules])

  return {
    styleId,
    updateRules,
  }
}
