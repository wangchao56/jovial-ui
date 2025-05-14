import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvCheckbox from '@/components/jv-checkbox/src/JvCheckbox.vue'

/**
 * # JvCheckbox 复选框组件

## 1. 介绍组件

JvCheckbox 是一个复选框组件，用于在表单中让用户从一组选项中进行多选或单选操作。它支持单独使用或组合使用，可以通过 v-model 轻松实现数据绑定，并提供了丰富的样式和状态变化。

## 2. 布局结构使用方式

JvCheckbox 组件的布局结构主要包含两部分：
- 复选框输入区域 (input)：包含实际的复选框元素和视觉指示器
- 标签区域 (label)：显示复选框的说明文本
 */
const meta: Meta<typeof JvCheckbox> = {
  title: '数据输入组件/Checkbox 复选框',
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

/**
 * # 禁用状态
 *
 * 通过设置 `disabled` 属性来禁用复选框。
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

/**
 * # 半选状态
 *
 * 通过设置 `indeterminate 属性来表示半选状态。
 */
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
}

/**
 * # 复选框组
 *
 * 通过设置 `v-model` 属性来绑定复选框组。
 */
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

/**
 * # 自定义值
 *
 * 通过设置 `true-value` 和 `false-value` 属性来自定义复选框的值。
 */
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
