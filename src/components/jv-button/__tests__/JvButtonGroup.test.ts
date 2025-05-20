import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Shape } from '@/constants'
import JvButton from '../src/JvButton.vue'
import JvButtonGroup from '../src/JvButtonGroup.vue'

describe('jvButtonGroup 组件', () => {
  // 基础渲染测试
  it('正确渲染基础结构', () => {
    const wrapper = mount(JvButtonGroup)

    expect(wrapper.classes()).toContain('jv-button-group')
    expect(wrapper.classes()).toContain('jv-button-group--direction-horizontal')
    expect(wrapper.classes()).toContain('jv-button-group--shape-square')
    expect(wrapper.attributes('role')).toBe('group')
  })

  // 插槽测试
  it('正确渲染默认插槽内容', () => {
    const wrapper = mount(JvButtonGroup, {
      slots: {
        default: '<div class="test-content">测试内容</div>',
      },
    })

    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('测试内容')
  })

  // 属性测试
  it('根据direction属性设置布局方向', async () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        direction: 'horizontal',
      },
    })

    expect(wrapper.classes()).toContain('jv-button-group--direction-horizontal')

    await wrapper.setProps({ direction: 'vertical' })
    expect(wrapper.classes()).toContain('jv-button-group--direction-vertical')
  })

  it('根据shape属性设置形状', async () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        shape: Shape.SQUARE,
      },
    })

    expect(wrapper.classes()).toContain('jv-button-group--shape-square')

    await wrapper.setProps({ shape: Shape.PILL })
    expect(wrapper.classes()).toContain('jv-button-group--shape-pill')
  })

  it('根据disabled属性设置禁用状态', async () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        disabled: false,
      },
    })

    expect(wrapper.classes()).not.toContain('jv-button-group--disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('false')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('jv-button-group--disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('根据attached属性设置紧凑模式', async () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        attached: false,
      },
    })

    expect(wrapper.classes()).not.toContain('jv-button-group--attached')

    await wrapper.setProps({ attached: true })
    expect(wrapper.classes()).toContain('jv-button-group--attached')
  })

  it('根据gap属性设置间距', async () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        gap: 10,
      },
    })

    expect(wrapper.attributes('style')).toContain('gap: 10px')

    await wrapper.setProps({ gap: '20rem' })
    expect(wrapper.attributes('style')).toContain('gap: 20rem')
  })

  // 与子按钮集成测试
  it('能够包含多个按钮', () => {
    const wrapper = mount(JvButtonGroup, {
      global: {
        stubs: {
          JvButton,
        },
      },
      slots: {
        default: `
          <JvButton content="按钮1" />
          <JvButton content="按钮2" />
          <JvButton content="按钮3" />
        `,
      },
    })

    const buttons = wrapper.findAllComponents(JvButton)
    expect(buttons.length).toBe(3)
  })

  it('自定义类名能够正确应用', async () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        customClass: 'test-class',
      },
    })

    expect(wrapper.classes()).toContain('test-class')

    await wrapper.setProps({ customClass: ['class1', 'class2'] })
    expect(wrapper.classes()).toContain('class1')
    expect(wrapper.classes()).toContain('class2')

    await wrapper.setProps({ customClass: { 'dynamic-class': true, 'hidden-class': false } })
    expect(wrapper.classes()).toContain('dynamic-class')
    expect(wrapper.classes()).not.toContain('hidden-class')
  })

  it('能够设置自定义样式', () => {
    const wrapper = mount(JvButtonGroup, {
      props: {
        customStyle: {
          backgroundColor: 'red',
          padding: '20px',
        },
      },
    })

    expect(wrapper.attributes('style')).toContain('background-color: red')
    expect(wrapper.attributes('style')).toContain('padding: 20px')
  })
})
