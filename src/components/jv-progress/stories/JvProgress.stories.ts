import type { Meta, StoryObj } from '@storybook/vue3'
import JvProgress from '../src/JvProgress.vue'
import readme from './README.md?raw'

const meta = {
  title: '通用组件/Progress 进度条',
  component: JvProgress,
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '进度值（0-100）',
    },
    color: {
      control: 'color',
      description: '进度条颜色',
    },
    width: {
      control: { type: 'number', min: 50, max: 500 },
      description: '组件宽度',
    },
    height: {
      control: { type: 'number', min: 1, max: 20 },
      description: '线性进度条高度',
    },
    shape: {
      control: 'select',
      options: ['line', 'circle'],
      description: '进度条形状',
    },
  },
  args: {
    progress: 50,
    color: '#1976d2',
    width: 300,
    height: 4,
    shape: 'line',
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {
  args: {
    shape: 'line',
    progress: 70,
  },
  render: args => ({
    components: { JvProgress },
    setup() {
      return { args }
    },
    template: `<JvProgress v-bind="args" />`,
  }),
}

export const Circle: Story = {
  args: {
    shape: 'circle',
    progress: 70,
    width: 100,
  },
  render: args => ({
    components: { JvProgress },
    setup() {
      return { args }
    },
    template: `<JvProgress v-bind="args" />`,
  }),
}
