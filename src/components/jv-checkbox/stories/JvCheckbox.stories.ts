import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvCard from '@/components/jv-card'
import JvCheckbox from '@/components/jv-checkbox/src/JvCheckbox.vue'
import { consoleWarn } from '@/utils'
import JvCheckboxGroup from '../src/JvCheckboxGroup.vue'

/**
 * # JvCheckbox 复选框组件
 *
 * JvCheckbox 是一个复选框组件，用于在表单中让用户从一组选项中进行多选或单选操作。它支持单独使用或组合使用，可以通过 v-model 轻松实现数据绑定，并提供了丰富的样式和状态变化。
 *
 * ## 布局结构使用方式
 *
 * JvCheckbox 组件的布局结构主要包含两部分：
 * - 复选框输入区域 (input)：包含实际的复选框元素和视觉指示器
 * - 标签区域 (label)：显示复选框的说明文本
 */
const meta: Meta<typeof JvCheckbox> = {
  title: '数据输入组件/Checkbox 复选框',
  component: JvCheckbox,
  subcomponents: { JvCheckboxGroup },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'text' } },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    value: { control: 'text' },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'xlarge'],
      defaultValue: 'medium',
    },
  },
  args: {
    label: 'Checkbox Label',
    value: 'checkbox-value',
  },
}

export default meta

type Story = StoryObj<typeof JvCheckbox>

// 基础用法
export const Basic: Story = {
  args: {
    label: 'Checkbox Label',
    value: 'checkbox-value',
  },
  render: args => ({
    components: { JvCheckbox },
    setup() {
      const checked = ref('1')
      return { args, checked }
    },
    template: `
      <JvCheckbox v-model="checked" v-bind="args" @checked="onChecked"   true-value="1" false-value="0" />
      <div>当前选中值: {{ checked }}</div>
    `,
    methods: {
      onChecked(isChecked: boolean) {
        consoleWarn(`复选框状态:${isChecked}`)
      },
    },
  }),
}

/**
 * # 禁用状态
 *
 * 通过设置 `disabled` 属性来禁用复选框。
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

/**
 * # 半选状态
 *
 * 通过设置 `indeterminate` 属性来表示半选状态。
 */
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
}

/**
 * # 尺寸变体
 *
 * 提供多种尺寸以适应不同的设计需求。
 */
export const Sizes: Story = {
  render: () => ({
    components: { JvCheckbox },
    setup() {
      const modelValue = ref('')
      return { modelValue }
    },
    template: `
      <div class="space-y-4">
        <div>
          <JvCheckbox 
            v-model="modelValue" 
            label="极小尺寸" 
            value="tiny"
            size="tiny" 
          />
        </div>
        <div>
          <JvCheckbox 
            v-model="modelValue" 
            label="小尺寸" 
            value="small"
            size="small" 
          />
        </div>
        <div>
          <JvCheckbox 
            v-model="modelValue" 
            label="中等尺寸 (默认)" 
            value="medium"
            size="medium" 
          />
        </div>
        <div>
          <JvCheckbox 
            v-model="modelValue" 
            label="大尺寸" 
            value="large"
            size="large" 
          />
        </div>
        <div>
          <JvCheckbox 
            v-model="modelValue" 
            label="超大尺寸" 
            value="xlarge"
            size="xlarge" 
          />
        </div>
        <div>选中值: {{ modelValue }}</div>
      </div>
    `,
  }),
}

/**
 * # 自定义值
 *
 * 通过设置 `true-value` 和 `false-value` 属性来自定义复选框的值。
 */
export const CustomValues: Story = {
  render: () => ({
    components: { JvCheckbox },
    setup() {
      const customValue = ref('inactive')
      return { customValue }
    },
    template: `
      <JvCheckbox 
        v-model="customValue"
        label="自定义值"
        value="checkbox-value"
        :true-value="'active'"
        :false-value="'inactive'"
      />
      <div class="mt-2">当前值: {{ customValue }}</div>
    `,
  }),
}

/**
 * # 复选框组
 *
 * 通过设置 `JvCheckboxGroup` 组件来实现复选框组。
 */
export const CheckboxGroup: Story = {
  render: () => ({
    components: { JvCheckbox, JvCheckboxGroup },
    setup() {
      const modelValue = ref<string[]>([])
      const subTitle = `当前选中值: ${modelValue.value}`
      const checkAll = ref(false)
      const isIndeterminate = ref(false)
      const options = ['option1', 'option2', 'option3']
      const handleAll = () => {
        modelValue.value = modelValue.value.length === options.length ? [] : options
      }
      const handleCheckAllChange = () => {
        isIndeterminate.value = !checkAll.value
      }
      const handleGroupChange = () => {
        const checkedCount = modelValue.value.length
        checkAll.value = checkedCount === options.length
        isIndeterminate.value = checkedCount > 0 && checkedCount < options.length
      }
      return { modelValue, subTitle, options, handleAll, checkAll, isIndeterminate, handleCheckAllChange, handleGroupChange }
    },
    template: `
    <JvCard title="复选框组" :sub-title="subTitle">
    <template #title>
      全选/反选
      <JvCheckbox label="全选" v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange" />
    </template>
    <template #content>
      <JvCheckboxGroup v-model="modelValue" @change="handleGroupChange">
        <JvCheckbox label="选项1" value="option1" />
        <JvCheckbox label="选项2" value="option2" />
        <JvCheckbox label="选项3" value="option3" />
      </JvCheckboxGroup>
      </template>
    </JvCard>
    `,
  }),
}

/**
 * # 复选框组 - 水平布局
 *
 * 通过设置 `direction` 属性为 `horizontal` 来实现水平布局。
 */
export const CheckboxGroupHorizontal: Story = {
  render: () => ({
    components: { JvCheckbox, JvCheckboxGroup, JvCard },
    setup() {
      const modelValue = ref<string[]>([])
      return { modelValue }
    },
    template: `

    <JvCard title="复选框组" sub-title="水平布局">
      <JvCheckboxGroup v-model="modelValue" direction="horizontal">
        <JvCheckbox label="选项1" value="option1" />
        <JvCheckbox label="选项2" value="option2" />
        <JvCheckbox label="选项3" value="option3" />
      </JvCheckboxGroup>
    </JvCard>

    `,
  }),
}
