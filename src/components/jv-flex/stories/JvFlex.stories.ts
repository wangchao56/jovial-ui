import type { Meta, StoryObj } from '@storybook/vue3'
import JvFlex from '../src/JvFlex.vue'

// 定义Meta数据
const meta: Meta<typeof JvFlex> = {
  title: '布局组件/Flex 弹性布局',
  component: JvFlex,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: '布局方向',
      defaultValue: 'row'
    },
    justify: {
      control: 'select',
      options: [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'left',
        'right'
      ],
      description: '主轴对齐方式',
      defaultValue: 'start'
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: '交叉轴对齐方式',
      defaultValue: 'start'
    },
    wrap: {
      control: 'boolean',
      description: '是否换行',
      defaultValue: false
    },
    gap: {
      control: 'number',
      description: '元素间距',
      defaultValue: 0
    },
    inline: {
      control: 'boolean',
      description: '是否为行内布局',
      defaultValue: false
    },
    reverse: {
      control: 'boolean',
      description: '是否翻转布局方向',
      defaultValue: false
    },
    contentAlign: {
      control: 'select',
      options: [
        'start',
        'end',
        'center',
        'space-between',
        'space-around',
        'stretch'
      ],
      description: '元素间对齐方式（flex-wrap为wrap时的cross-axis对齐）',
      defaultValue: 'start'
    }
  },
  args: {
    direction: 'row',
    wrap: false,
    gap: 8
  }
}

export default meta
type Story = StoryObj<typeof JvFlex>

// 定义样式，用于演示
const boxStyle = {
  padding: '20px',
  textAlign: 'center',
  background: 'var(--jv-theme-primary)',
  color: 'var(--jv-theme-on-primary)',
  borderRadius: 'var(--jv-rounded)',
  fontWeight: 'bold',
  minWidth: '80px'
}

// 基础用法
export const 基础用法: Story = {
  render: (args) => ({
    components: { JvFlex },
    setup() {
      return { args, boxStyle }
    },
    template: `
      <JvFlex v-bind="args">
        <div v-for="i in 3" :key="i" :style="boxStyle">盒子 {{ i }}</div>
      </JvFlex>
    `
  })
}

// 主轴对齐方式
export const 主轴对齐方式: Story = {
  render: () => ({
    components: { JvFlex },
    setup() {
      const justifyOptions = [
        'start',
        'end',
        'center',
        'left',
        'right',
        'space-between',
        'space-around',
        'space-evenly'
      ]
      return { justifyOptions, boxStyle }
    },
    template: `
      <div>
        <div v-for="justify in justifyOptions" :key="justify" style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-weight: bold;">justify: {{ justify }}</div>
          <JvFlex :justify="justify.replace('space-', '')" :gap="10">
            <div v-for="i in 3" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
      </div>
    `
  })
}

// 交叉轴对齐方式
export const 交叉轴对齐方式: Story = {
  render: (args) => ({
    components: { JvFlex },
    setup() {
      const alignOptions = ['start', 'end', 'center', 'baseline', 'stretch']
      return { alignOptions, boxStyle, args }
    },
    template: `
      <div>
        <div v-for="align in alignOptions" :key="align" style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-weight: bold;">align: {{ align }}</div>
          <JvFlex v-bind="args" :align="align" style="height: 120px; border: 2px dashed var(--jv-theme-warning);">
            <div :style="{ ...boxStyle }">小</div>
            <div :style="{ ...boxStyle }">中</div>
            <div :style="{ ...boxStyle }">大</div>
          </JvFlex>
        </div>
      </div>
    `
  })
}

// 换行与间距
export const 换行与间距: Story = {
  render: () => ({
    components: { JvFlex },
    setup() {
      return { boxStyle }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-weight: bold;">不换行 (wrap: false)</div>
          <JvFlex :gap="10" style="min-height: 80px; border: 1px dashed #ccc; padding: 16px; width: 300px;">
            <div v-for="i in 6" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
        <div>
          <div style="margin-bottom: 8px; font-weight: bold;">换行 (wrap: true)</div>
          <JvFlex :gap="10" :wrap="true" style="min-height: 80px; border: 1px dashed #ccc; padding: 16px; width: 300px;">
            <div v-for="i in 6" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
      </div>
    `
  })
}

// 方向
export const 方向: Story = {
  render: () => ({
    components: { JvFlex },
    setup() {
      return { boxStyle }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-weight: bold;">水平方向 (direction: row)</div>
          <JvFlex direction="row" :gap="10" style="min-height: 80px; border: 1px dashed #ccc; padding: 16px;">
            <div v-for="i in 3" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
        <div>
          <div style="margin-bottom: 8px; font-weight: bold;">垂直方向 (direction: column)</div>
          <JvFlex direction="column" :gap="10" style="min-height: 200px; border: 1px dashed #ccc; padding: 16px;">
            <div v-for="i in 3" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
      </div>
    `
  })
}

// 翻转
export const 翻转方向: Story = {
  render: () => ({
    components: { JvFlex },
    setup() {
      return { boxStyle }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-weight: bold;">水平正序 (direction: row, reverse: false, justify: flex-start)</div>
          <JvFlex direction="row" :gap="10" style="min-height: 80px; border: 1px dashed #ccc; padding: 16px;">
            <div v-for="i in 3" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-weight: bold;">水平倒序 (direction: row, reverse: true, justify: flex-start)</div>
          <JvFlex direction="row" :reverse="true" :gap="10" style="min-height: 80px; border: 1px dashed #ccc; padding: 16px;">
            <div v-for="i in 3" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>

            <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-weight: bold;">水平正序时将justify设置为right(direction: row, reverse: false)</div>
          <JvFlex direction="row" justify="right" :gap="10" style="min-height: 80px; border: 1px dashed #ccc; padding: 16px;">
            <div v-for="i in 3" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-weight: bold;">水平正序时将justify设置为left(direction: row, reverse: true)</div>
          <JvFlex direction="row" justify="left" :gap="10" style="min-height: 80px; border: 1px dashed #ccc; padding: 16px;">
            <div v-for="i in 3" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-weight: bold;">垂直正序 (direction: column, reverse: false)</div>
          <JvFlex direction="column" :gap="10" style="min-height: 200px; border: 1px dashed #ccc; padding: 16px;">
            <div v-for="i in 3" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
        <div>
          <div style="margin-bottom: 8px; font-weight: bold;">垂直倒序 (direction: column, reverse: true)</div>
          <JvFlex direction="column" :reverse="true" :gap="10" style="min-height: 200px; border: 1px dashed #ccc; padding: 16px;">
            <div v-for="i in 3" :key="i" :style="boxStyle">{{ i }}</div>
          </JvFlex>
        </div>
      </div>
    `
  })
}
