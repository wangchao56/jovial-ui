import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvCheckbox from './JvCheckbox.vue'

const meta: Meta<typeof JvCheckbox> = {
  title: '数据录入组件/Checkbox',
  component: JvCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'boolean' } },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
  },
  args: {
    label: 'Checkbox Label',
  },
}

export default meta

type Story = StoryObj<typeof JvCheckbox>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvCheckbox },
    setup() {
      return { args }
    },
    template: '<JvCheckbox v-bind="args" />',
  }),
}

// 禁用状态
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

// 半选状态
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
}

// 复选框组
export const Group: Story = {
  render: () => ({
    components: { JvCheckbox },
    setup() {
      const checkedList = ref(['Option 1'])
      return { checkedList }
    },
    template: `
      <div class="space-y-2">
        <JvCheckbox 
          v-model="checkedList" 
          label="Option 1" 
        />
        <JvCheckbox 
          v-model="checkedList" 
          label="Option 2" 
        />
        <JvCheckbox 
          v-model="checkedList" 
          label="Option 3" 
          disabled
        />
      </div>
    `,
  }),
}

// 自定义值
export const CustomValues: Story = {
  render: () => ({
    components: { JvCheckbox },
    setup() {
      const customValue = ref('active')
      return { customValue }
    },
    template: `
      <JvCheckbox 
        v-model="customValue"
        :true-value="'active'"
        :false-value="'inactive'"
        label="Custom Value"
      />
    `,
  }),
}
