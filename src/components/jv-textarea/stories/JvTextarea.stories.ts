import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvTextarea from '..'

// 更多信息：https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '数据输入组件/Textarea 文本域',
  component: JvTextarea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '文本域的值',
    },
    placeholder: {
      control: 'text',
      description: '占位符文本',
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
    size: {
      control: { type: 'select' },
      options: ['xlarge', 'large', 'medium', 'small'],
      description: '文本域大小',
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'default'],
      description: '文本域变体风格',
    },
    autosize: {
      control: 'boolean',
      description: '是否自动调整高度',
    },
    maxLength: {
      control: 'number',
      description: '最大输入长度',
    },
    showCount: {
      control: 'boolean',
      description: '是否显示计数',
    },
    rows: {
      control: 'number',
      description: '行数',
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'both', 'horizontal', 'vertical'],
      description: '调整大小方式',
    },
  },
  args: {
    // 默认参数
    modelValue: '',
    placeholder: '请输入内容',
    disabled: false,
    readonly: false,
    clearable: false,
    size: 'medium',
    variant: 'outlined',
    autosize: false,
    maxLength: undefined,
    showCount: false,
    rows: 3,
    resize: 'vertical',
  },
} satisfies Meta<typeof JvTextarea>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvTextarea },
    setup() {
      const value = ref(args.modelValue || '')
      return { args, value }
    },
    template: `
      <div style="max-width: 400px;">
        <JvTextarea v-model="value" v-bind="args" />
        <div style="margin-top: 10px">当前值: {{ value }}</div>
      </div>
    `,
  }),
}

// 不同尺寸
export const Sizes: Story = {
  render: () => ({
    components: { JvTextarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvTextarea v-model="value" size="xlarge" placeholder="超大尺寸" />
        <JvTextarea v-model="value" size="large" placeholder="大尺寸" />
        <JvTextarea v-model="value" size="medium" placeholder="中等尺寸 (默认)" />
        <JvTextarea v-model="value" size="small" placeholder="小尺寸" />
      </div>
    `,
  }),
}

// 禁用和只读
export const DisabledAndReadonly: Story = {
  render: () => ({
    components: { JvTextarea },
    setup() {
      return {}
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvTextarea value="禁用状态的文本域" disabled />
        <JvTextarea value="只读状态的文本域" readonly />
      </div>
    `,
  }),
}

// 可清除
export const Clearable: Story = {
  render: () => ({
    components: { JvTextarea },
    setup() {
      const value = ref('这是一段可清除的文本')
      return { value }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvTextarea v-model="value" clearable placeholder="可清除的文本域" />
      </div>
    `,
  }),
}

// 显示计数
export const ShowCount: Story = {
  render: () => ({
    components: { JvTextarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvTextarea v-model="value" showCount placeholder="显示字符计数" />
        <JvTextarea v-model="value" maxLength="100" showCount placeholder="最大输入100个字符" />
      </div>
    `,
  }),
}

// 自动调整高度
export const Autosize: Story = {
  render: () => ({
    components: { JvTextarea },
    setup() {
      const value1 = ref('')
      const value2 = ref('')
      return { value1, value2 }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvTextarea v-model="value1" autosize placeholder="自动调整高度" />
        <JvTextarea v-model="value2" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="限制最小2行，最大6行" />
      </div>
    `,
  }),
}

// 调整大小方式
export const Resize: Story = {
  render: () => ({
    components: { JvTextarea },
    setup() {
      return {}
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvTextarea placeholder="垂直调整大小 (默认)" resize="vertical" />
        <JvTextarea placeholder="水平调整大小" resize="horizontal" />
        <JvTextarea placeholder="双向调整大小" resize="both" />
        <JvTextarea placeholder="不可调整大小" resize="none" />
      </div>
    `,
  }),
}

// 前置/后置元素
export const PrependAndAppend: Story = {
  render: () => ({
    components: { JvTextarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvTextarea v-model="value" placeholder="带前置/后置元素">
          <template #prepend>
            <div style="padding: 8px; background-color: #f5f7fa; display: flex; align-items: center; border: 1px solid #dcdfe6; border-bottom: none; border-radius: 4px 4px 0 0;">
              标题
            </div>
          </template>
          <template #append>
            <div style="padding: 8px; background-color: #f5f7fa; display: flex; align-items: center; border: 1px solid #dcdfe6; border-top: none; border-radius: 0 0 4px 4px;">
              底部说明
            </div>
          </template>
        </JvTextarea>
      </div>
    `,
  }),
}

// 带插槽
export const WithSlots: Story = {
  render: () => ({
    components: { JvTextarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvTextarea v-model="value" placeholder="带前缀和后缀插槽">
          <template #prefix>
            <div style="padding-right: 8px; display: flex; align-items: center;">
              前缀:
            </div>
          </template>
          <template #suffix>
            <div style="padding-left: 8px; display: flex; align-items: center;">
              后缀
            </div>
          </template>
        </JvTextarea>
      </div>
    `,
  }),
}
