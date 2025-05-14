import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/jv-button'
import { JvCardActions } from '@components/jv-card'

const meta: Meta<typeof JvCardActions> = {
  title: '数据展示组件/Card 卡片/JvCardActions',
  component: JvCardActions,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'space-between', 'space-around'],
      defaultValue: 'end',
    },
    divider: { control: 'boolean', defaultValue: false },
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      defaultValue: 'sm',
    },
    gap: { control: 'text', defaultValue: '8' },
  },
}

export default meta
type Story = StoryObj<typeof JvCardActions>

export const BaseUsage: Story = {
  render: (args: any) => ({
    components: { JvCardActions, JvButton },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; padding: 16px;">
        <JvCardActions v-bind="args">
          <JvButton variant="text">取消</JvButton>
          <JvButton variant="elevated" color-type="primary">确定</JvButton>
        </JvCardActions>
      </div>
    `,
  }),
}

export const DifferentAlignments: Story = {
  render: () => ({
    components: { JvCardActions, JvButton },
    setup() {
      const alignOptions = [
        { label: '左对齐', value: 'start' },
        { label: '居中', value: 'center' },
        { label: '右对齐', value: 'end' },
        { label: '两端对齐', value: 'space-between' },
        { label: '环绕对齐', value: 'space-around' },
      ]
      return { alignOptions }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 20px;">
        <div v-for="align in alignOptions" :key="align.value" style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">{{ align.label }} ({{ align.value }})</div>
          <JvCardActions :align="align.value">
            <JvButton variant="text">取消</JvButton>
            <JvButton variant="elevated" color-type="primary">确定</JvButton>
          </JvCardActions>
        </div>
      </div>
    `,
  }),
}

export const DifferentPadding: Story = {
  render: () => ({
    components: { JvCardActions, JvButton },
    setup() {
      const paddingOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl']
      return { paddingOptions }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 20px;">
        <div v-for="padding in paddingOptions" :key="padding" style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">内边距: {{ padding }}</div>
          <JvCardActions :padding="padding">
            <JvButton variant="text">取消</JvButton>
            <JvButton variant="elevated" color-type="primary">确定</JvButton>
          </JvCardActions>
        </div>
      </div>
    `,
  }),
}

export const DifferentGap: Story = {
  render: () => ({
    components: { JvCardActions, JvButton },
    setup() {
      const gapOptions = ['0', '4', '8', '16', '24', '32']
      return { gapOptions }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 20px;">
        <div v-for="gap in gapOptions" :key="gap" style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">按钮间距: {{ gap }}px</div>
          <JvCardActions :gap="gap">
            <JvButton variant="text">取消</JvButton>
            <JvButton variant="elevated" color-type="primary">确定</JvButton>
            <JvButton variant="tonal" color-type="secondary">更多</JvButton>
          </JvCardActions>
        </div>
      </div>
    `,
  }),
}

export const WithDivider: Story = {
  args: {
    divider: true,
  },
  render: (args: any) => ({
    components: { JvCardActions, JvButton },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="padding: 16px;">
          这是分隔线上方的内容区域，可以放置任何卡片内容。
        </div>
        <JvCardActions v-bind="args">
          <JvButton variant="text">取消</JvButton>
          <JvButton variant="elevated" color-type="primary">确定</JvButton>
        </JvCardActions>
      </div>
    `,
  }),
}

export const ComplexButtonLayout: Story = {
  render: () => ({
    components: { JvCardActions, JvButton },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 20px;">
        <!-- 单个主要按钮 -->
        <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">单个主要按钮</div>
          <JvCardActions>
            <JvButton variant="elevated" color-type="primary" block>确定</JvButton>
          </JvCardActions>
        </div>
        
        <!-- 两个主要按钮 -->
        <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">两个主要按钮</div>
          <JvCardActions align="space-between">
            <JvButton variant="elevated" color-type="error">删除</JvButton>
            <JvButton variant="elevated" color-type="primary">保存</JvButton>
          </JvCardActions>
        </div>
        
        <!-- 多个操作按钮 -->
        <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">多个操作按钮</div>
          <JvCardActions align="space-between">
            <div>
              <JvButton icon="mdi:heart" variant="text" color-type="error" />
              <JvButton icon="mdi:share" variant="text" />
              <JvButton icon="mdi:bookmark" variant="text" />
            </div>
            <JvButton variant="tonal">查看详情</JvButton>
          </JvCardActions>
        </div>
        
        <!-- 混合布局 -->
        <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">混合布局</div>
          <JvCardActions align="space-between">
            <div style="display: flex; align-items: center;">
              <div style="background: #f5f5f5; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; margin-right: 8px;">
                ¥
              </div>
              <span style="font-weight: bold; color: #f44336;">299.00</span>
            </div>
            <div>
              <JvButton variant="text">加入购物车</JvButton>
              <JvButton variant="elevated" color-type="primary">立即购买</JvButton>
            </div>
          </JvCardActions>
        </div>
      </div>
    `,
  }),
}

export const ImmersiveBottomBar: Story = {
  render: () => ({
    components: { JvCardActions, JvButton },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="padding: 16px; margin-bottom: 40px;">
          <h3 style="margin-top: 0;">文章标题</h3>
          <p>这是文章的内容区域，可以包含各种文本、图片等元素...</p>
          <p>下方是沉浸式固定在底部的操作栏。</p>
        </div>
        <JvCardActions 
          style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); box-shadow: 0 -2px 10px rgba(0,0,0,0.1);"
          align="end"
          padding="md"
        >
          <JvButton variant="text">取消</JvButton>
          <JvButton variant="elevated" color-type="primary">确定</JvButton>
        </JvCardActions>
      </div>
    `,
  }),
}
