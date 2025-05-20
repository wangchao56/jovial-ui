import type { Meta, StoryObj } from '@storybook/vue3'
import JvInputNumber from '@components/jv-input-number/src/JvInputNumber.vue'

const meta: Meta<typeof JvInputNumber> = {
  title: '数据输入组件/InputNumber 数字输入框',
  tags: ['autodocs'],
  component: JvInputNumber,
  argTypes: {
    modelValue: { control: 'number', description: '绑定值' },
    min: { control: 'number', description: '最小值' },
    max: { control: 'number', description: '最大值' },
    step: { control: 'number', description: '步长' },
    precision: { control: 'number', description: '精度' },
    disabled: { control: 'boolean', description: '是否禁用' },
    readonly: { control: 'boolean', description: '是否只读' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      description: '尺寸',
    },
    clearable: { control: 'boolean', description: '是否可清空' },
  },
  args: {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    precision: 0,
    disabled: false,
    readonly: false,
    size: 'medium',
    clearable: false,
  },
}

export default meta
type Story = StoryObj<typeof JvInputNumber>

export const 基础用法: Story = {
  render: args => ({
    components: { JvInputNumber },
    setup: () => ({ args }),
    template: '<JvInputNumber v-bind="args" />',
  }),
}

export const 步长和精度: Story = {
  args: { modelValue: 1.23, step: 0.1, precision: 2 },
  render: args => ({
    components: { JvInputNumber },
    setup: () => ({ args }),
    template: '<JvInputNumber v-bind="args" />',
  }),
}

export const 禁用状态: Story = {
  args: { modelValue: 20, disabled: true },
  render: args => ({
    components: { JvInputNumber },
    setup: () => ({ args }),
    template: '<JvInputNumber v-bind="args" />',
  }),
}

export const 只读状态: Story = {
  args: { modelValue: 30, readonly: true },
  render: args => ({
    components: { JvInputNumber },
    setup: () => ({ args }),
    template: '<JvInputNumber v-bind="args" />',
  }),
}

export const 可清除: Story = {
  args: { modelValue: 50, clearable: true },
  render: args => ({
    components: { JvInputNumber },
    setup: () => ({ args }),
    template: '<JvInputNumber v-bind="args" />',
  }),
}

export const 尺寸: Story = {
  render: args => ({
    components: { JvInputNumber },
    setup: () => ({ args }),
    template: `
      <div style="display: flex; gap: 16px;">
        <JvInputNumber v-bind="args" size="small" />
        <JvInputNumber v-bind="args" size="medium" />
        <JvInputNumber v-bind="args" size="large" />
      </div>
    `,
  }),
}
