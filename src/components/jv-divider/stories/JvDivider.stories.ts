import type { Meta, StoryObj } from '@storybook/vue3'
import { JvDivider } from '@/components/jv-divider'

const meta = {
  title: '布局组件/Divider 分割线',
  component: JvDivider,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: '分割线颜色',
      control: 'color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--jv-theme-border)' },
      },
    },
    size: {
      description: '分割线粗细',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1px' },
      },
    },
    vertical: {
      description: '是否垂直分割线',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dashed: {
      description: '是否虚线',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inset: {
      description: '是否内嵌',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    length: {
      description: '分割线长度',
      control: 'text',
      table: {
        type: { summary: 'string | number' },
      },
    },
    opacity: {
      description: '透明度',
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    variant: {
      description: '分割线变体',
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
      },
    },
    spacing: {
      description: '间距大小',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
  },
} satisfies Meta<typeof JvDivider>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px;">
        <div style="margin-bottom: 20px;">上方内容</div>
        <jv-divider v-bind="args" />
        <div style="margin-top: 20px;">下方内容</div>
      </div>
    `,
  }),
}

// 不同变体
export const Variants: Story = {
  render: () => ({
    components: { JvDivider },
    template: `
      <div style="padding: 20px;">
        <div style="margin-bottom: 20px;">实线</div>
        <jv-divider variant="solid" />
        <div style="margin: 20px 0;">虚线</div>
        <jv-divider variant="dashed" />
        <div style="margin: 20px 0;">点线</div>
        <jv-divider variant="dotted" />
        <div style="margin: 20px 0;">双线</div>
        <jv-divider variant="double" />
      </div>
    `,
  }),
}

// 不同间距
export const Spacing: Story = {
  render: () => ({
    components: { JvDivider },
    template: `
      <div style="padding: 20px;">
        <div>xs 间距</div>
        <jv-divider spacing="xs" />
        <div style="margin-top: 20px;">sm 间距</div>
        <jv-divider spacing="sm" />
        <div style="margin-top: 20px;">md 间距</div>
        <jv-divider spacing="md" />
        <div style="margin-top: 20px;">lg 间距</div>
        <jv-divider spacing="lg" />
        <div style="margin-top: 20px;">xl 间距</div>
        <jv-divider spacing="xl" />
      </div>
    `,
  }),
}

// 垂直分割线
export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: args => ({
    components: { JvDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; align-items: center; height: 100px; padding: 20px;">
        <div>左侧内容</div>
        <jv-divider v-bind="args" />
        <div>右侧内容</div>
      </div>
    `,
  }),
}

// 内嵌分割线
export const Inset: Story = {
  args: {
    inset: true,
  },
  render: args => ({
    components: { JvDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px;">
        <div style="margin-bottom: 20px;">上方内容</div>
        <jv-divider v-bind="args" />
        <div style="margin-top: 20px;">下方内容</div>
      </div>
    `,
  }),
}

// 自定义颜色和透明度
export const CustomStyle: Story = {
  args: {
    color: '#ff0000',
    opacity: 0.5,
  },
  render: args => ({
    components: { JvDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px;">
        <div style="margin-bottom: 20px;">上方内容</div>
        <jv-divider v-bind="args" />
        <div style="margin-top: 20px;">下方内容</div>
      </div>
    `,
  }),
}

// 自定义长度
export const CustomLength: Story = {
  args: {
    length: '50%',
  },
  render: args => ({
    components: { JvDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px;">
        <div style="margin-bottom: 20px;">上方内容</div>
        <jv-divider v-bind="args" />
        <div style="margin-top: 20px;">下方内容</div>
      </div>
    `,
  }),
}
