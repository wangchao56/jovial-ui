import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvTab from '../src/JvTab.vue'
import JvTabNav from '../src/JvTabNav.vue'
import JvTabPanel from '../src/JvTabPanel.vue'
import JvTabs from '../src/JvTabs.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '导航组件/Tabs 标签页',
  component: JvTabs,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '当前激活的标签值',
    },
    variant: {
      control: 'select',
      options: ['default', 'segmented', 'pills', 'underline'],
      description: '标签样式变体',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: '标签颜色',
    },
    alignTabs: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: '标签对齐方式',
    },
    grow: {
      control: 'boolean',
      description: '标签是否自动增长填充可用空间',
    },
    vertical: {
      control: 'boolean',
      description: '是否垂直排列标签',
    },
    animated: {
      control: 'boolean',
      description: '是否启用切换动画',
    },
  },
  args: {
    variant: 'default',
    color: 'primary',
    alignTabs: 'start',
    grow: false,
    vertical: false,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvTabs>

export default meta

type Story = StoryObj<typeof JvTabs>

// 基本用法
export const Basic: Story = {
  render: args => ({
    components: { JvTabs, JvTabNav, JvTab, JvTabPanel },
    setup() {
      const activeTab = ref('home')
      return { args, activeTab }
    },
    template: `
      <JvTabs v-model="activeTab" v-bind="args">
        <JvTabNav>
          <JvTab value="home">首页</JvTab>
          <JvTab value="profile">个人资料</JvTab>
          <JvTab value="settings">设置</JvTab>
        </JvTabNav>
        
        <JvTabPanel value="home">
          这是首页内容
        </JvTabPanel>
        <JvTabPanel value="profile">
          这是个人资料内容
        </JvTabPanel>
        <JvTabPanel value="settings">
          这是设置内容
        </JvTabPanel>
      </JvTabs>
    `,
  }),
}

// 不同样式变体
export const Variants: Story = {
  render: () => ({
    components: { JvTabs, JvTabNav, JvTab, JvTabPanel },
    setup() {
      const defaultTab = ref('tab1')
      const segmentedTab = ref('tab1')
      const pillsTab = ref('tab1')
      const underlineTab = ref('tab1')
      return { defaultTab, segmentedTab, pillsTab, underlineTab }
    },
    template: `
      <div class="tabs-variants">
        <JvTabs v-model="defaultTab" variant="default">
          <JvTabNav>
            <JvTab value="tab1">默认风格</JvTab>
            <JvTab value="tab2">标签二</JvTab>
          </JvTabNav>
          <JvTabPanel value="tab1">默认风格内容</JvTabPanel>
          <JvTabPanel value="tab2">标签二内容</JvTabPanel>
        </JvTabs>
        
        <JvTabs v-model="segmentedTab" variant="segmented">
          <JvTabNav>
            <JvTab value="tab1">分段风格</JvTab>
            <JvTab value="tab2">标签二</JvTab>
          </JvTabNav>
          <JvTabPanel value="tab1">分段风格内容</JvTabPanel>
          <JvTabPanel value="tab2">标签二内容</JvTabPanel>
        </JvTabs>
        
        <JvTabs v-model="pillsTab" variant="pills">
          <JvTabNav>
            <JvTab value="tab1">胶囊风格</JvTab>
            <JvTab value="tab2">标签二</JvTab>
          </JvTabNav>
          <JvTabPanel value="tab1">胶囊风格内容</JvTabPanel>
          <JvTabPanel value="tab2">标签二内容</JvTabPanel>
        </JvTabs>
        
        <JvTabs v-model="underlineTab" variant="underline">
          <JvTabNav>
            <JvTab value="tab1">下划线风格</JvTab>
            <JvTab value="tab2">标签二</JvTab>
          </JvTabNav>
          <JvTabPanel value="tab1">下划线风格内容</JvTabPanel>
          <JvTabPanel value="tab2">标签二内容</JvTabPanel>
        </JvTabs>
      </div>
    `,
    styles: `
      .tabs-variants {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
    `,
  }),
}

// 垂直布局
export const Vertical: Story = {
  render: () => ({
    components: { JvTabs, JvTabNav, JvTab, JvTabPanel },
    setup() {
      const activeTab = ref('tab1')
      return { activeTab }
    },
    template: `
      <JvTabs v-model="activeTab" vertical>
        <div style="display: flex; width: 100%;">
          <JvTabNav>
            <JvTab value="tab1">标签一</JvTab>
            <JvTab value="tab2">标签二</JvTab>
            <JvTab value="tab3">标签三</JvTab>
          </JvTabNav>
          
          <div style="margin-left: 20px; flex: 1;">
            <JvTabPanel value="tab1">标签一内容</JvTabPanel>
            <JvTabPanel value="tab2">标签二内容</JvTabPanel>
            <JvTabPanel value="tab3">标签三内容</JvTabPanel>
          </div>
        </div>
      </JvTabs>
    `,
  }),
}

// 禁用标签
export const DisabledTab: Story = {
  render: () => ({
    components: { JvTabs, JvTabNav, JvTab, JvTabPanel },
    setup() {
      const activeTab = ref('tab1')
      return { activeTab }
    },
    template: `
      <JvTabs v-model="activeTab">
        <JvTabNav>
          <JvTab value="tab1">标签一</JvTab>
          <JvTab value="tab2" disabled>禁用标签</JvTab>
          <JvTab value="tab3">标签三</JvTab>
        </JvTabNav>
        
        <JvTabPanel value="tab1">标签一内容</JvTabPanel>
        <JvTabPanel value="tab2">禁用标签内容</JvTabPanel>
        <JvTabPanel value="tab3">标签三内容</JvTabPanel>
      </JvTabs>
    `,
  }),
}

// 使用数据生成标签
export const DataDriven: Story = {
  render: () => ({
    components: { JvTabs, JvTabNav, JvTabPanel },
    setup() {
      const activeTab = ref('home')
      const tabItems = [
        { value: 'home', label: '首页', icon: '$home' },
        { value: 'profile', label: '个人资料', icon: '$user' },
        { value: 'settings', label: '设置', icon: '$settings', disabled: true },
        { value: 'messages', label: '消息', badge: 5 },
      ]
      return { activeTab, tabItems }
    },
    template: `
      <JvTabs v-model="activeTab">
        <JvTabNav :items="tabItems" />
        
        <JvTabPanel value="home">
          这是首页内容
        </JvTabPanel>
        <JvTabPanel value="profile">
          这是个人资料内容
        </JvTabPanel>
        <JvTabPanel value="settings">
          这是设置内容（禁用标签）
        </JvTabPanel>
        <JvTabPanel value="messages">
          这是消息内容
        </JvTabPanel>
      </JvTabs>
    `,
  }),
}

// 完全数据驱动
export const FullyDataDriven: Story = {
  render: () => ({
    components: { JvTabs },
    setup() {
      const activeTab = ref('home')
      const tabItems = [
        {
          value: 'home',
          label: '首页',
          icon: '$home',
          content: '这是首页内容，完全由数据生成',
        },
        {
          value: 'profile',
          label: '个人资料',
          icon: '$user',
          content: '这是个人资料内容，完全由数据生成',
        },
        {
          value: 'settings',
          label: '设置',
          icon: '$settings',
          disabled: true,
          content: '这是设置内容，完全由数据生成（禁用标签）',
        },
        {
          value: 'messages',
          label: '消息',
          badge: 5,
          content: '这是消息内容，完全由数据生成，带有徽标',
        },
      ]
      return { activeTab, tabItems }
    },
    template: `
      <JvTabs v-model="activeTab" :items="tabItems" />
    `,
  }),
}
