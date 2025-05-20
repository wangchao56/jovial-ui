import type { Meta, StoryObj } from '@storybook/vue3'
import { Shape } from '@/constants'
import JvButton, { JvButtonGroup } from '..'

const meta: Meta<typeof JvButtonGroup> = {
  title: '通用组件/Button/ButtonGroup 按钮组',
  component: JvButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      description: '按钮组方向',
      control: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    variant: {
      description: '按钮组变体',
      control: 'select',
      options: ['text', 'outlined', 'tonal', 'plain', 'dashed', 'elevated', 'flat'],
      defaultValue: 'elevated',
    },
    size: {
      description: '按钮组尺寸',
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'xlarge'],
      defaultValue: 'medium',
    },
    color: {
      description: '按钮组颜色',
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      defaultValue: 'default',
    },
    disabled: {
      description: '是否禁用按钮组',
      control: 'boolean',
      defaultValue: false,
    },
    shape: {
      description: '按钮组形状',
      control: 'select',
      options: Object.values(Shape),
      defaultValue: Shape.SQUARE,
    },
    gap: {
      description: '按钮间距',
      control: { type: 'number', min: 0, max: 20, step: 1 },
      defaultValue: 2,
    },
    attached: {
      description: '是否使用紧凑模式',
      control: 'boolean',
      defaultValue: false,
    },
    rounded: {
      description: '按钮组圆角',
      control: 'select',
      options: [
        'none',
        'sm',
        'md',
        'lg',
        'xl',
        'pill',
        'circle',
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof JvButtonGroup>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvButtonGroup, JvButton },
    setup() {
      return { args }
    },
    template: `
      <JvButtonGroup v-bind="args">
        <JvButton content="按钮1" />
        <JvButton content="按钮2" />
        <JvButton content="按钮3" />
      </JvButtonGroup>
    `,
  }),
  args: {},
}

// 垂直布局
export const Vertical: Story = {
  render: args => ({
    components: { JvButtonGroup, JvButton },
    setup() {
      return { args }
    },
    template: `
      <JvButtonGroup v-bind="args">
        <JvButton content="按钮1" />
        <JvButton content="按钮2" />
        <JvButton content="按钮3" />
      </JvButtonGroup>
    `,
  }),
  args: {
    direction: 'vertical',
  },
}

// 紧凑模式
export const Attached: Story = {
  render: args => ({
    components: { JvButtonGroup, JvButton },
    setup() {
      return { args }
    },
    template: `
      <JvButtonGroup v-bind="args">
        <JvButton content="按钮1" />
        <JvButton content="按钮2" />
        <JvButton content="按钮3" />
      </JvButtonGroup>
    `,
  }),
  args: {
    attached: true,
    rounded: 'lg',
  },
}

// 不同变体
export const Variants: Story = {
  render: args => ({
    components: { JvButtonGroup, JvButton },
    setup() {
      const variants = ['elevated', 'outlined', 'tonal', 'text', 'dashed', 'plain', 'flat']
      return { args, variants }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvButtonGroup v-for="variant in variants" :key="variant" v-bind="args" :variant="variant">
          <JvButton :content="variant" />
          <JvButton content="按钮2" />
          <JvButton content="按钮3" />
        </JvButtonGroup>
      </div>
    `,
  }),
  args: {
    color: 'primary',
  },
}

// 不同尺寸
export const Sizes: Story = {
  render: args => ({
    components: { JvButtonGroup, JvButton },
    setup() {
      const sizes = ['tiny', 'small', 'medium', 'large', 'xlarge']
      return { args, sizes }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvButtonGroup v-for="size in sizes" :key="size" v-bind="args" :size="size">
          <JvButton :content="size" />
          <JvButton content="按钮2" />
          <JvButton content="按钮3" />
        </JvButtonGroup>
      </div>
    `,
  }),
  args: {
    variant: 'outlined',
    color: 'primary',
  },
}

// 不同颜色
export const Colors: Story = {
  render: args => ({
    components: { JvButtonGroup, JvButton },
    setup() {
      const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']
      return { args, colors }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvButtonGroup v-for="color in colors" :key="color" v-bind="args" :color="color">
          <JvButton :content="color" />
          <JvButton content="按钮2" />
          <JvButton content="按钮3" />
        </JvButtonGroup>
      </div>
    `,
  }),
  args: {
    variant: 'tonal',
  },
}

// 不同形状
export const Shapes: Story = {
  render: args => ({
    components: { JvButtonGroup, JvButton },
    setup() {
      const shapes = Object.values(Shape)
      return { args, shapes }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvButtonGroup v-for="shape in shapes" :key="shape" v-bind="args" :shape="shape">
          <JvButton :content="shape" />
          <JvButton content="按钮2" />
          <JvButton content="按钮3" />
        </JvButtonGroup>
      </div>
    `,
  }),
  args: {
    variant: 'outlined',
    color: 'primary',
  },
}

// 禁用状态
export const Disabled: Story = {
  render: args => ({
    components: { JvButtonGroup, JvButton },
    setup() {
      return { args }
    },
    template: `
      <JvButtonGroup v-bind="args">
        <JvButton content="按钮1" />
        <JvButton content="按钮2" />
        <JvButton content="按钮3" />
      </JvButtonGroup>
    `,
  }),
  args: {
    disabled: true,
    variant: 'outlined',
    color: 'primary',
  },
}

// 图标按钮组
export const IconButtons: Story = {
  render: args => ({
    components: { JvButtonGroup, JvButton },
    setup() {
      return { args }
    },
    template: `
      <JvButtonGroup v-bind="args">
        <JvButton icon="mdi:format-bold" />
        <JvButton icon="mdi:format-italic" />
        <JvButton icon="mdi:format-underline" />
      </JvButtonGroup>
    `,
  }),
  args: {
    attached: true,
    rounded: 'pill',
    variant: 'outlined',
    color: 'secondary',
  },
}
