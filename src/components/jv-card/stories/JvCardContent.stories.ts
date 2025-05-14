import type { Meta, StoryObj } from '@storybook/vue3'
import JvIcon from '@/components/jv-icon'
import JvButton from '@components/jv-button'
import { JvCardContent } from '@components/jv-card'

const meta: Meta<typeof JvCardContent> = {
  title: '数据展示组件/Card 卡片/JvCardContent',
  component: JvCardContent,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      defaultValue: 'md',
    },
    divider: { control: 'boolean', defaultValue: false },
  },
}

export default meta
type Story = StoryObj<typeof JvCardContent>

export const BaseUsage: Story = {
  args: {
    content: '这是卡片内容区域，用于展示主要信息。这里可以放置文本、图片、列表、表格等各种内容。',
  },
  render: args => ({
    components: { JvCardContent },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; padding: 16px;">
        <JvCardContent v-bind="args" />
      </div>
    `,
  }),
}

export const DifferentPadding: Story = {
  render: () => ({
    components: { JvCardContent },
    setup() {
      const paddingOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl']
      return { paddingOptions }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 20px;">
        <div v-for="padding in paddingOptions" :key="padding" style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #f5f5f5; padding: 8px;">内边距: {{ padding }}</div>
          <JvCardContent 
            :padding="padding"
            content="这是卡片内容示例文本。通过不同的内边距设置，可以控制内容区域的空间大小，满足不同的设计需求。"
          />
        </div>
      </div>
    `,
  }),
}

export const WithDivider: Story = {
  args: {
    content: '这是卡片内容区域，下方有分隔线。',
    divider: true,
  },
  render: args => ({
    components: { JvCardContent },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <JvCardContent v-bind="args" />
        <div style="padding: 16px;">这是分隔线下方的内容</div>
      </div>
    `,
  }),
}

export const UseDefaultSlot: Story = {
  render: () => ({
    components: { JvCardContent, JvButton, JvIcon },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; padding: 16px;">
        <JvCardContent>
          <h3 style="margin-top: 0;">使用默认插槽</h3>
          <p>使用默认插槽可以放置更丰富的内容，包括：</p>
          <ul>
            <li>文本段落</li>
            <li>列表内容</li>
            <li>表格数据</li>
            <li>其他组件</li>
          </ul>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 16px;">
            <JvIcon name="mdi:information" color="#2196f3" />
            <span>这是一条提示信息</span>
          </div>
        </JvCardContent>
      </div>
    `,
  }),
}

export const ComplexContent: Story = {
  render: () => ({
    components: { JvCardContent, JvButton, JvIcon },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; padding: 16px;">
        <JvCardContent>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <!-- 数据统计 -->
            <div style="display: flex; justify-content: space-between;">
              <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #f44336;">125</div>
                <div style="font-size: 14px; color: #666;">新增用户</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #2196f3;">348</div>
                <div style="font-size: 14px; color: #666;">访问量</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #4caf50;">57%</div>
                <div style="font-size: 14px; color: #666;">转化率</div>
              </div>
            </div>
            
            <!-- 进度信息 -->
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span>项目进度</span>
                <span>75%</span>
              </div>
              <div style="height: 8px; border-radius: 4px; background: #e0e0e0; overflow: hidden;">
                <div style="width: 75%; height: 100%; background: #2196f3;"></div>
              </div>
            </div>
            
            <!-- 表格数据 -->
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f5f5f5;">
                  <th style="padding: 8px; text-align: left; border-bottom: 1px solid #eee;">项目</th>
                  <th style="padding: 8px; text-align: right; border-bottom: 1px solid #eee;">金额</th>
                  <th style="padding: 8px; text-align: right; border-bottom: 1px solid #eee;">状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">项目 A</td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #eee;">¥1,200</td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #eee; color: #4caf50;">已完成</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">项目 B</td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #eee;">¥3,500</td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #eee; color: #ff9800;">进行中</td>
                </tr>
                <tr>
                  <td style="padding: 8px;">项目 C</td>
                  <td style="padding: 8px; text-align: right;">¥2,800</td>
                  <td style="padding: 8px; text-align: right; color: #f44336;">未开始</td>
                </tr>
              </tbody>
            </table>
          </div>
        </JvCardContent>
      </div>
    `,
  }),
}

export const WithOtherComponents: Story = {
  render: () => ({
    components: { JvCardContent, JvButton, JvIcon },
    template: `
      <div style="max-width: 400px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="padding: 16px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #ddd;">
          产品详情
        </div>
        <JvCardContent padding="md">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <p style="margin: 0;">这是一款高性能、多功能的智能产品，具有以下特点：</p>
            <div style="display: flex; align-items: center; gap: 8px;">
              <JvIcon name="mdi:check-circle" color="#4caf50" />
              <span>超长续航能力</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <JvIcon name="mdi:check-circle" color="#4caf50" />
              <span>智能语音控制</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <JvIcon name="mdi:check-circle" color="#4caf50" />
              <span>5G网络支持</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <JvIcon name="mdi:check-circle" color="#4caf50" />
              <span>AI人工智能</span>
            </div>
          </div>
        </JvCardContent>
        <div style="padding: 16px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #ddd;">
          <JvButton variant="text">了解更多</JvButton>
          <JvButton variant="elevated" color-type="primary">立即购买</JvButton>
        </div>
      </div>
    `,
  }),
}
