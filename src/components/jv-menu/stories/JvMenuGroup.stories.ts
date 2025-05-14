import type { Meta, StoryObj } from '@storybook/vue3'
import JvMenuGroup from '../src/JvMenuGroup.vue'
import JvMenuItem from '../src/JvMenuItem.vue'

const meta: Meta<typeof JvMenuGroup> = {
  title: '导航组件/Menu/MenuGroup 菜单组',
  component: JvMenuGroup,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '分组标题',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用整个分组',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvMenuGroup>

// 基础分组
export const Basic: Story = {
  args: {
    title: '基础分组',
  },
  render: args => ({
    components: { JvMenuGroup, JvMenuItem },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvMenuGroup v-bind="args">
          <JvMenuItem title="菜单项1" />
          <JvMenuItem title="菜单项2" />
          <JvMenuItem title="菜单项3" />
        </JvMenuGroup>
      </div>
    `,
  }),
}

// 自定义标题
export const CustomTitle: Story = {
  args: {},
  render: () => ({
    components: { JvMenuGroup, JvMenuItem },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvMenuGroup>
          <template #title>
            <span style="display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
              文件操作
            </span>
          </template>
          <JvMenuItem title="新建文件" />
          <JvMenuItem title="打开文件" />
          <JvMenuItem title="保存" />
        </JvMenuGroup>
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  args: {
    title: '禁用分组',
    disabled: true,
  },
  render: args => ({
    components: { JvMenuGroup, JvMenuItem },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvMenuGroup v-bind="args">
          <JvMenuItem title="菜单项1" />
          <JvMenuItem title="菜单项2" />
          <JvMenuItem title="菜单项3" />
        </JvMenuGroup>
      </div>
    `,
  }),
}

// 多个分组
export const MultipleGroups: Story = {
  render: () => ({
    components: { JvMenuGroup, JvMenuItem },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvMenuGroup title="文件操作">
          <JvMenuItem title="新建" />
          <JvMenuItem title="打开" />
          <JvMenuItem title="保存" />
        </JvMenuGroup>
        
        <hr style="margin: 8px 0; border: none; border-top: 1px solid #eee;" />
        
        <JvMenuGroup title="编辑操作">
          <JvMenuItem title="剪切" />
          <JvMenuItem title="复制" />
          <JvMenuItem title="粘贴" />
        </JvMenuGroup>
      </div>
    `,
  }),
}
