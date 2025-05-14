import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvBadge from '../src/JvBadge.vue'
import readme from './README.md?raw'
// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '反馈组件/Badge 徽标',
  component: JvBadge,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '显示的值',
      control: 'text',
    },
    max: {
      description: '最大值，超过最大值会显示 "{max}+"',
      control: 'number',
      defaultValue: 99,
    },
    dot: {
      description: '是否为圆点',
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      description: '角标大小',
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'xlarge'],
      defaultValue: 'medium',
    },
    hidden: {
      description: '是否隐藏角标',
      control: 'boolean',
      defaultValue: false,
    },
    color: {
      //   description: '角标类型',
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info'],
      defaultValue: 'error',
    },
    offset: {
      description: '自定义角标位置偏移，格式为 [x, y]',
      control: 'object',
      defaultValue: [0, 0],
    },
    placement: {
      description: '角标位置',
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      defaultValue: 'top-right',
    },
    default: {
      description: '默认插槽内容',
      control: 'text',
      defaultValue: '徽标',
    },
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvBadge>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    value: 5,
    default: '徽标',
  },
  render: args => ({
    components: { JvBadge, JvButton },
    setup() {
      return { args }
    },
    template: `<JvBadge v-bind="args" >
        <JvButton>按钮</JvButton>
    </JvBadge>`,
  }),
}

export const 不同颜色Color: Story = {
  args: {
    value: 5,
    color: 'primary',
  },
  render: args => ({
    components: { JvBadge, JvButton },
    setup() {
      return { args }
    },
    template: ` 
       <JvFlex gap="24px">
        <JvBadge v-for="color in colors" :key="color" :color="color" :value="5" >
            <JvButton>按钮</JvButton>
        </JvBadge>
       </JvFlex>
    `,
  }),
}

// 最大值
export const MaxValue: Story = {
  args: {
    value: 1000,
    max: 99,
  },
  render: Default.render,
}

// 小圆点
export const Dot: Story = {
  args: {
    dot: true,
  },
  render: Default.render,
}

// 自定义偏移
export const CustomOffset: Story = {
  args: {
    value: 5,
    offset: [5, 5],
  },
  render: Default.render,
}
