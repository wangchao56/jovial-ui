import type { ComponentRules } from '@/config/component-rules'

/**
 * 组件生成器配置
 */
export interface ComponentGeneratorConfig {
  /**
   * 组件名称
   */
  componentName: string
  /**
   * 组件描述
   */
  description: string
  /**
   * 组件属性
   */
  props?: Record<
    string,
    {
      type: string
      description: string
      default?: string
      required?: boolean
    }
  >
  /**
   * 组件事件
   */
  emits?: Record<
    string,
    {
      description: string
      params?: Record<string, string>
    }
  >
  /**
   * 组件插槽
   */
  slots?: Record<
    string,
    {
      description: string
      props?: Record<string, string>
    }
  >
  /**
   * 组件暴露方法
   */
  exposes?: Record<
    string,
    {
      description: string
      params?: Record<string, string>
      returns?: string
    }
  >
  /**
   * 是否需要主题
   */
  needTheme?: boolean
  /**
   * 是否需要国际化
   */
  needLocale?: boolean
  /**
   * 变体类型
   */
  variants?: string[]
  /**
   * 颜色类型
   */
  colorTypes?: string[]
  /**
   * 尺寸类型
   */
  sizes?: string[]
}

/**
 * 组件生成器
 */
export class ComponentGenerator {
  private rules: ComponentRules
  private config: ComponentGeneratorConfig

  /**
   * 构造函数
   * @param rules 组件规则
   * @param config 组件生成器配置
   */
  constructor(rules: ComponentRules, config: ComponentGeneratorConfig) {
    this.rules = rules
    this.config = config
  }

  /**
   * 生成组件类型定义
   * @returns 组件类型定义代码
   */
  generateTypes(): string {
    const { componentName, props, emits, slots, exposes, description }
      = this.config
    const componentNameConstant = componentName.toUpperCase()

    let code = `import type { Slot } from 'vue'\n`
    code += `import { createNamespace } from '@/utils'\n\n`

    if (this.config.needTheme) {
      code += `import type { ThemeInstance } from '@/theme'\n`
    }

    if (this.config.needLocale) {
      code += `import type { LocaleInstance } from '@/locale/types'\n`
    }

    code += `\n// 组件名称常量\n`
    code += `export const ${componentNameConstant}_NAME = '${componentName}'\n`
    code += `// 创建BEM命名空间\n`
    code += `export const bem = createNamespace(${componentNameConstant}_NAME)\n\n`

    // 生成Props接口
    if (props && Object.keys(props).length > 0) {
      code += `/**\n * ${componentName} 属性\n * ${description}\n */\n`
      code += `export interface ${componentName}Props {\n`

      for (const propName in props) {
        const prop = props[propName]
        code += `  /**\n   * ${prop.description}\n`
        if (prop.default !== undefined) {
          code += `   * @default ${prop.default}\n`
        }
        code += `   */\n`
        code += `  ${propName}${prop.required ? '' : '?'}: ${prop.type}\n`
      }

      code += `}\n\n`
    }

    // 生成Emits接口
    if (emits && Object.keys(emits).length > 0) {
      code += `/**\n * ${componentName} 事件\n */\n`
      code += `export interface ${componentName}Emits {\n`

      for (const emitName in emits) {
        const emit = emits[emitName]
        code += `  /**\n   * ${emit.description}\n   */\n`

        let paramsString = ''
        if (emit.params && Object.keys(emit.params).length > 0) {
          const paramEntries = Object.entries(emit.params)
          paramsString = paramEntries
            .map(([name, type]) => `${name}: ${type}`)
            .join(', ')
        }
        else {
          paramsString = 'event: Event'
        }

        code += `  (e: '${emitName}', ${paramsString}): void\n`
      }

      code += `}\n\n`
    }

    // 生成Slots接口
    if (slots && Object.keys(slots).length > 0) {
      code += `/**\n * ${componentName} 插槽\n */\n`
      code += `export interface ${componentName}Slots {\n`

      for (const slotName in slots) {
        const slot = slots[slotName]
        code += `  /**\n   * ${slot.description}\n   */\n`
        code += `  ${slotName}: Slot${
          slot.props && Object.keys(slot.props).length > 0
            ? `<{ ${Object.entries(slot.props)
              .map(([name, type]) => `${name}: ${type}`)
              .join(', ')} }>`
            : ''
        }\n`
      }

      code += `}\n\n`
    }

    // 生成Exposes接口
    if (exposes && Object.keys(exposes).length > 0) {
      code += `/**\n * ${componentName} 暴露方法\n */\n`
      code += `export interface ${componentName}Exposes {\n`

      for (const exposeName in exposes) {
        const expose = exposes[exposeName]
        code += `  /**\n   * ${expose.description}\n   */\n`

        let paramsString = ''
        if (expose.params && Object.keys(expose.params).length > 0) {
          const paramEntries = Object.entries(expose.params)
          paramsString = paramEntries
            .map(([name, type]) => `${name}: ${type}`)
            .join(', ')
        }

        code += `  ${exposeName}(${paramsString}): ${expose.returns || 'void'}\n`
      }

      code += `}\n`
    }

    return code
  }

  /**
   * 生成组件模板
   * @returns 组件Vue文件内容
   */
  generateComponent(): string {
    const { componentName, props, emits, slots } = this.config
    const componentNameConstant = componentName.toUpperCase()

    let code = `<script setup lang="ts">\n`

    // 导入类型和依赖
    code += `import type { ${componentName}Props${emits ? `, ${componentName}Emits` : ''} } from './types'\n`
    code += `import { ${componentNameConstant}_NAME, bem } from './types'\n`

    // 导入钩子
    const imports = []

    if (this.config.needTheme) {
      imports.push('useTheme')
    }

    if (this.config.needLocale) {
      imports.push('useLocale')
    }

    if (imports.length > 0) {
      const importsStr = imports.join(', ')
      code += `import { ${importsStr} } from '@/hooks'\n`
    }

    // 组件选项
    code += `\ndefineOptions({ name: ${componentNameConstant}_NAME })\n\n`

    // Props定义
    if (props && Object.keys(props).length > 0) {
      const defaultProps = Object.entries(props)
        .filter(([_, prop]) => prop.default !== undefined)
        .map(([name, prop]) => `${name} = ${prop.default}`)
        .join(', ')

      if (defaultProps.length > 0) {
        code += `const {\n  ${defaultProps}\n} = defineProps<${componentName}Props>()\n\n`
      }
      else {
        code += `const props = defineProps<${componentName}Props>()\n\n`
      }
    }

    // Emits定义
    if (emits && Object.keys(emits).length > 0) {
      code += `const emit = defineEmits<${componentName}Emits>()\n\n`
    }

    // 主题和国际化
    if (this.config.needTheme) {
      code += `const theme = useTheme()\n`
    }

    if (this.config.needLocale) {
      code += `const { t } = useLocale()\n`
    }

    code += `</script>\n\n`

    // 模板部分
    code += `<template>\n`
    code += `  <div :class="bem.b()">\n`

    // 插槽
    if (slots) {
      if (slots.default) {
        code += `    <slot></slot>\n`
      }
      else {
        code += `    <!-- 组件内容 -->\n`
      }

      // 其他命名插槽
      for (const slotName in slots) {
        if (slotName !== 'default') {
          const slot = slots[slotName]
          if (slot.props && Object.keys(slot.props).length > 0) {
            const slotProps = Object.keys(slot.props).join(', ')
            code += `    <slot name="${slotName}" :${slotProps}="${slotProps}"></slot>\n`
          }
          else {
            code += `    <slot name="${slotName}"></slot>\n`
          }
        }
      }
    }
    else {
      code += `    <!-- 组件内容 -->\n`
    }

    code += `  </div>\n`
    code += `</template>\n\n`

    // 样式部分
    code += `<style lang="scss" scoped>\n`
    code += `@use 'sass:map';\n`

    // 使用BEM混入
    code += `\n@include b(${componentName.toLowerCase().replace(/^jv/, '')}) {\n`
    code += `  // 基本样式\n`

    // 使用主题变量
    if (this.config.needTheme) {
      code += `  color: var(--jv-theme-on-background);\n`
      code += `  background-color: var(--jv-theme-background);\n`
    }

    // 变体样式
    if (this.config.variants && this.config.variants.length > 0) {
      code += `\n  // 变体样式\n`
      this.config.variants.forEach((variant) => {
        code += `  @include m(variant-${variant}) {\n`
        code += `    // ${variant} 变体样式\n`
        code += `  }\n`
      })
    }

    // 颜色类型样式
    if (this.config.colorTypes && this.config.colorTypes.length > 0) {
      code += `\n  // 颜色类型样式\n`
      this.config.colorTypes.forEach((colorType) => {
        code += `  @include m(color-type-${colorType}) {\n`
        code += `    // ${colorType} 颜色样式\n`
        code += `  }\n`
      })
    }

    // 尺寸样式
    if (this.config.sizes && this.config.sizes.length > 0) {
      code += `\n  // 尺寸样式\n`
      this.config.sizes.forEach((size) => {
        code += `  @include m(size-${size}) {\n`
        code += `    // ${size} 尺寸样式\n`
        code += `  }\n`
      })
    }

    code += `}\n`
    code += `</style>\n`

    return code
  }

  /**
   * 生成组件索引文件
   * @returns 索引文件内容
   */
  generateIndex(): string {
    const { componentName } = this.config

    let code = `import { withInstall } from '@/utils'\n`
    code += `import _${componentName} from './src/${componentName}.vue'\n\n`

    code += `export const ${componentName} = withInstall(_${componentName})\n`
    code += `export default ${componentName}\n\n`

    code += `export * from './src/types'\n`
    code += `\n`
    code += `// 类型声明\n`
    code += `declare module 'vue' {\n`
    code += `  export interface GlobalComponents {\n`
    code += `    ${componentName}: typeof ${componentName}\n`
    code += `  }\n`
    code += `}\n`

    return code
  }

  /**
   * 生成Story文件
   * @returns Story文件内容
   */
  generateStory(): string {
    const { componentName, description, props } = this.config
    const kebabName = this.toKebabCase(componentName)

    let code = `import type { Meta, StoryObj } from '@storybook/vue3'\n`
    code += `import ${componentName} from '../../src/${kebabName}'\n\n`

    code += `// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction\n`
    code += `const meta = {\n`
    code += `  title: 'Components/${componentName}',\n`
    code += `  component: ${componentName},\n`
    code += `  tags: ['autodocs'],\n`
    code += `  argTypes: {\n`

    // 生成argTypes
    if (props) {
      for (const propName in props) {
        const prop = props[propName]
        code += `    ${propName}: {\n`
        code += `      description: '${prop.description}',\n`

        // 根据类型提供控件
        if (prop.type === 'boolean') {
          code += `      control: 'boolean',\n`
        }
        else if (prop.type.includes('string') && prop.type.includes('|')) {
          code += `      control: 'select',\n`
          const options = prop.type
            .replace(/['"]/g, '')
            .split('|')
            .map(t => t.trim())
          code += `      options: [${options.join(', ')}],\n`
        }
        else if (prop.type === 'string') {
          code += `      control: 'text',\n`
        }
        else if (prop.type === 'number') {
          code += `      control: 'number',\n`
        }

        if (prop.default !== undefined) {
          code += `      defaultValue: ${prop.default},\n`
        }

        code += `    },\n`
      }
    }

    code += `  },\n`
    code += `  parameters: {\n`
    code += `    docs: {\n`
    code += `      description: {\n`
    code += `        component: '${description}',\n`
    code += `      },\n`
    code += `    },\n`
    code += `  },\n`
    code += `} satisfies Meta<typeof ${componentName}>\n\n`

    code += `export default meta\n`
    code += `type Story = StoryObj<typeof meta>\n\n`

    // 默认Story
    code += `export const Default: Story = {\n`
    code += `  args: {\n`

    // 设置默认参数
    if (props) {
      for (const propName in props) {
        const prop = props[propName]
        if (prop.default !== undefined) {
          code += `    ${propName}: ${prop.default},\n`
        }
      }
    }

    code += `  },\n`
    code += `}\n\n`

    // 变体Stories
    if (this.config.variants && this.config.variants.length > 0) {
      code += `// 变体示例\n`
      this.config.variants.forEach((variant) => {
        const variantName = this.toPascalCase(variant)
        code += `export const ${variantName}Variant: Story = {\n`
        code += `  args: {\n`

        // 设置变体参数
        if (props && props.variant) {
          code += `    variant: '${variant}',\n`
        }

        code += `  },\n`
        code += `}\n\n`
      })
    }

    return code
  }

  /**
   * 转换为kebab-case
   * @param str 输入字符串
   * @returns kebab-case字符串
   */
  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  }

  /**
   * 转换为PascalCase
   * @param str 输入字符串
   * @returns PascalCase字符串
   */
  private toPascalCase(str: string): string {
    return str
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  }
}
