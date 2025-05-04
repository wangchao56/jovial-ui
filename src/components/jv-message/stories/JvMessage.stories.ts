import type { Meta, StoryObj } from '@storybook/vue3'
import type { MessageType } from '../src/types'
import JvMessage from '../src/JvMessage.vue'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '反馈组件/Message 消息',
  component: JvMessage,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '消息类型',
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      defaultValue: 'info',
    },
    closable: {
      description: '是否可关闭',
      control: 'boolean',
      defaultValue: false,
    },
    showIcon: {
      description: '是否显示图标',
      control: 'boolean',
      defaultValue: true,
    },
    duration: {
      description: '显示时间，单位毫秒，设为 0 则不自动关闭',
      control: 'number',
      defaultValue: 3000,
    },
    autoClose: {
      description: '是否自动关闭',
      control: 'boolean',
      defaultValue: true,
    },
    center: {
      description: '是否居中显示',
      control: 'boolean',
      defaultValue: false,
    },
    default: {
      description: '消息内容',
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '显示全局提示消息的组件，用于向用户反馈操作结果或显示通知。',
      },
    },
  },
  decorators: [
    story => ({
      components: { story },
      template: '<div style="padding: 60px 20px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof JvMessage>

export default meta
type Story = StoryObj<typeof meta>

// 基础使用
export const Default: Story = {
  args: {
    default: '这是一条消息提示',
  },
}

// 不同类型
function createTypeStory(type: MessageType) {
  return {
    args: {
      type,
      default: `这是一条${type}类型的消息`,
    },
  }
}

export const Info: Story = createTypeStory('info')
export const Success: Story = createTypeStory('success')
export const Warning: Story = createTypeStory('warning')
export const Error: Story = createTypeStory('error')

// 可关闭的消息
export const Closable: Story = {
  args: {
    closable: true,
    duration: 0,
    default: '点击右侧关闭按钮可以关闭此消息',
  },
}

// 无图标
export const WithoutIcon: Story = {
  args: {
    showIcon: false,
    default: '这是一条不带图标的消息',
  },
}

// 居中显示
export const Centered: Story = {
  args: {
    center: true,
    default: '这是一条居中显示的消息',
  },
}
