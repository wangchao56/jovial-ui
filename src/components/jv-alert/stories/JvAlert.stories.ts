import type { Meta, StoryObj } from '@storybook/vue3'
import JvFlex from '@/components/jv-flex/src/JvFlex.vue'
import JvAlert from '../src/JvAlert.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '反馈组件/Alert 警告框',
  component: JvAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'info', 'error'],
      description: '警告类型',
    },
    closable: {
      control: 'boolean',
      description: '是否可关闭',
    },
    title: {
      control: 'text',
      description: '警告标题',
    },
    description: {
      control: 'text',
      description: '警告描述',
    },
    icon: {
      control: 'text',
      description: '自定义图标名称',
    },
    showIcon: {
      control: 'boolean',
      description: '是否显示图标',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'left-accent'],
      description: '警告样式',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'pill', 'circle'],
      description: '圆角类型',
    },
    visible: {
      control: 'boolean',
      description: '是否显示',
    },
  },
  args: {
    type: 'info',
    closable: false,
    showIcon: true,
    rounded: 'none',
    visible: true,
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvAlert>

export default meta
type Story = StoryObj<typeof meta>

// 基础示例
export const Default: Story = {
  render: args => ({
    components: { JvAlert },
    setup() {
      return { args }
    },
    template: `<JvAlert v-bind="args">这是一条基本的提示信息</JvAlert>`,
  }),
}

// 不同类型的警告
export const Types: Story = {
  render: args => ({
    components: { JvAlert },
    setup() {
      return { args }
    },
    template: `
      <div>
        <JvAlert type="success" style="margin-bottom: 16px">操作成功提示</JvAlert>
        <JvAlert type="warning" style="margin-bottom: 16px">警告提示</JvAlert>
        <JvAlert type="info" style="margin-bottom: 16px">信息提示</JvAlert>
        <JvAlert type="error" style="margin-bottom: 16px">错误提示</JvAlert>
      </div>
    `,
  }),
}

// 带标题的警告
export const WithTitle: Story = {
  render: args => ({
    components: { JvAlert },
    setup() {
      return { args }
    },
    template: `
      <div>
        <JvAlert type="success" title="成功" style="margin-bottom: 16px">
          这是一条成功的提示消息，带有标题。
        </JvAlert>
        <JvAlert type="warning" title="警告" style="margin-bottom: 16px">
          这是一条警告的提示消息，带有标题。
        </JvAlert>
        <JvAlert type="info" title="信息" style="margin-bottom: 16px">
          这是一条信息的提示消息，带有标题。
        </JvAlert>
        <JvAlert type="error" title="错误" style="margin-bottom: 16px">
          这是一条错误的提示消息，带有标题。
        </JvAlert>
      </div>
    `,
  }),
}

// 可关闭的警告
export const Closable: Story = {
  render: args => ({
    components: { JvAlert },
    setup() {
      return { args }
    },
    template: `
      <div>
        <JvAlert type="success" closable style="margin-bottom: 16px">
          可关闭的成功提示
        </JvAlert>
        <JvAlert type="warning" closable title="警告" style="margin-bottom: 16px">
          可关闭的警告提示，带有标题
        </JvAlert>
      </div>
    `,
  }),
}

// 轮廓风格
export const Variants: Story = {
  render: args => ({
    components: { JvAlert, JvFlex },
    setup() {
      const variants = ['outlined', 'left-accent', 'filled']
      const types = ['success', 'warning', 'info', 'error']
      return { args, variants, types }
    },
    template: `
      <JvFlex direction="vertical" gap="16px">
        <JvAlert v-for="(type,idx)   in types" :key="type" :type="type" :variant="variants[idx%variants.length]"
            rounded="md"
        >
          <template #title>
            <span style=" font-weight: bold">自定义标题</span>
          </template>
          <template #icon>
            <span style="font-size: 20px">🚀</span>
          </template>
          这是使用自定义标题和图标插槽的示例
        </JvAlert>
      </JvFlex>
    `,
  }),
}

// 不同圆角
export const Rounded: Story = {
  render: args => ({
    components: { JvAlert },
    setup() {
      return { args }
    },
    template: `
      <div>
        <JvAlert type="info" rounded="none" style="margin-bottom: 16px">无圆角</JvAlert>
        <JvAlert type="info" rounded="sm" style="margin-bottom: 16px">小圆角</JvAlert>
        <JvAlert type="info" rounded="md" style="margin-bottom: 16px">中圆角</JvAlert>
        <JvAlert type="info" rounded="lg" style="margin-bottom: 16px">大圆角</JvAlert>
        <JvAlert type="info" rounded="xl" style="margin-bottom: 16px">超大圆角</JvAlert>
        <JvAlert type="info" rounded="pill" style="margin-bottom: 16px">胶囊形圆角</JvAlert>
      </div>
    `,
  }),
}

// 自定义样式
export const CustomStyle: Story = {
  render: args => ({
    components: { JvAlert },
    setup() {
      return { args }
    },
    template: `
      <div>
        <JvAlert 
          color="#6200ea" 
          background="#ede7f6" 
          style="margin-bottom: 16px"
        >
          自定义颜色的提示
        </JvAlert>
        <JvAlert 
          color="#ff5722" 
          background="#fff3e0" 
          outlined
          rounded="lg"
          style="margin-bottom: 16px"
        >
          自定义颜色、轮廓和圆角的提示
        </JvAlert>
      </div>
    `,
  }),
}

// 没有图标
export const NoIcon: Story = {
  render: args => ({
    components: { JvAlert },
    setup() {
      return { args }
    },
    template: `
      <div>
        <JvAlert type="info" showIcon={false} style="margin-bottom: 16px">
          不显示图标的提示
        </JvAlert>
      </div>
    `,
  }),
}

// 自定义插槽
export const CustomSlots: Story = {
  render: args => ({
    components: { JvAlert },
    setup() {
      return { args }
    },
    template: `
      <div>
        <JvAlert type="info" style="margin-bottom: 16px">
          <template #title>
            <span style="color: #1976d2; font-weight: bold">自定义标题</span>
          </template>
          <template #icon>
            <span style="font-size: 20px">🚀</span>
          </template>
          这是使用自定义标题和图标插槽的示例
        </JvAlert>
      </div>
    `,
  }),
}
