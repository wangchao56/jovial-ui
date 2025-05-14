import type { Meta, StoryObj } from '@storybook/vue3'
import JvMenuItem from '../src/JvMenuItem.vue'
import JvSubMenu from '../src/JvSubMenu.vue'

const meta: Meta<typeof JvSubMenu> = {
  title: '导航组件/Menu/SubMenu 子菜单',
  component: JvSubMenu,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '子菜单标题',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用子菜单',
    },
    expanded: {
      control: 'boolean',
      description: '是否展开子菜单',
    },
    icon: {
      control: 'text',
      description: '子菜单图标',
    },
    showArrow: {
      control: 'boolean',
      description: '是否显示箭头',
    },
    lazy: {
      control: 'boolean',
      description: '是否懒加载子菜单内容',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvSubMenu>

// 基础子菜单
export const Basic: Story = {
  args: {
    title: '基础子菜单',
    expanded: false,
  },
  render: args => ({
    components: { JvSubMenu, JvMenuItem },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvSubMenu v-bind="args">
          <JvMenuItem title="子菜单项1" />
          <JvMenuItem title="子菜单项2" />
          <JvMenuItem title="子菜单项3" />
        </JvSubMenu>
      </div>
    `,
  }),
}

// 带图标的子菜单
export const WithIcon: Story = {
  args: {
    title: '带图标的子菜单',
    icon: 'settings',
    expanded: false,
  },
  render: args => ({
    components: { JvSubMenu, JvMenuItem },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvSubMenu v-bind="args">
          <JvMenuItem title="子菜单项1" />
          <JvMenuItem title="子菜单项2" />
          <JvMenuItem title="子菜单项3" />
        </JvSubMenu>
      </div>
    `,
  }),
}

// 默认展开
export const DefaultExpanded: Story = {
  args: {
    title: '默认展开子菜单',
    expanded: true,
  },
  render: args => ({
    components: { JvSubMenu, JvMenuItem },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvSubMenu v-bind="args">
          <JvMenuItem title="子菜单项1" />
          <JvMenuItem title="子菜单项2" />
          <JvMenuItem title="子菜单项3" />
        </JvSubMenu>
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  args: {
    title: '禁用子菜单',
    disabled: true,
  },
  render: args => ({
    components: { JvSubMenu, JvMenuItem },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvSubMenu v-bind="args">
          <JvMenuItem title="子菜单项1" />
          <JvMenuItem title="子菜单项2" />
          <JvMenuItem title="子菜单项3" />
        </JvSubMenu>
      </div>
    `,
  }),
}

// 嵌套子菜单
export const NestedSubMenu: Story = {
  render: () => ({
    components: { JvSubMenu, JvMenuItem },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvSubMenu title="一级菜单" :expanded="true">
          <JvMenuItem title="菜单项1" />
          <JvMenuItem title="菜单项2" />
          <JvSubMenu title="二级菜单">
            <JvMenuItem title="子菜单项1" />
            <JvMenuItem title="子菜单项2" />
            <JvSubMenu title="三级菜单">
              <JvMenuItem title="深层菜单项1" />
              <JvMenuItem title="深层菜单项2" />
            </JvSubMenu>
          </JvSubMenu>
        </JvSubMenu>
      </div>
    `,
  }),
}

// 自定义标题
export const CustomTitle: Story = {
  render: () => ({
    components: { JvSubMenu, JvMenuItem },
    template: `
      <div style="width: 200px; border: 1px solid #eee; border-radius: 4px; padding: 4px;">
        <JvSubMenu>
          <template #title>
            <span style="display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              高级设置
            </span>
          </template>
          <JvMenuItem title="系统设置" />
          <JvMenuItem title="用户权限" />
          <JvMenuItem title="安全选项" />
        </JvSubMenu>
      </div>
    `,
  }),
}
