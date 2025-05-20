import type { Meta, StoryObj } from '@storybook/vue3'
import type { JvTagItemProps } from '../src/group'
import JvFlex from '@components/jv-flex/src/JvFlex.vue'
import JvTag from '@components/jv-tag/src/JvTag.vue'
import JvTagGroup from '@components/jv-tag/src/JvTagGroup.vue'
import { ref } from 'vue'

const colorTypeOptions = ['primary', 'success', 'warning', 'error', 'info']
const variantOptions = ['filled', 'outlined', 'tonal']
const sizeOptions = ['small', 'medium', 'large']
const shapeOptions = ['square', 'rounded', 'pill']

const meta: Meta<typeof JvTag> = {
  title: '数据展示组件/Tag 标签',
  component: JvTag,
  subcomponents: { JvTagGroup },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: colorTypeOptions,
      defaultValue: 'primary',
    },
    size: { control: 'select', options: sizeOptions, defaultValue: 'medium' },
    closable: { control: 'boolean', defaultValue: false },
    variant: {
      control: 'select',
      options: variantOptions,
      defaultValue: 'filled',
    },
    shape: { control: 'select', options: shapeOptions, defaultValue: 'square' },
  },
  args: {
    type: 'primary',
    size: 'medium',
    shape: 'square',
    variant: 'tonal',
  },
}

export default meta

type Story = StoryObj<typeof JvTag>

export const Basic: Story = {
  args: {
    label: 'Tag Label',
  },
  render: args => ({
    components: { JvTag },
    setup() {
      return { args }
    },
    template: `
    <JvFlex :gap="12">
    <JvTag label="基础标签" />
<JvTag type="primary" label="主要标签" />
<JvTag type="success" label="成功标签" />
<JvTag type="warning" label="警告标签" />
<JvTag type="error" label="错误标签" />
</JvFlex>
 
    </JvFlex>
  `,
  }),
}

export const Closable: Story = {
  args: {
    closable: true,
  },
  render: args => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, variantOptions }
    },
    template: `
        <JvFlex :gap="12">
          <JvTag  v-for="variant in variantOptions" v-bind="args"  type="primary" :variant="variant">{{variant}}</JvTag>
        </JvFlex>
    `,
  }),
}

export const Variants: Story = {
  render: args => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, variantOptions }
    },
    template: `
        <JvFlex :gap="12">
          <JvTag  v-for="variant in variantOptions"  type="primary" :variant="variant">{{variant}}</JvTag>
        </JvFlex>
    `,
  }),
}

export const DifferentTypes: Story = {
  args: {
    variant: 'filled',
  },
  render: args => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, colorTypeOptions }
    },
    template: `
          <JvFlex :gap="12">
            <JvTag  v-for="type in colorTypeOptions"  :type="type" >{{type}}</JvTag>
          </JvFlex>
      `,
  }),
}

export const Shape: Story = {
  render: args => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, shapeOptions }
    },
    template: `
        <JvFlex :gap="12">
          <JvTag  v-for="shape in shapeOptions"  :shape="shape" >{{shape}}</JvTag>
        </JvFlex>
    `,
  }),
}

export const Size: Story = {
  args: {
    closable: false,
  },
  render: args => ({
    components: { JvTag, JvFlex },
    setup() {
      return { args, sizeOptions }
    },
    template: `
        <JvFlex :gap="12"> 
     <JvTag size="small" label="小型标签" />
<JvTag size="medium" label="中型标签" />
<JvTag size="large" label="大型标签" />
        </JvFlex>
    `,
  }),
}

/**
 * 使用前置图标
 */

export const PrependIcon: Story = {
  args: {
    prependIcon: 'mdi:bookmark-plus',
    label: '标签',
    type: 'info',
  },
  render: args => ({
    components: { JvTag },
    setup() {
      return { args }
    },
    template: `
       <JvTag v-bind="args" ></JvTag>
    `,
  }),
}

export const GroupUsage: Story = {
  render: args => ({
    components: { JvTagGroup },
    setup() {
      const tags = ref<JvTagItemProps[]>([
        { id: 1, props: { label: '标签1', type: 'primary' } },
        { id: 2, props: { label: '标签2', type: 'success' } },
        { id: 3, props: { label: '标签3', type: 'warning' } },
        { id: 4, props: { label: '标签4', type: 'error' } },
        { id: 5, props: { label: '标签5', type: 'info' } },
      ])

      return { args, tags }
    },
    template: `
        <JvTagGroup v-bind="args" :tags="tags" />
      `,
  }),
  storyName: '组合使用',
}

export const Collapsible: Story = {
  render: args => ({
    components: { JvTagGroup },
    setup() {
      const tags = ref<JvTagItemProps[]>([
        { id: 1, props: { label: '标签1', type: 'primary' } },
        { id: 2, props: { label: '标签2', type: 'success' } },
        { id: 3, props: { label: '标签3', type: 'warning' } },
        { id: 4, props: { label: '标签4', type: 'error' } },
        { id: 5, props: { label: '标签5', type: 'info' } },
        { id: 6, props: { label: '标签6', type: 'primary' } },
        { id: 7, props: { label: '标签7', type: 'success' } },
      ])

      return { args, tags }
    },
    template: `
        <JvTagGroup v-bind="args" :tags="tags" />
      `,
  }),
}

export const Addable: Story = {
  args: {
    closable: true,
  },
  render: args => ({
    components: { JvTagGroup },
    setup() {
      const tags = ref<JvTagItemProps[]>([
        { id: 1, props: { label: '标签1', type: 'primary' } },
        { id: 2, props: { label: '标签2', type: 'success' } },
      ])

      function handleAdd() {
        const id = Date.now()
        tags.value.push({
          id,
          props: { label: `标签${id % 100}`, type: 'primary' },
        })
      }

      return { args, tags, handleAdd }
    },
    template: `
        <JvTagGroup 
          v-bind="args" 
          :tags="tags"
          @add="handleAdd"
        />
      `,
  }),
}

export const Test: Story = {
  render: args => ({
    components: { JvTag },
    setup() {
      return { args }
    },
    template: `   <JvFlex :gap="12">
   <JvTag prependIcon="$info" label="带图标标签" />
<JvTag>
  <template #prepend>
    <JvIcon name="$star" />
  </template>
  自定义图标标签
</JvTag>`,
  }),
}
