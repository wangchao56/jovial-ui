// src/components/jv-container/stories/JvContainer.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import JvContainer, { JvAside, JvFooter, JvHeader, JvMain } from '@components/jv-container'

const meta = {
  title: '布局组件/Container 容器',
  component: JvContainer,
  subcomponents: {
    JvAside,
    JvFooter,
    JvHeader,
    JvMain,
  },
  tags: ['autodocs'],
  argTypes: {
    fluid: {
      description: '是否使用流体容器（100%宽度）',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      description: '容器的最大宽度',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', false],
      table: {
        type: { summary: 'string | false' },
        defaultValue: { summary: 'lg' },
      },
    },
    tag: {
      description: '容器的HTML标签',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'div' },
      },
    },
  },
} satisfies Meta<typeof JvContainer>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvContainer, JvHeader, JvAside, JvMain, JvFooter },
    setup() {
      return { args }
    },
    template: `
      <jv-container v-bind="args">
        <jv-header>
          <div style="width: 100%; background-color: var(--jv-theme-success); padding: 20px; text-align: center;">
            Header
          </div>
        </jv-header>
        <jv-aside position="left">
          <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
            Aside
          </div>
        </jv-aside>
        <jv-main>
          <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
            Main
          </div>
        </jv-main>
        <jv-aside position="right">
          <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
            Aside
          </div>
        </jv-aside>
        <jv-footer fixed>
          <div style="width: 100%; background-color: var(--jv-theme-warning); padding: 20px; text-align: center;">
            Footer
          </div>
        </jv-footer>
      </jv-container>
    `,
  }),
}

// 流体容器
export const Fluid: Story = {
  args: {
    fluid: true,
  },
  render: args => ({
    components: { JvContainer },
    setup() {
      return { args }
    },
    template: `
      <jv-container v-bind="args">
        <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
          流体容器 - 100%宽度
        </div>
      </jv-container>
    `,
  }),
}

// 不同最大宽度
export const MaxWidths: Story = {
  render: () => ({
    components: { JvContainer },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <jv-container max-width="xs">
          <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
            xs (444px)
          </div>
        </jv-container>
        
        <jv-container max-width="sm">
          <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
            sm (600px)
          </div>
        </jv-container>
        
        <jv-container max-width="md">
          <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
            md (900px)
          </div>
        </jv-container>
        
        <jv-container max-width="lg">
          <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
            lg (1200px)
          </div>
        </jv-container>
        
        <jv-container max-width="xl">
          <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
            xl (1536px)
          </div>
        </jv-container>
        
        <jv-container max-width="2xl">
          <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
            2xl (1920px)
          </div>
        </jv-container>
      </div>
    `,
  }),
}

// 自定义标签
export const CustomTag: Story = {
  args: {
    tag: 'section',
  },
  render: args => ({
    components: { JvContainer },
    setup() {
      return { args }
    },
    template: `
      <jv-container v-bind="args">
        <div style="background-color: var(--jv-theme-surface); padding: 20px; text-align: center;">
          使用 section 标签的容器
        </div>
      </jv-container>
    `,
  }),
}

// 响应式示例
export const Responsive: Story = {
  render: () => ({
    components: { JvContainer },
    template: `
      <jv-container>
        <div style="background-color: var(--jv-theme-surface); padding: 20px;">
          <h3 style="margin: 0 0 16px;">响应式容器</h3>
          <p style="margin: 0;">
            这个容器会根据不同的断点自动调整最大宽度和内边距。
            尝试调整浏览器窗口大小来查看效果。
          </p>
        </div>
      </jv-container>
    `,
  }),
}

// 嵌套容器
export const Nested: Story = {
  render: () => ({
    components: { JvContainer },
    template: `
      <jv-container>
        <div style="background-color: var(--jv-theme-surface); padding: 20px; margin-bottom: 20px;">
          外层容器
        </div>
        
        <jv-container max-width="sm">
          <div style="background-color: var(--jv-theme-surface); padding: 20px;">
            内层容器 (sm)
          </div>
        </jv-container>
      </jv-container>
    `,
  }),
}
