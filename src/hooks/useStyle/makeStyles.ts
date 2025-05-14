import type { CSSProperties } from 'vue'
// utils/makeStyles.js
import { onUnmounted, ref, watchEffect } from 'vue'

/**
 * 用于创建和管理组件样式的工厂函数
 *
 * 此函数接收一个样式对象，并返回一个自定义Hook，该Hook可以在组件中使用来应用这些样式。
 * 它会创建一个带有唯一ID的样式标签，并将样式规则注入到文档头部。
 *
 * @param styles - CSS样式对象，键为类名，值为样式规则对象
 * @returns 返回一个自定义Hook函数，该函数返回一个包含生成的类名的响应式对象
 *
 * @example
 * // 定义样式
 * const useButtonStyles = makeStyles({
 *   root: {
 *     padding: '8px 16px',
 *     borderRadius: '4px',
 *     cursor: 'pointer'
 *   },
 *   primary: {
 *     backgroundColor: 'blue',
 *     color: 'white'
 *   }
 * })
 *
 * // 在组件中使用
 * const classes = useButtonStyles()
 *
 * // 在模板中应用
 * <button :class="classes.value.root">基础按钮</button>
 * <button :class="[classes.value.root, classes.value.primary]">主要按钮</button>
 */

export function makeStyles(styles: CSSProperties) {
  const styleId = `vue-styles-${Math.random().toString(36).slice(2, 9)}`
  const styleElement = document.createElement('style')
  document.head.appendChild(styleElement)

  // 动态生成 CSS
  const generateCSS = () => {
    let css = ''
    for (const [className, styleRules] of Object.entries(styles)) {
      const rules = Object.entries(styleRules)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join(' ')
      css += `.${styleId}-${className} { ${rules} } `
    }
    styleElement.textContent = css
  }

  // 返回一个响应式类名对象
  return function useStyles() {
    const classes = ref({})

    watchEffect(() => {
      const generatedClasses: Record<string, string> = {}
      for (const className of Object.keys(styles)) {
        generatedClasses[className] = `${styleId}-${className}`
      }
      classes.value = generatedClasses
      generateCSS()
    })

    onUnmounted(() => {
      document.head.removeChild(styleElement)
    })

    return classes
  }
}
