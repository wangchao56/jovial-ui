import type { Meta, StoryObj } from '@storybook/vue3'
import JvLoader from '../src/JvLoader.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '通用组件/Loader 加载器',
  component: JvLoader,
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
} satisfies Meta<typeof JvLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {

  render: args => ({
    components: { JvLoader },
    setup() {
      return { args }
    },
    template: `<JvLoader />`,
  }),
}
