import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvRadio from '../src/JvRadio.vue'
import JvRadioGroup from '../src/JvRadioGroup.vue'

const meta = {
  title: '数据输入组件/Radio 单选框',
  component: JvRadio,
  subcomponents: { JvRadioGroup },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '绑定值',
    },
    label: {
      control: 'text',
      description: '单选框值',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    name: {
      control: 'text',
      description: '原生name属性',
    },
    color: {
      control: 'color',
      description: '单选框颜色',
    },
    animated: {
      control: 'boolean',
      description: '是否有动画效果',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '尺寸大小',
    },
    bordered: {
      control: 'boolean',
      description: '边框样式',
    },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: '标签位置',
    },
    gap: {
      control: 'text',
      description: '标签与单选框的间距',
    },

  },
  args: {
    label: 'option1',
  },
} satisfies Meta<typeof JvRadio>

export default meta
type Story = StoryObj<typeof meta>

// 基础单选框示例
export const Basic: Story = {
  args: {
    label: 'option1',
  },
  render: args => ({
    components: { JvRadio },
    setup() {
      return { args }
    },
    template: `
      <JvRadio v-bind="args">单选框选项</JvRadio>
    `,
  }),
}

// 不同尺寸
export const Sizes: Story = {
  args: { label: 'sizes-example' },
  render: () => ({
    components: { JvRadio },
    template: `
      <div style="display: flex; align-items: center; gap: 20px;">
        <JvRadio label="small" size="sm">小尺寸</JvRadio>
        <JvRadio label="medium" size="md">中等尺寸</JvRadio>
        <JvRadio label="large" size="lg">大尺寸</JvRadio>
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  args: { label: 'disabled-example' },
  render: () => ({
    components: { JvRadio },
    template: `
      <div style="display: flex; align-items: center; gap: 20px;">
        <JvRadio label="option1" disabled>禁用状态</JvRadio>
        <JvRadio label="option2" disabled modelValue="option2">禁用选中状态</JvRadio>
      </div>
    `,
  }),
}

// 不同颜色
export const Colors: Story = {
  args: { label: 'colors-example' },
  render: () => ({
    components: { JvRadio },
    template: `
      <div style="display: flex; align-items: center; gap: 20px;">
        <JvRadio label="option1" color="#f44336">红色</JvRadio>
        <JvRadio label="option2" color="#4caf50">绿色</JvRadio>
        <JvRadio label="option3" color="#2196f3">蓝色</JvRadio>
        <JvRadio label="option4" color="#ff9800">橙色</JvRadio>
        <JvRadio label="option5" color="#9c27b0">紫色</JvRadio>
      </div>
    `,
  }),
}

// 标签位置
export const LabelPosition: Story = {
  args: { label: 'label-position-example' },
  render: () => ({
    components: { JvRadio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <JvRadio label="right" labelPosition="right">标签在右侧（默认）</JvRadio>
        <JvRadio label="left" labelPosition="left">标签在左侧</JvRadio>
      </div>
    `,
  }),
}

// 边框样式
export const Bordered: Story = {
  args: { label: 'bordered-example' },
  render: () => ({
    components: { JvRadio },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 20px;">
        <JvRadio label="option1" bordered>边框样式</JvRadio>
        <JvRadio label="option2" bordered color="#4caf50">自定义颜色边框</JvRadio>
        <JvRadio label="option3" bordered disabled>禁用边框样式</JvRadio>
      </div>
    `,
  }),
}

// 使用RadioGroup
export const WithRadioGroup: Story = {
  args: { label: 'with-group-example' },
  render: () => ({
    components: { JvRadio, JvRadioGroup },
    setup() {
      const value = ref('option1')
      return {
        value,
      }
    },
    template: `
      <div>
        <p>当前选中值: {{ value }}</p>
        <JvRadioGroup v-model="value" label="基础单选框组">
          <JvRadio label="option1">选项一</JvRadio>
          <JvRadio label="option2">选项二</JvRadio>
          <JvRadio label="option3">选项三</JvRadio>
        </JvRadioGroup>
      </div>
    `,
  }),
}

// 带选项数据的RadioGroup
export const RadioGroupWithOptions: Story = {
  args: { label: 'group-options-example' },
  render: () => ({
    components: { JvRadioGroup },
    data() {
      return {
        value: '',
        options: [
          { label: '选项一', value: 'option1' },
          { label: '选项二', value: 'option2' },
          { label: '选项三', value: 'option3', disabled: true },
          { label: '选项四', value: 'option4' },
        ],
      }
    },
    template: `
      <div>
        <p>当前选中值: {{ value }}</p>
        <JvRadioGroup v-model="value" :options="options" label="使用选项数据"></JvRadioGroup>
      </div>
    `,
  }),
}

// 不同布局方式
export const RadioGroupLayouts: Story = {
  args: { label: 'group-layouts-example' },
  render: () => ({
    components: { JvRadioGroup },
    data() {
      return {
        options: [
          { label: '选项一', value: 'option1' },
          { label: '选项二', value: 'option2' },
          { label: '选项三', value: 'option3' },
          { label: '选项四', value: 'option4' },
        ],
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvRadioGroup :options="options" label="横向排列（默认）"></JvRadioGroup>
        
        <JvRadioGroup :options="options" label="纵向排列" column></JvRadioGroup>
        
        <JvRadioGroup :options="options" label="网格布局 (2列)" :columns="2"></JvRadioGroup>
        
        <JvRadioGroup :options="options" label="响应式布局" :columns="{ xs: 1, sm: 2, md: 4 }"></JvRadioGroup>
        
        <JvRadioGroup :options="options" label="带边框" bordered></JvRadioGroup>
        
        <JvRadioGroup :options="options" label="紧凑模式" compact bordered></JvRadioGroup>
      </div>
    `,
  }),
}

// 模拟远程加载
export const RadioGroupRemote: Story = {
  args: { label: 'remote-loading-example' },
  render: () => ({
    components: { JvRadioGroup },
    data() {
      return {
        value: '',
        loading: false,
      }
    },
    methods: {
      loadOptions() {
        this.loading = true
        // 模拟远程加载
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { label: '远程选项一', value: 'remote1' },
              { label: '远程选项二', value: 'remote2' },
              { label: '远程选项三', value: 'remote3' },
            ])
            this.loading = false
          }, 2000)
        })
      },
    },
    template: `
      <div>
        <p>当前选中值: {{ value }}</p>
        <JvRadioGroup 
          v-model="value" 
          label="远程加载选项" 
          :remote="true"
          :remoteMethod="loadOptions"
          :remoteLoading="loading"
        >
          <template #loading>
            <div style="padding: 20px; text-align: center;">
              正在加载选项数据，请稍候...
            </div>
          </template>
        </JvRadioGroup>
      </div>
    `,
  }),
}
