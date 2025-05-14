import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvMenu from '../src/JvMenu.vue'
import JvMenuDivider from '../src/JvMenuDivider.vue'
import JvMenuGroup from '../src/JvMenuGroup.vue'
import JvMenuItem from '../src/JvMenuItem.vue'
import JvSubMenu from '../src/JvSubMenu.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof JvMenu> = {
  title: '导航组件/Menu/Menu 菜单',
  component: JvMenu,
  subcomponents: {
    JvSubMenu,
    JvMenuItem,
    JvMenuGroup,
    JvMenuDivider,
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '菜单是否可见',
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: '菜单位置',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'manual'],
      description: '触发方式',
    },
    offset: {
      control: 'number',
      description: '菜单偏移量',
    },
    arrow: {
      control: 'boolean',
      description: '是否显示箭头',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用菜单',
    },
    width: {
      control: 'text',
      description: '菜单宽度',
    },
    maxHeight: {
      control: 'text',
      description: '菜单最大高度',
    },
    zIndex: {
      control: 'number',
      description: 'z-index',
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: '点击外部是否关闭菜单',
    },
    closeOnEsc: {
      control: 'boolean',
      description: '按ESC键是否关闭菜单',
    },
    transition: {
      control: 'text',
      description: '过渡动画名称',
    },
    teleport: {
      control: 'text',
      description: '传送门挂载位置',
    },
  },
  args: {
    modelValue: false,
    placement: 'bottom',
    trigger: 'click',
    offset: 10,
    arrow: true,
    disabled: false,
    width: 'auto',
    maxHeight: '300px',
    zIndex: 2000,
    closeOnClickOutside: true,
    closeOnEsc: true,
    transition: 'jv-menu-transition',
    teleport: 'body',
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 基础菜单
export const Basic: Story = {
  args: {
    modelValue: true,
    placement: 'bottom-start',
    trigger: 'click',
  },
  render: args => ({
    components: { JvMenu, JvMenuItem, JvButton, JvMenuDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <JvMenu v-bind="args">
          <template #default>
            <JvButton>基础菜单</JvButton>
          </template>
          
          <template #content>
            <JvMenuItem title="编辑" />
            <JvMenuItem title="复制" />
            <JvMenuDivider />
            <JvMenuItem title="删除" disabled />
          </template>
        </JvMenu>
      </div>
    `,
  }),
}

// 分组菜单
export const WithGroups: Story = {
  args: {
    modelValue: true,
    placement: 'bottom-start',
    trigger: 'click',
  },
  render: args => ({
    components: { JvMenu, JvMenuItem, JvButton, JvMenuGroup, JvMenuDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <JvMenu v-bind="args">
          <template #default>
            <JvButton>分组菜单</JvButton>
          </template>
          
          <template #content>
            <JvMenuGroup title="文件操作">
              <JvMenuItem title="新建" />
              <JvMenuItem title="打开" />
              <JvMenuItem title="保存" />
            </JvMenuGroup>
            
            <JvMenuDivider />
            
            <JvMenuGroup title="编辑操作">
              <JvMenuItem title="剪切" />
              <JvMenuItem title="复制" />
              <JvMenuItem title="粘贴" />
            </JvMenuGroup>
          </template>
        </JvMenu>
      </div>
    `,
  }),
}

// 子菜单
export const WithSubMenu: Story = {
  args: {
    modelValue: true,
    placement: 'bottom-start',
    trigger: 'click',
  },
  render: args => ({
    components: { JvMenu, JvMenuItem, JvButton, JvSubMenu, JvMenuDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <JvMenu v-bind="args">
          <template #default>
            <JvButton>子菜单</JvButton>
          </template>
          
          <template #content>
            <JvMenuItem title="首页" />
            
            <JvSubMenu title="设置">
              <JvMenuItem title="用户设置" />
              <JvMenuItem title="系统设置" />
              
              <JvSubMenu title="高级设置">
                <JvMenuItem title="网络配置" />
                <JvMenuItem title="安全设置" />
              </JvSubMenu>
            </JvSubMenu>
            
            <JvMenuDivider />
            
            <JvMenuItem title="退出" />
          </template>
        </JvMenu>
      </div>
    `,
  }),
}

// 综合示例
export const ComplexMenu: Story = {
  args: {
    modelValue: true,
    placement: 'bottom-start',
    trigger: 'click',
    width: '220px',
  },
  render: args => ({
    components: { JvMenu, JvMenuItem, JvButton, JvSubMenu, JvMenuGroup, JvMenuDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <JvMenu v-bind="args">
          <template #default>
            <JvButton>综合菜单</JvButton>
          </template>
          
          <template #content>
            <JvMenuGroup title="常用操作">
              <JvMenuItem title="新建文档" />
              <JvMenuItem title="打开文件" />
              <JvMenuItem title="最近文件" />
            </JvMenuGroup>
            
            <JvMenuDivider />
            
            <JvSubMenu title="编辑选项" :expanded="true">
              <JvMenuItem title="撤销" />
              <JvMenuItem title="重做" disabled />
              <JvMenuDivider />
              <JvMenuItem title="剪切" />
              <JvMenuItem title="复制" />
              <JvMenuItem title="粘贴" />
            </JvSubMenu>
            
            <JvMenuDivider />
            
            <JvSubMenu title="视图">
              <JvMenuItem title="缩放" />
              <JvMenuItem title="全屏" />
              <JvSubMenu title="布局选项">
                <JvMenuItem title="水平布局" />
                <JvMenuItem title="垂直布局" />
                <JvMenuItem title="网格布局" />
              </JvSubMenu>
            </JvSubMenu>
            
            <JvMenuDivider />
            
            <JvMenuGroup title="帮助">
              <JvMenuItem title="文档" />
              <JvMenuItem title="关于" />
            </JvMenuGroup>
          </template>
        </JvMenu>
      </div>
    `,
  }),
}

// 不同触发方式
export const DifferentTriggers: Story = {
  render: () => ({
    components: { JvMenu, JvMenuItem, JvButton },
    template: `
      <div style="padding: 100px; display: flex; gap: 20px; justify-content: center;">
        <JvMenu trigger="click">
          <template #default>
            <JvButton>点击触发</JvButton>
          </template>
          
          <template #content>
            <JvMenuItem title="菜单项1" />
            <JvMenuItem title="菜单项2" />
            <JvMenuItem title="菜单项3" />
          </template>
        </JvMenu>
        
        <JvMenu trigger="hover">
          <template #default>
            <JvButton>悬停触发</JvButton>
          </template>
          
          <template #content>
            <JvMenuItem title="菜单项1" />
            <JvMenuItem title="菜单项2" />
            <JvMenuItem title="菜单项3" />
          </template>
        </JvMenu>
        
        <JvMenu trigger="manual" :model-value="true">
          <template #default>
            <JvButton>手动控制</JvButton>
          </template>
          
          <template #content>
            <JvMenuItem title="菜单项1" />
            <JvMenuItem title="菜单项2" />
            <JvMenuItem title="菜单项3" />
          </template>
        </JvMenu>
      </div>
    `,
  }),
}

// 不同位置
export const DifferentPlacements: Story = {
  render: () => ({
    components: { JvMenu, JvMenuItem, JvButton },
    template: `
      <div style="padding: 150px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; justify-content: center;">
        <JvMenu placement="top-start" :model-value="true">
          <template #default>
            <JvButton>上左</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="top-start" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <JvMenu placement="top" :model-value="true">
          <template #default>
            <JvButton>上中</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="top" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <JvMenu placement="top-end" :model-value="true">
          <template #default>
            <JvButton>上右</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="top-end" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <JvMenu placement="left-start" :model-value="true">
          <template #default>
            <JvButton>左上</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="left-start" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <div></div>
        
        <JvMenu placement="right-start" :model-value="true">
          <template #default>
            <JvButton>右上</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="right-start" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <JvMenu placement="left" :model-value="true">
          <template #default>
            <JvButton>左中</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="left" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <div></div>
        
        <JvMenu placement="right" :model-value="true">
          <template #default>
            <JvButton>右中</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="right" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <JvMenu placement="left-end" :model-value="true">
          <template #default>
            <JvButton>左下</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="left-end" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <div></div>
        
        <JvMenu placement="right-end" :model-value="true">
          <template #default>
            <JvButton>右下</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="right-end" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <JvMenu placement="bottom-start" :model-value="true">
          <template #default>
            <JvButton>下左</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="bottom-start" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <JvMenu placement="bottom" :model-value="true">
          <template #default>
            <JvButton>下中</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="bottom" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
        
        <JvMenu placement="bottom-end" :model-value="true">
          <template #default>
            <JvButton>下右</JvButton>
          </template>
          <template #content>
            <JvMenuItem title="bottom-end" />
            <JvMenuItem title="菜单项" />
          </template>
        </JvMenu>
      </div>
    `,
  }),
}
