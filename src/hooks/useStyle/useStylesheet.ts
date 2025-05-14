// hooks/useStylesheet.ts
import { onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'

const JV_STYLE_ID_PREFIX = 'jv-style-'

/**
 * 用于管理CSS样式表的自定义Hook
 *
 * 此Hook允许组件动态生成和应用CSS样式表，使组件样式更加灵活可配置。
 *
 * @param getStyleContent - 返回CSS样式内容的函数
 * @param deps - 依赖项数组，当依赖项变化时更新样式
 * @returns 包含样式ID和更新样式的对象
 *
 * @example
 * const { styleId, updateStyle } = useStylesheet(() => `
 *   .my-component {
 *     color: var(--jv-button-color);
 *   }
 * `, [props.color])
 *
 * // 在组件中使用
 * <div :id="styleId">
 *   <!-- 这个元素及其子元素将应用定义的CSS样式 -->
 * </div>
 *
 * // 在CSS中使用
 * .my-component {
 *   color: var(--jv-button-color);
 * }
 */
export function useStylesheet(getStyleContent: () => string, deps: any[] = []) {
  const styleId = ref(`${JV_STYLE_ID_PREFIX}${useId()}`)
  let styleElement: HTMLStyleElement | null = null

  const createOrUpdateStyle = () => {
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId.value
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = getStyleContent()
  }

  onMounted(() => {
    createOrUpdateStyle()

    if (deps.length) {
      // 监听依赖变化时更新样式
      deps.forEach((dep) => {
        if (typeof dep === 'object' && dep && 'value' in dep) {
          watch(() => dep.value, createOrUpdateStyle, { deep: true })
        }
      })
    }
  })

  onBeforeUnmount(() => {
    if (styleElement) {
      document.head.removeChild(styleElement)
      styleElement = null
    }
  })

  return {
    styleId,
    updateStyle: createOrUpdateStyle,
  }
}
