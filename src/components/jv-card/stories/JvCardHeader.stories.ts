import type { Meta, StoryObj } from '@storybook/vue3'
import JvAvatar from '@/components/jv-avatar'
import JvIcon from '@/components/jv-icon'
import JvButton from '@components/jv-button'
import { JvCardHeader } from '@components/jv-card'

/**
 * 卡片头部
 */
const meta: Meta<typeof JvCardHeader> = {
  title: '数据展示组件/Card 卡片/JvCardHeader',
  component: JvCardHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    avatar: { control: 'text' },
    divider: { control: 'boolean' },
    image: { control: 'text' },
    variant: {
      control: 'select',
      options: ['elevated', 'flat', 'outlined', 'tonal'],
      defaultValue: 'elevated',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvCardHeader>

export const BaseUsage: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
  },
  render: args => ({
    components: { JvCardHeader },
    setup() {
      return { args }
    },
    template: `
            <JvCardHeader v-bind="args" />
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
    icon: 'mdi:star',
  },
  render: args => ({
    components: { JvCardHeader, JvIcon },
    setup() {
      return { args }
    },
    template: `
             <JvCardHeader v-bind="args" />
    `,
  }),
}

export const WithAvatar: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
    avatar: 'https://picsum.photos/100',
  },
  render: args => ({
    components: { JvCardHeader, JvAvatar },
    setup() {
      return { args }
    },
    template: `
       <JvCardHeader v-bind="args" />
    `,
  }),
}

export const WithDescription: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
    description: '这是一段卡片描述，可以包含更多详细信息，用于补充说明卡片的内容或用途。',
  },
  render: args => ({
    components: { JvCardHeader },
    setup() {
      return { args }
    },
    template: `
            <JvCardHeader v-bind="args" />
    `,
  }),
}

export const CustomColor: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
  },
  render: args => ({
    components: { JvCardHeader },
    setup() {
      return { args }
    },
    template: `
             <JvCardHeader v-bind="args" />
    `,
  }),
}

export const WithDivider: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
    divider: true,
  },
  render: args => ({
    components: { JvCardHeader },
    setup() {
      return { args }
    },
    template: `
       <JvCardHeader v-bind="args" />
    `,
  }),
}

export const UseSlots: Story = {
  render: () => ({
    components: { JvCardHeader, JvIcon, JvAvatar, JvButton },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; padding: 16px;">
        <JvCardHeader>
          <template #prepend>
            <JvAvatar image="https://picsum.photos/100" />
          </template>
          <template #title>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>自定义标题</span>
              <JvIcon name="mdi:crown" color="#ffb300" />
            </div>
          </template>
          <template #subtitle>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span>自定义副标题</span>
              <JvIcon name="mdi:check-circle" color="#4caf50" size="small" />
            </div>
          </template>
          <template #append>
            <JvButton icon="mdi:dots-vertical" variant="text" />
          </template>
        </JvCardHeader>
      </div>
    `,
  }),
}

export const AllFeaturesCombined: Story = {
  render: () => ({
    components: { JvCardHeader, JvIcon, JvAvatar, JvButton },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 20px;">
        <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <JvCardHeader
            title="带图标和头像"
            subtitle="使用属性方式"
            icon="mdi:bell"
            avatar="https://picsum.photos/100?random=1"
            divider
          />
          <div style="padding: 16px;">卡片内容区域</div>
        </div>
        
        <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <JvCardHeader
            title="个人资料"
            subtitle="VIP会员"
            description="这是一个用户资料卡片的头部示例，展示用户的基本信息和状态。"
            avatar="https://picsum.photos/100?random=2"
            title-color="#1976d2"
            subtitle-color="#e91e63"
            divider
          />
          <div style="padding: 16px;">卡片内容区域</div>
        </div>
        
        <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <JvCardHeader>
            <template #prepend>
              <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: #f5f5f5; border-radius: 50%;">
                <JvIcon name="mdi:account" size="medium" />
              </div>
            </template>
            <template #title>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span>用户名称</span>
                <JvIcon name="mdi:check-decagram" color="#4caf50" size="small" />
              </div>
            </template>
            <template #subtitle>
              <div style="display: flex; align-items: center; gap: 4px;">
                <JvIcon name="mdi:map-marker" color="#ff9800" size="small" />
                <span>北京市</span>
              </div>
            </template>
            <template #append>
              <div>
                <JvButton icon="mdi:pencil" variant="text" size="small" />
                <JvButton icon="mdi:dots-vertical" variant="text" size="small" />
              </div>
            </template>
          </JvCardHeader>
          <div style="padding: 16px;">卡片内容区域</div>
        </div>
      </div>
    `,
  }),
}
