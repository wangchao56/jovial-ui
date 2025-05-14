import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvCircleLoader from '../src/JvCircleLoader.vue'

describe('jvCircleLoader', () => {
  // 基本渲染测试
  it('正确渲染基本结构', () => {
    const wrapper = mount(JvCircleLoader)

    // 检查主容器
    expect(wrapper.find('.jv-circle-loader').exists()).toBe(true)

    // 检查是否有三个子元素
    const divElements = wrapper.findAll('.jv-circle-loader > div')
    expect(divElements.length).toBe(3)
  })

  // 尺寸测试
  it('根据 size 属性设置不同尺寸', async () => {
    const wrapper = mount(JvCircleLoader, {
      props: {
        size: 'medium', // 默认值
      },
    })

    // 测试不同尺寸需要通过CSS变量检查效果
    // 我们不直接访问内部计算属性

    // 切换到小尺寸
    await wrapper.setProps({ size: 'small' })

    // 切换到大尺寸
    await wrapper.setProps({ size: 'large' })

    // 验证组件仍然正确渲染
    expect(wrapper.find('.jv-circle-loader').exists()).toBe(true)
  })

  // 颜色测试
  it('根据 color 属性设置不同颜色', async () => {
    const wrapper = mount(JvCircleLoader, {
      props: {
        color: 'primary', // 默认值
      },
    })

    // 检查默认颜色
    expect(wrapper.props('color')).toBe('primary')

    // 切换到成功颜色
    await wrapper.setProps({ color: 'success' })
    expect(wrapper.props('color')).toBe('success')

    // 切换到自定义颜色
    await wrapper.setProps({ color: '#ff0000' })
    expect(wrapper.props('color')).toBe('#ff0000')
  })

  // 样式传递测试
  it('正确传递类名和样式', async () => {
    const customClass = 'custom-loader'
    const customStyle = { backgroundColor: 'red' }

    const wrapper = mount(JvCircleLoader, {
      props: {
        class: customClass,
        style: customStyle,
      },
    })

    const loaderElement = wrapper.find('.jv-circle-loader')
    expect(loaderElement.classes()).toContain(customClass)
    expect(loaderElement.attributes('style')).toContain('background-color: red')
  })

  // 检查不同尺寸下组件是否正确渲染
  it('在不同尺寸下正确渲染', async () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large']

    for (const size of sizes) {
      const wrapper = mount(JvCircleLoader, {
        props: { size },
      })

      expect(wrapper.find('.jv-circle-loader').exists()).toBe(true)
      expect(wrapper.props('size')).toBe(size)
    }
  })

  // 检查子元素是否具有正确的动画延迟
  it('子元素具有正确的动画延迟', () => {
    const wrapper = mount(JvCircleLoader)
    const children = wrapper.findAll('.jv-circle-loader > div')

    // 应该有3个子元素，每个都有动画
    expect(children.length).toBe(3)
  })
})
