import type { Meta, StoryObj } from '@storybook/vue3'
import { JvGrid, JvGridItem } from '..'

// 元数据配置
const meta: Meta<typeof JvGrid> = {
  title: '布局组件/Grid 网格布局',
  component: JvGrid,
  argTypes: {
    cols: {
      control: { type: 'number' },
      description: '列数',
      defaultValue: 12,
    },
    rows: {
      control: { type: 'number' },
      description: '行数',
    },
    gap: {
      control: { type: 'number' },
      description: '间距',
      defaultValue: 16,
    },
    fill: {
      control: { type: 'boolean' },
      description: '是否填充父容器',
      defaultValue: false,
    },
    height: {
      control: { type: 'text' },
      description: '高度',
    },
    width: {
      control: { type: 'text' },
      description: '宽度',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvGrid>

// 基础网格示例
export const Basic: Story = {
  render: args => ({
    components: { JvGrid, JvGridItem },
    setup() {
      return { args }
    },
    template: `
      <JvGrid v-bind="args" style="min-height: 400px">
        <JvGridItem v-for="i in 4" :key="i">
          网格项 {{ i }}
        </JvGridItem>
      </JvGrid>
    `,
  }),
  args: {
    cols: 2,
    gap: 16,
  },
}

// 响应式布局示例
export const Responsive: Story = {
  render: args => ({
    components: { JvGrid, JvGridItem },
    setup() {
      return { args }
    },
    template: `
      <JvGrid v-bind="args" style="min-height: 400px">
        <JvGridItem v-for="i in 12" :key="i" style="display: flex; align-items: center; justify-content: center;">
          网格项 {{ i }}
        </JvGridItem>
      </JvGrid>
    `,
  }),
  args: {
    responsiveCols: {
      'xs': 1,
      'sm': 2,
      'md': 3,
      'lg': 4,
      'xl': 6,
      '2xl': 12,
    },
    responsiveGap: {
      xs: 8,
      md: 16,
      lg: 24,
    },
    fill: true,
  },
}

// 复杂网格布局示例
export const ComplexLayout: Story = {
  render: args => ({
    components: { JvGrid, JvGridItem },
    setup() {
      return { args }
    },
    template: `
      <JvGrid v-bind="args" style="min-height: 500px">
        <JvGridItem :colSpan="2" :rowSpan="2" style="background-color: var(--jv-theme-primary); color: white;">
          跨越2行2列
        </JvGridItem>
        <JvGridItem style="background-color: var(--jv-theme-secondary); color: white;">
          正常大小
        </JvGridItem>
        <JvGridItem style="background-color: var(--jv-theme-success); color: white;">
          正常大小
        </JvGridItem>
        <JvGridItem :colSpan="2" style="background-color: var(--jv-theme-warning);">
          跨越2列
        </JvGridItem>
        <JvGridItem style="background-color: var(--jv-theme-danger); color: white;">
          正常大小
        </JvGridItem>
      </JvGrid>
    `,
  }),
  args: {
    cols: 3,
    gap: 16,
  },
}
