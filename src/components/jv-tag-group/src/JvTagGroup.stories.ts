import type { Meta, StoryObj } from '@storybook/vue3'
import type { JvTagItemProps } from './types'
import { ref } from 'vue'
import JvTagGroup from './JvTagGroup.vue'

const meta: Meta<typeof JvTagGroup> = {
  title: '数据展示组件/TagGroup 标签组',
  component: JvTagGroup,
  tags: ['autodocs'],
  argTypes: {
    collapsible: { control: 'boolean' },
    maxCollapse: { control: 'number' },
    closable: { control: 'boolean' },
    addable: { control: 'boolean' }
  },
  args: {
    collapsible: false,
    maxCollapse: 5,
    closable: false,
    addable: false
  }
}

export default meta

type Story = StoryObj<typeof JvTagGroup>

export const Basic: Story = {
  render: (args) => ({
    components: { JvTagGroup },
    setup() {
      const tags = ref<JvTagItemProps[]>([
        { id: 1, props: { content: '标签1', type: 'primary' } },
        { id: 2, props: { content: '标签2', type: 'success' } },
        { id: 3, props: { content: '标签3', type: 'warning' } },
        { id: 4, props: { content: '标签4', type: 'error' } },
        { id: 5, props: { content: '标签5', type: 'info' } }
      ])

      return { args, tags }
    },
    template: `
      <JvTagGroup v-bind="args" :tags="tags" />
    `
  })
}

export const Collapsible: Story = {
  args: {
    collapsible: true,
    maxCollapse: 3
  },
  render: (args) => ({
    components: { JvTagGroup },
    setup() {
      const tags = ref<JvTagItemProps[]>([
        { id: 1, props: { content: '标签1', type: 'primary' } },
        { id: 2, props: { content: '标签2', type: 'success' } },
        { id: 3, props: { content: '标签3', type: 'warning' } },
        { id: 4, props: { content: '标签4', type: 'error' } },
        { id: 5, props: { content: '标签5', type: 'info' } },
        { id: 6, props: { content: '标签6', type: 'primary' } },
        { id: 7, props: { content: '标签7', type: 'success' } }
      ])

      return { args, tags }
    },
    template: `
      <JvTagGroup v-bind="args" :tags="tags" />
    `
  })
}

export const Closable: Story = {
  args: {
    closable: true
  },
  render: (args) => ({
    components: { JvTagGroup },
    setup() {
      const tags = ref<JvTagItemProps[]>([
        { id: 1, props: { content: '标签1', type: 'primary' } },
        { id: 2, props: { content: '标签2', type: 'success' } },
        { id: 3, props: { content: '标签3', type: 'warning' } }
      ])

      function handleClose(tag: JvTagItemProps, index: number) {
        console.warn('关闭标签', tag, index)
      }

      return { args, tags, handleClose }
    },
    template: `
      <JvTagGroup 
        v-bind="args" 
        :tags="tags"
        @close="handleClose" 
      />
    `
  })
}

export const Addable: Story = {
  args: {
    closable: true,
    addable: true
  },
  render: (args) => ({
    components: { JvTagGroup },
    setup() {
      const tags = ref<JvTagItemProps[]>([
        { id: 1, props: { content: '标签1', type: 'primary' } },
        { id: 2, props: { content: '标签2', type: 'success' } }
      ])

      function handleAdd() {
        const id = Date.now()
        tags.value.push({
          id,
          props: { content: `标签${id % 100}`, type: 'primary' }
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
    `
  })
}
