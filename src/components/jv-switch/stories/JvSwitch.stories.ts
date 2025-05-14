import type { Meta, StoryObj } from '@storybook/vue3'
import JvSwitch from '../src/JvSwitch.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '数据输入组件/Switch 开关',
  component: JvSwitch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '开关的值',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: '是否只读',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'xlarge'],
      description: '开关尺寸',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: '开关颜色',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: 'radio',
      options: ['inside', 'outside'],
      description: '开关样式类型',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'inside' },
      },
    },
    activeText: {
      control: 'text',
      description: '打开时的文本',
      table: {
        type: { summary: 'string' },
      },
    },
    inactiveText: {
      control: 'text',
      description: '关闭时的文本',
      table: {
        type: { summary: 'string' },
      },
    },
    loading: {
      control: 'boolean',
      description: '是否加载中',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    square: {
      control: 'boolean',
      description: '是否为方形开关',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showIcon: {
      control: 'boolean',
      description: '是否显示图标',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    name: {
      control: 'text',
      description: '表单名称',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    modelValue: false,
    disabled: false,
    readonly: false,
    size: 'medium',
    color: 'primary',
    variant: 'inside',
    showIcon: true,
    loading: false,
    square: false,
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvSwitch>

export default meta

type Story = StoryObj<typeof meta>

// 基础用法
export const Default: Story = {
  render: args => ({
    components: { JvSwitch },
    setup() {
      return { args }
    },
    template: `<JvSwitch v-bind="args" v-model="args.modelValue" />`,
  }),
}

// 带文本
export const WithText: Story = {
  args: {
    activeText: '开启',
    inactiveText: '关闭',
  },
  render: args => ({
    components: { JvSwitch },
    setup() {
      return { args }
    },
    template: `<JvSwitch v-bind="args" v-model="args.modelValue" />`,
  }),
}

// 不同尺寸
export const DifferentSizes: Story = {
  render: args => ({
    components: { JvSwitch },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <JvSwitch v-model="args.modelValue" size="tiny" />
        <JvSwitch v-model="args.modelValue" size="small" />
        <JvSwitch v-model="args.modelValue" size="medium" />
        <JvSwitch v-model="args.modelValue" size="large" />
        <JvSwitch v-model="args.modelValue" size="xlarge" />
      </div>
    `,
  }),
}

// 不同变体
export const DifferentVariants: Story = {
  render: args => ({
    components: { JvSwitch },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 80px;">Inside:</span>
          <JvSwitch v-model="args.modelValue" variant="inside" />
          <JvSwitch v-model="args.modelValue" variant="inside" color="success" />
          <JvSwitch v-model="args.modelValue" variant="inside" color="error" />
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 80px;">Outside:</span>
          <JvSwitch v-model="args.modelValue" variant="outside" />
          <JvSwitch v-model="args.modelValue" variant="outside" color="success" />
          <JvSwitch v-model="args.modelValue" variant="outside" color="error" />
        </div>
      </div>
    `,
  }),
}

// 不同颜色
export const DifferentColors: Story = {
  args: {
    modelValue: true,
  },
  render: args => ({
    components: { JvSwitch },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvSwitch v-model="args.modelValue" color="primary" />
        <JvSwitch v-model="args.modelValue" color="secondary" />
        <JvSwitch v-model="args.modelValue" color="success" />
        <JvSwitch v-model="args.modelValue" color="warning" />
        <JvSwitch v-model="args.modelValue" color="error" />
        <JvSwitch v-model="args.modelValue" color="info" />
      </div>
    `,
  }),
}

// 禁用状态
export const DisabledState: Story = {
  args: {
    disabled: true,
  },
  render: args => ({
    components: { JvSwitch },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 16px;">
          <span style="width: 80px;">Inside:</span>
          <JvSwitch v-bind="args" variant="inside" :modelValue="false" />
          <JvSwitch v-bind="args" variant="inside" :modelValue="true" />
        </div>
        <div style="display: flex; gap: 16px;">
          <span style="width: 80px;">Outside:</span>
          <JvSwitch v-bind="args" variant="outside" :modelValue="false" />
          <JvSwitch v-bind="args" variant="outside" :modelValue="true" />
        </div>
      </div>
    `,
  }),
}

// 加载状态
export const LoadingState: Story = {
  args: {
    loading: true,
  },
  render: args => ({
    components: { JvSwitch },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <JvSwitch v-bind="args" :modelValue="false" />
        <JvSwitch v-bind="args" :modelValue="true" />
      </div>
    `,
  }),
}

// 方形开关
export const SquareSwitch: Story = {
  args: {
    square: true,
  },
  render: args => ({
    components: { JvSwitch },
    setup() {
      return { args }
    },
    template: `<JvSwitch v-bind="args" v-model="args.modelValue" />`,
  }),
}
