import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import JvButton from '@components/jv-button'
import JvSpace from '@components/jv-space'
import { expect } from '@storybook/test'

const colorTypeOptions = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info'
]
const variantOptions = [
  'elevated',
  'text',
  'outlined',
  'tonal',
  'plain',
  'dashed',
  'flat'
]

const sizeOptions = ['tiny', 'small', 'medium', 'large', 'xlarge']
const shapeOptions = ['pill', 'square']
export default {
  title: '通用组件/Button 按钮',
  component: JvButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variantOptions,
      defaultValue: 'elevated'
    },
    colorType: {
      control: { type: 'select' },
      defaultValue: 'default',
      options: colorTypeOptions
    },
    size: {
      control: { type: 'select' },
      defaultValue: 'medium',
      options: sizeOptions
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
    shape: { control: 'select', options: shapeOptions, defaultValue: 'square' },
    icon: { control: 'text' },
    content: { control: 'text' }
  }
} as Meta

const Template: StoryFn = (args) => ({
  components: { JvButton },
  setup() {
    return { args }
  },
  template: '<JvButton v-bind="args">{{ args.content || "按钮" }}</JvButton>'
})

export const 基础按钮 = Template.bind({})
基础按钮.args = {
  variant: 'primary',
  content: '基础按钮'
}

export const 禁用 = Template.bind({})
禁用.args = {
  disabled: true,
  content: '禁用按钮'
}

export const 加载中 = Template.bind({})
加载中.args = {
  loading: true,
  content: '加载中'
}

export const 块级按钮 = Template.bind({})
块级按钮.args = {
  block: true,
  label: '块级按钮'
}

export const 按钮形状: StoryObj = {
  args: {
    variant: 'elevated',
    colorType: 'primary'
  },
  render: (args) => ({
    components: { JvButton, JvSpace },
    setup() {
      return { args, shapeOptions }
    },
    template: `
      <JvSpace :gap="12">
        <JvButton v-bind="args" v-for="shape in shapeOptions" :shape="shape"  :content="shape" />
      </JvSpace>
    `
  })
}
export const 不同尺寸: StoryObj = {
  render: (args) => ({
    components: { JvButton },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 12px;">
        <JvButton v-bind="args" size="small">小</JvButton>
        <JvButton v-bind="args" size="medium">中</JvButton>
        <JvButton v-bind="args" size="large">大</JvButton>
      </div>
    `
  })
}

export const 不同颜色: StoryObj = {
  render: (args) => ({
    components: { JvButton, JvSpace },
    setup() {
      return { args, colorTypeOptions }
    },
    template: `
      <JvSpace  :gap="12" >
        <JvButton v-for="colorType in colorTypeOptions" v-bind="args" :color-type="colorType" >
          BUTTON
        </JvButton>
      </JvSpace>
    `
  })
}

/**
 * 变体
 * elevated  使用按钮的阴影强调
 * flat  移除按钮的阴影效果
 * plain  移移除背景颜色并且在未悬停时降低透明度
 * dashed  以当前文字颜色绘制细边框 边框样式为dashed
 * tonal  按钮的背景颜色被设为文字颜色的高透明度版本
 * outlined 以当前文字颜色绘制细边框 边框样式为solid 移除背景
 * text 移除背景颜色和阴影
 */

export const 不同变体: StoryObj = {
  render: (args) => ({
    components: { JvButton, JvSpace },
    setup() {
      return { args, colorTypeOptions, variantOptions }
    },
    template: `
      <JvSpace  :gap="12" >
       <JvButton v-bind="args" v-for="variant in variantOptions" :variant="variant">
            BUTTON
       </JvButton>
        <JvButton v-bind="args" v-for="variant in variantOptions" :variant="variant" color-type="success">
          BUTTON
       </JvButton>
      </JvSpace>
    `
  })
}

export const 图标按钮: StoryObj = {
  args: {
    variant: 'elevated',
    icon: 'mdi:home'
  },
  render: (args) => ({
    components: { JvButton },
    setup() {
      return { args }
    },
    template: '<JvButton v-bind="args"  />'
  }),
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement
    const button = canvas.querySelector('button') as HTMLButtonElement
    expect(button).toBeTruthy()
  }
}

// 按钮堆叠
export const 按钮堆叠: StoryObj = {
  render: (args) => ({
    components: { JvButton },
    setup() {
      return { args }
    },
    template:
      '<JvButton v-bind="args" prepend-icon="mdi:plus" append-icon="mdi:minus" stacked>按钮</JvButton>'
  })
}
