import type { Meta, StoryObj } from '@storybook/vue3'
import JvFlex from '@components/jv-flex/src/JvFlex.vue'
import JvTag from '@components/jv-tag/src/JvTag.vue'
import JvTagGroup from '@components/jv-tag/src/JvTagGroup.vue'

const colorTypeOptions = ['primary', 'success', 'warning', 'error', 'info']
const variantOptions = ['filled', 'outlined', 'tonal']
const sizeOptions = ['small', 'medium', 'large']
const shapeOptions = ['square', 'rounded', 'pill']
const meta: Meta<typeof JvTag> = {
  title: '数据展示组件/Tag 标签',
  component: JvTag,
  subcomponents: { JvTagGroup },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: colorTypeOptions,
      defaultValue: 'primary'
    },
    size: { control: 'select', options: sizeOptions, defaultValue: 'medium' },
    closable: { control: 'boolean', defaultValue: false },
    variant: {
      control: 'select',
      options: variantOptions,
      defaultValue: 'filled'
    },
    shape: { control: 'select', options: shapeOptions, defaultValue: 'square' }
  },
  args: {
    content: 'Tag Label',
    type: 'primary',
    size: 'medium',
    shape: 'square'
  }
}

export default meta

type Story = StoryObj<typeof JvTag>

export const Basic: Story = {
  args: {
    content: 'Tag Label'
  }
}

export const 可关闭: Story = {
  args: {
    closable: true
  },
  render: (args) => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, variantOptions }
    },
    template: `
        <JvFlex :gap="12">
          <JvTag  v-for="variant in variantOptions" v-bind="args"  type="primary" :variant="variant">{{variant}}</JvTag>
        </JvFlex>
    `
  })
}

export const 变体: Story = {
  render: (args) => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, variantOptions }
    },
    template: `
        <JvFlex :gap="12">
          <JvTag  v-for="variant in variantOptions"  type="primary" :variant="variant">{{variant}}</JvTag>
        </JvFlex>
    `
  })
}

export const 不同类型: Story = {
  args: {
    variant: 'filled'
  },
  render: (args) => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, colorTypeOptions }
    },
    template: `
          <JvFlex :gap="12">
            <JvTag  v-for="type in colorTypeOptions"  :type="type" >{{type}}</JvTag>
          </JvFlex>
      `
  })
}

export const 形状: Story = {
  render: (args) => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, shapeOptions }
    },
    template: `
        <JvFlex :gap="12">
          <JvTag  v-for="shape in shapeOptions"  :shape="shape" >{{shape}}</JvTag>
        </JvFlex>
    `
  })
}

export const 大小: Story = {
  render: (args) => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, sizeOptions }
    },
    template: `
        <JvFlex :gap="12">
          <JvTag  v-for="size in sizeOptions"  :size="size" >{{size}}</JvTag>
        </JvFlex>
    `
  })
}
