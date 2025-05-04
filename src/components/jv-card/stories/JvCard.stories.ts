import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/jv-button'
import JvCard, {
  JvCardActions,
  JvCardContent,
  JvCardFooter,
  JvCardHeader,
} from '@components/jv-card'
import JvSpace from '@components/jv-space'

const colorTypeOptions = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
]
const variantOptions = ['elevated', 'outlined', 'flat', 'tonal']
const roundedOptions = [
  'rounded',
  'roundedSm',
  'roundedLg',
  'roundedXl',
  'roundedFull',
]
const paddingOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl']
const alignOptions = ['start', 'center', 'end']

const meta: Meta<typeof JvCard> = {
  title: '数据展示组件/Card 卡片',
  component: JvCard,
  subcomponents: { JvCardActions, JvCardHeader, JvCardContent, JvCardFooter },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    colorType: {
      control: 'select',
      options: colorTypeOptions,
      defaultValue: 'default',
    },
    variant: {
      control: 'select',
      options: variantOptions,
      defaultValue: 'elevated',
    },
    rounded: {
      control: 'select',
      options: roundedOptions,
      defaultValue: 'rounded',
    },
    bordered: { control: 'boolean', defaultValue: false },
    clickable: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    padding: {
      control: 'select',
      options: paddingOptions,
      defaultValue: 'md',
    },
    actionsAlign: {
      control: 'select',
      options: alignOptions,
      defaultValue: 'end',
    },
  },
}

export default meta

type Story = StoryObj<typeof JvCard>

export const 基础卡片: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
    width: '300px',
  },
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        这是一个基础卡片，用于展示内容。
      </JvCard>
    `,
  }),
}

export const 带操作的卡片_插槽方式: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
    width: '300px',
  },
  render: args => ({
    components: { JvCard, JvButton },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        <template #default>
          这是一个使用插槽方式添加操作按钮的卡片示例。
        </template>
        <template #actions>
          <JvButton size="small" variant="text">取消</JvButton>
          <JvButton size="small" variant="elevated" color-type="primary">确定</JvButton>
        </template>
      </JvCard>
    `,
  }),
}

export const 带操作的卡片_子组件方式: Story = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
    width: '300px',
  },
  render: args => ({
    components: { JvCard, JvButton, JvCardActions },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        这是一个使用子组件方式添加操作按钮的卡片示例。
        <JvCardActions>
          <JvButton size="small" variant="text">取消</JvButton>
          <JvButton size="small" variant="elevated" color-type="primary">确定</JvButton>
        </JvCardActions>
      </JvCard>
    `,
  }),
}

export const 使用所有子组件: Story = {
  args: {
    width: '300px',
    variant: 'elevated',
    colorType: 'primary',
  },
  render: args => ({
    components: {
      JvCard,
      JvButton,
      JvCardHeader,
      JvCardContent,
      JvCardActions,
      JvCardFooter,
    },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        <JvCardHeader title="子组件方式" subtitle="使用所有子组件构建卡片" />
        <JvCardContent>
          这是使用JvCardContent子组件添加的内容区域。
          <br />
          通过子组件方式构建卡片可以更加灵活地定制卡片结构。
        </JvCardContent>
        <JvCardActions align="center">
          <JvButton size="small" variant="text">取消</JvButton>
          <JvButton size="small" variant="elevated" color-type="primary">确定</JvButton>
        </JvCardActions>
        <JvCardFooter>
          <div style="font-size: 12px; color: gray;">这是使用JvCardFooter子组件添加的底部区域</div>
        </JvCardFooter>
      </JvCard>
    `,
  }),
}

export const 操作区对齐方式: Story = {
  args: {
    title: '操作区对齐方式',
    subtitle: '通过actionsAlign或align属性控制',
    width: '300px',
  },
  render: args => ({
    components: { JvCard, JvButton, JvCardActions, JvSpace },
    setup() {
      return { args, alignOptions }
    },
    template: `
      <JvSpace :gap="16" direction="vertical">
        <JvCard v-for="align in alignOptions" :key="align" v-bind="args" :title="'插槽方式 - ' + align" :actions-align="align">
          使用插槽方式，通过actionsAlign属性控制按钮对齐方式为{{align}}。
          <template #actions>
            <JvButton size="small" variant="text">取消</JvButton>
            <JvButton size="small" variant="elevated" color-type="primary">确定</JvButton>
          </template>
        </JvCard>
        
        <JvCard v-for="align in alignOptions" :key="'sub-'+align" v-bind="args" :title="'子组件方式 - ' + align">
          使用子组件方式，通过JvCardActions的align属性控制按钮对齐方式为{{align}}。
          <JvCardActions :align="align">
            <JvButton size="small" variant="text">取消</JvButton>
            <JvButton size="small" variant="elevated" color-type="primary">确定</JvButton>
          </JvCardActions>
        </JvCard>
      </JvSpace>
    `,
  }),
}

export const 带媒体的卡片: Story = {
  args: {
    title: '媒体卡片',
    subtitle: '支持图片和视频',
    width: '300px',
  },
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        <template #media>
          <img src="https://picsum.photos/300/150" alt="随机图片" />
        </template>
        这是一个包含媒体内容的卡片示例。
      </JvCard>
    `,
  }),
}

export const 可点击卡片: Story = {
  args: {
    title: '可点击卡片',
    subtitle: '点击查看详情',
    width: '300px',
    clickable: true,
  },
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args" @click="() => alert('卡片被点击了')">
        这是一个可点击的卡片，点击时会触发点击事件。
      </JvCard>
    `,
  }),
}

export const 不同变体: Story = {
  render: args => ({
    components: { JvCard, JvSpace },
    setup() {
      return { args, variantOptions }
    },
    template: `
      <JvSpace :gap="16" direction="vertical">
        <JvCard 
          v-for="variant in variantOptions" 
          :key="variant"
          :variant="variant"
          :title="variant"
          subtitle="卡片变体示例"
          width="300px"
        >
          这是一个{{variant}}变体的卡片示例。
        </JvCard>
      </JvSpace>
    `,
  }),
}

export const 不同颜色类型: Story = {
  render: args => ({
    components: { JvCard, JvSpace },
    setup() {
      return { args, colorTypeOptions }
    },
    template: `
      <JvSpace :gap="16" direction="vertical">
        <JvCard 
          v-for="colorType in colorTypeOptions" 
          :key="colorType"
          :color-type="colorType"
          :title="colorType"
          subtitle="颜色类型示例"
          width="300px"
        >
          这是一个{{colorType}}颜色类型的卡片示例。
        </JvCard>
      </JvSpace>
    `,
  }),
}

export const 不同圆角: Story = {
  render: args => ({
    components: { JvCard, JvSpace },
    setup() {
      return { args, roundedOptions }
    },
    template: `
      <JvSpace :gap="16" direction="vertical">
        <JvCard 
          v-for="rounded in roundedOptions" 
          :key="rounded"
          :rounded="rounded"
          :title="rounded"
          subtitle="圆角示例"
          width="300px"
        >
          这是一个{{rounded}}圆角的卡片示例。
        </JvCard>
      </JvSpace>
    `,
  }),
}

export const 不同内边距: Story = {
  render: args => ({
    components: { JvCard, JvSpace },
    setup() {
      return { args, paddingOptions }
    },
    template: `
      <JvSpace :gap="16" direction="vertical">
        <JvCard 
          v-for="padding in paddingOptions" 
          :key="padding"
          :padding="padding"
          :title="'内边距: ' + padding"
          subtitle="内边距示例"
          width="300px"
        >
          这是一个{{padding}}内边距的卡片示例。
        </JvCard>
      </JvSpace>
    `,
  }),
}

export const 禁用状态: Story = {
  args: {
    title: '禁用卡片',
    subtitle: '不可交互',
    width: '300px',
    disabled: true,
    clickable: true,
  },
  render: args => ({
    components: { JvCard },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        这是一个禁用状态的卡片，无法进行交互。
      </JvCard>
    `,
  }),
}

export const 自定义卡片: Story = {
  args: {
    width: '300px',
    variant: 'outlined',
    colorType: 'primary',
    rounded: 'roundedLg',
  },
  render: args => ({
    components: {
      JvCard,
      JvButton,
      JvCardActions,
      JvCardHeader,
      JvCardContent,
      JvCardFooter,
    },
    setup() {
      return { args }
    },
    template: `
      <JvCard v-bind="args">
        <JvCardHeader>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0;">自定义头部</h3>
              <p style="margin: 4px 0 0; opacity: 0.7;">使用插槽完全自定义</p>
            </div>
            <JvButton icon="mdi:close" variant="text" />
          </div>
        </JvCardHeader>
        <JvCardContent>
          <div style="padding: 16px 0;">
            这是一个使用插槽完全自定义的卡片示例，可以灵活搭配各种内容和样式。
          </div>
        </JvCardContent>
        <JvCardActions align="center">
          <JvButton size="small" variant="elevated" color-type="primary">查看更多</JvButton>
        </JvCardActions>
      </JvCard>
    `,
  }),
}

export const 优先级展示: Story = {
  args: {
    title: '这是属性标题（低优先级）',
    subtitle: '这是属性副标题（低优先级）',
    width: '350px',
    variant: 'outlined',
    colorType: 'primary',
  },
  render: args => ({
    components: {
      JvCard,
      JvButton,
      JvCardHeader,
      JvCardContent,
      JvCardActions,
      JvCardFooter,
    },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <JvCard v-bind="args">
          <JvCardHeader title="这是子组件标题（最高优先级）" subtitle="子组件 > 插槽 > 属性" />
          <JvCardContent>这是通过子组件添加的内容。子组件的优先级高于插槽和属性。</JvCardContent>
          <template #content>这是插槽内容（不会显示，因为子组件优先级更高）</template>
        </JvCard>

        <JvCard v-bind="args">
          <template #header>
            <div style="padding: 8px 0;">这是通过插槽添加的标题（中优先级）</div>
          </template>
          <template #content>这是通过插槽添加的内容。插槽的优先级高于属性，但低于子组件。</template>
        </JvCard>

        <JvCard v-bind="args">
          <!-- 没有子组件或插槽，所以使用属性 -->
          这张卡片使用属性提供的标题和副标题（最低优先级）。
        </JvCard>
      </div>
    `,
  }),
}
