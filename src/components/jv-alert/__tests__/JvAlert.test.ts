import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvAlert from '../src/JvAlert.vue'

describe('jvAlert', () => {
  // 基本渲染测试
  it('renders correctly with default props', () => {
    const wrapper = mount(JvAlert)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('jv-alert')
    expect(wrapper.classes()).toContain('jv-alert--type-info')
  })

  // 测试插槽内容
  it('renders slot content correctly', () => {
    const wrapper = mount(JvAlert, {
      slots: {
        default: 'Test alert content',
      },
    })
    expect(wrapper.text()).toContain('Test alert content')
  })

  // 测试标题属性和插槽
  it('renders title prop and slot correctly', () => {
    const wrapperWithProp = mount(JvAlert, {
      props: {
        title: 'Test Title',
      },
    })
    expect(wrapperWithProp.find('.jv-alert__title').text()).toBe('Test Title')

    const wrapperWithSlot = mount(JvAlert, {
      slots: {
        title: 'Custom Title Slot',
      },
    })
    expect(wrapperWithSlot.find('.jv-alert__title').text()).toBe('Custom Title Slot')
  })

  // 测试不同类型
  it('renders different types correctly', () => {
    const types = ['success', 'warning', 'info', 'error'] as const
    types.forEach((type) => {
      const wrapper = mount(JvAlert, {
        props: { type },
      })
      expect(wrapper.classes()).toContain(`jv-alert--type-${type}`)
    })
  })

  // 测试轮廓风格
  it('applies outlined style when specified', () => {
    const wrapper = mount(JvAlert, {
      props: {
        outlined: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-alert--outlined')
  })

  // 测试可关闭功能
  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(JvAlert, {
      props: {
        closable: true,
      },
    })

    expect(wrapper.find('.jv-alert__close').exists()).toBe(true)
    await wrapper.find('.jv-alert__close').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('close')
    expect(wrapper.emitted()).toHaveProperty('update:visible')
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
  })

  // 测试图标显示
  it('shows and hides icon based on showIcon prop', () => {
    const wrapperWithIcon = mount(JvAlert, {
      props: {
        showIcon: true,
      },
    })
    expect(wrapperWithIcon.find('.jv-alert__icon').exists()).toBe(true)

    const wrapperWithoutIcon = mount(JvAlert, {
      props: {
        showIcon: false,
      },
    })
    expect(wrapperWithoutIcon.find('.jv-alert__icon').exists()).toBe(false)
  })

  // 测试自定义颜色
  it('applies custom color and background when specified', () => {
    const wrapper = mount(JvAlert, {
      props: {
        color: '#ff0000',
        background: '#f5f5f5',
      },
    })

    const styles = wrapper.attributes('style')
    expect(styles).toContain('background-color: #f5f5f5')
    expect(styles).toContain('border-color: #ff0000')
  })

  // 测试可见性控制
  it('hides when visible prop is false', () => {
    const wrapper = mount(JvAlert, {
      props: {
        visible: false,
      },
    })

    expect(wrapper.isVisible()).toBe(false)
  })
})
