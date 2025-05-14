import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvTag from '../src/JvTag.vue'

describe('jvTag', () => {
  it('渲染标签内容', () => {
    const wrapper = mount(JvTag, {
      props: {
        label: '测试标签',
      },
    })

    expect(wrapper.text()).toContain('测试标签')
    expect(wrapper.classes()).toContain('jv-tag')
    expect(wrapper.classes()).toContain('jv-tag--type-primary')
    expect(wrapper.classes()).toContain('jv-tag--variant-filled')
    expect(wrapper.classes()).toContain('jv-tag--size-medium')
    expect(wrapper.classes()).toContain('jv-tag--shape-square')
  })

  it('使用插槽渲染内容', () => {
    const wrapper = mount(JvTag, {
      slots: {
        default: '插槽内容',
      },
    })

    expect(wrapper.text()).toContain('插槽内容')
  })

  it('渲染带图标的标签', () => {
    const wrapper = mount(JvTag, {
      props: {
        label: '带图标标签',
        prependIcon: '$home',
      },
    })

    expect(wrapper.find('.jv-tag__prepend').exists()).toBe(true)
    expect(wrapper.find('.jv-icon').exists()).toBe(true)
  })

  it('渲染带徽标的标签', () => {
    const wrapper = mount(JvTag, {
      props: {
        label: '带徽标标签',
        badge: 5,
      },
    })

    expect(wrapper.find('.jv-tag__badge').exists()).toBe(true)
    expect(wrapper.find('.jv-tag__badge').text()).toBe('5')
  })

  it('渲染可关闭的标签', async () => {
    const onClickClose = vi.fn()
    const wrapper = mount(JvTag, {
      props: {
        label: '可关闭标签',
        closable: true,
        onClickClose,
      },
    })

    expect(wrapper.find('.jv-tag__close').exists()).toBe(true)

    await wrapper.find('.jv-tag__close').trigger('click')
    expect(onClickClose).toHaveBeenCalled()
    expect(wrapper.isVisible()).toBe(false)
  })

  it('渲染可选择的标签', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(JvTag, {
      props: {
        label: '可选择标签',
        selectable: true,
        onSelect,
      },
    })

    expect(wrapper.classes()).toContain('jv-tag--is-selectable')

    await wrapper.trigger('click')
    expect(onSelect).toHaveBeenCalledWith(true)
    expect(wrapper.classes()).toContain('jv-tag--is-selected')

    await wrapper.trigger('click')
    expect(onSelect).toHaveBeenCalledWith(false)
    expect(wrapper.classes()).not.toContain('jv-tag--is-selected')
  })

  it('响应selected属性变化', async () => {
    const wrapper = mount(JvTag, {
      props: {
        label: '可选择标签',
        selectable: true,
        selected: false,
      },
    })

    expect(wrapper.classes()).not.toContain('jv-tag--is-selected')

    await wrapper.setProps({ selected: true })
    expect(wrapper.classes()).toContain('jv-tag--is-selected')
  })
})
