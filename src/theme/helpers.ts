function detectSystemColorScheme(): 'light' | 'dark' {
  // 检测系统颜色方案偏好
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return isDark ? 'dark' : 'light'
}

// 监听系统颜色方案变化
function watchSystemColorScheme(
  callback: (isDark: boolean) => void,
): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const listener = (e: MediaQueryListEvent) => {
    callback(e.matches)
  }

  mediaQuery.addEventListener('change', listener)
  return () => mediaQuery.removeEventListener('change', listener)
}
function injectThemeVariables(theme: ThemeDefinition): void {
  // 创建<style>标签
  const style = document.createElement('style')
  style.type = 'text/css'

  // 为每个颜色生成CSS变量
  const cssVariables = Object.entries(theme.colors)
    .map(([key, value]) => {
      const rgb = hexToRgb(value)
      return `
        --jv-theme-${key}: ${value};
        --jv-theme-${key}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};
      `
    })
    .join('\n')

  // 添加自定义变量
  const customVariables = theme.variables
    ? Object.entries(theme.variables)
        .map(([key, value]) => `--jv-${key}: ${value};`)
        .join('\n')
    : ''

  // 组合CSS规则
  style.textContent = `
      [data-theme="${theme.name}"] {
        ${cssVariables}
        ${customVariables}
      }
    `

  // 添加到文档头部
  document.head.appendChild(style)
}

export { detectSystemColorScheme, injectThemeVariables, watchSystemColorScheme }
