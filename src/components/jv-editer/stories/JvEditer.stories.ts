import type { Meta, StoryObj } from '@storybook/vue3'
import JvEditer from '../src/JvEditer.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '数据输入组件/JvEditer',
  component: JvEditer,
  tags: ['autodocs'],
  argTypes: {
  },
  args: {

  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvEditer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {

  render: args => ({
    components: { JvEditer },
    setup() {
      return { args }
    },
    template: `<JvEditer />`,
  }),
}
