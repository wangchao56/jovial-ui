import type { CSSProperties } from 'vue'
import { normalizeStyle, useAttrs } from 'vue'

type NormalizedStyle =
  | { [key: string]: string | number | undefined }
  | string
  | undefined
/**
 * 用于处理样式的自定义hook
 * @returns 处理后的样式对象
 * @example
 * const { resultStyle } = useStyle({ styleColor: 'red', styleBackgroundColor: 'blue' })
 * console.log(resultStyle) // { color: 'red', backgroundColor: 'blue' }
 */
export function useStyle() {
  const attrs = useAttrs()
  if (!attrs) return { resultStyle: {} }
  const { style } = attrs as { style: CSSProperties }
  const resultStyle = normalizeStyle(style) as NormalizedStyle
  return { customStyles: resultStyle }
}

// /**
//  * 使用样式Hook
//  * 用于支持组件自定义样式
//  */
// export function useStyle() {
//   /**
//    * 自定义样式对象
//    * @param styles 样式对象
//    * @returns 过滤后的样式对象
//    */
//   const customStyles = (styles?: Record<string, any>) => {
//     if (!styles)
//       return {}

//     // 过滤掉undefined和null值
//     return Object.fromEntries(
//       Object.entries(styles).filter(([_, value]) => value !== undefined && value !== null),
//     )
//   }

//   return {
//     customStyles,
//   }
// }
