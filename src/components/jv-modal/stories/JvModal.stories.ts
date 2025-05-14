import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import type { JvModalExpose } from '../src/types'
import JvButton from '@components/jv-button'
import JvModal from '@components/jv-modal'
import { expect } from '@storybook/test'
import { ref } from 'vue'

export default {
  title: '反馈组件/Modal 模态框',
  component: JvModal,
  tags: ['autodocs'],
  argTypes: {
    closeable: {
      control: 'boolean',
      description: '是否可关闭',
    },
    closeIcon: {
      control: 'text',
      description: '关闭图标',
    },
    maskClosable: {
      control: 'boolean',
      description: '是否点击遮罩关闭',
    },
    cancelText: {
      control: 'text',
      description: '取消按钮文本',
    },
    confirmText: {
      control: 'text',
      description: '确认按钮文本',
    },
  },
} as Meta

const Template: StoryFn = args => ({
  components: { JvModal, JvButton },
  setup() {
    const visible = ref(false)
    const showModal = () => {
      visible.value = true
    }

    return { args, visible, showModal }
  },
  template: `
    <div>
      <JvButton @click="showModal">打开模态框</JvButton>
      <JvModal v-model="visible" v-bind="args">
        <template #title>
          {{ args.title || '提示' }}
        </template>
        <div style="min-width: 400px; padding: 20px 0;">
          {{ args.content || '这是一个模态框内容' }}
        </div>
      </JvModal>
    </div>
  `,
})

export const 基础用法 = Template.bind({})
基础用法.args = {
  title: '基础模态框',
  content: '这是一个基础模态框内容',
  closeable: true,
  maskClosable: true,
}

export const 自定义按钮文本 = Template.bind({})
自定义按钮文本.args = {
  title: '自定义按钮文本',
  content: '这是一个自定义按钮文本的模态框',
  cancelText: '返回',
  confirmText: '同意',
}

export const 不可点击遮罩关闭 = Template.bind({})
不可点击遮罩关闭.args = {
  title: '不可点击遮罩关闭',
  content: '点击遮罩不会关闭模态框',
  maskClosable: false,
}

export const 不显示关闭按钮 = Template.bind({})
不显示关闭按钮.args = {
  title: '不显示关闭按钮',
  content: '模态框不显示右上角关闭按钮',
  closeable: false,
}

export const 自定义头部和底部: StoryObj = {
  render: () => ({
    components: { JvModal, JvButton },
    setup() {
      const visible = ref(false)
      const showModal = () => {
        visible.value = true
      }

      return { visible, showModal }
    },
    template: `
      <div>
        <JvButton @click="showModal">打开自定义模态框</JvButton>
        <JvModal v-model="visible">
          <template #header>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 16px; width: 100%;">
              <div style="font-size: 20px; font-weight: bold; color: #1976d2;">自定义头部</div>
              <JvButton variant="text" icon="$close" @click="visible = false" />
            </div>
          </template>
          
          <div style="padding: 20px; min-width: 400px;">
            <p>这是自定义头部和底部的模态框内容</p>
          </div>
          
          <template #footer>
            <div style="display: flex; justify-content: space-between; width: 100%; padding: 0 16px;">
              <JvButton variant="text" @click="visible = false">取消</JvButton>
              <div>
                <JvButton variant="outlined" style="margin-right: 8px;" @click="visible = false">上一步</JvButton>
                <JvButton variant="primary" @click="visible = false">下一步</JvButton>
              </div>
            </div>
          </template>
        </JvModal>
      </div>
    `,
  }),
}

export const 确认对话框: StoryObj = {
  render: () => ({
    components: { JvModal, JvButton },
    setup() {
      const visible = ref(false)
      const showModal = () => {
        visible.value = true
      }

      const handleConfirm = () => {
        // 此处可以添加确认操作逻辑
        visible.value = false
      }

      const handleCancel = () => {
        // 此处可以添加取消操作逻辑
        visible.value = false
      }

      return { visible, showModal, handleConfirm, handleCancel }
    },
    template: `
      <div>
        <JvButton @click="showModal">打开确认对话框</JvButton>
        <JvModal 
          v-model="visible" 
          @confirm="handleConfirm"
          @cancel="handleCancel"
          confirmText="确认删除"
          cancelText="我再想想"
        >
          <template #title>
            <span style="color: #ff5252;">删除确认</span>
          </template>
          <div style="min-width: 400px; padding: 20px 0;">
            <p>您确定要删除这条数据吗？此操作不可逆！</p>
          </div>
        </JvModal>
      </div>
    `,
  }),
}

export const 测试打开关闭: StoryObj = {
  render: () => ({
    components: { JvModal, JvButton },
    setup() {
      const visible = ref(false)
      const modalRef = ref<JvModalExpose | null>(null)

      const openModal = () => {
        if (modalRef.value) {
          modalRef.value.open()
        }
      }

      const closeModal = () => {
        if (modalRef.value) {
          modalRef.value.close()
        }
      }

      return { visible, modalRef, openModal, closeModal }
    },
    template: `
      <div>
        <div style="display: flex; gap: 10px;">
          <JvButton data-testid="open-button" @click="openModal">打开</JvButton>
          <JvButton data-testid="close-button" @click="closeModal">关闭</JvButton>
        </div>
        <JvModal v-model="visible" ref="modalRef" data-testid="modal">
          <template #title>测试模态框</template>
          <div style="min-width: 400px; padding: 20px 0;">
            测试内容
          </div>
        </JvModal>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    // 由于modal使用了overlay和mask，这里的测试比较简单
    const canvas = canvasElement as HTMLElement
    const openButton = canvas.querySelector(
      '[data-testid="open-button"]',
    ) as HTMLElement
    const closeButton = canvas.querySelector(
      '[data-testid="close-button"]',
    ) as HTMLElement

    // 点击打开按钮
    if (openButton) {
      openButton.click()

      // 给模态框动画一些时间
      await new Promise(resolve => setTimeout(resolve, 500))

      // 检查模态框是否打开
      const modalWrapper = document.querySelector('.jv-modal__wrapper')
      expect(modalWrapper).toBeTruthy()

      // 点击关闭按钮
      if (closeButton) {
        closeButton.click()

        // 给模态框关闭动画一些时间
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  },
}
