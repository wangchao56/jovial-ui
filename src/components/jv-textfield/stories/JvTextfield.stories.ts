import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvTextfield from '../src/JvTextfield.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '数据输入组件/JvTextfield',
  component: JvTextfield,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '输入框的值',
    },
    placeholder: {
      control: 'text',
      description: '输入框占位文本',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    readonly: {
      control: 'boolean',
      description: '是否只读',
    },
    clearable: {
      control: 'boolean',
      description: '是否可清空',
    },
    showPassword: {
      control: 'boolean',
      description: '是否显示切换密码图标',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email'],
      description: '输入框类型',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'default'],
      description: '变体样式',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: '输入框尺寸',
    },
    prefixIcon: {
      control: 'text',
      description: '前缀图标',
    },
    suffixIcon: {
      control: 'text',
      description: '后缀图标',
    },
    maxLength: {
      control: 'number',
      description: '最大输入长度',
    },
    showCount: {
      control: 'boolean',
      description: '是否显示输入字数统计',
    },
  },
  args: {
    modelValue: '',
    placeholder: '请输入内容',
    disabled: false,
    readonly: false,
    clearable: false,
    showPassword: false,
    type: 'text',
    variant: 'outlined',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvTextfield>

export default meta
type Story = StoryObj<typeof meta>

// 基础示例
export const Default: Story = {
  render: args => ({
    components: { JvTextfield },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `<JvTextfield v-model="value" v-bind="args" />`,
  }),
}

// 不同尺寸
export const Sizes: Story = {
  render: () => ({
    components: { JvTextfield },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvTextfield v-model="value" size="small" placeholder="小尺寸 (small)" />
        <JvTextfield v-model="value" size="medium" placeholder="中等尺寸 (medium)" />
        <JvTextfield v-model="value" size="large" placeholder="大尺寸 (large)" />
        <JvTextfield v-model="value" size="xlarge" placeholder="超大尺寸 (xlarge)" />
      </div>
    `,
  }),
}

// 不同变体
export const Variants: Story = {
  render: () => ({
    components: { JvTextfield },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvTextfield v-model="value" variant="outlined" placeholder="带边框样式 (outlined)" />
        <JvTextfield v-model="value" variant="default" placeholder="默认样式 (default)" />
      </div>
    `,
  }),
}

// 可清除输入
export const Clearable: Story = {
  render: () => ({
    components: { JvTextfield },
    setup() {
      const value = ref('可清除的内容')
      return { value }
    },
    template: `<JvTextfield v-model="value" clearable />`,
  }),
}

// 密码输入框
export const Password: Story = {
  render: () => ({
    components: { JvTextfield },
    setup() {
      const value = ref('password123')
      return { value }
    },
    template: `<JvTextfield v-model="value" type="password" showPassword placeholder="请输入密码" />`,
  }),
}

// 带字数统计
export const WithCounter: Story = {
  render: () => ({
    components: { JvTextfield },
    setup() {
      const value = ref('这是一段示例文本')
      return { value }
    },
    template: `<JvTextfield v-model="value" showCount :maxLength="50" placeholder="最多输入50个字符" />`,
  }),
}

// 禁用状态
export const Disabled: Story = {
  render: () => ({
    components: { JvTextfield },
    setup() {
      const value = ref('禁用状态')
      return { value }
    },
    template: `<JvTextfield v-model="value" disabled />`,
  }),
}

// 只读状态
export const Readonly: Story = {
  render: () => ({
    components: { JvTextfield },
    setup() {
      const value = ref('只读状态')
      return { value }
    },
    template: `<JvTextfield v-model="value" readonly />`,
  }),
}

// 带图标
export const WithIcons: Story = {
  render: () => ({
    components: { JvTextfield },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvTextfield v-model="value" prefixIcon="$search" placeholder="带前缀图标" />
        <JvTextfield v-model="value" suffixIcon="$calendar" placeholder="带后缀图标" />
        <JvTextfield v-model="value" prefixIcon="$user" suffixIcon="$check" placeholder="带前后缀图标" />
      </div>
    `,
  }),
}

// 使用插槽
export const WithSlots: Story = {
  render: () => ({
    components: { JvTextfield },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <JvTextfield v-model="value" placeholder="带前置内容">
          <template #prepend>
            <div style="padding: 0 10px; background-color: #f5f7fa; border-right: 1px solid #dcdfe6; display: flex; align-items: center;">前置</div>
          </template>
        </JvTextfield>
        
        <JvTextfield v-model="value" placeholder="带后置内容">
          <template #append>
            <div style="padding: 0 10px; background-color: #f5f7fa; border-left: 1px solid #dcdfe6; display: flex; align-items: center;">后置</div>
          </template>
        </JvTextfield>
        
        <JvTextfield v-model="value" placeholder="带前缀内容">
          <template #prefix>
            <span style="color: #409eff;">¥</span>
          </template>
        </JvTextfield>
        
        <JvTextfield v-model="value" placeholder="带后缀内容">
          <template #suffix>
            <span style="color: #409eff;">.com</span>
          </template>
        </JvTextfield>
      </div>
    `,
  }),
}
