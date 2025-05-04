import type { Meta, StoryObj } from '@storybook/vue3'
import { JvSpace } from '../index'

/**
 * # JvSpace 间距组件
 *
 * JvSpace 是一个用于控制子元素之间间距的布局组件，它可以在水平或垂直方向上为子元素提供均匀的间距。
 *
 * ## 特性
 * - 支持水平和垂直排列方向
 * - 可设置不同大小的间距，支持预设值和自定义像素值
 * - 支持设置水平和垂直方向不同的间距
 * - 支持自动换行
 * - 支持对齐方式和主轴对齐方式的控制
 * - 支持填充父容器模式
 *
 * ## 何时使用
 * - 当需要在多个元素之间添加相同的间距时
 * - 当需要替代手动设置 margin 的情况
 * - 当需要灵活控制元素的排列和对齐方式时
 *
 * ## 可访问性
 * - Space组件使用语义化的HTML结构，确保良好的可访问性
 * - 支持键盘导航，可以通过Tab键在子元素间导航
 * - 提供适当的空间和间距，提高视觉可访问性
 * - 兼容屏幕阅读器，使用适当的ARIA属性（role、aria-label等）
 */

// 元数据配置
const meta: Meta<typeof JvSpace> = {
  title: '布局组件/Space',
  component: JvSpace,
  tags: ['autodocs'],
  parameters: {
    // 可访问性参数
    a11y: {
      // 可访问性检查配置
      config: {
        rules: [
          // 确保良好的颜色对比度
          { id: 'color-contrast', enabled: true },
          // 确保元素有足够的间距
          { id: 'layout-table', enabled: false },
          // 由于JvSpace本身是布局组件，可以禁用一些不适用的规则
          { id: 'empty-heading', enabled: false },
          { id: 'no-aria-label-on-structure', enabled: false },
        ],
      },
      // 禁用不需要的可访问性检查
      disable: false,
      // 可选：自定义元素选择器
      element: '#storybook-root',
    },
    // 组件描述
    docs: {
      description: {
        component:
          '一个灵活的布局组件，用于控制元素之间的间距，支持水平和垂直排列。',
      },
    },
  },
  argTypes: {
    /**
     * 间距大小，可以是数字（单位为像素）或预设值 'small'(4px), 'medium'(8px), 'large'(16px)
     * 也可以是一个数组 [水平间距, 垂直间距]
     */
    size: {
      control: { type: 'select' },
      options: [4, 8, 16, 24, 32, 'small', 'medium', 'large'],
      description: '间距大小',
      table: {
        type: {
          summary: 'number | string | [number | string, number | string]',
        },
        defaultValue: { summary: 'medium (8px)' },
      },
    },
    /**
     * 排列方向
     * - horizontal: 水平排列
     * - vertical: 垂直排列
     */
    direction: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: '排列方向',
      table: {
        type: { summary: '\'horizontal\' | \'vertical\'' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    /**
     * 垂直对齐方式（当 direction 为 horizontal 时生效）
     * - start: 顶部对齐
     * - end: 底部对齐
     * - center: 居中对齐
     * - baseline: 基线对齐
     */
    align: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'baseline'],
      description: '对齐方式',
      table: {
        type: { summary: '\'start\' | \'end\' | \'center\' | \'baseline\'' },
        defaultValue: { summary: 'start' },
      },
    },
    /**
     * 主轴对齐方式
     * - start: 左对齐/顶部对齐
     * - end: 右对齐/底部对齐
     * - center: 居中对齐
     * - space-around: 等间距分布，两端间距是中间间距的一半
     * - space-between: 两端对齐，中间等间距分布
     */
    justify: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'space-around', 'space-between'],
      description: '主轴对齐方式',
      table: {
        type: {
          summary:
            '\'start\' | \'end\' | \'center\' | \'space-around\' | \'space-between\'',
        },
        defaultValue: { summary: 'start' },
      },
    },
    /**
     * 是否自动换行，仅在 direction 为 horizontal 时有效
     */
    wrap: {
      control: 'boolean',
      description: '是否换行',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    /**
     * 是否填充父容器宽度
     */
    fill: {
      control: 'boolean',
      description: '是否填充父容器',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    /**
     * ARIA角色属性，用于指定组件的语义
     * 默认为 'group'，可设置为其他值或 'none' 来禁用
     */
    role: {
      control: 'text',
      description: 'ARIA角色属性',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'group' },
        category: '可访问性',
      },
    },
    /**
     * ARIA标签，用于为屏幕阅读器提供组件描述
     */
    ariaLabel: {
      control: 'text',
      description: 'ARIA标签',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: '可访问性',
      },
    },
    /**
     * 指向标签元素ID的引用，用于关联外部标签
     */
    ariaLabelledby: {
      control: 'text',
      description: 'ARIA标签ID引用',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: '可访问性',
      },
    },
    /**
     * 指向描述元素ID的引用，用于关联外部描述
     */
    ariaDescribedby: {
      control: 'text',
      description: 'ARIA描述ID引用',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: '可访问性',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof JvSpace>

/**
 * 基础用法
 *
 * 默认情况下，Space 组件会在水平方向上为子元素提供间距。
 *
 * ```html
 * <JvSpace size="8">
 *   <div>元素1</div>
 *   <div>元素2</div>
 *   <div>元素3</div>
 * </JvSpace>
 * ```
 */
export const 基础用法: Story = {
  render: args => ({
    components: { JvSpace },
    setup() {
      return { args }
    },
    template: `
      <JvSpace v-bind="args">
        <div style="padding: 20px; background-color: #f0f0f0;">元素1</div>
        <div style="padding: 20px; background-color: #f0f0f0;">元素2</div>
        <div style="padding: 20px; background-color: #f0f0f0;">元素3</div>
      </JvSpace>
    `,
  }),
  args: {
    size: 8,
    direction: 'horizontal',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
}

/**
 * 垂直排列
 *
 * 将 `direction` 属性设置为 `vertical` 可以使子元素垂直排列。
 *
 * ```html
 * <JvSpace direction="vertical" size="16">
 *   <div>元素1</div>
 *   <div>元素2</div>
 *   <div>元素3</div>
 * </JvSpace>
 * ```
 */
export const 垂直排列: Story = {
  render: 基础用法.render,
  args: {
    size: 16,
    direction: 'vertical',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
}

/**
 * 自定义间距
 *
 * 可以通过设置 `size` 属性来控制间距大小。
 *
 * ```html
 * <JvSpace size="24">
 *   <div>元素1</div>
 *   <div>元素2</div>
 *   <div>元素3</div>
 * </JvSpace>
 * ```
 */
export const 自定义间距: Story = {
  render: 基础用法.render,
  args: {
    size: 24,
    direction: 'horizontal',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
}

/**
 * ## 不同的水平垂直间距
 *
 * 可以使用数组设置水平和垂直方向的不同间距。
 *
 * ```html
 * <!-- [水平间距, 垂直间距] -->
 * <JvSpace :size="[16, 8]" wrap>
 *   <div>元素1</div>
 *   <div>元素2</div>
 *   <div>元素3</div>
 * </JvSpace>
 * ```
 */
export const 不同的水平垂直间距: Story = {
  render: 基础用法.render,
  args: {
    size: [16, 8],
    direction: 'horizontal',
    wrap: true,
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
}

/**
 * ## 对齐方式
 *
 * 使用 `align` 属性控制垂直对齐方式。
 *
 * ```html
 * <JvSpace align="center" size="16">
 *   <div>较小元素</div>
 *   <div>中等元素</div>
 *   <div>较大元素</div>
 * </JvSpace>
 * ```
 */
export const 对齐方式: Story = {
  render: args => ({
    components: { JvSpace },
    setup() {
      return { args }
    },
    template: `
      <JvSpace v-bind="args" style="height: 150px; border: 1px dashed #ccc;">
        <div style="padding: 10px; background-color: #f0f0f0;">较小元素</div>
        <div style="padding: 20px; background-color: #f0f0f0;">中等元素</div>
        <div style="padding: 30px; background-color: #f0f0f0;">较大元素</div>
      </JvSpace>
    `,
  }),
  args: {
    size: 16,
    align: 'center',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
}

/**
 * ## 主轴对齐方式
 *
 * 使用 `justify` 属性控制主轴对齐方式。
 *
 * ```html
 * <JvSpace justify="space-between" size="16">
 *   <div>元素1</div>
 *   <div>元素2</div>
 *   <div>元素3</div>
 * </JvSpace>
 * ```
 */
export const 主轴对齐方式: Story = {
  render: args => ({
    components: { JvSpace },
    setup() {
      return { args }
    },
    template: `
      <JvSpace v-bind="args" style="width: 100%; border: 1px dashed #ccc;">
        <div style="padding: 15px; background-color: #f0f0f0;">元素1</div>
        <div style="padding: 15px; background-color: #f0f0f0;">元素2</div>
        <div style="padding: 15px; background-color: #f0f0f0;">元素3</div>
      </JvSpace>
    `,
  }),
  args: {
    size: 16,
    justify: 'space-between',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
}

/**
 * ## 自动换行
 *
 * 设置 `wrap` 属性为 `true` 可以启用自动换行。
 * 当容器宽度不足以放置所有子元素时，元素会自动换行显示。
 *
 * ```html
 * <JvSpace wrap size="16">
 *   <div>元素1</div>
 *   <div>元素2</div>
 *   <!-- 更多元素 -->
 * </JvSpace>
 * ```
 */
export const 自动换行: Story = {
  render: args => ({
    components: { JvSpace },
    setup() {
      return { args }
    },
    template: `
      <JvSpace v-bind="args" style="width: 300px; border: 1px dashed #ccc;">
        <div style="padding: 15px; background-color: #f0f0f0;">元素1</div>
        <div style="padding: 15px; background-color: #f0f0f0;">元素2</div>
        <div style="padding: 15px; background-color: #f0f0f0;">元素3</div>
        <div style="padding: 15px; background-color: #f0f0f0;">元素4</div>
        <div style="padding: 15px; background-color: #f0f0f0;">元素5</div>
        <div style="padding: 15px; background-color: #f0f0f0;">元素6</div>
      </JvSpace>
    `,
  }),
  args: {
    size: 16,
    wrap: true,
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
}

/**
 * ## 填充父容器
 *
 * 设置 `fill` 属性为 `true` 时，子元素会自动填充整个容器宽度。
 * 通常与 `justify="space-between"` 组合使用，可以使子元素均匀分布。
 *
 * ```html
 * <JvSpace fill justify="space-between" size="16">
 *   <div>元素1</div>
 *   <div>元素2</div>
 *   <div>元素3</div>
 * </JvSpace>
 * ```
 */
export const 填充父容器: Story = {
  render: args => ({
    components: { JvSpace },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; border: 1px solid #ccc; padding: 16px;">
        <JvSpace v-bind="args">
          <div style="padding: 15px; background-color: #f0f0f0;">元素1</div>
          <div style="padding: 15px; background-color: #f0f0f0;">元素2</div>
          <div style="padding: 15px; background-color: #f0f0f0;">元素3</div>
        </JvSpace>
      </div>
    `,
  }),
  args: {
    size: 16,
    fill: true,
    justify: 'space-between',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
}

/**
 * ## 可访问性支持
 *
 * Space组件支持ARIA属性，可以通过设置相应的属性来提高可访问性。
 *
 * ```html
 * <JvSpace
 *   role="group"
 *   aria-label="分组的导航按钮"
 *   size="16"
 *   direction="horizontal"
 * >
 *   <button>按钮1</button>
 *   <button>按钮2</button>
 *   <button>按钮3</button>
 * </JvSpace>
 * ```
 */
export const 可访问性支持: Story = {
  render: args => ({
    components: { JvSpace },
    setup() {
      return { args }
    },
    template: `
      <div>
        <h3 id="spaceTitle">导航按钮组</h3>
        <p id="spaceDesc">这是一组水平排列的导航按钮</p>
        <JvSpace 
          v-bind="args" 
          aria-labelledby="spaceTitle"
          aria-describedby="spaceDesc"
        >
          <button style="padding: 10px 20px; background-color: #4096ff; color: white; border: none; border-radius: 4px; cursor: pointer;">首页</button>
          <button style="padding: 10px 20px; background-color: #4096ff; color: white; border: none; border-radius: 4px; cursor: pointer;">产品</button>
          <button style="padding: 10px 20px; background-color: #4096ff; color: white; border: none; border-radius: 4px; cursor: pointer;">关于我们</button>
        </JvSpace>
      </div>
    `,
  }),
  args: {
    size: 16,
    direction: 'horizontal',
    role: 'navigation',
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
        ],
      },
    },
    docs: {
      description: {
        story:
          '通过设置适当的ARIA属性，可以使Space组件更加友好地支持屏幕阅读器等辅助技术。',
      },
    },
  },
}
