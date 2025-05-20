import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/jv-button'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'
import JvFlex from '@/components/jv-flex'
import { JvGrid } from '@/components/jv-grid'
import JvModal from '@/components/jv-modal'
import { getOptions, roundedOptions } from '@/constants'

const colorTypeOptions = getOptions('colorType')
const variantOptions = ['elevated', 'flat', 'plain', 'dashed', 'tonal', 'outlined', 'text']
const sizeOptions = getOptions('size')
const shapeOptions = roundedOptions

/**
 * # JvButton 按钮组件
    JvButton 是一个功能丰富的按钮组件，支持多种变体、颜色和尺寸。它可以显示图标、处理不同状态（如加载中、禁用），
    并支持各种交互事件。
    ## 变体说明
    - **elevated**: 使用阴影强调的按钮
    - **flat**: 移除阴影效果的按钮
    - **plain**: 移除背景色并降低默认透明度的按钮
    - **dashed**: 使用虚线边框的按钮
    - **tonal**: 使用低饱和度背景色的按钮
    - **outlined**: 使用实线边框的按钮
    - **text**: 仅有文本的按钮，没有背景和边框
    ## 使用场景
    - 页面交互操作
    - 表单提交
    - 导航链接
    - 功能触发
 */
const meta = {
  title: '通用组件/Button/Button 按钮',
  component: JvButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variantOptions,
      defaultValue: 'elevated',
      description: '按钮变体样式',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'elevated' },
      },
    },
    color: {
      control: { type: 'select' },
      defaultValue: 'default',
      options: colorTypeOptions,
      description: '按钮颜色风格',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      defaultValue: 'medium',
      options: sizeOptions,
      description: '按钮尺寸',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用按钮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: '是否显示加载状态',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    block: {
      control: 'boolean',
      description: '是否为块级按钮（宽度100%）',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'text',
      description: '按钮图标（仅图标模式）',
      table: {
        type: { summary: 'string' },
      },
    },
    prependIcon: {
      control: 'text',
      description: '前置图标',
      table: {
        type: { summary: 'string' },
      },
    },
    appendIcon: {
      control: 'text',
      description: '后置图标',
      table: {
        type: { summary: 'string' },
      },
    },
    stacked: {
      control: 'boolean',
      description: '是否为堆叠按钮（图标在上，文字在下）',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '按钮文本内容',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Button' },
      },
    },
    nativeType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      defaultValue: 'button',
      description: '原生按钮类型',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
  },
  args: {
    variant: 'elevated',
    color: 'default',
    size: 'medium',
    disabled: false,
  },
} satisfies Meta<typeof JvButton>

export default meta
type Story = StoryObj<typeof meta>

export const BaseUsage: Story = {
  args: {
    variant: 'elevated',
    label: '基础按钮',
  },
  render: args => ({
    components: { JvButton },
    setup() {
      const handleClick = () => {
        action('click')()
      }
      return { args, handleClick }
    },
    template: '<JvButton  @click="handleClick"  v-bind="args">{{ args.label || "按钮" }}</JvButton>',
  }),
  parameters: {
    docs: {
      description: {
        story: '最基本的按钮组件，使用默认的 elevated 变体和 primary 颜色。',
      },
    },
  },
}

export const ButtonRounded: Story = {
  args: {
    variant: 'elevated',
    color: 'primary',
  },
  render: args => ({
    components: { JvButton, JvFlex },
    setup() {
      return { args, shapeOptions }
    },
    template: `
      <JvFlex :gap="12">
         <template v-for="(shape,idx) in shapeOptions" :key="shape">
            <JvFlex :gap="12"  v-if="idx%5===0"   direction="horizontal" justify="center">
                <JvButton v-bind="args" :rounded="shape" :label="shape" />
                <JvButton v-bind="args" :rounded="shape" :label="shape" />
            </JvFlex>
         </template>
      </JvFlex>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '按钮支持多种形状，包括方形 (square) 和胶囊形 (pill)。',
      },
    },
  },
}
/**
 * 按钮支持多种尺寸：tiny, small, medium, large, xlarge。不同尺寸的按钮会自动调整字体大小、高度和内边距。
 */
export const DifferentSizes: Story = {
  render: args => ({
    components: { JvButton, JvFlex },
    setup() {
      return { args, sizeOptions }
    },
    template: `
      <JvFlex :gap="12" align="center">
        <JvButton v-bind="args" v-for="size in sizeOptions" :size="size">
          {{size}}
        </JvButton>
      </JvFlex>
    `,
  }),
}

export const DifferentColors: Story = {
  render: args => ({
    components: { JvButton, JvFlex },
    setup() {
      return { args, colorTypeOptions }
    },
    template: `
      <JvFlex :gap="12" wrap>
        <JvButton v-for="color in colorTypeOptions" v-bind="args" :color="color">
          {{ color }}
        </JvButton>
      </JvFlex>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '按钮支持多种颜色风格：default, primary, secondary, success, warning, error, info。颜色会影响按钮的背景和文本颜色。',
      },
    },
  },
}

export const DifferentVariants: Story = {
  args: {
    color: 'primary',
  },
  render: args => ({
    components: { JvButton, JvFlex },
    setup() {
      return { args, variantOptions }
    },
    template: `
      <JvFlex :gap="12" direction="vertical">
        <JvFlex :gap="12" wrap>
          <JvButton v-bind="args" v-for="variant in variantOptions" :variant="variant">
            {{ variant }}
          </JvButton>
        </JvFlex>
      </JvFlex>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
按钮支持多种变体样式：
- **elevated**: 使用阴影强调
- **flat**: 移除阴影效果
- **plain**: 移除背景颜色并降低透明度
- **dashed**: 使用虚线边框
- **tonal**: 使用低饱和度背景色
- **outlined**: 使用实线边框
- **text**: 无背景无边框
        `,
      },
    },
  },
}

export const IconButton: Story = {
  args: {
    variant: 'elevated',
    icon: 'mdi:home',
    color: 'primary',
  },
  render: args => ({
    components: { JvButton, JvFlex },
    setup() {
      const icons = ['mdi:home', 'mdi:heart', 'mdi:star', 'mdi:settings', 'mdi:plus']
      return { args, icons, variantOptions, sizeOptions }
    },
    template: `
      <JvFlex :gap="12" direction="vertical">
        <div>单个图标按钮:</div>
        <JvButton v-bind="args" />
        
        <div>不同图标:</div>
        <JvFlex :gap="8">
          <JvButton v-for="icon in icons" :icon="icon" :variant="args.variant" :color="args.color" />
        </JvFlex>
        
        <div>不同变体的图标按钮:</div>
        <JvFlex :gap="8">
          <JvButton v-for="variant in variantOptions" :variant="variant" :icon="'mdi:home'" :color="args.color" />
        </JvFlex>
        
        <div>不同尺寸的图标按钮:</div>
        <JvFlex :gap="8" align="center">
          <JvButton v-for="size in sizeOptions" :size="size" :icon="'mdi:home'" :variant="args.variant" :color="args.color" />
        </JvFlex>
      </JvFlex>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '仅包含图标的按钮，适用于工具栏或紧凑型UI。图标按钮默认为正方形，并使用圆形边框。',
      },
    },
  },
}

export const PrependAndAppendIcon: Story = {
  args: {
    variant: 'elevated',
    color: 'primary',
    label: '带图标按钮',
  },
  render: args => ({
    components: { JvButton, JvFlex },
    setup() {
      return { args, sizeOptions: sizeOptions.filter(size => ['small', 'medium', 'large', 'xlarge'].includes(size)) }
    },
    template: `
      <JvFlex :gap="12" direction="vertical">
        <JvFlex :gap="12" wrap>
          <JvButton v-bind="args" prependIcon="mdi:arrow-left">前置图标</JvButton>
          <JvButton v-bind="args" appendIcon="mdi:arrow-right">后置图标</JvButton>
          <JvButton v-bind="args" prependIcon="mdi:thumb-up" appendIcon="mdi:thumb-down">
            双侧图标
          </JvButton>
        </JvFlex>
        
        <div>不同尺寸的前置图标按钮:</div>
        <JvFlex :gap="12" align="center">
          <JvButton 
            v-for="size in sizeOptions" 
            :size="size" 
            :variant="args.variant" 
            :color="args.color"
            prependIcon="mdi:check"
          >
            {{size}}尺寸
          </JvButton>
        </JvFlex>
      </JvFlex>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '按钮可以在文本前后添加图标，增强视觉效果和信息传达。图标大小会随按钮尺寸自动调整。',
      },
    },
  },
}

export const StackedButton: Story = {
  args: {
    variant: 'elevated',
    color: 'primary',
    stacked: true,
  },
  render: args => ({
    components: { JvButton, JvFlex },
    setup() {
      const sizeOptions = ['medium', 'large', 'xlarge']
      return { args, sizeOptions }
    },
    template: `
      <JvFlex :gap="12">
        <JvButton v-bind="args" prependIcon="mdi:home">主页</JvButton>
        <JvButton v-bind="args" prependIcon="mdi:settings">设置</JvButton>
        <JvButton v-for="size in sizeOptions" v-bind="args" :size="size" prependIcon="mdi:account">
          {{size}}
        </JvButton>
      </JvFlex>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '堆叠按钮将图标放在文本上方，适用于导航栏或工具栏。在堆叠模式下，后置图标会被隐藏。',
      },
    },
  },
}

export const DisabledState: Story = {
  args: {
    disabled: true,
    label: '禁用按钮',
  },
  parameters: {
    docs: {
      description: {
        story: '禁用状态的按钮无法点击，视觉上呈现为半透明状态。',
      },
    },
  },
}

export const LoadingState: Story = {
  args: {
    loading: true,
    label: '加载中',
  },
  parameters: {
    docs: {
      description: {
        story: '加载状态用于表示操作正在进行中，按钮显示一个旋转的加载指示器。加载状态下的按钮内容会被隐藏。',
      },
    },
  },
}

export const BlockButton: Story = {
  args: {
    block: true,
    label: '块级按钮',
  },
  render: args => ({
    components: { JvButton, JvFlex },
    setup() {
      return { args, variantOptions: variantOptions.slice(0, 3) }
    },
    template: `
      <JvFlex :gap="12" direction="vertical" style="width: 100%; max-width: 400px;">
        <JvButton v-bind="args" />
        <JvButton v-for="variant in variantOptions" :variant="variant" v-bind="args">
          {{ variant }}
        </JvButton>
      </JvFlex>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '块级按钮会占据父容器的全部宽度，适合在移动设备或表单底部使用。',
      },
    },
  },
}

export const CustomStyles: Story = {
  render: () => ({
    components: { JvButton },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <JvButton style="background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%); color: white;">
          渐变背景
        </JvButton>
        <JvButton style="border: 2px dashed #ff6b6b; color: #ff6b6b; background: transparent;">
          自定义边框
        </JvButton>
        <JvButton 
          style="box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;">
          自定义阴影
        </JvButton>
        <JvButton 
          style="font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 2px;">
          自定义字体
        </JvButton>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过style属性可以为按钮添加自定义样式，实现独特的视觉效果。支持CSS变量覆盖和行内样式属性。',
      },
    },
  },
}

export const InteractionTest: Story = {
  render: () => ({
    components: { JvButton, JvFlex },
    setup() {
      const message = ref('')
      return {
        handleClick: () => { message.value = '按钮被点击了！' },
        handleFocus: () => { message.value = '按钮获得焦点' },
        handleBlur: () => { message.value = '按钮失去焦点' },
        message,
      }
    },
    template: `
      <JvFlex :gap="12" direction="vertical">
        <JvButton @click="handleClick" @focus="handleFocus" @blur="handleBlur">
          点击我
        </JvButton>
        <div v-if="message">事件信息: {{ message }}</div>
      </JvFlex>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '按钮支持多种交互事件，包括点击、获得焦点和失去焦点。通过事件处理可以实现复杂的交互逻辑。',
      },
    },
  },
}

export const ButtonSizeAndFont: Story = {
  render: () => ({
    components: { JvButton, JvFlex },
    setup() {
      return { sizeOptions }
    },
    template: `
      <JvFlex :gap="16" direction="vertical">
        <div>不同尺寸按钮的字体大小变化：</div>
        <JvFlex :gap="12" align="center">
          <JvButton v-for="size in sizeOptions" :size="size" variant="elevated" color="primary">
            {{size}}尺寸
          </JvButton>
        </JvFlex>
        
        <div>不同尺寸图标按钮：</div>
        <JvFlex :gap="12" align="center">
          <JvButton v-for="size in sizeOptions" :size="size" variant="elevated" color="primary" icon="mdi:check" />
        </JvFlex>
        
        <div>不同尺寸堆叠按钮：</div>
        <JvFlex :gap="12" align="center">
          <JvButton 
            v-for="size in sizeOptions" 
            :size="size" 
            variant="elevated" 
            color="primary" 
            stacked 
            prependIcon="mdi:check"
          >
            {{size}}
          </JvButton>
        </JvFlex>
      </JvFlex>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '展示不同尺寸按钮的字体大小变化。按钮的字体大小会随着按钮尺寸的变化而自动调整。',
      },
    },
  },
}

// 所有样式展示
export const AllStyles: Story = {
  render: () => ({
    components: { JvButton, JvFlex, JvGrid },
    setup() {
      const shaps: RoundedType[] = ['pill', 'circle', 'shaped', 'none', 'sm', 'lg', 'xl']
      const sizeOptions = ['tiny', 'small', 'medium', 'large', 'xlarge']
      return { variantOptions, sizeOptions, colorTypeOptions, shaps }
    },
    template: `
    <div >
      <JvFlex :gap="12" direction="vertical">
        <template v-for="(color,idx) in colorTypeOptions" :key="color">
        <JvFlex :gap="12" direction="horizontal" justify="center">
          <template v-for="(variant,index) in variantOptions" :key="variant">
              <JvButton :variant="variant" :size="sizeOptions[index]" :color="color" :rounded="shaps[index]">
                BUTTON
              </JvButton>
          </template>
        </JvFlex>
        </template>
      </JvFlex>
    </div>
    `,
  }),
}

// 点击触发弹窗
export const ClickToTriggerPopup: Story = {
  render: () => ({
    components: { JvButton, JvFlex, JvModal },
    setup() {
      const visible = ref(false)
      const handleClick = () => {
        visible.value = true
      }
      return { handleClick }
    },
    template: `
      <JvButton @click="handleClick">点击我</JvButton>
      <JvModal v-model="visible" title="弹窗" @close="handleClose">
        <div>弹窗内容</div> 
      </JvModal>
    `,
  }),
}
