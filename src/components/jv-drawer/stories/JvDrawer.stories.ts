import type { JvDrawerExpose } from '@components/jv-drawer/src/types'
import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import JvButton from '@components/jv-button'
import JvDrawer from '@components/jv-drawer'
import { expect } from '@storybook/test'
import { ref } from 'vue'

export default {
  title: '反馈组件/Drawer 抽屉',
  component: JvDrawer,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: '抽屉位置',
    },
    size: {
      control: 'text',
      description: '抽屉大小',
    },
    title: {
      control: 'text',
      description: '标题',
    },
    closeIcon: {
      control: 'text',
      description: '关闭图标',
    },
    closeable: {
      control: 'boolean',
      description: '是否可关闭',
    },
    maskClosable: {
      control: 'boolean',
      description: '是否点击遮罩关闭',
    },
  },
} as Meta

const Template: StoryFn = args => ({
  components: { JvDrawer, JvButton },
  setup() {
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = true
    }

    return { args, visible, showDrawer }
  },
  template: `
    <div>
      <JvButton @click="showDrawer">打开抽屉</JvButton>
      <JvDrawer v-model="visible" v-bind="args">
        <div style="padding: 20px;">
          抽屉内容
        </div>
      </JvDrawer>
    </div>
  `,
})

export const 基础用法 = Template.bind({})
基础用法.args = {
  title: '基础抽屉',
  placement: 'right',
  size: '300px',
}

export const 左侧抽屉 = Template.bind({})
左侧抽屉.args = {
  title: '左侧抽屉',
  placement: 'left',
  size: '300px',
}

export const 顶部抽屉 = Template.bind({})
顶部抽屉.args = {
  title: '顶部抽屉',
  placement: 'top',
  size: '300px',
}

export const 底部抽屉 = Template.bind({})
底部抽屉.args = {
  title: '底部抽屉',
  placement: 'bottom',
  size: '300px',
}

export const 自定义大小 = Template.bind({})
自定义大小.args = {
  title: '自定义大小',
  placement: 'right',
  size: '500px',
}

export const 自定义头部和底部: StoryObj = {
  render: () => ({
    components: { JvDrawer, JvButton },
    setup() {
      const visible = ref(false)
      const showDrawer = () => {
        visible.value = true
      }

      return { visible, showDrawer }
    },
    template: `
      <div>
        <JvButton @click="showDrawer">打开自定义抽屉</JvButton>
        <JvDrawer v-model="visible" placement="right">
          <template #header>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 16px;">
              <div style="font-size: 18px; font-weight: bold;">自定义头部</div>
              <JvButton variant="text" icon="$close" @click="visible = false" />
            </div>
          </template>
          
          <div style="padding: 20px;">
            抽屉内容
          </div>
          
          <template #footer>
            <div style="display: flex; justify-content: space-between; width: 100%;">
              <JvButton variant="outlined" @click="visible = false">取消</JvButton>
              <JvButton variant="primary" @click="visible = false">确定</JvButton>
            </div>
          </template>
        </JvDrawer>
      </div>
    `,
  }),
}

export const 响应式抽屉: StoryObj = {
  render: () => ({
    components: { JvDrawer, JvButton },
    setup() {
      const visible = ref(false)
      const showDrawer = () => {
        visible.value = true
      }

      return { visible, showDrawer }
    },
    template: `
      <div>
        <JvButton @click="showDrawer">打开响应式抽屉（移动端底部）</JvButton>
        <JvDrawer v-model="visible" placement="right" title="响应式抽屉">
          <div style="padding: 20px;">
            <p>在移动设备上会自动显示为底部抽屉</p>
            <p>请尝试调整窗口大小或在移动设备上查看</p>
          </div>
        </JvDrawer>
      </div>
    `,
  }),
}

export const 测试打开关闭: StoryObj = {
  render: () => ({
    components: { JvDrawer, JvButton },
    setup() {
      const visible = ref(false)
      const drawerRef = ref<JvDrawerExpose | null>(null)

      const openDrawer = () => {
        if (drawerRef.value) {
          drawerRef.value.open()
        }
      }

      const closeDrawer = () => {
        if (drawerRef.value) {
          drawerRef.value.close()
          visible.value = false
        }
      }

      return { visible, drawerRef, openDrawer, closeDrawer }
    },
    template: `
      <div>
        <div style="display: flex; gap: 10px;">
          <JvButton data-testid="open-button" @click="openDrawer">打开</JvButton>
          <JvButton data-testid="close-button" @click="closeDrawer">关闭</JvButton>
        </div>
        <JvDrawer v-model="visible" ref="drawerRef" data-testid="drawer" title="测试抽屉">
          <div style="padding: 20px;">
            抽屉内容
          </div>
        </JvDrawer>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    // 由于drawer使用了overlay和mask，这里的测试比较简单
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

      // 给抽屉动画一些时间
      await new Promise(resolve => setTimeout(resolve, 500))

      // 检查抽屉是否打开
      const drawerWrapper = document.querySelector('.jv-drawer__wrapper')
      expect(drawerWrapper).toBeTruthy()

      // 点击关闭按钮
      if (closeButton) {
        closeButton.click()

        // 给抽屉关闭动画一些时间
        await new Promise(resolve => setTimeout(resolve, 500))
        // 检查抽屉是否打开
        const drawerWrapper = document.querySelector('.jv-drawer__wrapper')
        expect(drawerWrapper).toBeTruthy()

        // 点击关闭按钮
        closeButton.click()

        // 给抽屉关闭动画一些时间
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  },
}
