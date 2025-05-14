import JvOverlay from '@components/jv-overlay/src/JvOverlay.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvCircleLoader from '../src/JvCircleLoader.vue'
import JvLineLoader from '../src/JvLineLoader.vue'
import JvLoader from '../src/JvLoader.vue'

describe('jvLoader', () => {
  // 基础渲染测试
  it('默认情况下不显示加载器', () => {
    const wrapper = mount(JvLoader)
    expect(wrapper.find('.jv-loader').exists()).toBe(false)
  })

  it('当 loading 属性为 true 时显示加载器', async () => {
    const wrapper = mount(JvLoader, {
      props: {
        loading: true,
      },
      global: {
        stubs: {
          JvOverlay: true,
        },
      },
    })

    expect(wrapper.findComponent(JvOverlay).exists()).toBe(true)
  })

  // Props 功能测试
  it('根据 placement 属性显示不同类型的加载器', async () => {
    const wrapper = mount(JvLoader, {
      props: {
        loading: true,
        placement: 'center',
      },
      global: {
        stubs: {
          JvOverlay: true,
          JvCircleLoader: true,
        },
      },
    })

    expect(wrapper.findComponent(JvCircleLoader).exists()).toBe(true)

    await wrapper.setProps({ placement: 'top' })
    expect(wrapper.findComponent(JvLineLoader).exists()).toBe(true)
  })

  it('正确传递 size 和 color 属性到 CircleLoader', async () => {
    const wrapper = mount(JvLoader, {
      props: {
        loading: true,
        size: 'large',
        color: 'success',
        placement: 'center',
      },
      global: {
        stubs: {
          JvOverlay: true,
        },
      },
    })

    const circleLoader = wrapper.findComponent(JvCircleLoader)
    expect(circleLoader.props('size')).toBe('large')
    expect(circleLoader.props('color')).toBe('success')
  })

  it('根据 target 属性设置正确的 teleport 目标', async () => {
    const wrapper = mount(JvLoader, {
      props: {
        loading: true,
        target: 'parent',
      },
      global: {
        stubs: {
          JvOverlay: true,
        },
      },
    })

    const overlay = wrapper.findComponent(JvOverlay)
    expect(overlay.props('target')).toBe('parent')

    await wrapper.setProps({ target: 'viewport' })
    expect(overlay.props('target')).toBe('viewport')
  })

  // 组件行为测试
  it('当没有默认插槽时，teleportTarget 为 viewport', () => {
    const wrapper = mount(JvLoader, {
      props: {
        loading: true,
      },
      global: {
        stubs: {
          JvOverlay: true,
        },
      },
    })

    const overlay = wrapper.findComponent(JvOverlay)
    expect(overlay.props('target')).toBe('viewport')
  })

  it('当有默认插槽时，teleportTarget 为 parent', () => {
    const wrapper = mount(JvLoader, {
      props: {
        loading: true,
      },
      slots: {
        default: '<div>加载内容</div>',
      },
      global: {
        stubs: {
          JvOverlay: true,
        },
      },
    })

    const overlay = wrapper.findComponent(JvOverlay)
    expect(overlay.props('target')).toBe('parent')
  })

  // 样式类名测试
  it('加载器应用正确的 CSS 类名', async () => {
    const wrapper = mount(JvLoader, {
      props: {
        loading: true,
      },
      global: {
        stubs: {
          JvOverlay: {
            template: '<div><slot :style="{}" /></div>',
          },
        },
      },
    })

    const loaderDiv = wrapper.find('.jv-loader')
    expect(loaderDiv.exists()).toBe(true)
    expect(loaderDiv.classes()).toContain('jv-loader')
    expect(loaderDiv.classes()).toContain('jv-loader--viewport')
  })
})
