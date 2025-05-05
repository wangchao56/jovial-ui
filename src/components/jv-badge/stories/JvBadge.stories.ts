import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvBadge from '../src/JvBadge.vue'
import readme from './README.md?raw'
import TempBadge from './TempBadge.vue'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '反馈组件/Badge 徽标',
  component: JvBadge,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '显示的值',
      control: 'text'
    },
    max: {
      description: '最大值，超过最大值会显示 "{max}+"',
      control: 'number',
      defaultValue: 99
    },
    dot: {
      description: '是否为圆点',
      control: 'boolean',
      defaultValue: false
    },
    hidden: {
      description: '是否隐藏角标',
      control: 'boolean',
      defaultValue: false
    },
    type: {
      //   description: '角标类型',
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info'],
      defaultValue: 'error'
    },
    offset: {
      description: '自定义角标位置偏移，格式为 [x, y]',
      control: 'object',
      defaultValue: [0, 0]
    },
    default: {
      description: '默认插槽内容',
      control: 'text',
      defaultValue: '徽标'
    }
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
} satisfies Meta<typeof JvBadge>

export default meta
type Story = StoryObj<typeof meta>

// 基础使用
// export const Default: Story = {
//   args: {
//     value: 5,
//     default: '徽标',
//   },
//   render: args => ({
//     components: { JvBadge, JvButton },
//     setup() {
//       return { args }
//     },
//     template: `
//       <div style="display: flex; gap: 24px;">
//         <JvBadge :value="args.value" :type="args.type" :max="args.max" :dot="args.dot" :hidden="args.hidden" :offset="args.offset">
//           <JvButton>按钮</JvButton>
//         </JvBadge>
//         <JvBadge :value="args.value" :type="args.type" :max="args.max" :dot="args.dot" :hidden="args.hidden" :offset="args.offset">
//           <div style="width: 42px; height: 42px; background: #f2f3f5; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
//             文本
//           </div>
//         </JvBadge>
//       </div>
//     `,
//   }),
// }
export const Default: Story = {
  args: {
    value: 5,
    default: '徽标'
  },
  render: (args) => ({
    components: { JvBadge, JvButton, TempBadge },
    setup() {
      return { args }
    },
    template: `<TempBadge />`
  })
}
// 不同类型
function createTypeStory(type: ColorType) {
  return {
    args: {
      value: 5,
      type
    },
    render: Default.render
  }
}

export const Primary: Story = createTypeStory('primary')
export const Success: Story = createTypeStory('success')
export const Warning: Story = createTypeStory('warning')
export const Danger: Story = createTypeStory('error')
export const Info: Story = createTypeStory('info')

// 最大值
export const MaxValue: Story = {
  args: {
    value: 1000,
    max: 99
  },
  render: Default.render
}

// 小圆点
export const Dot: Story = {
  args: {
    dot: true
  },
  render: Default.render
}

// 自定义偏移
export const CustomOffset: Story = {
  args: {
    value: 5,
    offset: [5, 5]
  },
  render: Default.render
}
