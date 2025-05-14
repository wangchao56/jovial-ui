import type { Meta, StoryObj } from '@storybook/vue3'
import JvAvatar from '@/components/jv-avatar'
import JvSpace from '@/components/jv-space'
import { imageExample } from '@/constants'

/**
 * 1. 组件介绍
 * `JvAvatar` 是一个用于展示用户或物体头像的组件，支持图片、文本和图标三种类型。它可以用在用户信息展示、评论列表、个人中心等多种场景，并提供了多种尺寸、形状和变体选项。
 * ## 2. 布局结构使用方式
 * 组件采用以下布局结构：
 * - 外层容器：控制大小、形状和样式
 * - 内容区域：展示图片、文本或图标
 *
 * ## 3. 交互设计
 * 组件提供以下交互效果：
 * - 点击事件：可以通过点击触发自定义操作
 * - 图片加载：支持图片加载状态和加载失败的处理
 * - 自适应内容：根据不同内容类型调整样式
 * - 文本截断：超出容器的文本会被自动截断
 * - 禁用状态：设置 `disabled` 为 `true` 时，头像变为半透明且不可点击
 *
 * 特殊交互：
 * - 当图片加载失败时，可以显示备用内容或回退到文本/图标模式
 * - 文本内容会根据容器大小自动调整字体大小
 * - 图标大小会根据头像尺寸自动调整
 *
 * ## 4. 可访问性
 * 组件遵循 WCAG 无障碍标准：
 * - 图片类型提供适当的替代文本
 * - 可通过键盘导航和操作
 * - 文本和背景色之间保持足够的对比度
 * - 大小足够便于交互操作
 * - 所有交互元素都有可见的焦点状态
 */
const meta = {
  title: '数据展示组件/Avatar 头像',
  component: JvAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'xlarge'],
      description: '头像大小',
      defaultValue: 'medium',
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
      description: '头像形状',
      defaultValue: 'circle',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: '头像变体',
      defaultValue: 'filled',
    },
    image: {
      control: 'text',
      description: '头像图片地址',
    },
    icon: {
      control: 'text',
      description: '头像图标',
    },
    text: {
      control: 'text',
      description: '头像文本内容',
      defaultValue: 'U',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用状态',
      defaultValue: false,
    },
    borderWidth: {
      control: 'text',
      description: '边框宽度',
      defaultValue: '1px',
    },
    elevated: {
      control: 'boolean',
      description: '是否显示阴影效果',
      defaultValue: true,
    },
    badge: {
      control: 'object',
      description: '徽标配置',
      defaultValue: false,
    },
  },
  args: {
    size: 'medium',
    shape: 'circle',
    variant: 'filled',
    image: imageExample,
    badge: false,
    disabled: false,
    borderWidth: '1px',
    elevated: true,
    text: 'U',
    icon: 'mdi:user',
    class: '',
  },
} satisfies Meta<typeof JvAvatar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 默认头像使用方式
 */
export const Default: Story = {
  args: {},
  render: args => ({
    components: { JvAvatar, JvSpace },
    setup() {
      return { args }
    },
    template: `<JvAvatar v-bind="args" />`,
  }),
}

/**
 * 不同大小的头像使用方式
 * 内置大小：`tiny, small, medium, large, xlarge`
 * 自定义大小支持string或number类型 如`50px, 60px, 70px ,100`
 */
export const Sizes: Story = {
  render: args => ({
    components: { JvAvatar, JvSpace },
    setup() {
      const sizeOptions = ['tiny', 'small', 'medium', 'large', 'xlarge']
      return { args, sizeOptions }
    },
    template: `
      <JvSpace :gap="16" align="center" direction="vertical">
        <JvSpace :gap="16" align="center">
          <JvAvatar v-for="size in sizeOptions" :key="size" v-bind="args" :size="size" image="${args.image}" />
        </JvSpace>
        <JvSpace :gap="16" align="center">
          <JvAvatar v-bind="args" size="50px" image="${args.image}" />
          <JvAvatar v-bind="args" size="60px" image="${args.image}" />
          <JvAvatar v-bind="args" size="70px" image="${args.image}" />
          <JvAvatar v-bind="args" :size="100" image="${args.image}" />
        </JvSpace>
      </JvSpace>
    `,
  }),
}

// 不同形状的头像
export const Shapes: Story = {
  args: {
    size: 'xlarge',
  },
  render: args => ({
    components: { JvAvatar },
    setup() {
      const shapeOptions = ['circle', 'rounded', 'square']
      return { args, shapeOptions }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <JvAvatar v-bind="args" shape="circle"/>  
        <JvAvatar v-bind="args" shape="rounded" />
        <JvAvatar v-bind="args" shape="square" />
      </div>
    `,
  }),
}

// 不同变体的头像
export const Variants: Story = {
  args: {
    size: 'xlarge',
  },
  render: args => ({
    components: { JvAvatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <JvAvatar v-bind="args" variant="filled" />
        <JvAvatar v-bind="args" variant="outlined" />
      </div>
    `,
  }),
}

// 文本类型头像
export const TextAvatars: Story = {
  render: args => ({
    components: { JvAvatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <JvAvatar text="A" />
        <JvAvatar text="B" />
        <JvAvatar text="C" />
        <JvAvatar text="赵" />
        <JvAvatar text="钱" />
      </div>
      <div style="display: flex; gap: 16px; align-items: center; margin-top: 16px;">
        <JvAvatar text="王" />
        <JvAvatar text="李" />
        <JvAvatar text="张" />
      </div>
      <div style="display: flex; gap: 16px; align-items: center; margin-top: 16px;">
        <JvAvatar text="A" variant="outlined" />
        <JvAvatar text="B" shape="rounded" />
        <JvAvatar text="C" size="large" />
      </div>
    `,
  }),
}

// 图标类型头像
export const IconAvatars: Story = {
  render: args => ({
    components: { JvAvatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <JvAvatar icon="mdi:user" />
        <JvAvatar icon="mdi:home" />
        <JvAvatar icon="mdi:settings" />
      </div>
      <div style="display: flex; gap: 16px; align-items: center; margin-top: 16px;">
        <JvAvatar icon="mdi:user" variant="outlined" />
        <JvAvatar icon="mdi:home" shape="rounded" />
        <JvAvatar icon="mdi:settings" size="120px" />
      </div>
    `,
  }),
}

// 自定义样式
export const CustomStyles: Story = {
  render: args => ({
    components: { JvAvatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <JvAvatar text="A" color="#1976d2"  />
        <JvAvatar text="B" color="#e91e63"  />
        <JvAvatar text="C" color="#4caf50" />
        <JvAvatar icon="mdi:user" color="#ff9800" />
      </div>
      <div style="display: flex; gap: 16px; align-items: center; margin-top: 16px;">
        <JvAvatar text="边框" borderWidth="3px" />
        <JvAvatar text="无阴影" :elevated="false" />
        <JvAvatar text="禁用" disabled />
      </div>
    `,
  }),
}

// 带徽标的头像
export const WithBadge: Story = {
  args: {
    size: 'xlarge',
    badge: {
      value: 8,
      color: 'primary',
    },
  },
  render: args => ({
    components: { JvAvatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <JvAvatar image="${args.image}" :badge="true" />
        <JvAvatar image="${args.image}" :badge="args.badge" />
        <JvAvatar image="${args.image}" :badge="{ value: 99, max: 99, color: 'error' }" />  
        <JvAvatar image="${args.image}" :badge="{ dot: true, color: 'success' }" /> 
      </div>
    `,
  }),
}

// 自定义插槽
export const CustomSlots: Story = {
  render: args => ({
    components: { JvAvatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <JvAvatar>
          <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background-color: #f0f0f0;">
            自定义
          </div>
        </JvAvatar>
        <JvAvatar>
          <template #text>
            <span style="color: red;">文本</span>
          </template>
        </JvAvatar>
        <JvAvatar>
          <template #icon>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </template>
        </JvAvatar>
      </div>
    `,
  }),
}

// 组合使用
export const Composition: Story = {
  render: args => ({
    components: { JvAvatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <JvAvatar size="small" image="${args.image}" />
          <div>
            <div style="font-weight: bold;">张三</div>
            <div style="font-size: 12px; color: #666;">产品经理</div>
          </div>
        </div>
        
        <div style="display: flex; gap: 8px; align-items: center;">
          <JvAvatar text="李" size="small" />
          <div>
            <div style="font-weight: bold;">李四</div>
            <div style="font-size: 12px; color: #666;">前端开发</div>
          </div>
        </div>
        
        <div style="display: flex; gap: 8px; align-items: center;">
          <JvAvatar icon="user" size="small" />
          <div>
            <div style="font-weight: bold;">王五</div>
            <div style="font-size: 12px; color: #666;">UI设计师</div>
          </div>
        </div>
      </div>
    `,
  }),
}
