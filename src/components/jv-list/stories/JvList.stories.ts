import type { Meta, StoryObj } from '@storybook/vue3'
import JvList from '../src/JvList.vue'
import JvListItem from '../src/JvListItem.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '数据展示组件/List 列表',
  component: JvList,
  tags: ['autodocs'],
  argTypes: {
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
      table: {
        type: { summary: 'boolean' },
      },
    },
    rounded: {
      control: 'boolean',
      description: '是否使用圆角',
      table: {
        type: { summary: 'boolean' },
      },
    },
    dense: {
      control: 'boolean',
      description: '是否使用紧凑模式',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用列表',
      table: {
        type: { summary: 'boolean' },
      },
    },
    divided: {
      control: 'boolean',
      description: '是否显示分割线',
      table: {
        type: { summary: 'boolean' },
      },
    },
    color: {
      control: 'select',
      options: ['', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: '列表背景色类型',
      table: {
        type: { summary: 'string' },
      },
    },
    hover: {
      control: 'boolean',
      description: '是否显示悬浮效果',
      table: {
        type: { summary: 'boolean' },
      },
    },
    maxHeight: {
      control: 'text',
      description: '列表最大高度',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
  args: {
    bordered: false,
    rounded: false,
    dense: false,
    disabled: false,
    divided: false,
    color: '',
    hover: false,
    maxHeight: '',
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { JvList, JvListItem },
    setup() {
      return { args }
    },
    template: `
      <JvList v-bind="args">
        <JvListItem title="标题1" subtitle="副标题1" icon="icon-user" />
        <JvListItem title="标题2" subtitle="副标题2" icon="icon-settings" />
        <JvListItem title="标题3" subtitle="副标题3" icon="icon-home" />
      </JvList>
    `,
  }),
}

export const Bordered: Story = {
  args: {
    bordered: true,
    divided: true,
  },
  render: args => ({
    components: { JvList, JvListItem },
    setup() {
      return { args }
    },
    template: `
      <JvList v-bind="args">
        <JvListItem title="标题1" subtitle="副标题1" icon="icon-user" />
        <JvListItem title="标题2" subtitle="副标题2" icon="icon-settings" />
        <JvListItem title="标题3" subtitle="副标题3" icon="icon-home" />
      </JvList>
    `,
  }),
}

export const WithLinks: Story = {
  args: {
    bordered: true,
    divided: true,
    hover: true,
  },
  render: args => ({
    components: { JvList, JvListItem },
    setup() {
      return { args }
    },
    template: `
      <JvList v-bind="args">
        <JvListItem title="谷歌" subtitle="搜索引擎" icon="icon-globe" link="https://google.com" />
        <JvListItem title="百度" subtitle="搜索引擎" icon="icon-globe" link="https://baidu.com" />
        <JvListItem title="必应" subtitle="搜索引擎" icon="icon-globe" link="https://bing.com" />
      </JvList>
    `,
  }),
}

export const WithSlots: Story = {
  args: {
    bordered: true,
    rounded: true,
  },
  render: args => ({
    components: { JvList, JvListItem },
    setup() {
      return { args }
    },
    template: `
      <JvList v-bind="args">
        <template #header>
          <h3 style="margin: 0;">用户列表</h3>
        </template>
        
        <JvListItem title="用户1" subtitle="user1@example.com" icon="icon-user" />
        <JvListItem title="用户2" subtitle="user2@example.com" icon="icon-user" />
        <JvListItem title="用户3" subtitle="user3@example.com" icon="icon-user" />
        
        <template #footer>
          <div style="text-align: center;">共 3 条数据</div>
        </template>
      </JvList>
    `,
  }),
}

export const Colored: Story = {
  args: {
    color: 'primary',
    rounded: true,
  },
  render: args => ({
    components: { JvList, JvListItem },
    setup() {
      return { args }
    },
    template: `
      <JvList v-bind="args">
        <JvListItem title="标题1" subtitle="副标题1" icon="icon-user" />
        <JvListItem title="标题2" subtitle="副标题2" icon="icon-settings" />
        <JvListItem title="标题3" subtitle="副标题3" icon="icon-home" />
      </JvList>
    `,
  }),
}

export const ScrollableList: Story = {
  args: {
    bordered: true,
    rounded: true,
    maxHeight: 200,
  },
  render: args => ({
    components: { JvList, JvListItem },
    setup() {
      return { args }
    },
    template: `
      <JvList v-bind="args">
        <template #header>
          <h3 style="margin: 0;">可滚动列表</h3>
        </template>
        
        <JvListItem v-for="n in 10" :key="n" :title="'项目 ' + n" :subtitle="'这是项目 ' + n + ' 的描述'" />
      </JvList>
    `,
  }),
}
