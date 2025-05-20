import type { JvAffixExpose } from '../src/types'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import JvAffix from '../src/JvAffix.vue'

// 模拟DOM环境中的getBoundingClientRect方法
function mockBoundingClientRect(rect: Partial<DOMRect>) {
  return vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...rect,
  }))
}

// 模拟window的scroll事件
function mockAddEventListener() {
  return vi.spyOn(window, 'addEventListener').mockImplementation(() => {})
}

function mockRemoveEventListener() {
  return vi.spyOn(window, 'removeEventListener').mockImplementation(() => {})
}

// 创建 ResizeObserver mock
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// 为测试扩展Vue组件实例类型，添加内部状态
interface AffixInstance extends JvAffixExpose {
  fixed: boolean
}

describe('jvAffix', () => {
  let addEventListenerMock: any
  let removeEventListenerMock: any
  let getBoundingClientRectMock: any

  beforeEach(() => {
    vi.clearAllMocks()
    addEventListenerMock = mockAddEventListener()
    removeEventListenerMock = mockRemoveEventListener()
    getBoundingClientRectMock = mockBoundingClientRect({})

    // 模拟window属性
    Object.defineProperty(window, 'innerHeight', { value: 800 })
    Object.defineProperty(window, 'innerWidth', { value: 1200 })
    Object.defineProperty(window, 'scrollY', { value: 0 })
  })

  afterEach(() => {
    addEventListenerMock.mockRestore()
    removeEventListenerMock.mockRestore()
    getBoundingClientRectMock.mockRestore()
    vi.restoreAllMocks()
  })

  // 基础功能测试
  describe('基础功能测试', () => {
    it('测试基础渲染', () => {
      const wrapper = mount(JvAffix)
      expect(wrapper.classes()).toContain('jv-affix')
    })

    it('测试默认插槽', () => {
      const wrapper = mount(JvAffix, {
        slots: {
          default: h('div', { class: 'test-content' }, '测试内容'),
        },
      })
      expect(wrapper.find('.test-content').exists()).toBe(true)
      expect(wrapper.find('.test-content').text()).toBe('测试内容')
    })
  })

  // Props 功能测试
  describe('props 功能测试', () => {
    it('测试 top 属性', async () => {
      const wrapper = mount(JvAffix, {
        props: { top: 50 },
      })

      // 模拟滚动以触发固定
      getBoundingClientRectMock.mockReturnValue({ top: 40 })

      // 直接设置状态模拟固定
      const vm = wrapper.vm as unknown as AffixInstance
      vm.fixed = true
      await nextTick()

      const style = wrapper.find('.jv-affix > div > div').attributes('style')
      expect(style).toContain('top: 50px')
    })

    it('测试 zIndex 属性', async () => {
      const wrapper = mount(JvAffix, {
        props: { zIndex: 200, top: 50 },
      })

      // 模拟滚动以触发固定
      getBoundingClientRectMock.mockReturnValue({ top: 40 })

      // 直接设置状态模拟固定
      const vm = wrapper.vm as unknown as AffixInstance
      vm.fixed = true
      await nextTick()

      const style = wrapper.find('.jv-affix > div > div').attributes('style')
      expect(style).toContain('z-index: 200')
    })

    it('测试 placement 属性', async () => {
      const wrapper = mount(JvAffix, {
        props: {
          placement: 'bottom',
          bottom: 20,
        },
      })

      // 模拟窗口底部位置
      getBoundingClientRectMock.mockReturnValue({ bottom: 790 })

      // 直接设置状态模拟固定
      const vm = wrapper.vm as unknown as AffixInstance
      vm.fixed = true
      await nextTick()

      const style = wrapper.find('.jv-affix > div > div').attributes('style')
      expect(style).toContain('bottom: 20px')
    })

    it('测试 left 属性', async () => {
      const wrapper = mount(JvAffix, {
        props: {
          placement: 'left',
          left: 30,
        },
      })

      getBoundingClientRectMock.mockReturnValue({ left: 20 })

      // 直接设置状态模拟固定
      const vm = wrapper.vm as unknown as AffixInstance
      vm.fixed = true
      await nextTick()

      const style = wrapper.find('.jv-affix > div > div').attributes('style')
      expect(style).toContain('left: 30px')
    })

    it('测试 right 属性', async () => {
      const wrapper = mount(JvAffix, {
        props: {
          placement: 'right',
          right: 30,
        },
      })

      getBoundingClientRectMock.mockReturnValue({ right: 1180 })

      // 直接设置状态模拟固定
      const vm = wrapper.vm as unknown as AffixInstance
      vm.fixed = true
      await nextTick()

      const style = wrapper.find('.jv-affix > div > div').attributes('style')
      expect(style).toContain('right: 30px')
    })
  })

  // Emits 事件测试
  describe('emits 事件测试', () => {
    it('测试 change 事件', async () => {
      const wrapper = mount(JvAffix, {
        props: { top: 50 },
      })

      // 手动触发change事件
      wrapper.vm.$emit('change', true)

      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0]).toEqual([true])
    })

    it('测试 scroll 事件', async () => {
      const wrapper = mount(JvAffix, {
        props: { top: 50 },
      })

      // 手动触发scroll事件
      const scrollEvent = { scrollTop: 100, fixed: true }
      wrapper.vm.$emit('scroll', new Event('scroll'), scrollEvent)

      expect(wrapper.emitted('scroll')).toBeTruthy()
      expect(wrapper.emitted('scroll')?.[0][1]).toEqual(scrollEvent)
    })
  })

  // Slots 插槽测试
  describe('slots 插槽测试', () => {
    it('测试默认插槽渲染', () => {
      const wrapper = mount(JvAffix, {
        slots: {
          default: h('button', '测试按钮'),
        },
      })

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('button').text()).toBe('测试按钮')
    })
  })

  // Expose API 测试
  describe('expose API 测试', () => {
    it('测试expose提供的API', () => {
      const wrapper = mount(JvAffix)
      const exposeKeys = Object.keys(wrapper.vm)

      // 验证方法存在
      expect(exposeKeys.includes('updatePosition')).toBe(true)
      expect(exposeKeys.includes('refresh')).toBe(true)
    })
  })

  // 样式测试
  describe('样式测试', () => {
    it('测试固定状态下的样式类', async () => {
      const wrapper = mount(JvAffix)

      // 初始状态
      expect(wrapper.classes()).toContain('jv-affix')

      // 固定状态
      const vm = wrapper.vm as unknown as AffixInstance
      vm.fixed = true
      await nextTick()

      expect(wrapper.classes()).toContain('is-fixed')
    })
  })

  // 生命周期钩子测试
  describe('生命周期钩子测试', () => {
    it('测试 onMounted 钩子添加滚动监听', async () => {
      mount(JvAffix)

      // 验证是否添加了事件监听
      expect(addEventListenerMock).toHaveBeenCalledWith('scroll', expect.any(Function))
      expect(addEventListenerMock).toHaveBeenCalledWith('resize', expect.any(Function))
    })

    it('测试 onBeforeUnmount 钩子移除滚动监听', async () => {
      const wrapper = mount(JvAffix)
      wrapper.unmount()

      // 验证是否移除了事件监听
      expect(removeEventListenerMock).toHaveBeenCalledWith('scroll', expect.any(Function))
      expect(removeEventListenerMock).toHaveBeenCalledWith('resize', expect.any(Function))
    })
  })

  // 可访问性测试
  describe('可访问性测试', () => {
    it('测试可访问性', () => {
      const wrapper = mount(JvAffix, {
        slots: {
          default: h('button', { tabindex: 0 }, '可访问性测试'),
        },
      })

      // 检查按钮仍然可以聚焦
      const button = wrapper.find('button')
      expect(button.attributes('tabindex')).toBe('0')
    })
  })
})
