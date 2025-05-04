import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import JvButton from '@/components/jv-button'
import JvSpace from '@/components/jv-space'
import JvTooltip from '@components/jv-tooltip'
import { expect } from '@storybook/test'

const placementOptions = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
  'right-start',
  'right-end'
]

export default {
  title: '通用组件/Tooltip 文字提示',
  component: JvTooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: '提示内容'
    },
    placement: {
      control: { type: 'select' },
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end'
      ],
      description: '提示位置'
    },
    triggerMethod: {
      control: { type: 'select' },
      options: ['hover', 'click', 'focus'],
      description: '触发方式'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    maxWidth: {
      control: 'text',
      description: '最大宽度'
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  components: { JvTooltip, JvButton },
  setup() {
    return { args }
  },
  template: `
    <div style="padding: 50px; display: flex; justify-content: center;">
      <JvTooltip v-bind="args">
        <JvButton>悬停在我上面</JvButton>
        <template #content>
          {{ args.content || "这是一个提示文本" }}
        </template>
      </JvTooltip>
    </div>
  `
})

export const 基础用法 = Template.bind({})
基础用法.args = {
  content: '这是一个基础提示文本',
  placement: 'top'
}

export const 不同位置: StoryObj = {
  render: (args) => ({
    components: { JvTooltip, JvSpace, JvButton },
    setup() {
      return { args, placementOptions }
    },
    template: `
      <JvSpace>
        <JvTooltip v-for="placement in placementOptions" :key="placement" :placement="placement" :content="placement">
          <JvButton>{{ placement }}</JvButton>
        </JvTooltip>
      </JvSpace>
    `
  })
}

export const 不同触发方式: StoryObj = {
  render: () => ({
    components: { JvTooltip, JvButton },
    template: `
      <div style="padding: 50px; display: flex; gap: 20px; justify-content: center;">
        <JvTooltip content="悬停触发" triggerMethod="hover">
          <JvButton>悬停触发</JvButton>
        </JvTooltip>
        
        <JvTooltip content="点击触发" triggerMethod="click">
          <JvButton>点击触发</JvButton>
        </JvTooltip>
        
        <JvTooltip content="聚焦触发" triggerMethod="focus">
          <JvButton>聚焦触发</JvButton>
        </JvTooltip>
      </div>
    `
  })
}

export const 自定义最大宽度 = Template.bind({})
自定义最大宽度.args = {
  content:
    '这是一段较长的提示文本，设置了最大宽度，超出部分会自动换行。这是一段较长的提示文本，设置了最大宽度，超出部分会自动换行。',
  maxWidth: '200px'
}

export const 测试交互: StoryObj = {
  args: {
    content: '测试提示',
    triggerMethod: 'hover'
  },
  render: (args) => ({
    components: { JvTooltip, JvButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 50px; display: flex; justify-content: center;">
        <JvTooltip v-bind="args">
          <JvButton id="tooltip-trigger">悬停测试</JvButton>
        </JvTooltip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    // 获取触发元素
    const trigger = canvasElement.querySelector(
      '#tooltip-trigger'
    ) as HTMLElement

    // 模拟鼠标事件（使用原生事件代替testing-library）
    if (trigger) {
      // 模拟鼠标悬停
      trigger.dispatchEvent(new MouseEvent('mouseenter'))

      // 由于Tooltip的显示是异步的，这里添加一个小延迟
      await new Promise((resolve) => setTimeout(resolve, 300))

      // 检查提示内容是否出现
      const tooltipContent = document.querySelector('.jv-tooltip__content')
      expect(tooltipContent).toBeTruthy()

      // 移出后，提示应该消失
      trigger.dispatchEvent(new MouseEvent('mouseleave'))

      // 添加延迟以等待动画完成
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }
}
