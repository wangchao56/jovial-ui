import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvMenu from '../src/JvMenu.vue'

describe('jvMenu', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvMenu, {
      slots: {
        default: '<button>触发器</button>',
        content: '<div>菜单内容</div>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.jv-menu__trigger').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('触发器')
  })

  it('shows menu when trigger is clicked', async () => {
    const wrapper = mount(JvMenu, {
      props: {
        trigger: 'click',
      },
      slots: {
        default: '<button>触发器</button>',
        content: '<div>菜单内容</div>',
      },
    })

    await wrapper.find('.jv-menu__trigger').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('show')).toBeTruthy()
  })

  it('shows menu when trigger is hovered', async () => {
    const wrapper = mount(JvMenu, {
      props: {
        trigger: 'hover',
      },
      slots: {
        default: '<button>触发器</button>',
        content: '<div>菜单内容</div>',
      },
    })

    await wrapper.find('.jv-menu__trigger').trigger('mouseenter')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('show')).toBeTruthy()
  })

  it('respects disabled prop', async () => {
    const wrapper = mount(JvMenu, {
      props: {
        disabled: true,
      },
      slots: {
        default: '<button>触发器</button>',
        content: '<div>菜单内容</div>',
      },
    })

    await wrapper.find('.jv-menu__trigger').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('show')).toBeFalsy()
  })

  it('syncs with v-model', async () => {
    const wrapper = mount(JvMenu, {
      props: {
        modelValue: true,
      },
      slots: {
        default: '<button>触发器</button>',
        content: '<div>菜单内容</div>',
      },
    })

    // 使用类型断言访问内部属性
    expect((wrapper.vm as any).visible).toBe(true)

    await wrapper.setProps({ modelValue: false })
    expect((wrapper.vm as any).visible).toBe(false)
  })

  it('applies custom width and maxHeight', () => {
    const wrapper = mount(JvMenu, {
      props: {
        modelValue: true,
        width: '300px',
        maxHeight: '200px',
      },
      slots: {
        default: '<button>触发器</button>',
        content: '<div>菜单内容</div>',
      },
    })

    // 使用类型断言访问内部属性
    const contentStyle = (wrapper.vm as any).contentStyle
    expect(contentStyle.width).toBe('300px')
    expect(contentStyle.maxHeight).toBe('200px')
  })

  it('exposes public methods', () => {
    const wrapper = mount(JvMenu)

    // 确保公开的方法存在
    expect(typeof wrapper.vm.show).toBe('function')
    expect(typeof wrapper.vm.hide).toBe('function')
    expect(typeof wrapper.vm.toggle).toBe('function')

    // 测试方法调用
    wrapper.vm.show()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])

    wrapper.vm.hide()
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false])

    wrapper.vm.toggle()
    expect(wrapper.emitted('update:modelValue')?.[2]).toEqual([true])
  })

  it('closes menu when clicking outside', async () => {
    const clickOutsideSpy = vi.fn()

    const wrapper = mount(JvMenu, {
      props: {
        modelValue: true,
        onClickOutside: clickOutsideSpy,
      },
      slots: {
        default: '<button>触发器</button>',
        content: '<div>菜单内容</div>',
      },
      attachTo: document.body,
    })

    // 模拟点击外部
    const event = new MouseEvent('click')
    document.dispatchEvent(event)

    // 验证关闭事件被触发
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('applies correct ARIA attributes', async () => {
    const wrapper = mount(JvMenu, {
      slots: {
        default: '<button>触发器</button>',
        content: '<div>菜单内容</div>',
      },
    })

    const trigger = wrapper.find('.jv-menu__trigger')
    expect(trigger.attributes('role')).toBe('button')
    expect(trigger.attributes('aria-haspopup')).toBe('true')
    expect(trigger.attributes('aria-expanded')).toBe('false')

    await wrapper.setProps({ modelValue: true })
    expect(trigger.attributes('aria-expanded')).toBe('true')
  })
})
