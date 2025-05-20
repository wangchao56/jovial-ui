import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvCheckbox from '@/components/jv-checkbox/src/JvCheckbox.vue'
import JvCheckboxGroup from '@/components/jv-checkbox/src/JvCheckboxGroup.vue'

/**
 * # JvCheckboxGroup 复选框组组件
 *
 * ## 1. 组件介绍
 *
 * JvCheckboxGroup 是一个复选框组容器，用于管理一组相关联的复选框。它提供了统一的数据管理、布局控制和最大选择数量限制等功能。
 *
 * ## 2. 布局结构使用方式
 *
 * JvCheckboxGroup 组件提供了两种布局方式：
 * - 水平布局（默认）：复选框在一行中排列
 * - 垂直布局：复选框垂直排列
 *
 * ## 3. 交互设计
 *
 * - 数据管理：使用 v-model 双向绑定选中的值数组
 * - 最大选择数量：通过 max 属性限制最多可选中的项目数
 * - 整组禁用：通过 disabled 属性禁用整个复选框组
 * - 统一尺寸：通过 size 属性设置组内所有复选框的尺寸
 */
const meta: Meta<typeof JvCheckboxGroup> = {
  title: '数据输入组件/CheckboxGroup 复选框组',
  component: JvCheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'object' } },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'xlarge'],
      defaultValue: 'medium',
    },
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    max: { control: 'number' },
    gap: { control: 'number' },
  },
  args: {
    disabled: false,
    size: 'medium',
    direction: 'horizontal',
    gap: 12,
  },
}

export default meta

type Story = StoryObj<typeof JvCheckboxGroup>

/**
 * # 基础用法
 *
 * 使用 v-model 绑定选中值数组，并在组内放置多个 JvCheckbox。
 */
export const Basic: Story = {
  render: args => ({
    components: { JvCheckboxGroup, JvCheckbox },
    setup() {
      const selected = ref(['选项1'])
      return { args, selected }
    },
    template: `
      <div>
        <JvCheckboxGroup v-model="selected" v-bind="args">
          <JvCheckbox label="选项1">选项1</JvCheckbox>
          <JvCheckbox label="选项2">选项2</JvCheckbox>
          <JvCheckbox label="选项3">选项3</JvCheckbox>
        </JvCheckboxGroup>
        <div class="mt-4">已选中: {{ selected }}</div>
      </div>
    `,
  }),
}

/**
 * # 垂直布局
 *
 * 通过设置 `direction="vertical"` 实现垂直方向排列。
 */
export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  render: args => ({
    components: { JvCheckboxGroup, JvCheckbox },
    setup() {
      const selected = ref(['选项1'])
      return { args, selected }
    },
    template: `
      <div>
        <JvCheckboxGroup v-model="selected" v-bind="args">
          <JvCheckbox label="选项1">选项1</JvCheckbox>
          <JvCheckbox label="选项2">选项2</JvCheckbox>
          <JvCheckbox label="选项3">选项3</JvCheckbox>
        </JvCheckboxGroup>
        <div class="mt-4">已选中: {{ selected }}</div>
      </div>
    `,
  }),
}

/**
 * # 禁用状态
 *
 * 通过设置 `disabled` 禁用整个复选框组。
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => ({
    components: { JvCheckboxGroup, JvCheckbox },
    setup() {
      const selected = ref(['选项1'])
      return { args, selected }
    },
    template: `
      <JvCheckboxGroup v-model="selected" v-bind="args">
        <JvCheckbox label="选项1">选项1</JvCheckbox>
        <JvCheckbox label="选项2">选项2</JvCheckbox>
        <JvCheckbox label="选项3">选项3</JvCheckbox>
      </JvCheckboxGroup>
    `,
  }),
}

/**
 * # 自定义尺寸
 *
 * 通过 `size` 属性设置复选框组内所有复选框的尺寸。
 */
export const Sizes: Story = {
  render: () => ({
    components: { JvCheckboxGroup, JvCheckbox },
    setup() {
      const tinySelected = ref(['A'])
      const smallSelected = ref(['A'])
      const mediumSelected = ref(['A'])
      const largeSelected = ref(['A'])
      const xlargeSelected = ref(['A'])

      return { tinySelected, smallSelected, mediumSelected, largeSelected, xlargeSelected }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="mb-2">极小尺寸</h3>
          <JvCheckboxGroup v-model="tinySelected" size="tiny">
            <JvCheckbox label="A">选项A</JvCheckbox>
            <JvCheckbox label="B">选项B</JvCheckbox>
            <JvCheckbox label="C">选项C</JvCheckbox>
          </JvCheckboxGroup>
        </div>
        
        <div>
          <h3 class="mb-2">小尺寸</h3>
          <JvCheckboxGroup v-model="smallSelected" size="small">
            <JvCheckbox label="A">选项A</JvCheckbox>
            <JvCheckbox label="B">选项B</JvCheckbox>
            <JvCheckbox label="C">选项C</JvCheckbox>
          </JvCheckboxGroup>
        </div>
        
        <div>
          <h3 class="mb-2">中等尺寸 (默认)</h3>
          <JvCheckboxGroup v-model="mediumSelected" size="medium">
            <JvCheckbox label="A">选项A</JvCheckbox>
            <JvCheckbox label="B">选项B</JvCheckbox>
            <JvCheckbox label="C">选项C</JvCheckbox>
          </JvCheckboxGroup>
        </div>
        
        <div>
          <h3 class="mb-2">大尺寸</h3>
          <JvCheckboxGroup v-model="largeSelected" size="large">
            <JvCheckbox label="A">选项A</JvCheckbox>
            <JvCheckbox label="B">选项B</JvCheckbox>
            <JvCheckbox label="C">选项C</JvCheckbox>
          </JvCheckboxGroup>
        </div>
        
        <div>
          <h3 class="mb-2">超大尺寸</h3>
          <JvCheckboxGroup v-model="xlargeSelected" size="xlarge">
            <JvCheckbox label="A">选项A</JvCheckbox>
            <JvCheckbox label="B">选项B</JvCheckbox>
            <JvCheckbox label="C">选项C</JvCheckbox>
          </JvCheckboxGroup>
        </div>
      </div>
    `,
  }),
}

/**
 * # 最大选择数量
 *
 * 通过 `max` 属性限制最大可选择的复选框数量。
 */
export const MaxLimit: Story = {
  args: {
    max: 2,
  },
  render: args => ({
    components: { JvCheckboxGroup, JvCheckbox },
    setup() {
      const selected = ref([])
      return { args, selected }
    },
    template: `
      <div>
        <JvCheckboxGroup v-model="selected" v-bind="args">
          <JvCheckbox label="选项1">选项1</JvCheckbox>
          <JvCheckbox label="选项2">选项2</JvCheckbox>
          <JvCheckbox label="选项3">选项3</JvCheckbox>
          <JvCheckbox label="选项4">选项4</JvCheckbox>
        </JvCheckboxGroup>
        <div class="mt-4">已选中: {{ selected }}</div>
        <div class="mt-2 text-red-500" v-if="selected.length >= args.max">
          已达到最大选择数量: {{ args.max }}
        </div>
      </div>
    `,
  }),
}

/**
 * # 自定义间距
 *
 * 通过 `gap` 属性设置复选框之间的间距。
 */
export const CustomGap: Story = {
  args: {
    gap: 24,
  },
  render: args => ({
    components: { JvCheckboxGroup, JvCheckbox },
    setup() {
      const selected = ref(['选项1'])
      return { args, selected }
    },
    template: `
      <JvCheckboxGroup v-model="selected" v-bind="args">
        <JvCheckbox label="选项1">选项1</JvCheckbox>
        <JvCheckbox label="选项2">选项2</JvCheckbox>
        <JvCheckbox label="选项3">选项3</JvCheckbox>
      </JvCheckboxGroup>
    `,
  }),
}
