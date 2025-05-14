import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvSwitch from '../src/JvSwitch.vue'

describe('jvSwitch', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvSwitch)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('jv-switch')
    expect(wrapper.attributes('role')).toBe('switch')
    expect(wrapper.attributes('aria-checked')).toBe('false')
  })

  it('renders with the correct color class', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        color: 'success',
      },
    })
    expect(wrapper.classes()).toContain('jv-switch--color-success')
  })

  it('renders with the correct size class', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        size: 'large',
      },
    })
    expect(wrapper.classes()).toContain('jv-switch--size-large')
  })

  it('renders with the correct variant class', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        variant: 'outside',
      },
    })
    expect(wrapper.classes()).toContain('jv-switch--variant-outside')
  })

  it('renders as checked when modelValue is true', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-switch--is-checked')
    expect(wrapper.attributes('aria-checked')).toBe('true')
  })

  it('renders as disabled when disabled prop is true', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-switch--is-disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('renders active and inactive text when provided', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        activeText: '开启',
        inactiveText: '关闭',
      },
    })
    expect(wrapper.find('.jv-switch__text-on').text()).toBe('开启')
    expect(wrapper.find('.jv-switch__text-off').text()).toBe('关闭')
  })

  it('emits update:modelValue and change events when clicked', async () => {
    const wrapper = mount(JvSwitch)
    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()).toHaveProperty('click')

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    expect(wrapper.emitted('change')![0]).toEqual([true])
  })

  it('does not emit events when disabled', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        disabled: true,
      },
    })
    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    // Still emits click event even when disabled
    expect(wrapper.emitted('click')).toBeDefined()
  })

  it('can use custom active and inactive values', async () => {
    const wrapper = mount(JvSwitch, {
      props: {
        modelValue: false,
        activeValue: true,
        inactiveValue: false,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])

    await wrapper.setProps({ modelValue: true })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![1]).toEqual([false])
  })

  it('responds to keyboard events', async () => {
    const wrapper = mount(JvSwitch)

    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])

    await wrapper.trigger('keydown', { key: ' ' }) // Space key
    expect(wrapper.emitted('update:modelValue')![1]).toEqual([false])

    await wrapper.trigger('keydown', { key: 'a' }) // Random key
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2) // No additional event
  })

  it('can use custom string values', async () => {
    const wrapper = mount<any>(JvSwitch, {
      props: {
        modelValue: 'off',
        activeValue: 'on',
        inactiveValue: 'off',
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['on'])

    await wrapper.setProps({ modelValue: 'on' })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![1]).toEqual(['off'])
  })

  it('renders correctly with outside variant', () => {
    const wrapper = mount(JvSwitch, {
      props: {
        variant: 'outside',
        modelValue: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-switch--variant-outside')
    expect(wrapper.classes()).toContain('jv-switch--is-checked')
  })
})
