import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { JvIcon } from '@/components/components'
import JvIconify from '@/components/jv-icon/src/JvIconify.vue'

describe('基本渲染和插槽', () => {
  it('应该正确渲染基本组件', () => {
    const wrapper = mount(JvIcon)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('jv-icon')
  })

  it('应该渲染内部图标', () => {
    const wrapper = mount(JvIcon, {
      props: { name: '$close' },
    })
    expect(wrapper.text()).toContain('close-icon')
  })

  it('应该渲染外部图标', () => {
    const wrapper = mount(JvIcon, {
      props: { name: 'mdi:home' },
    })
    expect(wrapper.findComponent(JvIconify).exists()).toBe(true)
    expect(wrapper.findComponent(JvIconify).props('icon')).toBe('mdi:home')
  })

  it('应该渲染默认插槽内容', () => {
    const wrapper = mount(JvIcon, {
      slots: {
        default: '<svg data-test="custom-icon"></svg>',
      },
    })
    expect(wrapper.find('[data-test="custom-icon"]').exists()).toBe(true)
  })
})

describe('属性设置和默认值', () => {
  it('应该使用默认属性值', () => {
    const wrapper = mount(JvIcon)
    expect(wrapper.classes()).toContain('jv-icon--size-medium')

    // 测试默认值
    const vm = wrapper.vm as any
    expect(vm.color).toBe('primary')
    expect(vm.size).toBe('medium')
    expect(vm.rotate).toBe(0)
    expect(vm.flip).toBe(false)
    expect(vm.spin).toBe(false)
    expect(vm.disabled).toBe(false)
  })

  it('应该正确设置尺寸属性', () => {
    const sizes = ['tiny', 'small', 'medium', 'large', 'xlarge']

    sizes.forEach((size) => {
      const wrapper = mount(JvIcon, {
        props: { size },
      })
      expect(wrapper.classes()).toContain(`jv-icon--size-${size}`)
    })

    // 测试自定义数值尺寸
    const wrapper = mount(JvIcon, {
      props: { size: 42 },
    })
    expect(wrapper.attributes('style')).toContain('--jv-icon-size: 42px')
  })

  it('应该正确设置颜色属性', () => {
    const wrapper = mount(JvIcon, {
      props: { color: 'error' },
    })
    expect(wrapper.classes()).toContain('jv-icon--color-error')

    // 测试十六进制颜色
    const hexWrapper = mount(JvIcon, {
      props: { color: '#ff0000' },
    })
    expect(hexWrapper.attributes('style')).toContain('color: #ff0000')
  })

  it('应该正确设置其他属性', () => {
    const wrapper = mount(JvIcon, {
      props: {
        rotate: 45,
        flip: true,
        spin: true,
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('jv-icon--flip')
    expect(wrapper.classes()).toContain('jv-icon--spin')
    expect(wrapper.classes()).toContain('jv-icon--disabled')
    expect(wrapper.attributes('style')).toContain('--jv-icon-rotate: 45deg')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })
})

describe('固定状态逻辑', () => {
  it('应该正确处理内部图标识别', () => {
    const internalWrapper = mount(JvIcon, {
      props: { name: '$close' },
    })
    expect(internalWrapper.text()).toContain('close-icon')

    const externalWrapper = mount(JvIcon, {
      props: { name: 'mdi:home' },
    })
    expect(externalWrapper.findComponent(JvIconify).exists()).toBe(true)
  })

  it('应该优先渲染插槽内容', () => {
    const wrapper = mount(JvIcon, {
      props: { name: 'mdi:home' },
      slots: {
        default: '<div data-test="slot-content">插槽内容</div>',
      },
    })

    expect(wrapper.find('[data-test="slot-content"]').exists()).toBe(true)
    expect(wrapper.findComponent(JvIconify).exists()).toBe(false)
  })

  it('当disabled为true时应该应用禁用状态', () => {
    const wrapper = mount(JvIcon, {
      props: { disabled: true },
    })

    expect(wrapper.classes()).toContain('jv-icon--disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('当spin为true时rotate属性不应影响样式类', () => {
    const wrapper = mount(JvIcon, {
      props: {
        spin: true,
        rotate: 45,
      },
    })

    expect(wrapper.classes()).toContain('jv-icon--spin')
    expect(wrapper.classes()).not.toContain('jv-icon--rotate')
  })
})

describe('事件触发', () => {
  it('应该正确触发点击事件', async () => {
    const wrapper = mount(JvIcon)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('禁用状态下仍然允许点击事件', async () => {
    const wrapper = mount(JvIcon, {
      props: { disabled: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('应该正确触发键盘事件', async () => {
    const wrapper = mount(JvIcon)
    await wrapper.trigger('keydown.enter')
    expect(wrapper.emitted('keydown')).toBeTruthy()
  })

  it('应该正确触发焦点事件', async () => {
    const wrapper = mount(JvIcon)
    await wrapper.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await wrapper.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})

describe('样式应用', () => {
  it('应该应用正确的尺寸CSS变量', () => {
    const wrapper = mount(JvIcon, {
      props: { size: 'large' },
    })
    expect(wrapper.classes()).toContain('jv-icon--size-large')

    const customSizeWrapper = mount(JvIcon, {
      props: { size: 50 },
    })
    expect(customSizeWrapper.attributes('style')).toContain('--jv-icon-size: 50px')
  })

  it('应该应用正确的旋转CSS变量', () => {
    const wrapper = mount(JvIcon, {
      props: { rotate: 90 },
    })
    expect(wrapper.attributes('style')).toContain('--jv-icon-rotate: 90deg')
    expect(wrapper.classes()).toContain('jv-icon--rotate')
  })

  it('应该正确应用翻转样式', () => {
    const wrapper = mount(JvIcon, {
      props: { flip: true },
    })
    expect(wrapper.classes()).toContain('jv-icon--flip')
  })

  it('应该正确应用旋转动画样式', () => {
    const wrapper = mount(JvIcon, {
      props: { spin: true },
    })
    expect(wrapper.classes()).toContain('jv-icon--spin')
  })

  it('应该正确应用禁用样式', () => {
    const wrapper = mount(JvIcon, {
      props: { disabled: true },
    })
    expect(wrapper.classes()).toContain('jv-icon--disabled')
  })

  it('应该正确处理颜色样式', () => {
    const wrapper = mount(JvIcon, {
      props: { color: 'error' },
    })
    expect(wrapper.classes()).toContain('jv-icon--color-error')

    const hexColorWrapper = mount(JvIcon, {
      props: { color: '#ff0000' },
    })
    expect(hexColorWrapper.attributes('style')).toContain('color: #ff0000')
    expect(hexColorWrapper.classes()).not.toContain('jv-icon--color-#ff0000')
  })
})

describe('生命周期钩子', () => {
  it('应该在挂载时正确计算内部属性', () => {
    const wrapper = mount(JvIcon, {
      props: { name: '$close' },
    })

    const vm = wrapper.vm as any
    expect(vm.hasInnerIcon).toBe(true)
    expect(vm.showExternalIcon).toBe(false)
    expect(vm.internalIconVnode.value).not.toBeNull()
  })

  it('应该在属性变化时重新计算依赖属性', async () => {
    const wrapper = mount(JvIcon, {
      props: { name: 'mdi:home' },
    })

    const vm = wrapper.vm as any
    expect(vm.hasInnerIcon).toBe(false)
    expect(vm.showExternalIcon).toBe(true)

    await wrapper.setProps({ name: '$close' })
    expect(vm.hasInnerIcon).toBe(true)
    expect(vm.showExternalIcon).toBe(false)
  })

  it('应该在尺寸变化时更新CSS变量', async () => {
    const wrapper = mount(JvIcon, {
      props: { size: 'small' },
    })

    expect(wrapper.classes()).toContain('jv-icon--size-small')

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.classes()).toContain('jv-icon--size-large')
    expect(wrapper.classes()).not.toContain('jv-icon--size-small')

    await wrapper.setProps({ size: 42 })
    expect(wrapper.attributes('style')).toContain('--jv-icon-size: 42px')
    expect(wrapper.classes()).not.toContain('jv-icon--size-large')
  })
})
