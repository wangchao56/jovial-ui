import type { Meta, StoryObj } from '@storybook/vue3'
import { _internalIcons } from '@components/internal-icon'
import JvIcon from '@components/jv-icon'
import JvButton from '@/components/jv-button'
import JvSpace from '@/components/jv-space'
import JvTooltip from '@/components/jv-tooltip'
import { JvFlex } from '@/core'

// 创建内置图标列表
const internalIconNames = Object.keys(_internalIcons) as Array<
  keyof typeof _internalIcons
>

export default {
  title: '通用组件/Icon 图标',
  component: JvIcon,
  argTypes: {
    name: {
      control: { type: 'text' },
      description: '图标名称，以$开头的为内置图标，其他为Iconify图标',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: '图标大小',
    },
    color: {
      control: { type: 'color' },
      description: '图标颜色',
    },
    colorType: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
      ],
      description: '图标颜色类型',
    },
    spin: {
      control: { type: 'boolean' },
      description: '是否旋转',
    },
    flip: {
      control: { type: 'boolean' },
      description: '是否翻转',
    },
    rotate: {
      control: { type: 'number' },
      description: '旋转角度',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'JvIcon 组件支持两种图标类型：内置图标（以$开头）和 Iconify 图标。',
      },
    },
  },
} as Meta<typeof JvIcon>

type Story = StoryObj<typeof JvIcon>

// 基础用法
export const Basic: Story = {
  args: {
    name: '$star',
    size: 'medium',
  },
}

// 内置图标展示
export const InternalIcons: Story = {
  render: () => ({
    components: { JvIcon },
    setup() {
      return { internalIconNames }
    },
    template: `
      <div>
        <h3>内置图标</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px;">
          <div v-for="name in internalIconNames" :key="name" style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 4px;">
            <JvIcon :name="name" style="margin-bottom: 8px;" />
            <span style="font-size: 12px; word-break: break-all; text-align: center;">{{ name }}</span>
          </div>
        </div>
      </div>
    `,
  }),
}

// 不同大小
export const Sizes: Story = {
  render: () => ({
    components: { JvIcon, JvFlex },
    setup() {
      const sizes = ['small', 'medium', 'large', 'xlarge', '48px']
      return { sizes }
    },
    template: `
      <JvFlex direction="column" gap="16px">
        <div  v-for="size in sizes" :key="size" style="display: flex; flex-direction: column; align-items: center;">
          <JvIcon name="$star"   :size="size" />
          <span style="font-size: 12px; margin-top: 8px;">{{ size }}</span>
        </div>
      </JvFlex>
    `,
  }),
}

// 不同颜色类型
export const ColorTypes: Story = {
  render: () => ({
    components: { JvIcon },
    setup() {
      const colorTypes = [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
      ]
      return { colorTypes }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <div v-for="type in colorTypes" :key="type" style="display: flex; flex-direction: column; align-items: center;">
          <JvIcon name="$star" size="large" :colorType="type" />
          <span style="font-size: 12px; margin-top: 8px;">{{ type }}</span>
        </div>
      </div>
    `,
  }),
}

// 自定义颜色
export const CustomColor: Story = {
  render: () => ({
    components: { JvIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <JvIcon name="$star" size="large" color="#FF5722" />
          <span style="font-size: 12px; margin-top: 8px;">#FF5722</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <JvIcon name="$star" size="large" color="#2196F3" />
          <span style="font-size: 12px; margin-top: 8px;">#2196F3</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <JvIcon name="$star" size="large" color="#4CAF50" />
          <span style="font-size: 12px; margin-top: 8px;">#4CAF50</span>
        </div>
      </div>
    `,
  }),
}

// 动画效果
export const Animations: Story = {
  args: {
    name: '$arrowLeft',
    size: 'large',
    color: 'primary',
  },
  render: () => ({
    components: { JvIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 24px;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <JvIcon name="$arrowLeft" spin />
          <span style="font-size: 12px; margin-top: 8px;">旋转</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <JvIcon name="$arrowLeft" flip />
          <span style="font-size: 12px; margin-top: 8px;">翻转</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <JvIcon name="$arrowLeft" :rotate="45" />
          <span style="font-size: 12px; margin-top: 8px;">旋转45°</span>
        </div>
      </div>    
    `,
  }),
}

// Iconify 图标
export const IconifyIcons: Story = {
  render: () => ({
    components: { JvIcon, JvSpace, JvButton, JvTooltip },
    template: `
      <div>
        <h3>Iconify 图标使用示例</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 4px;">
            <JvIcon name="mdi:home" size="large" />
            <span style="font-size: 12px; margin-top: 8px;">mdi:home</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 4px;">
            <JvIcon name="mdi:account" size="large" />
            <span style="font-size: 12px; margin-top: 8px;">mdi:account</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 4px;">
            <JvIcon name="mdi:heart" size="large" />
            <span style="font-size: 12px; margin-top: 8px;">mdi:heart</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 4px;">
            <JvIcon name="mdi:bell" size="large" />
            <span style="font-size: 12px; margin-top: 8px;">mdi:bell</span>
          </div>
        </div>
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  args: {
    name: '$star',
    size: 'large',
    disabled: true,
  },
}
