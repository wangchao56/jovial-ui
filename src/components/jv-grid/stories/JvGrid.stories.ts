import type { Meta, StoryObj } from '@storybook/vue3'
import { JvGrid, JvGridItem } from '..'

// 元数据配置
const meta: Meta<typeof JvGrid> = {
  title: '布局/JvGrid 网格布局',
  component: JvGrid,
  argTypes: {
    cols: {
      control: { type: 'number' },
      description: '列数',
      defaultValue: 12
    },
    rows: {
      control: { type: 'number' },
      description: '行数'
    },
    gap: {
      control: { type: 'number' },
      description: '间距',
      defaultValue: 16
    },
    header: {
      control: { type: 'text' },
      description: '标题'
    },
    subheader: {
      control: { type: 'text' },
      description: '副标题'
    },
    bordered: {
      control: { type: 'boolean' },
      description: '是否有边框',
      defaultValue: false
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: '内边距',
      defaultValue: 'md'
    },
    colorType: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info'
      ],
      description: '颜色类型',
      defaultValue: 'default'
    },
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined', 'tonal'],
      description: '变体',
      defaultValue: 'elevated'
    }
  }
}

export default meta
type Story = StoryObj<typeof JvGrid>

// 基础网格示例
export const Basic: Story = {
  render: (args) => ({
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
    `
  }),
  args: {
    cols: 2,
    gap: 16,
    header: '基础网格',
    subheader: '2x2 网格布局',
    bordered: true,
    padding: 'md'
  }
}

// 带有标题的网格示例
export const WithHeader: Story = {
  render: (args) => ({
    components: { JvGrid, JvGridItem },
    setup() {
      return { args }
    },
    template: `
      <JvGrid v-bind="args" style="min-height: 400px">
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0;">自定义标题</h3>
            <button style="background: var(--jv-theme-primary); color: white; border: none; padding: 8px 16px; border-radius: 4px;">操作按钮</button>
          </div>
        </template>
        <JvGridItem v-for="i in 3" :key="i">
          网格项 {{ i }}
        </JvGridItem>
      </JvGrid>
    `
  }),
  args: {
    cols: 3,
    gap: 16,
    bordered: false,
    padding: 'md',
    variant: 'elevated'
  }
}

// 复杂网格布局示例
export const ComplexLayout: Story = {
  render: (args) => ({
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
    `
  }),
  args: {
    cols: 3,
    gap: 16,
    header: '复杂网格布局',
    subheader: '使用colSpan和rowSpan属性创建不同大小的网格项',
    bordered: true,
    padding: 'lg',
    variant: 'outlined'
  }
}

// 自动填充示例
export const AutoFill: Story = {
  render: (args) => ({
    components: { JvGrid, JvGridItem },
    setup() {
      return { args }
    },
    template: `
      <JvGrid v-bind="args" style="min-height: 400px">
        <JvGridItem v-for="i in 8" :key="i" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          自动填充项 {{ i }}
        </JvGridItem>
      </JvGrid>
    `
  }),
  args: {
    cols: 200,
    autoFill: true,
    gap: 16,
    header: '自动填充网格',
    subheader: '根据容器宽度自动适应网格项数量',
    bordered: true,
    padding: 'md',
    variant: 'tonal'
  }
}
