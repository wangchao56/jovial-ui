import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'
import JvOverlay from '../src/JvOverlay.vue'
// 更多关于default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof JvOverlay> = {
  title: '通用组件/Overlay 遮罩层',
  component: JvOverlay,
  // 组件标签
  tags: ['autodocs'],
  argTypes: {
    target: {
      control: 'select',
      options: ['viewport', 'parent'],
      description: '遮罩层的作用目标',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'viewport' },
      },
    },
    showMask: {
      control: 'boolean',
      description: '是否显示半透明遮罩背景',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    maskZIndex: {
      control: 'number',
      description: '遮罩层的z-index值',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1000' },
      },
    },
    class: {
      control: 'text',
      description: '自定义CSS类名',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      story: {
        inline: true,
      },
      // 添加全局样式
      source: {
        code: `.overlay-content {
  width: 400px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 20vh auto 0;
  text-align: center;
}`,
        language: 'css',
      },
    },
  },
  decorators: [
    () => ({
      template: `
        <div>
          <style>
            .overlay-content {
              width: 400px;
              padding: 24px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              margin: 20vh auto 0;
              text-align: center;
            }
          </style>
          <story />
        </div>
      `,
    }),
  ],
}

export default meta
type Story = StoryObj<typeof JvOverlay>

// 基础用法 - 全屏遮罩
export const Basic: Story = {
  render: args => ({
    components: { JvOverlay, JvButton },
    setup() {
      const visible = ref(false)
      const handleShowOverlay = () => {
        visible.value = true
      }
      const handleHideOverlay = () => {
        visible.value = false
      }
      const handleClickOverlay = () => {
        visible.value = false
      }
      return { args, visible, handleShowOverlay, handleHideOverlay, handleClickOverlay }
    },
    template: `
      <div>
        <JvButton @click="handleShowOverlay">显示全屏遮罩</JvButton>
        
        <JvOverlay 
          v-model:model-value="visible" 
          target="viewport" 
          @click-overlay="handleClickOverlay"
        >
          <div class="overlay-content">
            <h3>全屏遮罩示例</h3>
            <p>这是一个全屏遮罩层示例，点击遮罩区域或关闭按钮可关闭</p>
            <JvButton @click="handleHideOverlay">关闭</JvButton>
          </div>
        </JvOverlay>
      </div>
    `,
  }),
}

// 父元素遮罩
export const ParentOverlay: Story = {
  render: args => ({
    components: { JvOverlay, JvButton },
    setup() {
      const visible = ref(false)
      const handleShowOverlay = () => {
        visible.value = true
      }
      const handleHideOverlay = () => {
        visible.value = false
      }
      const handleOpen = () => {
        action('遮罩层已打开')
      }
      const handleClose = () => {
        action('遮罩层已关闭')
      }
      return {
        args,
        visible,
        handleShowOverlay,
        handleHideOverlay,
        handleOpen,
        handleClose,
      }
    },
    template: `
      <div>
        <JvButton @click="handleShowOverlay">显示父元素遮罩</JvButton>
        
        <div class="parent-container" style="position: relative; width: 500px; height: 300px; border: 2px solid #ddd; margin-top: 20px; overflow: hidden;">
          <div class="content-area" style="padding: 20px; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 18px;">
            这是将被遮罩的内容区域
          </div>
          
          <JvOverlay 
            v-model:model-value="visible" 
            target="parent"
            @open-after="handleOpen"
            @close-after="handleClose"
          >
            <div class="overlay-content">
              <p>这是父元素内的遮罩层</p>
              <JvButton @click="handleHideOverlay">关闭</JvButton>
            </div>
          </JvOverlay>
        </div>
      </div>
    `,
  }),
}

// 无背景遮罩
export const NoMask: Story = {
  render: args => ({
    components: { JvOverlay, JvButton },
    setup() {
      const visible = ref(false)
      const handleShowOverlay = () => {
        visible.value = true
      }
      const handleHideOverlay = () => {
        visible.value = false
      }
      return { args, visible, handleShowOverlay, handleHideOverlay }
    },
    template: `
      <div>
        <JvButton @click="handleShowOverlay">显示无背景遮罩</JvButton>
        
        <JvOverlay 
          v-model:model-value="visible" 
          :show-mask="false"
        >
          <div class="overlay-content">
            <p>这是没有背景遮罩的浮层内容</p>
            <JvButton @click="handleHideOverlay">关闭</JvButton>
          </div>
        </JvOverlay>
      </div>
    `,
  }),
}

// 自定义Z-index
export const CustomZIndex: Story = {
  render: args => ({
    components: { JvOverlay, JvButton },
    setup() {
      const visible = ref(false)
      const handleShowOverlay = () => {
        visible.value = true
      }
      const handleHideOverlay = () => {
        visible.value = false
      }
      return { args, visible, handleShowOverlay, handleHideOverlay }
    },
    template: `
      <div>
        <JvButton @click="handleShowOverlay">显示自定义层级遮罩</JvButton>
        
        <JvOverlay 
          v-model:model-value="visible" 
          :mask-z-index="2000"
        >
          <div class="overlay-content">
            <p>这是具有自定义z-index的遮罩层内容</p>
            <p>当前遮罩层z-index: 2000</p>
            <p>当前内容z-index: 2001</p>
            <JvButton @click="handleHideOverlay">关闭</JvButton>
          </div>
        </JvOverlay>
      </div>
    `,
  }),
}

// 事件监听
export const Events: Story = {
  render: args => ({
    components: { JvOverlay, JvButton },
    setup() {
      const visible = ref(false)
      const eventLogs = ref<string[]>([])

      const handleShowOverlay = () => {
        visible.value = true
      }

      const handleHideOverlay = () => {
        visible.value = false
      }

      const handleClickOverlay = () => {
        eventLogs.value.push(`[${new Date().toLocaleTimeString()}] 点击遮罩层事件 clickOverlay`)
        visible.value = false
      }

      const handleOpenAfter = () => {
        eventLogs.value.push(`[${new Date().toLocaleTimeString()}] 遮罩层打开后事件 openAfter`)
      }

      const handleCloseAfter = () => {
        eventLogs.value.push(`[${new Date().toLocaleTimeString()}] 遮罩层关闭后事件 closeAfter`)
      }

      const clearLogs = () => {
        eventLogs.value = []
      }

      return {
        args,
        visible,
        eventLogs,
        handleShowOverlay,
        handleHideOverlay,
        handleClickOverlay,
        handleOpenAfter,
        handleCloseAfter,
        clearLogs,
      }
    },
    template: `
      <div>
        <div style="margin-bottom: 20px;">
          <JvButton @click="handleShowOverlay" style="margin-right: 10px;">显示遮罩</JvButton>
          <JvButton @click="clearLogs" variant="outlined">清空日志</JvButton>
        </div>
        
        <div class="event-logs" style="margin-top: 20px; padding: 15px; border: 1px solid #eee; border-radius: 4px; height: 200px; overflow-y: auto;">
          <p v-if="eventLogs.length === 0" style="color: #888;">暂无事件日志</p>
          <div v-for="(log, index) in eventLogs" :key="index" style="margin-bottom: 5px;">
            {{ log }}
          </div>
        </div>
        
        <JvOverlay 
          v-model:model-value="visible" 
          @click-overlay="handleClickOverlay"
          @open-after="handleOpenAfter"
          @close-after="handleCloseAfter"
        >
          <div class="overlay-content">
            <h3>事件监听示例</h3>
            <p>请查看下方事件日志</p>
            <JvButton @click="handleHideOverlay">关闭遮罩</JvButton>
          </div>
        </JvOverlay>
      </div>
    `,
  }),
}
