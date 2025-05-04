import type { BadgeType } from '../src/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvBadge from '../src/JvBadge.vue'

describe('jvBadge', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvBadge)
    expect(wrapper.classes()).toContain('jv-badge')
  })

  it('renders content correctly', () => {
    const wrapper = mount(JvBadge, {
      props: { value: 5 }
    })

    const content = wrapper.find('.jv-badge__content')
    expect(content.exists()).toBe(true)
    expect(content.text()).toBe('5')
  })

  it('renders slot content', () => {
    const wrapper = mount(JvBadge, {
      props: { value: 5 },
      slots: {
        default: '<div class="test-content">测试内容</div>'
      }
    })

    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('测试内容')
  })

  it('applies max value when exceeded', () => {
    const wrapper = mount(JvBadge, {
      props: {
        value: 100,
        max: 99
      }
    })

    expect(wrapper.find('.jv-badge__content').text()).toBe('99+')
  })

  it('renders dot when dot is true', () => {
    const wrapper = mount(JvBadge, {
      props: { dot: true }
    })

    expect(wrapper.find('.jv-badge__content--is-dot').exists()).toBe(true)
    expect(wrapper.find('.jv-badge__content').text()).toBe('')
  })

  it('hides badge when hidden is true', () => {
    const wrapper = mount(JvBadge, {
      props: {
        value: 5,
        hidden: true
      }
    })

    expect(wrapper.find('.jv-badge__content').exists()).toBe(false)
  })

  it('applies different types', () => {
    const types: BadgeType[] = [
      'primary',
      'success',
      'warning',
      'danger',
      'info'
    ]

    types.forEach((type) => {
      const wrapper = mount(JvBadge, {
        props: {
          value: 5,
          type
        }
      })

      expect(wrapper.find(`.jv-badge__content--type-${type}`).exists()).toBe(
        true
      )
    })
  })

  it('applies custom offset', () => {
    const wrapper = mount(JvBadge, {
      props: {
        value: 5,
        offset: [10, 20]
      }
    })

    // 检查样式是否应用了自定义偏移
    const content = wrapper.find('.jv-badge__content')
    expect(content.attributes('style')).toContain('translate(10px, 20px)')
  })

  it('emits click event when badge is clicked', async () => {
    const wrapper = mount(JvBadge, {
      props: { value: 5 }
    })

    await wrapper.find('.jv-badge__content').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
