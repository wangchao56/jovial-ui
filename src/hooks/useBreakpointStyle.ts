import { computed, ref } from 'vue'
// 断点配置类型
interface Breakpoints {
  [key: string]: number
}

// 默认样式类型
interface DefaultStyles {
  [key: string]: string
}
// 自定义 hooks 用于将 JS 断点配置转换为 CSS 规则
export function useBreakpointStyle(breakpoints: Breakpoints, defaultStyles: DefaultStyles) {
  // 存储动态生成的 CSS 规则
  const dynamicStyles = ref('')

  // 将断点配置转换为媒体查询规则
  const generateMediaQueries = () => {
    let styles = ''
    Object.entries(breakpoints).forEach(([key, value]) => {
      styles += `@media (min-width: ${value}) {
          .breakpoint-${key} {
            ${defaultStyles[key]}
          }
        }`
    })
    return styles
  }

  // 计算并更新动态 CSS 规则
  dynamicStyles.value = computed(() => generateMediaQueries()).value

  // 提供一个方法供外部注入自定义样式
  const injectCustomStyles = (customStyles: DefaultStyles) => {
    const updatedStyles = Object.entries(breakpoints).reduce((acc, [key, value]) => {
      if (customStyles[key]) {
        acc += `@media (min-width: ${value}) {
            .breakpoint-${key} {
              ${customStyles[key]}
            }
          }`
      }
      return acc
    }, dynamicStyles.value)
    dynamicStyles.value = updatedStyles
  }

  return {
    dynamicStyles,
    injectCustomStyles,
  }
}
