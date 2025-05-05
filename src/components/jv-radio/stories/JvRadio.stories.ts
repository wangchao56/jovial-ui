import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvRadio from '../src/JvRadio.vue'
import JvRadioGroup from '../src/JvRadioGroup.vue'

const meta: Meta<typeof JvRadio> = {
  title: '数据录入组件/Radio',
  component: JvRadio,
  subcomponents: { JvRadioGroup },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' }
  },
  args: {
    label: '选项1'
  }
}

export default meta

type Story = StoryObj<typeof JvRadio>

export const Basic: Story = {
  render: (args) => ({
    components: { JvRadio },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <JvRadio v-model="value" v-bind="args" />
      <JvRadio v-model="value" label="选项2" />
      <div style="margin-top: 10px">当前选中: {{ value }}</div>
    `
  })
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Group: Story = {
  render: (args) => ({
    components: { JvRadio, JvRadioGroup },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <JvRadioGroup v-model="value" v-bind="args">
        <JvRadio label="选项1" />
        <JvRadio label="选项2" />
      </JvRadioGroup>
      <div style="margin-top: 10px">当前选中: {{ value }}</div>
    `
  })
}
