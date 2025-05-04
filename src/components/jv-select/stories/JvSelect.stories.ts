import type { Meta, StoryObj } from '@storybook/vue3'
import type { JvSelectOption } from '../src/types'
import { ref } from 'vue'
import JvSelect from '../index'

type Story = StoryObj<typeof JvSelect>

/**
 * # JvSelect 选择器组件
 *
 * JvSelect 是一个用于从预定义选项列表中选择内容的下拉选择器组件。
 *
 * ## 特性
 * - 支持单选和多选
 * - 可设置不同尺寸
 * - 支持清空选项
 * - 支持禁用状态和只读状态
 * - 支持选项禁用
 *
 * ## 何时使用
 * - 当用户需要从一组相关的选项中选择特定内容时
 * - 当可选选项数量多于5个，少于20个时（更多选项请考虑使用其他组件）
 * - 当需要一种比单选按钮更紧凑的形式时
 */

const meta: Meta<typeof JvSelect> = {
  title: '数据录入组件/Select 选择器',
  component: JvSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '选中的值',
      table: {
        type: { summary: 'string | number | string[] | number[]' },
      },
    },
    options: {
      control: 'object',
      description: '选项列表',
      table: {
        type: { summary: 'JvSelectOption[]' },
        defaultValue: { summary: '[]' },
      },
    },
    placeholder: {
      control: 'text',
      description: '占位文本',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '请选择' },
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
    clearable: {
      control: 'boolean',
      description: '是否可清空',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '尺寸',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    multiple: {
      control: 'boolean',
      description: '是否多选',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
}

export default meta

// 基础选项数据
const baseOptions: JvSelectOption[] = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' },
  { label: '选项5', value: '5' },
]

/**
 * 基础用法
 *
 * 基本的选择器用法，通过v-model绑定选中值。
 */
export const 基础用法: Story = {
  render: args => ({
    components: { JvSelect },
    setup() {
      const value = ref(args.modelValue || '')
      return { args, value, options: baseOptions }
    },
    template: `
      <div style="max-width: 300px;">
        <JvSelect 
          v-model="value" 
          :options="options" 
          v-bind="args" 
        />
        <div style="margin-top: 10px">当前值: {{ value }}</div>
      </div>
    `,
  }),
  args: {
    placeholder: '请选择',
    clearable: true,
  },
}

/**
 * 不同尺寸
 *
 * 选择器支持小、中、大三种尺寸。
 */
export const 不同尺寸: Story = {
  render: () => ({
    components: { JvSelect },
    setup() {
      const value1 = ref('')
      const value2 = ref('')
      const value3 = ref('')
      return { value1, value2, value3, options: baseOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 300px;">
        <JvSelect v-model="value1" :options="options" size="small" placeholder="小尺寸" />
        <JvSelect v-model="value2" :options="options" size="medium" placeholder="中尺寸" />
        <JvSelect v-model="value3" :options="options" size="large" placeholder="大尺寸" />
      </div>
    `,
  }),
}

/**
 * 多选模式
 *
 * 通过 multiple 属性启用多选模式。
 */
export const 多选模式: Story = {
  render: args => ({
    components: { JvSelect },
    setup() {
      const value = ref<string[]>([])
      return { args, value, options: baseOptions }
    },
    template: `
      <div style="max-width: 300px;">
        <JvSelect 
          v-model="value" 
          :options="options" 
          v-bind="args" 
          multiple
        />
        <div style="margin-top: 10px">当前值: {{ value }}</div>
      </div>
    `,
  }),
  args: {
    placeholder: '请选择多个选项',
    clearable: true,
  },
}

/**
 * 禁用状态
 *
 * 选择器的禁用状态和选项的禁用状态。
 */
export const 禁用状态: Story = {
  render: () => ({
    components: { JvSelect },
    setup() {
      const value1 = ref('')
      const value2 = ref('')
      const disabledOptions: JvSelectOption[] = [
        { label: '选项1', value: '1' },
        { label: '选项2 (禁用)', value: '2', disabled: true },
        { label: '选项3', value: '3' },
        { label: '选项4 (禁用)', value: '4', disabled: true },
        { label: '选项5', value: '5' },
      ]
      return { value1, value2, options: baseOptions, disabledOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 300px;">
        <JvSelect v-model="value1" :options="options" disabled placeholder="禁用的选择器" />
        <JvSelect v-model="value2" :options="disabledOptions" placeholder="包含禁用选项的选择器" />
      </div>
    `,
  }),
}

/**
 * 可清空
 *
 * 通过 clearable 属性启用清空功能。
 */
export const 可清空: Story = {
  render: () => ({
    components: { JvSelect },
    setup() {
      const value = ref('1')
      return { value, options: baseOptions }
    },
    template: `
      <div style="max-width: 300px;">
        <JvSelect 
          v-model="value" 
          :options="options" 
          clearable
          placeholder="可清空选择器"
        />
        <div style="margin-top: 10px">当前值: {{ value }}</div>
      </div>
    `,
  }),
}
