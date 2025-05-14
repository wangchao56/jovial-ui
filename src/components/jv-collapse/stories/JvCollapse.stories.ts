import type { Meta, StoryObj } from '@storybook/vue3'
import JvCollapse from '../src/JvCollapse.vue'
import JvCollapseGroup from '../src/JvCollapseGroup.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof JvCollapse> = {
  title: '数据展示组件/Collapse 折叠面板',
  component: JvCollapse,
  subcomponents: { JvCollapseGroup },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '是否展开',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    showArrow: {
      control: 'boolean',
      description: '是否显示箭头',
    },
    duration: {
      control: 'number',
      description: '动画持续时间(毫秒)',
    },
    title: {
      control: 'text',
      description: '折叠面板标题',
    },
    icon: {
      control: 'text',
      description: '标题前显示的图标名称',
    },
    lazy: {
      control: 'boolean',
      description: '是否懒加载内容',
    },
    class: {
      control: 'text',
      description: '自定义类名',
    },
  },
  args: {
    modelValue: false,
    disabled: false,
    showArrow: true,
    duration: 300,
    title: '折叠面板',
    icon: '',
    lazy: false,
    class: '',
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof JvCollapse>

// 基础折叠面板
export const Basic: Story = {
  args: {
    title: '基础折叠面板',
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
       <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这是折叠面板的内容区域。点击标题栏可以展开或收起此内容。
            <p>你可以在这里放置任何内容，包括文本、图片、表单等。</p>
          </div>
        </JvCollapse>
    `,
  }),
}

// 默认展开
export const DefaultExpanded: Story = {
  args: {
    title: '默认展开的折叠面板',
    modelValue: true,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板默认是展开的。<br>
            用户仍然可以点击标题栏来收起这个面板。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  args: {
    title: '禁用的折叠面板',
    disabled: true,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板已被禁用，无法点击展开或收起。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 带图标
export const WithIcon: Story = {
  args: {
    title: '带图标的折叠面板',
    icon: 'mdi:information-outline',
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板在标题前有一个图标。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 无箭头
export const NoArrow: Story = {
  args: {
    title: '没有箭头的折叠面板',
    showArrow: false,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板没有显示展开/收起箭头。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 自定义动画持续时间
export const CustomDuration: Story = {
  args: {
    title: '慢动画折叠面板',
    duration: 1000,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板的展开/收起动画时间更长（1000毫秒）。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 懒加载内容
export const LazyLoaded: Story = {
  args: {
    title: '懒加载内容',
    lazy: true,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板的内容使用懒加载，只有首次展开时才会渲染。
            <p>这对于包含大量内容或复杂组件的面板很有用，可以提高初始渲染性能。</p>
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 自定义插槽
export const CustomSlots: Story = {
  render: () => ({
    components: { JvCollapse },
    template: `
      <div style="width: 600px; max-width: 100%; display: flex; flex-direction: column; gap: 16px;">
        <JvCollapse>
          <template #title>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 16px; height: 16px; background-color: #1976d2; border-radius: 50%;"></span>
              <span>自定义标题插槽</span>
            </div>
          </template>
          <div style="padding: 16px;">
            这个折叠面板使用了自定义标题插槽。
          </div>
        </JvCollapse>
        
        <JvCollapse title="自定义图标插槽">
          <template #icon>
            <div style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; background-color: #4caf50; color: white; border-radius: 4px; font-size: 12px; font-weight: bold;">A</div>
          </template>
          <div style="padding: 16px;">
            这个折叠面板使用了自定义图标插槽。
          </div>
        </JvCollapse>
        
        <JvCollapse title="自定义箭头插槽">
          <template #arrow>
            <div style="font-size: 12px; font-weight: bold; color: #f44336;">▼</div>
          </template>
          <div style="padding: 16px;">
            这个折叠面板使用了自定义箭头插槽。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 折叠面板组
export const CollapseGroup: Story = {
  render: () => ({
    components: { JvCollapse, JvCollapseGroup },
    template: `
        <JvFlex direction="column" gap="16px">
        <JvCard title="折叠面板组-默认">
        <JvCollapseGroup>
        <JvCollapse title="第一个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第一个折叠面板的内容区域。
          </div>
        </JvCollapse>
        <JvCollapse title="第二个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第二个折叠面板的内容区域。
          </div>
        </JvCollapse>
        <div style="height: 1px; background-color: #e0e0e0;"></div>
        <JvCollapse title="第三个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第三个折叠面板的内容区域。
          </div>
          </JvCollapse>
        </JvCollapseGroup>
        </JvCard>
          <JvCard title="折叠面板组-手风琴模式" sub-title="accordion=true">
        <JvCollapseGroup :accordion="true">
        <JvCollapse title="第一个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第一个折叠面板的内容区域。
          </div>
        </JvCollapse>
        <JvCollapse title="第二个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第二个折叠面板的内容区域。
          </div>
        </JvCollapse>
        
        <div style="height: 1px; background-color: #e0e0e0;"></div>
        
        <JvCollapse title="第三个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第三个折叠面板的内容区域。
          </div>
          </JvCollapse>
        </JvCollapseGroup>
        </JvCard>
      </JvFlex>
    `,
  }),
}

// 嵌套折叠面板
export const NestedCollapse: Story = {
  render: () => ({
    components: { JvCollapse },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse title="外层折叠面板" :model-value="true">
          <div style="padding: 16px;">
            <p>外层折叠面板的内容。</p>
            
            <JvCollapse title="内层折叠面板 1">
              <div style="padding: 16px;">
                内层折叠面板 1 的内容。
              </div>
            </JvCollapse>
            
            <div style="height: 8px;"></div>
            
            <JvCollapse title="内层折叠面板 2">
              <div style="padding: 16px;">
                内层折叠面板 2 的内容。
              </div>
            </JvCollapse>
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}
