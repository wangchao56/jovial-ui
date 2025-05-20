import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import JvTooltip from '@components/jv-tooltip'
import { expect } from '@storybook/test'
import { ref } from 'vue'
import JvButton from '@/components/jv-button'
import JvSpace from '@/components/jv-space'

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
  'right-end',
]

const triggerMethodOptions = ['hover', 'click', 'focus', 'contextmenu']

/**
 * 文字提示组件，用于在用户悬停、点击或聚焦某个元素时显示简短的提示信息。
 */

const meta: Meta<typeof JvTooltip> = {
  title: '反馈组件/Tooltip 文字提示',
  component: JvTooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: '提示内容',
    },
    placement: {
      control: { type: 'select' },
      options: placementOptions,
      description: '提示位置',
    },
    triggerMethod: {
      control: { type: 'select' },
      options: triggerMethodOptions,
      description: '触发方式',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    maxWidth: {
      control: 'text',
      description: '最大宽度',
    },
    showArrow: {
      control: 'boolean',
      description: '是否显示箭头',
      defaultValue: true,
    },
    offset: {
      control: 'number',
      description: '偏移量',
      defaultValue: 8,
    },
    placementStrategy: {
      control: { type: 'select' },
      options: ['prevent-overflow', 'auto', 'flip', 'fixed'],
      description: '放置策略',
      defaultValue: 'prevent-overflow',
    },
  },
} as Meta<typeof JvTooltip>
export default meta

type Story = StoryObj<typeof JvTooltip>

const Template: StoryFn = args => ({
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
  `,
})

/**
 * 基本用法
 */
export const BasicUsage: Story = {
  args: {
    content: '这是一个基础提示文本',
    placement: 'top',
  },
  render: Template,
}

/**
 * 不同位置
 */
export const DifferentPlacements: Story = {
  render: () => ({
    components: { JvTooltip, JvSpace, JvButton },
    setup() {
      return { placementOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 50px;">
        <h3>基本位置</h3>
        <JvSpace>
          <JvTooltip placement="top" content="顶部提示">
            <JvButton>顶部</JvButton>
          </JvTooltip>
          <JvTooltip placement="bottom" content="底部提示">
            <JvButton>底部</JvButton>
          </JvTooltip>
          <JvTooltip placement="left" content="左侧提示">
            <JvButton>左侧</JvButton>
          </JvTooltip>
          <JvTooltip placement="right" content="右侧提示">
            <JvButton>右侧</JvButton>
          </JvTooltip>
        </JvSpace>
        
        <h3>所有位置变体</h3>
        <JvSpace wrap>
          <JvTooltip v-for="placement in placementOptions" :key="placement" :placement="placement" :content="placement">
            <JvButton>{{ placement }}</JvButton>
          </JvTooltip>
        </JvSpace>
      </div>
    `,
  }),
  storyName: '不同位置',
}

/**
 * 不同触发方式
 */
export const DifferentTriggerMethods: Story = {
  render: () => ({
    components: { JvTooltip, JvSpace, JvButton },
    template: `
      <div style="padding: 50px; display: flex; flex-direction: column; gap: 16px;">
        <JvSpace>
          <JvTooltip content="悬停触发" trigger-method="hover">
            <JvButton>悬停触发</JvButton>
          </JvTooltip>
          
          <JvTooltip content="点击触发" trigger-method="click">
            <JvButton>点击触发</JvButton>
          </JvTooltip>
          
          <JvTooltip content="聚焦触发" trigger-method="focus">
            <JvButton>聚焦触发</JvButton>
          </JvTooltip>
          
          <JvTooltip content="右键触发" trigger-method="contextmenu">
            <JvButton>右键触发</JvButton>
          </JvTooltip>
        </JvSpace>
        
        <div>
          <p style="margin-bottom: 8px">输入框示例（聚焦触发）：</p>
          <JvTooltip content="请输入您的用户名" trigger-method="focus">
            <input type="text" placeholder="用户名" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          </JvTooltip>
        </div>
      </div>
    `,
  }),
  storyName: '不同触发方式',
}

/**
 * 自定义内容
 */
export const CustomContent: Story = {
  render: args => ({
    components: { JvTooltip, JvButton },
    setup() {
      return { args }
    },
    template: `
    <div style="padding: 50px; display: flex; justify-content: center;">
      <JvTooltip v-bind="args">
        <JvButton>自定义内容</JvButton>
        <template #content>
          <div style="text-align: left;">
            <h3 style="margin: 0 0 8px; font-size: 16px; color: #fff;">自定义标题</h3>
            <p style="margin: 0; font-size: 14px;">这是一个自定义内容示例，支持插入<b>HTML元素</b>。</p>
          </div>
        </template>
      </JvTooltip>
    </div>
  `,
  }),
}

/**
 * 自定义最大宽度
 */
export const CustomMaxWidth: Story = {
  args: {
    content: '这是一段较长的提示文本，设置了最大宽度，超出部分会自动换行。这是一段较长的提示文本，设置了最大宽度，超出部分会自动换行。',
    maxWidth: '200px',
  },
  render: () => ({
    components: { JvTooltip, JvButton },
    template: `
        
        `,
  }),
}

/**
 * 箭头控制
 */
export const ArrowControl: Story = {
  render: () => ({
    components: { JvTooltip, JvSpace, JvButton },
    template: `
      <div style="padding: 50px; display: flex; gap: 32px; justify-content: center;">
        <JvTooltip content="带箭头的提示" showArrow>
          <JvButton>显示箭头</JvButton>
        </JvTooltip>
        
        <JvTooltip content="不带箭头的提示" :showArrow="false">
          <JvButton>隐藏箭头</JvButton>
        </JvTooltip>
      </div>
    `,
  }),
  storyName: '箭头控制',
}

/**
 * 偏移量控制
 */
export const OffsetControl: Story = {
  render: () => ({
    components: { JvTooltip, JvSpace, JvButton },
    template: `
      <div style="padding: 50px; display: flex; flex-direction: column; gap: 16px;">
        <JvSpace>
          <JvTooltip content="默认偏移(8px)" placement="bottom">
            <JvButton>默认偏移</JvButton>
          </JvTooltip>
          
          <JvTooltip content="小偏移(4px)" placement="bottom" :offset="4">
            <JvButton>小偏移</JvButton>
          </JvTooltip>
          
          <JvTooltip content="大偏移(16px)" placement="bottom" :offset="16">
            <JvButton>大偏移</JvButton>
          </JvTooltip>
        </JvSpace>
      </div>
    `,
  }),
}

/**
 * 手动控制显示
 */
export const ManualControl: Story = {
  render: () => ({
    components: { JvTooltip, JvSpace, JvButton },
    setup() {
      const show = ref(false)

      return { show }
    },
    template: `
      <div style="padding: 50px; display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <JvTooltip content="这是一个手动控制的提示" v-model:show="show">
          <JvButton>悬停查看提示</JvButton>
        </JvTooltip>
        
        <div style="margin-top: 16px;">
          <JvButton @click="show = !show">
            {{ show ? '隐藏提示' : '显示提示' }}
          </JvButton>
        </div>
      </div>
    `,
  }),
  storyName: '手动控制显示',
}

/**
 * 参考位置
 */
export const ReferencePosition: Story = {
  render: () => ({
    components: { JvTooltip, JvButton },
    setup() {
      const show = ref(false)
      const referenceRect = ref({
        width: 100,
        height: 50,
        top: 200,
        left: 200,
        right: 300,
        bottom: 250,
        x: 200,
        y: 200,
        toJSON: () => {},
      })

      function updateReference() {
        // 随机生成一个位置
        const x = Math.floor(Math.random() * 300) + 100
        const y = Math.floor(Math.random() * 200) + 100

        referenceRect.value = {
          width: 100,
          height: 50,
          top: y,
          left: x,
          right: x + 100,
          bottom: y + 50,
          x,
          y,
          toJSON: () => {},
        }

        show.value = true
      }

      return { show, referenceRect, updateReference }
    },
    template: `
      <div style="padding: 50px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <JvButton @click="updateReference">点击随机生成位置</JvButton>
        
        <JvTooltip
          content="基于参考矩形区域的提示"
          v-model:show="show"
          :referenceRect="referenceRect"
        />
      </div>
    `,
  }),
  storyName: '参考位置',
}

/**
 * 测试交互
 */
export const InteractionTest: Story = {
  args: {
    content: '测试提示',
    triggerMethod: 'hover',
  },
  render: args => ({
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
    `,
  }),
  play: async ({ canvasElement }) => {
    // 获取触发元素
    const trigger = canvasElement.querySelector(
      '#tooltip-trigger',
    ) as HTMLElement

    // 模拟鼠标事件（使用原生事件代替testing-library）
    if (trigger) {
      // 模拟鼠标悬停
      trigger.dispatchEvent(new MouseEvent('mouseenter'))

      // 由于Tooltip的显示是异步的，这里添加一个小延迟
      await new Promise(resolve => setTimeout(resolve, 300))

      // 检查提示内容是否出现
      const tooltipContent = document.querySelector('.jv-tooltip__content')
      expect(tooltipContent).toBeTruthy()

      // 移出后，提示应该消失
      trigger.dispatchEvent(new MouseEvent('mouseleave'))

      // 添加延迟以等待动画完成
      await new Promise(resolve => setTimeout(resolve, 300))
    }
  },
  storyName: '测试交互',
}
