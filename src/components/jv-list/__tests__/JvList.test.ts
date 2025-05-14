import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import JvList from '../src/JvList.vue'
import JvListItem from '../src/JvListItem.vue'

describe('jvList', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvList)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes()).toContain('jv-list')
  })

  it('renders with bordered prop', () => {
    const wrapper = mount(JvList, {
      props: {
        bordered: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-list--bordered')
  })

  it('renders with rounded prop', () => {
    const wrapper = mount(JvList, {
      props: {
        rounded: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-list--rounded')
  })

  it('renders with divided prop', () => {
    const wrapper = mount(JvList, {
      props: {
        divided: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-list--divided')
  })

  it('renders with disabled prop', () => {
    const wrapper = mount(JvList, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-list--disabled')
  })

  it('renders with color prop', () => {
    const wrapper = mount(JvList, {
      props: {
        color: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('jv-list--color-primary')
  })

  it('renders with maxHeight prop', () => {
    const wrapper = mount(JvList, {
      props: {
        maxHeight: 200,
      },
    })
    expect(wrapper.element.style.maxHeight).toBe('200px')
    expect(wrapper.element.style.overflow).toBe('auto')
  })

  it('renders list items correctly', () => {
    const wrapper = mount(JvList, {
      slots: {
        default: () => [
          h(JvListItem, { title: 'Item 1' }),
          h(JvListItem, { title: 'Item 2' }),
        ],
      },
    })
    expect(wrapper.findAllComponents(JvListItem)).toHaveLength(2)
  })

  it('renders header and footer slots', () => {
    const wrapper = mount(JvList, {
      slots: {
        default: '<div>Default content</div>',
        header: '<div class="custom-header">Header</div>',
        footer: '<div class="custom-footer">Footer</div>',
      },
    })
    expect(wrapper.find('.jv-list__header').exists()).toBe(true)
    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.jv-list__footer').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
  })
})
