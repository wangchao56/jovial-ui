import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvTabNav from '../src/JvTabNav.vue'
import JvTabPanel from '../src/JvTabPanel.vue'
import JvTabs from '../src/JvTabs.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof JvTabs> = {
  title: '导航组件/Tabs 标签页',
  component: JvTabs,
  subcomponents: { JvTabNav, JvTabPanel },
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
    items: {
      control: 'object',
      description: '标签数据项数组，用于自动生成标签和面板',
    },
    lazy: {
      control: 'boolean',
      description: '面板是否启用延迟加载',
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
}

export default meta

type Story = StoryObj<typeof JvTabs>

// 基本用法
export const 默认标签页: Story = {
  render: args => ({
    components: { JvTabs, JvTabPanel },
    setup() {
      const activeTab = ref('tab1')
      return { args, activeTab }
    },
    template: `
      <JvTabs v-model="activeTab" v-bind="args">
        <JvTabPanel value="tab1" name="标签1">
          <div class="p-4">这是标签1的内容</div>
        </JvTabPanel>
        <JvTabPanel value="tab2" name="标签2">
          <div class="p-4">这是标签2的内容</div>
        </JvTabPanel>
        <JvTabPanel value="tab3" name="标签3">
          <div class="p-4">这是标签3的内容</div>
        </JvTabPanel>
      </JvTabs>
    `,
  }),
}

// 数据驱动标签页
export const 数据驱动标签页: Story = {
  render: args => ({
    components: { JvTabs },
    setup() {
      const activeTab = ref('tab1')
      const items = [
        { value: 'tab1', label: '标签1', content: '这是标签1的内容' },
        { value: 'tab2', label: '标签2', content: '这是标签2的内容' },
        { value: 'tab3', label: '标签3', content: '这是标签3的内容' },
      ]
      return { args, activeTab, items }
    },
    template: `
      <JvTabs v-model="activeTab" :items="items" v-bind="args" />
    `,
  }),
}

// 垂直标签页
export const 垂直标签页: Story = {
  render: args => ({
    components: { JvTabs, JvTabPanel },
    setup() {
      const activeTab = ref('general')
      return { args, activeTab }
    },
    template: `
      <JvTabs v-model="activeTab" vertical v-bind="args">
        <JvTabPanel value="general" name="常规设置">
          <div class="p-4">
            <h3>常规设置</h3>
            <p>这里是常规设置的选项表单</p>
          </div>
        </JvTabPanel>
        <JvTabPanel value="security" name="安全设置">
          <div class="p-4">
            <h3>安全设置</h3>
            <p>这里是安全设置的选项表单</p>
          </div>
        </JvTabPanel>
        <JvTabPanel value="notifications" name="通知设置">
          <div class="p-4">
            <h3>通知设置</h3>
            <p>这里是通知设置的选项表单</p>
          </div>
        </JvTabPanel>
      </JvTabs>
    `,
  }),
}

// 不同样式变体
export const 不同样式变体: Story = {
  render: args => ({
    components: { JvTabs, JvTabPanel },
    setup() {
      const tab1 = ref('tab1')
      const tab2 = ref('tab1')
      const tab3 = ref('tab1')
      const tab4 = ref('tab1')

      const items = [
        { value: 'tab1', label: '标签1', content: '这是标签1的内容' },
        { value: 'tab2', label: '标签2', content: '这是标签2的内容' },
        { value: 'tab3', label: '标签3', content: '这是标签3的内容' },
      ]

      return { args, tab1, tab2, tab3, tab4, items }
    },
    template: `
      <div>
        <h3 class="mb-2">默认样式</h3>
        <JvTabs v-model="tab1" variant="default" class="mb-8">
          <JvTabPanel v-for="item in items" :key="item.value" :value="item.value" :name="item.label">
            <div class="p-4">{{ item.content }}</div>
          </JvTabPanel>
        </JvTabs>
        
        <h3 class="mb-2">分段式样式</h3>
        <JvTabs v-model="tab2" variant="segmented" class="mb-8">
          <JvTabPanel v-for="item in items" :key="item.value" :value="item.value" :name="item.label">
            <div class="p-4">{{ item.content }}</div>
          </JvTabPanel>
        </JvTabs>
        
        <h3 class="mb-2">胶囊式样式</h3>
        <JvTabs v-model="tab3" variant="pills" class="mb-8">
          <JvTabPanel v-for="item in items" :key="item.value" :value="item.value" :name="item.label">
            <div class="p-4">{{ item.content }}</div>
          </JvTabPanel>
        </JvTabs>
        
        <h3 class="mb-2">下划线式样式</h3>
        <JvTabs v-model="tab4" variant="underline" class="mb-8">
          <JvTabPanel v-for="item in items" :key="item.value" :value="item.value" :name="item.label">
            <div class="p-4">{{ item.content }}</div>
          </JvTabPanel>
        </JvTabs>
      </div>
    `,
  }),
}

// 带图标的标签页
export const 带图标的标签页: Story = {
  render: args => ({
    components: { JvTabs },
    setup() {
      const activeTab = ref('home')
      const tabItems = [
        {
          value: 'home',
          label: '首页',
          icon: 'jv-icon-home',
          content: '欢迎来到首页',
        },
        {
          value: 'profile',
          label: '个人资料',
          icon: 'jv-icon-user',
          content: '这里是您的个人资料信息',
        },
        {
          value: 'messages',
          label: '消息',
          icon: 'jv-icon-message',
          badge: 5,
          content: '您有5条未读消息',
        },
        {
          value: 'settings',
          label: '设置',
          icon: 'jv-icon-settings',
          content: '系统设置选项',
        },
      ]
      return { args, activeTab, tabItems }
    },
    template: `
      <JvTabs v-model="activeTab" :items="tabItems" v-bind="args" />
    `,
  }),
}
