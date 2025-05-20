import type { CSSProperties } from 'vue'
// utils/makeStyles.js
import { onUnmounted, ref, watchEffect } from 'vue'

/**
 * 用于创建和管理组件样式的工厂函数
 *
 * @param styles - CSS样式对象，键为类名，值为样式规则对象
 * @returns 返回一个自定义Hook函数，该函数返回一个包含生成的类名的响应式对象
 *
 * @example
 * // 定义样式
 * const useButtonStyles = makeStyles({
 *   root: { padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' },
 *   primary: { backgroundColor: 'blue', color: 'white' }
 * })
 *
 * // 在组件中使用
 * const classes = useButtonStyles()
 * <button :class="classes.value.root">基础按钮</button>
 */
export function makeStyles(styles: CSSProperties) {
  const styleId = `s${Math.random().toString(36).slice(2, 7)}`
  const styleElement = document.createElement('style')
  document.head.appendChild(styleElement)

  // 生成CSS并更新样式元素
  const generateCSS = () => {
    let css = ''
    const classMap: Record<string, string> = {}

    for (const [className, rules] of Object.entries(styles)) {
      const selector = `${styleId}-${className}`
      classMap[className] = selector
      const cssRules = Object.entries(rules)
        .map(([prop, value]) => `${prop}:${value}`)
        .join(';')
      css += `.${selector}{${cssRules}}`
    }

    styleElement.textContent = css
    return classMap
  }

  // 返回hook函数
  return function useStyles() {
    const classes = ref<Record<string, string>>({})

    // 监听样式变化并更新
    watchEffect(() => {
      classes.value = generateCSS()
    })

    onUnmounted(() => {
      document.head.removeChild(styleElement)
    })

    return classes
  }
}
