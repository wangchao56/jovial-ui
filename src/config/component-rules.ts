import type { LocaleInstance } from '@/locale/types'
import type { Ref } from 'vue'
import { useTheme } from '@/theme'
import { createNamespace } from '@/utils'

/**
 * 组件规则接口
 */
export interface ComponentRules {
  /**
   * 主题规则
   */
  themeRules: ThemeRules
  /**
   * 国际化规则
   */
  localeRules: LocaleRules
  /**
   * 设计规则
   */
  designRules: DesignRules
}

/**
 * 主题规则接口
 */
export interface ThemeRules {
  /**
   * 使用主题变量
   * @param propName 属性名称
   * @returns 对应的CSS变量
   */
  useThemeVariable: (propName: string) => string
  /**
   * 获取当前主题
   * @returns 当前主题名称
   */
  getCurrentTheme: () => Ref<string>
  /**
   * 获取主题颜色
   * @param colorName 颜色名称
   * @returns 颜色值
   */
  getThemeColor: (colorName: string) => string
}

/**
 * 国际化规则接口
 */
export interface LocaleRules {
  /**
   * 翻译文本
   * @param key 翻译键
   * @param params 替换参数
   * @returns 翻译结果
   */
  translate: (key: string, ...params: unknown[]) => string
  /**
   * 格式化数字
   * @param value 数字值
   * @param options 格式化选项
   * @returns 格式化结果
   */
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string
  /**
   * 获取当前语言
   * @returns 当前语言
   */
  getCurrentLocale: () => Ref<string>
}

/**
 * 设计规则接口
 */
export interface DesignRules {
  /**
   * 使用BEM命名空间
   * @param componentName 组件名称
   * @returns BEM命名空间
   */
  useBEM: (componentName: string) => ReturnType<typeof createNamespace>
  /**
   * 边框圆角规则
   */
  borderRadius: {
    rounded: string
    roundedSm: string
    roundedLg: string
    roundedXl: string
    roundedFull: string
  }
  /**
   * 尺寸规则
   */
  sizes: {
    tiny: string
    small: string
    medium: string
    large: string
    xlarge: string
  }
  /**
   * 颜色类型
   */
  colorTypes: string[]
  /**
   * 变体类型
   */
  variants: string[]
  /**
   * 动画规则
   */
  animations: {
    transition: string
    duration: string
    easing: string
  }
  /**
   * 阴影规则
   */
  elevation: {
    default: string
    low: string
    medium: string
    high: string
  }
  /**
   * 字体规则
   */
  typography: {
    fontFamily: string
    fontSize: {
      tiny: string
      small: string
      base: string
      large: string
      xlarge: string
    }
    fontWeight: {
      light: string
      normal: string
      medium: string
      semibold: string
      bold: string
    }
    lineHeight: {
      tight: string
      normal: string
      relaxed: string
    }
  }
  /**
   * 间距规则
   */
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
}

/**
 * 创建组件规则
 * @param locale 国际化实例
 * @returns 组件规则
 */
export function createComponentRules(locale: LocaleInstance): ComponentRules {
  const theme = useTheme()

  // 创建主题规则
  const themeRules: ThemeRules = {
    useThemeVariable: (propName: string) => `var(--jv-theme-${propName})`,
    getCurrentTheme: () => theme.name,
    getThemeColor: (colorName: string) => {
      if (!theme.current.value.colors[colorName]) {
        return ''
      }
      return theme.current.value.colors[colorName]
    },
  }

  // 创建国际化规则
  const localeRules: LocaleRules = {
    translate: locale.t,
    formatNumber: locale.n,
    getCurrentLocale: () => locale.current,
  }

  // 创建设计规则
  const designRules: DesignRules = {
    useBEM: createNamespace,
    borderRadius: {
      rounded: 'var(--jv-rounded)',
      roundedSm: 'var(--jv-rounded-sm)',
      roundedLg: 'var(--jv-rounded-lg)',
      roundedXl: 'var(--jv-rounded-xl)',
      roundedFull: 'var(--jv-rounded-full)',
    },
    sizes: {
      tiny: 'tiny',
      small: 'small',
      medium: 'medium',
      large: 'large',
      xlarge: 'xlarge',
    },
    colorTypes: [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
    ],
    variants: [
      'text',
      'outlined',
      'tonal',
      'plain',
      'dashed',
      'elevated',
      'flat',
    ],
    animations: {
      transition: 'all 0.3s ease',
      duration: '0.3s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    elevation: {
      default: 'var(--jv-elevation-default)',
      low: 'var(--jv-elevation-4)',
      medium: 'var(--jv-elevation-6)',
      high: 'var(--jv-elevation-8)',
    },
    typography: {
      fontFamily: 'var(--jv-font-family)',
      fontSize: {
        tiny: 'var(--jv-font-size-xs)',
        small: 'var(--jv-font-size-sm)',
        base: 'var(--jv-font-size-base)',
        large: 'var(--jv-font-size-lg)',
        xlarge: 'var(--jv-font-size-xl)',
      },
      fontWeight: {
        light: 'var(--jv-font-weight-light)',
        normal: 'var(--jv-font-weight-normal)',
        medium: 'var(--jv-font-weight-medium)',
        semibold: 'var(--jv-font-weight-semibold)',
        bold: 'var(--jv-font-weight-bold)',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
      },
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  }

  return {
    themeRules,
    localeRules,
    designRules,
  }
}

/**
 * 组件生成指南
 */
export const componentGenerationGuidelines = {
  /**
   * 命名约定
   */
  naming: {
    /**
     * 组件命名规则
     * - 组件名称必须使用PascalCase
     * - 组件文件名必须与组件名一致
     * - 所有组件必须以'Jv'前缀开头
     */
    component: 'JvComponentName',
    /**
     * 文件命名规则
     * - Vue文件名采用PascalCase
     * - 其他文件名采用kebab-case
     */
    files: {
      component: 'JvComponentName.vue',
      types: 'types.ts',
      index: 'index.ts',
      stories: 'JvComponentName.stories.ts',
    },
  },
  /**
   * 组件目录结构
   */
  directoryStructure: {
    /**
     * 组件目录结构样例
     * /jv-component-name/
     *   /src/
     *     JvComponentName.vue
     *     types.ts
     *   /stories/
     *     JvComponentName.stories.ts
     *   index.ts
     */
    description: '组件目录结构必须遵循项目规范',
  },
  /**
   * 组件实现规范
   */
  implementation: {
    /**
     * 样式规范
     * - 使用SCSS预处理器
     * - 使用BEM命名方法
     * - 使用主题变量
     * - 支持自定义样式
     */
    styles: 'SCSS with BEM',
    /**
     * 脚本规范
     * - 使用TypeScript
     * - 使用组合式API (setup)
     * - 导出类型定义
     * - 使用主题和国际化API
     */
    script: 'TypeScript with Composition API',
    /**
     * 模板规范
     * - 使用符合语义的HTML标签
     * - 提供适当的ARIA属性
     * - 支持插槽系统
     * - 支持指令
     */
    template: 'Semantic HTML with ARIA',
  },
  /**
   * Material Design 设计原则
   */
  materialDesign: {
    /**
     * 交互反馈
     * - 提供悬停、聚焦、点击等视觉反馈
     * - 支持涟漪效果
     * - 状态转换平滑
     */
    feedback: 'Visual feedback for interactions',
    /**
     * 主题适配
     * - 支持亮色/暗色主题
     * - 适配主题颜色系统
     * - 使用主题变量
     */
    theming: 'Light/Dark theme support',
    /**
     * 可访问性
     * - 符合WCAG标准
     * - 键盘可访问
     * - 屏幕阅读器友好
     */
    accessibility: 'WCAG compliance',
  },
}
