import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import JvTooltip from '../JvTooltip.vue'

// 模拟DOM方法和事件

describe('jvTooltip', () => {
  beforeEach(() => {
    // 清理挂载到body的DOM
    document.body.innerHTML = ''

    // 模拟DOMRect
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      width: 100,
      height: 50,
      top: 100,
      left: 100,
      right: 200,
      bottom: 150,
      x: 100,
      y: 100,
      toJSON: () => {},
    }))
  })

  // 基础渲染测试
  it('正确渲染触发元素和tooltip内容', async () => {
    const wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('触发按钮')

    // 由于teleport，需要直接在DOM中查找内容
    // 通过设置v-model的值来控制显示
    await wrapper.setProps({ show: true })
    await nextTick()

    const tooltipContent = document.querySelector('.jv-tooltip__content')
    expect(tooltipContent).not.toBeNull()
    expect(tooltipContent?.textContent?.trim()).toBe('测试提示')
  })

  // 测试不同触发方式
  it('支持hover触发方式', async () => {
    const wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
        triggerMethod: 'hover',
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
      attachTo: document.body,
    })

    const button = wrapper.find('button')

    // 模拟hover
    await button.trigger('mouseenter')
    await nextTick()
    // 检查是否在DOM中出现
    const tooltipAfterHover = document.querySelector('.jv-tooltip')
    expect(tooltipAfterHover).not.toBeNull()

    // 模拟离开
    await button.trigger('mouseleave')
    await nextTick()
    const tooltipAfterLeave = document.querySelector('.jv-tooltip')
    expect(tooltipAfterLeave).toBeNull()
  })

  it('支持click触发方式', async () => {
    const wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
        triggerMethod: 'click',
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
      attachTo: document.body,
    })

    const button = wrapper.find('button')

    // 模拟点击
    await button.trigger('click')
    await nextTick()
    const tooltipAfterClick = document.querySelector('.jv-tooltip')
    expect(tooltipAfterClick).not.toBeNull()

    // 再次点击
    await button.trigger('click')
    await nextTick()
    const tooltipAfterSecondClick = document.querySelector('.jv-tooltip')
    expect(tooltipAfterSecondClick).toBeNull()
  })

  it('支持focus触发方式', async () => {
    const wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
        triggerMethod: 'focus',
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
      attachTo: document.body,
    })

    const button = wrapper.find('button')

    // 模拟聚焦
    await button.trigger('focus')
    await nextTick()
    const tooltipAfterFocus = document.querySelector('.jv-tooltip')
    expect(tooltipAfterFocus).not.toBeNull()

    // 模拟失焦
    await button.trigger('blur')
    await nextTick()
    const tooltipAfterBlur = document.querySelector('.jv-tooltip')
    expect(tooltipAfterBlur).toBeNull()
  })

  it('支持contextmenu触发方式', async () => {
    const wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
        triggerMethod: 'contextmenu',
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
      attachTo: document.body,
    })

    const button = wrapper.find('button')

    // 模拟右键点击
    await button.trigger('contextmenu')
    await nextTick()
    const tooltipAfterContextMenu = document.querySelector('.jv-tooltip')
    expect(tooltipAfterContextMenu).not.toBeNull()

    // 再次右键点击
    await button.trigger('contextmenu')
    await nextTick()
    const tooltipAfterSecondContextMenu = document.querySelector('.jv-tooltip')
    expect(tooltipAfterSecondContextMenu).toBeNull()
  })

  // 测试位置和箭头显示
  it('正确应用placement属性', async () => {
    const _wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
        placement: 'bottom',
        show: true,
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
      attachTo: document.body,
    })

    await nextTick()

    // 等待floating-ui更新位置
    await new Promise(resolve => setTimeout(resolve, 50))

    const tooltipContent = document.querySelector('.jv-tooltip__content')
    expect(tooltipContent).not.toBeNull()
    expect(tooltipContent?.getAttribute('data-placement')).toBe('bottom')
  })

  it('showArrow属性控制箭头显示', async () => {
    const wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
        showArrow: true,
        show: true,
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
      attachTo: document.body,
    })

    await nextTick()

    const arrow = document.querySelector('.jv-tooltip__arrow')
    expect(arrow).not.toBeNull()

    // 设置不显示箭头
    await wrapper.setProps({ showArrow: false })
    await nextTick()

    const arrowAfterUpdate = document.querySelector('.jv-tooltip__arrow')
    expect(arrowAfterUpdate).toBeNull()
  })

  // 测试自定义样式
  it('支持设置maxWidth', async () => {
    const _wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
        maxWidth: '200px',
        show: true,
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
      attachTo: document.body,
    })

    await nextTick()

    const content = document.querySelector('.jv-tooltip__content')
    expect(content).not.toBeNull()
    expect(content?.getAttribute('style')).toContain('max-width: 200px')
  })

  // 测试插槽内容
  it('支持content插槽', async () => {
    const _wrapper = mount(JvTooltip, {
      props: {
        show: true,
      },
      slots: {
        default: '<button>触发按钮</button>',
        content: '<div class="custom-content">自定义内容</div>',
      },
      attachTo: document.body,
    })

    await nextTick()

    const customContent = document.querySelector('.custom-content')
    expect(customContent).not.toBeNull()
    expect(customContent?.textContent).toBe('自定义内容')
  })

  // 测试外部控制
  it('可以通过v-model控制显示状态', async () => {
    const wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
        show: true,
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
      attachTo: document.body,
    })

    await nextTick()
    const tooltipBeforeUpdate = document.querySelector('.jv-tooltip')
    expect(tooltipBeforeUpdate).not.toBeNull()

    await wrapper.setProps({ show: false })
    await nextTick()
    const tooltipAfterUpdate = document.querySelector('.jv-tooltip')
    expect(tooltipAfterUpdate).toBeNull()
  })

  // 测试referenceRect属性
  it('支持使用referenceRect属性', async () => {
    const referenceRect = {
      width: 100,
      height: 50,
      top: 200,
      left: 200,
      right: 300,
      bottom: 250,
      x: 200,
      y: 200,
      toJSON: () => {},
    } as DOMRect

    const _wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
        referenceRect,
      },
      attachTo: document.body,
    })

    // 当提供referenceRect时，tooltip应自动显示
    await nextTick()
    const tooltip = document.querySelector('.jv-tooltip')
    expect(tooltip).not.toBeNull()
  })

  // 测试清理
  it('组件卸载时清理资源', async () => {
    const appendChildSpy = vi.spyOn(document.body, 'appendChild')
    const removeChildSpy = vi.spyOn(document.body, 'removeChild')

    const wrapper = mount(JvTooltip, {
      props: {
        content: '测试提示',
      },
      slots: {
        default: '<button>触发按钮</button>',
      },
      attachTo: document.body,
    })

    expect(appendChildSpy).toHaveBeenCalled()

    wrapper.unmount()
    expect(removeChildSpy).toHaveBeenCalled()
  })
})
