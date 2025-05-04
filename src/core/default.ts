// 使用规范说明
// 1. 导航栏：elevation-4
// 2. 卡片静止状态：elevation-2
// 3. 卡片悬浮状态：elevation-8
// 4. 浮动按钮：elevation-6
// 5. 对话框/模态框：elevation-24
// 6. 下拉菜单：elevation-8
// 7. 抽屉导航：elevation-16
// 8. 底部导航栏：elevation-8
// 9. 搜索建议面板：elevation-8
// 10. 选择器/日期选择器：elevation-8

/**
 * 默认配置 (规范性质的相关配置)
 */
export interface DefaultsOptions {
  /**
   * 主题
   */
  theme?: string
}

export function createDefaults(options: DefaultsOptions = {}) {
  return options
}

export const DefaultsSymbol = Symbol('jv-defaults')
