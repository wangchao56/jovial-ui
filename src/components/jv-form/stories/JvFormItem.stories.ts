import type { Meta, StoryObj } from '@storybook/vue3'
import { reactive } from 'vue'
import JvInput from '../../jv-input'
import JvSelect from '../../jv-select'
import JvSpace from '../../jv-space'
import JvFormItem from '../src/JvFormItem.vue'

type Story = StoryObj<typeof JvFormItem>

// 组件元数据
const meta: Meta<typeof JvFormItem> = {
  title: '数据输入组件/FormItem 表单项',
  component: JvFormItem,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '标签文本',
    },
    prop: {
      control: 'text',
      description: '表单域字段名',
    },
    required: {
      control: 'boolean',
      description: '是否必填',
    },
    rules: {
      control: 'object',
      description: '验证规则',
    },
    labelWidth: {
      control: { type: 'text' },
      description: '标签宽度',
    },
    showMessage: {
      control: 'boolean',
      description: '是否显示校验错误信息',
    },
    errorPosition: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom'],
      description: '错误信息显示位置',
    },
    inline: {
      control: 'boolean',
      description: '是否行内显示',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left', 'right'],
      description: '标签位置',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: '尺寸',
    },
    wrapInput: {
      control: 'boolean',
      description: '是否使用label标签包裹input元素',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    label: '字段名称',
    labelWidth: '100px',
    showMessage: true,
    errorPosition: 'bottom',
    inline: false,
    labelPosition: 'right',
    size: 'medium',
  },
}

export default meta

// 基础表单项
export const 基础表单项: Story = {
  render: args => ({
    components: { JvFormItem, JvInput },
    setup() {
      const formData = reactive({
        name: '',
      })

      return { formData, ...args }
    },
    template: `
      <JvFormItem
        :label="label"
        :prop="prop"
        :required="required"
        :label-width="labelWidth"
        :show-message="showMessage"
        :error-position="errorPosition"
        :inline="inline"
        :label-position="labelPosition"
        :size="size"
      >
        <JvInput v-model="formData.name" placeholder="请输入内容" />
      </JvFormItem>
    `,
  }),
}

// 不同标签位置
export const 不同标签位置: Story = {
  render: args => ({
    components: { JvFormItem, JvInput, JvSpace },
    setup() {
      const formData = reactive({
        field1: '',
        field2: '',
        field3: '',
      })

      const positions = ['left', 'right', 'top']

      return { formData, positions, ...args }
    },
    template: `
      <div>
        <div v-for="position in positions" :key="position" style="margin-bottom: 20px">
          <h3>{{ position }} 位置</h3>
          <JvFormItem
            :label="label"
            :label-position="position"
            :label-width="labelWidth"
          >
            <JvInput :placeholder="'标签位置: ' + position" />
          </JvFormItem>
        </div>
      </div>
    `,
  }),
}

// 不同尺寸
export const 不同尺寸: Story = {
  render: args => ({
    components: { JvFormItem, JvInput, JvSpace },
    setup() {
      const sizes = ['small', 'medium', 'large', 'xlarge']

      return { sizes, ...args }
    },
    template: `
      <div>
        <div v-for="size in sizes" :key="size" style="margin-bottom: 20px">
          <h3>{{ size }} 尺寸</h3>
          <JvFormItem
            :label="label"
            :size="size"
            :label-width="labelWidth"
          >
            <JvInput :placeholder="'尺寸: ' + size" :size="size" />
          </JvFormItem>
        </div>
      </div>
    `,
  }),
}

// 错误状态
export const 错误状态: Story = {
  render: args => ({
    components: { JvFormItem, JvInput, JvSpace },
    setup() {
      const formData = reactive({
        name: '',
      })

      const errorPositions = ['top', 'right', 'bottom']

      return { formData, errorPositions, ...args }
    },
    template: `
      <div>
        <div v-for="position in errorPositions" :key="position" style="margin-bottom: 30px">
          <h3>错误信息位置: {{ position }}</h3>
          <JvFormItem
            label="用户名"
            :error-position="position"
            :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
          >
            <JvInput v-model="formData.name" placeholder="请输入用户名" />
          </JvFormItem>
        </div>
      </div>
    `,
  }),
}

// 行内表单项
export const 行内表单项: Story = {
  render: args => ({
    components: { JvFormItem, JvInput, JvSelect },
    setup() {
      const formData = reactive({
        name: '',
        region: '',
      })

      const options = [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
      ]

      return { formData, options, ...args }
    },
    template: `
      <div>
        <JvFormItem
          label="姓名"
          inline
          label-width="80px"
        >
          <JvInput v-model="formData.name" placeholder="请输入姓名" style="width: 200px" />
        </JvFormItem>
        
        <JvFormItem
          label="地区"
          inline
          label-width="80px"
        >
          <JvSelect v-model="formData.region" :options="options" placeholder="请选择地区" style="width: 200px" />
        </JvFormItem>
      </div>
    `,
  }),
}

// 标签关联方式
export const 标签关联方式: Story = {
  render: args => ({
    components: { JvFormItem, JvInput, JvSpace },
    setup() {
      const formData = reactive({
        name1: '',
        name2: '',
      })

      return { formData, ...args }
    },
    template: `
      <div>
        <h3>默认方式（label包裹input）</h3>
        <JvFormItem
          label="用户名"
          labelWidth="120px"
        >
          <JvInput v-model="formData.name1" placeholder="请输入用户名" />
        </JvFormItem>
        
        <h3>显式关联方式（使用for/id）</h3>
        <JvFormItem
          label="用户名"
          labelWidth="120px"
          :wrapInput="false"
        >
          <JvInput v-model="formData.name2" placeholder="请输入用户名" />
        </JvFormItem>
        
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          默认情况下，表单项使用label标签包裹input元素（隐式关联），无需显式设置for和id属性。<br>
          当wrapInput设置为false时，使用for和id关联label和input（显式关联）。
        </p>
      </div>
    `,
  }),
}
