import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvDropdown from '../src/JvDropdown.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '导航组件/Dropdown 下拉菜单',
  component: JvDropdown,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: '下拉菜单位置',
    },
    arrow: {
      control: 'boolean',
      description: '是否显示箭头',
    },
    offset: {
      control: 'number',
      description: '偏移量',
    },
    show: {
      control: 'boolean',
      description: '是否显示',
    },
    placementStrategy: {
      control: 'select',
      options: ['flip', 'prevent-overflow', 'auto', 'fixed'],
      description: '放置策略',
    },
    arrowSize: {
      control: 'number',
      description: '箭头尺寸',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'manual'],
      description: '触发方式',
    },
    hideDelay: {
      control: 'number',
      description: '延迟关闭时间(毫秒)',
    },
    width: {
      control: 'text',
      description: '下拉菜单宽度',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
  },
  args: {
    placement: 'bottom-start',
    arrow: true,
    offset: 4,
    show: false,
    placementStrategy: 'auto',
    arrowSize: 8,
    trigger: 'click',
    hideDelay: 150,
    width: 'auto',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvDropdown>

export default meta
type Story = StoryObj<typeof meta>

// 基础使用示例
export const 基础使用: Story = {
  render: args => ({
    components: { JvDropdown },
    setup() {
      return { args }
    },
    template: `
      <JvDropdown v-bind="args">
        <template #trigger>
          <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
            点击此处 ▼
          </button>
        </template>
        <div style="padding: 8px 0;">
          <div style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;">选项 1</div>
          <div style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;">选项 2</div>
          <div style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;">选项 3</div>
        </div>
      </JvDropdown>
    `,
  }),
}

// 不同位置
export const 不同位置: Story = {
  render: () => ({
    components: { JvDropdown },
    setup() {
      return {}
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 50px;">
        <JvDropdown placement="top-start">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              上左 ▲
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
          </div>
        </JvDropdown>
        
        <JvDropdown placement="top">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              上中 ▲
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
          </div>
        </JvDropdown>
        
        <JvDropdown placement="top-end">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              上右 ▲
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
          </div>
        </JvDropdown>
        
        <JvDropdown placement="bottom-start">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              下左 ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
          </div>
        </JvDropdown>
        
        <JvDropdown placement="bottom">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              下中 ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
          </div>
        </JvDropdown>
        
        <JvDropdown placement="bottom-end">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              下右 ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
          </div>
        </JvDropdown>
      </div>
    `,
  }),
}

// 触发方式
export const 触发方式: Story = {
  render: () => ({
    components: { JvDropdown },
    setup() {
      return {}
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <JvDropdown trigger="click">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              点击触发 ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 3</div>
          </div>
        </JvDropdown>
        
        <JvDropdown trigger="hover">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              悬停触发 ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 3</div>
          </div>
        </JvDropdown>
        
        <JvDropdown trigger="manual" :show="true">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              手动控制(始终显示) ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 3</div>
          </div>
        </JvDropdown>
      </div>
    `,
  }),
}

// 宽度设置
export const 宽度设置: Story = {
  render: () => ({
    components: { JvDropdown },
    setup() {
      return {}
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <JvDropdown width="auto">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              自动宽度 ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">短选项</div>
            <div style="padding: 8px 16px; cursor: pointer;">这是一个较长的选项文本</div>
          </div>
        </JvDropdown>
        
        <JvDropdown width="trigger">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              触发器宽度 ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">这是一个较长的选项文本</div>
          </div>
        </JvDropdown>
        
        <JvDropdown :width="200">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              固定宽度(200px) ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">这是一个较长的选项文本，可能会超出固定宽度</div>
          </div>
        </JvDropdown>
      </div>
    `,
  }),
}

// 禁用状态
export const 禁用状态: Story = {
  render: () => ({
    components: { JvDropdown },
    setup() {
      return {}
    },
    template: `
      <JvDropdown disabled>
        <template #trigger>
          <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px; opacity: 0.6;">
            禁用状态 ▼
          </button>
        </template>
        <div style="padding: 8px 0;">
          <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
          <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
          <div style="padding: 8px 16px; cursor: pointer;">选项 3</div>
        </div>
      </JvDropdown>
    `,
  }),
}

// 带箭头与无箭头
export const 箭头显示: Story = {
  render: () => ({
    components: { JvDropdown },
    setup() {
      return {}
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <JvDropdown :arrow="true">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              带箭头 ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
          </div>
        </JvDropdown>
        
        <JvDropdown :arrow="false">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              无箭头 ▼
            </button>
          </template>
          <div style="padding: 8px 0;">
            <div style="padding: 8px 16px; cursor: pointer;">选项 1</div>
            <div style="padding: 8px 16px; cursor: pointer;">选项 2</div>
          </div>
        </JvDropdown>
      </div>
    `,
  }),
}

// 自定义内容
export const 自定义内容: Story = {
  render: () => ({
    components: { JvDropdown },
    setup() {
      const selected = ref('未选择')
      const handleSelect = (value: string) => {
        selected.value = value
      }

      return { selected, handleSelect }
    },
    template: `
      <div>
        <JvDropdown>
          <template #trigger>
            <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
              当前选择: {{ selected }} ▼
            </button>
          </template>
          <div style="padding: 10px; min-width: 250px;">
            <div style="margin-bottom: 10px; font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 5px;">
              自定义菜单
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
              <div 
                v-for="item in ['红色', '绿色', '蓝色', '黄色']" 
                :key="item"
                @click="handleSelect(item)"
                style="padding: 8px; cursor: pointer; border-radius: 4px; text-align: center;"
                :style="{ backgroundColor: selected === item ? '#e6f7ff' : '#f5f5f5' }"
              >
                {{ item }}
              </div>
            </div>
            <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
              <button 
                style="padding: 5px 12px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                @click="handleSelect('未选择')"
              >
                重置
              </button>
            </div>
          </div>
        </JvDropdown>
      </div>
    `,
  }),
}

// 空状态
export const 空状态: Story = {
  render: () => ({
    components: { JvDropdown },
    setup() {
      return {}
    },
    template: `
      <JvDropdown>
        <template #trigger>
          <button style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px;">
            无选项 ▼
          </button>
        </template>
        <template #empty>
          <div style="padding: 16px; text-align: center; color: #999;">
            <div style="font-size: 24px; margin-bottom: 8px;">📭</div>
            没有可用选项
          </div>
        </template>
      </JvDropdown>
    `,
  }),
}
