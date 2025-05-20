import type { Meta, StoryObj } from '@storybook/vue3'
import readme from '../README.md?raw'
import JvBreadcrumbItem from '../src/JvBreadcrumbItem.vue'
import JvBreadcrumbs from '../src/JvBreadcrumbs.vue'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '导航组件/JvBreadcrumbs',
  component: JvBreadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: '分隔符',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/' },
      },
    },
    separatorIcon: {
      control: 'text',
      description: '分隔符图标',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    showHome: {
      control: 'boolean',
      description: '是否显示首页',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    homeText: {
      control: 'text',
      description: '首页文本',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '首页' },
      },
    },
    homeTo: {
      control: 'text',
      description: '首页链接',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/' },
      },
    },
    homeIcon: {
      control: 'text',
      description: '首页图标',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    maxItems: {
      control: 'number',
      description: '最大显示层级',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'Infinity' },
      },
    },
    items: {
      control: 'object',
      description: '面包屑项数组',
      table: {
        type: { summary: 'BreadcrumbItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
  args: {
    separator: '/',
    showHome: true,
    homeText: '首页',
    homeTo: '/',
    maxItems: Infinity,
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvBreadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

// 默认示例
export const Default: Story = {
  args: {
    items: [
      { text: '首页', to: '/' },
      { text: '产品中心', to: '/products' },
      { text: '智能手机', to: '/products/phones' },
    ],
  },
  render: args => ({
    components: { JvBreadcrumbs },
    setup() {
      return { args }
    },
    template: `<JvBreadcrumbs v-bind="args" />`,
  }),
}

// 自定义分隔符
export const CustomSeparator: Story = {
  args: {
    separator: '>',
    items: [
      { text: '首页', to: '/' },
      { text: '产品中心', to: '/products' },
      { text: '智能手机', to: '/products/phones' },
    ],
  },
  render: args => ({
    components: { JvBreadcrumbs },
    setup() {
      return { args }
    },
    template: `<JvBreadcrumbs v-bind="args" />`,
  }),
}

// 使用图标
export const WithIcons: Story = {
  args: {
    homeIcon: 'home',
    items: [
      { text: '首页', to: '/', icon: 'home' },
      { text: '产品中心', to: '/products', icon: 'grid' },
      { text: '智能手机', to: '/products/phones', icon: 'smartphone' },
    ],
  },
  render: args => ({
    components: { JvBreadcrumbs },
    setup() {
      return { args }
    },
    template: `<JvBreadcrumbs v-bind="args" />`,
  }),
}

// 使用分隔符图标
export const IconSeparator: Story = {
  args: {
    separatorIcon: 'chevron-right',
    items: [
      { text: '首页', to: '/' },
      { text: '产品中心', to: '/products' },
      { text: '智能手机', to: '/products/phones' },
    ],
  },
  render: args => ({
    components: { JvBreadcrumbs },
    setup() {
      return { args }
    },
    template: `<JvBreadcrumbs v-bind="args" />`,
  }),
}

// 隐藏首页
export const HideHome: Story = {
  args: {
    showHome: false,
    items: [
      { text: '产品中心', to: '/products' },
      { text: '智能手机', to: '/products/phones' },
    ],
  },
  render: args => ({
    components: { JvBreadcrumbs },
    setup() {
      return { args }
    },
    template: `<JvBreadcrumbs v-bind="args" />`,
  }),
}

// 限制最大显示层级
export const LimitedItems: Story = {
  args: {
    maxItems: 2,
    items: [
      { text: '首页', to: '/' },
      { text: '产品中心', to: '/products' },
      { text: '智能手机', to: '/products/phones' },
      { text: '华为', to: '/products/phones/huawei' },
      { text: 'P50 Pro', to: '/products/phones/huawei/p50-pro' },
    ],
  },
  render: args => ({
    components: { JvBreadcrumbs },
    setup() {
      return { args }
    },
    template: `<JvBreadcrumbs v-bind="args" />`,
  }),
}

// 禁用某些项
export const DisabledItems: Story = {
  args: {
    items: [
      { text: '首页', to: '/' },
      { text: '产品中心', to: '/products', disabled: true },
      { text: '智能手机', to: '/products/phones' },
    ],
  },
  render: args => ({
    components: { JvBreadcrumbs },
    setup() {
      return { args }
    },
    template: `<JvBreadcrumbs v-bind="args" />`,
  }),
}

// 使用插槽自定义
export const UsingSlots: Story = {
  render: () => ({
    components: { JvBreadcrumbs, JvBreadcrumbItem },
    template: `
      <JvBreadcrumbs>
        <JvBreadcrumbItem text="首页" to="/" icon="home" />
        <JvBreadcrumbItem text="产品中心" to="/products" />
        <JvBreadcrumbItem text="智能手机" active />
      </JvBreadcrumbs>
    `,
  }),
}

// 完全自定义
export const FullyCustomized: Story = {
  render: () => ({
    components: { JvBreadcrumbs, JvBreadcrumbItem },
    template: `
      <JvBreadcrumbs separator-icon="arrow-right">
        <template #home>
          <JvBreadcrumbItem to="/">
            <template #icon>
              <span style="color: blue; margin-right: 4px;">🏠</span>
            </template>
            主页
          </JvBreadcrumbItem>
        </template>
        <template #separator>
          <span style="color: red; margin: 0 8px;">→</span>
        </template>
        <JvBreadcrumbItem to="/products">
          <template #icon>
            <span style="color: green; margin-right: 4px;">📦</span>
          </template>
          产品目录
        </JvBreadcrumbItem>
        <JvBreadcrumbItem active>
          <template #icon>
            <span style="margin-right: 4px;">📱</span>
          </template>
          智能手机
        </JvBreadcrumbItem>
      </JvBreadcrumbs>
    `,
  }),
}
