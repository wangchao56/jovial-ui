import type { MessageType } from '../src/types'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import JvMessage from '../src/JvMessage.vue'

describe('jvMessage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly with default props', () => {
    const wrapper = mount(JvMessage, {
      slots: {
        default: '消息内容',
      },
    })

    expect(wrapper.text()).toContain('消息内容')
    expect(wrapper.classes()).toContain('jv-message')
    expect(wrapper.classes()).toContain('jv-message--type-info')
    expect(wrapper.find('.jv-message__icon').exists()).toBe(true)
  })

  it('renders with different types', () => {
    const types: MessageType[] = ['info', 'success', 'warning', 'error']

    types.forEach((type) => {
      const wrapper = mount(JvMessage, {
        props: { type },
        slots: {
          default: '消息内容',
        },
      })

      expect(wrapper.classes()).toContain(`jv-message--type-${type}`)
    })
  })

  it('respects showIcon prop', async () => {
    const wrapper = mount(JvMessage, {
      props: { showIcon: false },
      slots: {
        default: '消息内容',
      },
    })

    expect(wrapper.find('.jv-message__icon').exists()).toBe(false)

    await wrapper.setProps({ showIcon: true })
    expect(wrapper.find('.jv-message__icon').exists()).toBe(true)
  })

  it('respects closable prop', async () => {
    const wrapper = mount(JvMessage, {
      props: { closable: false },
    })

    expect(wrapper.find('.jv-message__close').exists()).toBe(false)

    await wrapper.setProps({ closable: true })
    expect(wrapper.find('.jv-message__close').exists()).toBe(true)
  })

  it('respects center prop', async () => {
    const wrapper = mount(JvMessage, {
      props: { center: true },
    })

    expect(wrapper.classes()).toContain('jv-message--is-center')

    await wrapper.setProps({ center: false })
    expect(wrapper.classes()).not.toContain('jv-message--is-center')
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(JvMessage, {
      props: { closable: true },
    })

    await wrapper.find('.jv-message__close').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('auto-closes after duration', async () => {
    const wrapper = mount(JvMessage, {
      props: { duration: 1000 },
    })

    expect(wrapper.isVisible()).toBe(true)

    // 快进1000ms
    vi.advanceTimersByTime(1000)
    await nextTick()

    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('does not auto-close when duration is 0', async () => {
    const wrapper = mount(JvMessage, {
      props: { duration: 0 },
    })

    expect(wrapper.isVisible()).toBe(true)

    // 快进5000ms
    vi.advanceTimersByTime(5000)
    await nextTick()

    expect(wrapper.emitted('close')).toBeFalsy()
  })
})
