import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvPopover from '../src/JvPopover.vue'

// 定义元数据
const meta = {
  title: '反馈组件/Popover 气泡弹出框',
  component: JvPopover,
  tags: ['autodocs'],
  argTypes: {
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
        'right-end',
      ],
      description: 'popover的放置位置',
      defaultValue: 'top',
    },
    arrow: {
      control: { type: 'boolean' },
      description: '是否显示箭头',
      defaultValue: true,
    },
    offset: {
      control: { type: 'object' },
      description: '偏移量，可以是数字或[x, y]数组',
      defaultValue: [0, 8],
    },
    placementStrategy: {
      control: { type: 'select' },
      options: ['flip', 'prevent-overflow', 'auto', 'fixed'],
      description: '放置策略',
      defaultValue: 'auto',
    },
    offsetTarget: {
      control: { type: 'select' },
      options: ['trigger', 'viewport'],
      description: '偏移目标',
      defaultValue: 'trigger',
    },
    manual: {
      control: { type: 'boolean' },
      description: '是否手动控制显示',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof JvPopover>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvPopover },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <JvPopover v-bind="args">
          <button style="padding: 8px 16px; cursor: pointer;">触发按钮</button>
          <template #default>
            <div style="padding: 12px 16px; max-width: 200px;">
              这是一个基础的Popover内容
            </div>
          </template>
        </JvPopover>
      </div>
    `,
  }),
  args: {
    placement: 'top',
    arrow: true,
    offset: [0, 8],
    placementStrategy: 'auto',
  },
}

// 不同位置
export const Placements: Story = {
  render: () => ({
    components: { JvPopover },
    setup() {
      return {}
    },
    template: `
      <div style="padding: 150px; display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 20px; place-items: center;">
        <JvPopover placement="top-start">
          <button style="padding: 8px 16px; cursor: pointer;">上左</button>
          <template #default>
            <div style="padding: 12px 16px;">上左 (top-start)</div>
          </template>
        </JvPopover>
        
        <JvPopover placement="top">
          <button style="padding: 8px 16px; cursor: pointer;">上中</button>
          <template #default>
            <div style="padding: 12px 16px;">上中 (top)</div>
          </template>
        </JvPopover>
        
        <JvPopover placement="top-end">
          <button style="padding: 8px 16px; cursor: pointer;">上右</button>
          <template #default>
            <div style="padding: 12px 16px;">上右 (top-end)</div>
          </template>
        </JvPopover>
        
        <JvPopover placement="left-start">
          <button style="padding: 8px 16px; cursor: pointer;">左上</button>
          <template #default>
            <div style="padding: 12px 16px;">左上 (left-start)</div>
          </template>
        </JvPopover>
        
        <div style="width: 80px; height: 80px;"></div>
        
        <JvPopover placement="right-start">
          <button style="padding: 8px 16px; cursor: pointer;">右上</button>
          <template #default>
            <div style="padding: 12px 16px;">右上 (right-start)</div>
          </template>
        </JvPopover>
        
        <JvPopover placement="left">
          <button style="padding: 8px 16px; cursor: pointer;">左中</button>
          <template #default>
            <div style="padding: 12px 16px;">左中 (left)</div>
          </template>
        </JvPopover>
        
        <div style="width: 80px; height: 80px;"></div>
        
        <JvPopover placement="right">
          <button style="padding: 8px 16px; cursor: pointer;">右中</button>
          <template #default>
            <div style="padding: 12px 16px;">右中 (right)</div>
          </template>
        </JvPopover>
        
        <JvPopover placement="left-end">
          <button style="padding: 8px 16px; cursor: pointer;">左下</button>
          <template #default>
            <div style="padding: 12px 16px;">左下 (left-end)</div>
          </template>
        </JvPopover>
        
        <div style="width: 80px; height: 80px;"></div>
        
        <JvPopover placement="right-end">
          <button style="padding: 8px 16px; cursor: pointer;">右下</button>
          <template #default>
            <div style="padding: 12px 16px;">右下 (right-end)</div>
          </template>
        </JvPopover>
        
        <JvPopover placement="bottom-start">
          <button style="padding: 8px 16px; cursor: pointer;">下左</button>
          <template #default>
            <div style="padding: 12px 16px;">下左 (bottom-start)</div>
          </template>
        </JvPopover>
        
        <JvPopover placement="bottom">
          <button style="padding: 8px 16px; cursor: pointer;">下中</button>
          <template #default>
            <div style="padding: 12px 16px;">下中 (bottom)</div>
          </template>
        </JvPopover>
        
        <JvPopover placement="bottom-end">
          <button style="padding: 8px 16px; cursor: pointer;">下右</button>
          <template #default>
            <div style="padding: 12px 16px;">下右 (bottom-end)</div>
          </template>
        </JvPopover>
      </div>
    `,
  }),
}

// 手动控制示例
export const Manual: Story = {
  render: () => ({
    components: { JvPopover },
    setup() {
      const show = ref(false)

      return {
        show,
        toggle: () => {
          show.value = !show.value
        },
      }
    },
    template: `
      <div style="padding: 100px; display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <button @click="toggle" style="padding: 8px 16px; cursor: pointer;">
          {{ show ? '隐藏' : '显示' }} Popover
        </button>
        
        <JvPopover v-model:show="show" manual>
          <div style="padding: 8px; border: 1px dashed #ccc; border-radius: 4px;">
            参考元素
          </div>
          <template #default>
            <div style="padding: 12px 16px; max-width: 200px;">
              这个Popover由外部按钮控制显示隐藏
            </div>
          </template>
        </JvPopover>
      </div>
    `,
  }),
}

// 不同内容样式示例
export const CustomStyles: Story = {
  render: () => ({
    components: { JvPopover },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center; gap: 40px;">
        <JvPopover>
          <button style="padding: 8px 16px; cursor: pointer; background: #4CAF50; color: white; border: none; border-radius: 4px;">
            绿色主题
          </button>
          <template #default>
            <div style="padding: 12px 16px; background: #4CAF50; color: white; border-radius: 4px;">
              <h3 style="margin-top: 0;">自定义绿色主题</h3>
              <p>可以通过CSS自定义Popover的外观</p>
            </div>
          </template>
        </JvPopover>
        
        <JvPopover>
          <button style="padding: 8px 16px; cursor: pointer; background: #2196F3; color: white; border: none; border-radius: 4px;">
            蓝色带图片
          </button>
          <template #default>
            <div style="padding: 12px 16px; background: #2196F3; color: white; border-radius: 4px; max-width: 250px;">
              <h3 style="margin-top: 0;">富内容Popover</h3>
              <p>Popover内可以包含各种复杂内容:</p>
              <div style="display: flex; gap: 8px; align-items: center;">
                <div style="width: 50px; height: 50px; background: #fff; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #2196F3; font-weight: bold;">图片</span>
                </div>
                <div>可以包含图片、列表、按钮等任意内容</div>
              </div>
            </div>
          </template>
        </JvPopover>
        
        <JvPopover :arrow="false">
          <button style="padding: 8px 16px; cursor: pointer; background: #F44336; color: white; border: none; border-radius: 4px;">
            红色无箭头
          </button>
          <template #default>
            <div style="padding: 12px 16px; background: #F44336; color: white; border-radius: 4px;">
              <h3 style="margin-top: 0;">无箭头样式</h3>
              <p>设置arrow=false可以隐藏箭头</p>
            </div>
          </template>
        </JvPopover>
      </div>
    `,
  }),
}

// 虚拟参考元素示例
export const VirtualReference: Story = {
  render: () => ({
    components: { JvPopover },
    setup() {
      const show = ref(false)
      const rect = ref({
        width: 100,
        height: 40,
        top: 200,
        left: 300,
        right: 400,
        bottom: 240,
        x: 300,
        y: 200,
      })

      return {
        show,
        rect,
        toggle: () => {
          show.value = !show.value
        },
      }
    },
    template: `
      <div style="padding: 100px; position: relative;">
        <button @click="toggle" style="padding: 8px 16px; cursor: pointer;">
          {{ show ? '隐藏' : '显示' }} 虚拟参考Popover
        </button>
        
        <!-- 虚拟参考区域的标记 -->
        <div style="position: absolute; top: 200px; left: 300px; width: 100px; height: 40px; border: 2px dashed #666; display: flex; align-items: center; justify-content: center;">
          虚拟参考元素
        </div>
        
        <!-- 使用虚拟参考矩形的Popover -->
        <JvPopover v-model:show="show" :reference-rect="rect" manual placement="top">
          <template #default>
            <div style="padding: 12px 16px; max-width: 250px;">
              <h3 style="margin-top: 0;">虚拟参考元素</h3>
              <p>这个Popover基于虚拟参考矩形定位，而不是真实的DOM元素</p>
            </div>
          </template>
        </JvPopover>
      </div>
    `,
  }),
}
