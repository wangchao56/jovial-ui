import LineSvg from '@components/jv-progress/src/LineSvg.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvLineLoader from '../src/JvLineLoader.vue'

describe('jvLineLoader', () => {
  // 基本渲染测试
  it('正确渲染基本结构', () => {
    const wrapper = mount(JvLineLoader)

    // 检查主容器
    expect(wrapper.find('.jv-loader-line').exists()).toBe(true)

    // 检查是否包含LineSvg组件
    expect(wrapper.findComponent(LineSvg).exists()).toBe(true)
  })

  // 高度测试
  it('根据height属性设置高度', async () => {
    const wrapper = mount(JvLineLoader, {
      props: {
        height: 8, // 默认值
      },
    })

    // 检查默认高度
    expect(wrapper.props('height')).toBe(8)
    expect(wrapper.attributes('style')).toContain('height: 8px')

    // 修改高度
    await wrapper.setProps({ height: 16 })
    expect(wrapper.props('height')).toBe(16)
    expect(wrapper.attributes('style')).toContain('height: 16px')
  })

  // 颜色测试
  it('根据color属性设置颜色', async () => {
    const wrapper = mount(JvLineLoader, {
      props: {
        color: '#409eff', // 默认值
      },
    })

    // 检查默认颜色
    expect(wrapper.props('color')).toBe('#409eff')

    // 将颜色传递给LineSvg组件
    const lineSvg = wrapper.findComponent(LineSvg)
    expect(lineSvg.props('color')).toBe('#409eff')

    // 修改颜色
    await wrapper.setProps({ color: '#ff0000' })
    expect(wrapper.props('color')).toBe('#ff0000')
    expect(lineSvg.props('color')).toBe('#ff0000')
  })

  // Props传递测试
  it('正确传递属性给LineSvg组件', () => {
    const wrapper = mount(JvLineLoader, {
      props: {
        color: '#ff0000',
        height: 12,
      },
    })

    const lineSvg = wrapper.findComponent(LineSvg)
    expect(lineSvg.props('color')).toBe('#ff0000')
    expect(lineSvg.props('height')).toBe(12)
    expect(lineSvg.props('indeterminate')).toBe(true)
  })
})
