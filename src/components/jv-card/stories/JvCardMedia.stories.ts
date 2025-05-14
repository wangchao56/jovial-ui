import type { Meta, StoryObj } from '@storybook/vue3'
import { JvCardMedia } from '@components/jv-card'

const meta: Meta<typeof JvCardMedia> = {
  title: '数据展示组件/Card 卡片/JvCardMedia',
  component: JvCardMedia,
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'text' },
    width: { control: 'text' },
    image: { control: 'text' },
    aspectRatio: { control: 'text', defaultValue: '16 / 9' },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      defaultValue: 'cover',
    },
    divider: { control: 'boolean', defaultValue: false },
  },
}

export default meta
type Story = StoryObj<typeof JvCardMedia>

export const BaseImage: Story = {
  args: {
    image: 'https://picsum.photos/400/200',
  },
  render: (args: any) => ({
    components: { JvCardMedia },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <JvCardMedia v-bind="args" />
      </div>
    `,
  }),
}

export const SpecifiedHeight: Story = {
  args: {
    image: 'https://picsum.photos/400/200',
    height: '250px',
  },
  render: (args: any) => ({
    components: { JvCardMedia },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <JvCardMedia v-bind="args" />
      </div>
    `,
  }),
}

export const DifferentAspectRatios: Story = {
  render: () => ({
    components: { JvCardMedia },
    setup() {
      const ratios = [
        { name: '16:9', value: '16 / 9' },
        { name: '4:3', value: '4 / 3' },
        { name: '1:1', value: '1 / 1' },
        { name: '3:4', value: '3 / 4' },
        { name: '9:16', value: '9 / 16' },
      ]
      return { ratios }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 20px;">
        <div v-for="ratio in ratios" :key="ratio.value" style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">宽高比: {{ ratio.name }}</div>
          <JvCardMedia
            image="https://picsum.photos/400/400"
            :aspect-ratio="ratio.value"
          />
        </div>
      </div>
    `,
  }),
}

export const DifferentFillModes: Story = {
  render: () => ({
    components: { JvCardMedia },
    setup() {
      const fitModes = ['cover', 'contain', 'fill', 'none', 'scale-down']
      return { fitModes }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 20px;">
        <div v-for="fit in fitModes" :key="fit" style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">填充模式: {{ fit }}</div>
          <div style="height: 150px; border: 1px dashed #ccc;">
            <JvCardMedia
              image="https://picsum.photos/200/100"
              :object-fit="fit"
              height="150px"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithDivider: Story = {
  args: {
    image: 'https://picsum.photos/400/200',
    divider: true,
  },
  render: (args: any) => ({
    components: { JvCardMedia },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <JvCardMedia v-bind="args" />
        <div style="padding: 16px;">这是分隔线下方的内容</div>
      </div>
    `,
  }),
}

export const UseDefaultSlot: Story = {
  render: () => ({
    components: { JvCardMedia },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <JvCardMedia>
          <img src="https://picsum.photos/400/200?random=1" alt="随机图片" style="width: 100%; height: 100%; object-fit: cover;" />
        </JvCardMedia>
      </div>
    `,
  }),
}

export const BackgroundGradient: Story = {
  render: () => ({
    components: { JvCardMedia },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <JvCardMedia>
          <div style="width: 100%; height: 100%; background: linear-gradient(45deg, #2196f3, #e91e63); display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; font-weight: bold;">
            渐变背景
          </div>
        </JvCardMedia>
      </div>
    `,
  }),
}

export const VideoMedia: Story = {
  render: () => ({
    components: { JvCardMedia },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <JvCardMedia>
          <video
            controls
            style="width: 100%; height: 100%; object-fit: cover;"
            poster="https://picsum.photos/400/200?random=2"
          >
            <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4">
            您的浏览器不支持视频标签。
          </video>
        </JvCardMedia>
      </div>
    `,
  }),
}

export const ResponsiveLayout: Story = {
  render: () => ({
    components: { JvCardMedia },
    template: `
      <div>
        <h3>媒体区域会根据容器宽度自适应：</h3>
        
        <div style="max-width: 600px; border: 1px solid #eee; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          <JvCardMedia image="https://picsum.photos/600/300?random=3" />
        </div>
        
        <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          <JvCardMedia image="https://picsum.photos/600/300?random=3" />
        </div>
        
        <div style="max-width: 300px; border: 1px solid #eee; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          <JvCardMedia image="https://picsum.photos/600/300?random=3" />
        </div>
      </div>
    `,
  }),
}
