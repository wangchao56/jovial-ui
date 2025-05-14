import type { Meta, StoryObj } from '@storybook/vue3'
import JvImage from '../src/JvImage.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '数据展示组件/Image 图片',
  component: JvImage,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '图片源',
    },
    alt: {
      control: 'text',
      description: '图片替代文本',
    },
    width: {
      control: 'text',
      description: '图片宽度',
    },
    height: {
      control: 'text',
      description: '图片高度',
    },
    aspectRatio: {
      control: 'text',
      description: '图片宽高比',
    },
    fit: {
      control: { type: 'select' },
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      description: '图片适应方式',
    },
    lazy: {
      control: 'boolean',
      description: '是否懒加载',
    },
    loadingImg: {
      control: 'text',
      description: '加载中显示的图片',
    },
    errorImg: {
      control: 'text',
      description: '加载失败显示的图片',
    },
    rounded: {
      control: 'text',
      description: '圆角大小',
    },
    borderStyle: {
      control: 'text',
      description: '边框样式',
    },
  },
  args: {
    src: 'https://picsum.photos/200/300',
    alt: '示例图片',
    width: '200px',
    height: '200px',
    fit: 'cover',
    lazy: false,
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvImage>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Default: Story = {
  render: args => ({
    components: { JvImage },
    setup() {
      return { args }
    },
    template: `<JvImage v-bind="args" />`,
  }),
}

// 适应模式
export const FitModes: Story = {
  render: () => ({
    components: { JvImage },
    setup() {
      const modes = ['fill', 'contain', 'cover', 'none', 'scale-down']
      return { modes }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <div v-for="mode in modes" :key="mode" style="text-align: center;">
          <JvImage 
            src="https://picsum.photos/300/200" 
            :fit="mode" 
            width="200px" 
            height="150px" 
            style="border: 1px solid #ccc;"
          />
          <div style="margin-top: 8px;">{{ mode }}</div>
        </div>
      </div>
    `,
  }),
}

// 宽高比示例
export const AspectRatio: Story = {
  render: () => ({
    components: { JvImage },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3>16:9 宽高比</h3>
          <JvImage 
            src="https://picsum.photos/800/450" 
            width="100%" 
            aspectRatio="16/9" 
            style="max-width: 500px;"
          />
        </div>
        <div>
          <h3>4:3 宽高比</h3>
          <JvImage 
            src="https://picsum.photos/800/600" 
            width="100%" 
            aspectRatio="4/3" 
            style="max-width: 500px;"
          />
        </div>
        <div>
          <h3>1:1 宽高比</h3>
          <JvImage 
            src="https://picsum.photos/500/500" 
            width="100%" 
            aspectRatio="1/1" 
            style="max-width: 500px;"
          />
        </div>
      </div>
    `,
  }),
}

// 圆形图片
export const RoundedImage: Story = {
  render: () => ({
    components: { JvImage },
    template: `
      <div style="display: flex; gap: 16px;">
        <JvImage 
          src="https://picsum.photos/200/200" 
          width="100px" 
          height="100px" 
          round 
        />
        <JvImage 
          src="https://picsum.photos/200/200" 
          width="100px" 
          height="100px" 
          radius="10px" 
        />
      </div>
    `,
  }),
}

// 加载失败
export const Error: Story = {
  render: () => ({
    components: { JvImage },
    template: `
      <div style="display: flex; gap: 16px;">
        <JvImage 
          src="https://invalid-url.jpg" 
          width="200px" 
          height="200px" 
        />
        <JvImage 
          src="https://invalid-url.jpg" 
          width="200px" 
          height="200px" 
          errorImg="https://picsum.photos/100/100"
        />
      </div>
    `,
  }),
}

// 自定义插槽
export const CustomSlots: Story = {
  render: () => ({
    components: { JvImage },
    template: `
      <div style="display: flex; gap: 16px;">
        <JvImage 
          src="https://picsum.photos/200/200" 
          width="200px" 
          height="200px" 
        >
          <template #overlay>
            <div style="background: rgba(0,0,0,0.5); color: white; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
              覆盖层内容
            </div>
          </template>
        </JvImage>
        
        <JvImage 
          src="https://invalid-url.jpg" 
          width="200px" 
          height="200px" 
        >
          <template #error>
            <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: red;">
              图片加载失败
            </div>
          </template>
        </JvImage>
      </div>
    `,
  }),
}
