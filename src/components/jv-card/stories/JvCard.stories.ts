import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/jv-button'
import JvCard, {
  JvCardActions,
  JvCardContent,
  JvCardHeader,
  JvCardMedia,
} from '@components/jv-card'
import JvSpace from '@components/jv-space'

const colorTypeOptions = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
]
const variantOptions = ['elevated', 'outlined', 'flat', 'tonal']
const roundedOptions = [
  'square',
  'sm',
  'lg',
  'xl',
  'pill',
]
const alignOptions = ['start', 'center', 'end']

const meta: Meta<typeof JvCard> = {
  title: '数据展示组件/Card 卡片/JvCard',
  component: JvCard,
  subcomponents: { JvCardActions, JvCardHeader, JvCardContent, JvCardMedia },
  tags: ['autodocs'],
  argTypes: {
    imgSrc: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    content: { control: 'text' },
    maxWidth: { control: 'number' },
    color: {
      control: 'select',
      options: colorTypeOptions,
      defaultValue: 'default',
    },
    variant: {
      control: 'select',
      options: variantOptions,
      defaultValue: 'elevated',
    },
    rounded: {
      control: 'select',
      options: roundedOptions,
      defaultValue: 'rounded',
    },
    clickable: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    actionsAlign: {
      control: 'select',
      options: alignOptions,
      defaultValue: 'end',
    },
  },
}

export default meta

type Story = StoryObj<typeof JvCard>

export const Base: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
    content: '这是一个基础卡片，用于展示内容。',
    maxWidth: 300,
    variant: 'elevated',
    imgSrc: 'https://picsum.photos/300/150',
  },
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args" >
      </JvCard>
    `,
  }),
}

export const WithActions: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
    maxWidth: 300,
  },
  render: args => ({
    components: { JvCard, JvButton },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        <template #title>
          标题
        </template>
        <template #subtitle>
          副标题
        </template>
        <template #content>
          这是一个使用插槽方式添加内容区域的卡片示例。
        </template>
        <template #actions>
          <JvButton size="small" variant="dashed" color="error">取消</JvButton>
          <JvButton size="small" variant="flat" color="primary">确定</JvButton>
        </template>
      </JvCard>
    `,
  }),
}

export const ActionsAlign: Story = {
  args: {
    title: '操作区对齐方式',
    subtitle: '通过actionsAlign或align属性控制',

  },
  render: args => ({
    components: { JvCard, JvButton, JvCardActions, JvSpace },
    setup() {
      return { args, alignOptions }
    },
    template: `
      <JvSpace :gap="16" direction="vertical">
        <JvCard v-for="align in alignOptions" :key="align" v-bind="args" :title="'插槽方式 - ' + align" :actions-align="align">
          使用插槽方式，通过actionsAlign属性控制按钮对齐方式为{{align}}。
          <template #actions>
            <JvButton size="small" variant="text">取消</JvButton>
            <JvButton size="small" variant="elevated" color-type="primary">确定</JvButton>
          </template>
        </JvCard>
      </JvSpace>
    `,
  }),
}

export const WithMedia: Story = {
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard  title='媒体卡片' subtitle='支持图片和视频'   loading>
        <template #media>
          <img src="https://picsum.photos/300/150" alt="随机图片" />
        </template>
        这是一个包含媒体内容的卡片示例。
      </JvCard>
    `,
  }),
}
/**
 * 可点击卡片 卡片由一个a标签包裹
 */
export const Clickable: Story = {
  args: {
    title: '可点击卡片',
    subtitle: '点击查看详情',
    clickable: true,
    href: 'https://www.baidu.com',
    target: '_blank',
    alt: '点击查看详情',
  },
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        这是一个可点击的卡片，点击时会触发点击事件。
      </JvCard>
    `,
  }),
}
/**
 * 卡片变体
 */
export const Variants: Story = {
  render: args => ({
    components: { JvCard, JvSpace },
    setup() {
      return { args, variantOptions }
    },
    template: `
      <JvSpace :gap="16" direction="horizontal">
        <JvCard 
          v-for="variant in variantOptions" 
          :key="variant"
          :variant="variant"
          :title="variant"
          subtitle="卡片变体示例"
          imgSrc="https://picsum.photos/300/150"
          width="300px"
          color="primary"
        >
          这是一个{{variant}}变体的卡片示例。
        </JvCard>
      </JvSpace>
    `,
  }),
}

export const Colors: Story = {
  render: args => ({
    components: { JvCard, JvSpace },
    setup() {
      return { args, colorTypeOptions }
    },
    template: `
      <JvSpace :gap="16" direction="vertical">
        <JvCard 
          v-for="colorType in colorTypeOptions" 
          :key="colorType"
          :color="colorType"
          :title="colorType"
          subtitle="颜色类型示例"
          width="300px"
        >
          这是一个{{colorType}}颜色类型的卡片示例。
        </JvCard>
      </JvSpace>
    `,
  }),
}

export const Rounded: Story = {
  render: args => ({
    components: { JvCard, JvSpace },
    setup() {
      return { args, roundedOptions }
    },
    template: `
      <JvSpace :gap="16" direction="vertical">
        <JvCard 
          v-for="rounded in roundedOptions" 
          :key="rounded"
          :rounded="rounded"
          :title="rounded"
          subtitle="圆角示例"
          width="300px"
        >
          这是一个{{rounded}}圆角的卡片示例。
        </JvCard>
      </JvSpace>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    title: '禁用卡片',
    subtitle: '不可交互',
    disabled: true,
    clickable: true,
  },
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        这是一个禁用状态的卡片，无法进行交互。
      </JvCard>
    `,
  }),
}

export const Custom: Story = {
  args: {

    variant: 'outlined',
    color: 'primary',
  },
  render: args => ({
    components: {
      JvCard,
      JvButton,
      JvCardActions,
      JvCardHeader,
      JvCardContent,
    },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        <template #header>
          <div>
            <div>
                自定义头部
            </div>
            <div>
                自定义副标题
            </div>
          </div>
        </template>
      </JvCard>
    `,
  }),
}

/**
 * loading 状态
 *
 */
export const LoadingState: Story = {
  args: {

    variant: 'outlined',
    color: 'primary',
    loading: true,
  },
  render: args => ({
    setup() {
      return { args }
    },
    template: `
          <JvCard v-bind="args" :loading="true">
            <template #header>
              <div>
                <div>
                    处于加载状态的按钮
                </div>
                <div>
                    自定义副标题
                </div>
              </div>
            </template>
          </JvCard>
        `,
  }),
}

/**
 * link 卡片
 */
export const LinkCard: Story = {
  args: {
    title: '链接卡片',
    subtitle: '点击查看详情',
    clickable: true,
    href: 'https://www.baidu.com',
    target: '_blank',
    alt: '点击查看详情',
  },
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args" tag="a">
        这是一个链接卡片，点击时会触发点击事件。
      </JvCard>
    `,
  }),
}

/**
 * variant== tonal时可点击
 */
export const ClickableTonal: Story = {
  args: {
    title: '可点击卡片',
    subtitle: '点击查看详情',
    clickable: true,
    variant: 'tonal',
    color: 'primary',
  },
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        这是一个可点击的卡片，点击时会触发点击事件。
      </JvCard>
    `,
  }),
}
