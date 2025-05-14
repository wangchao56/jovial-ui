import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvParagraph from '../src/JvParagraph.vue'

describe('jvParagraph', () => {
  // 基础功能测试
  it('正确渲染文本内容', () => {
    const wrapper = mount(JvParagraph, {
      slots: {
        default: '这是一段测试文本',
      },
    })
    expect(wrapper.text()).toBe('这是一段测试文本')
  })

  it('通过props设置文本内容', () => {
    const wrapper = mount(JvParagraph, {
      props: {
        text: '通过props设置的文本',
      },
    })
    expect(wrapper.text()).toBe('通过props设置的文本')
  })

  // Props功能测试
  it('正确应用预定义的size类', () => {
    const sizes = ['tiny', 'small', 'medium', 'large', 'xlarge']

    sizes.forEach((size) => {
      const wrapper = mount(JvParagraph, {
        props: { size },
      })
      expect(wrapper.classes()).toContain(`jv-paragraph--${size}`)
    })
  })

  it('正确应用自定义size', () => {
    // 数字类型
    const wrapper1 = mount(JvParagraph, {
      props: { size: 18 },
    })
    expect(wrapper1.attributes('style')).toContain('font-size: 18px')

    // 自定义字符串
    const wrapper2 = mount(JvParagraph, {
      props: { size: '1.5rem' },
    })
    expect(wrapper2.attributes('style')).toContain('font-size: 1.5rem')
  })

  it('正确应用颜色', () => {
    const wrapper = mount(JvParagraph, {
      props: { color: 'primary' },
    })
    expect(wrapper.classes()).toContain('text-primary')
  })

  it('正确应用Material Design变体', () => {
    const wrapper = mount(JvParagraph, {
      props: { mdVariant: 'subtitle1' },
    })
    expect(wrapper.classes()).toContain('md-subtitle1')
  })

  it('正确应用行高', () => {
    const wrapper = mount(JvParagraph, {
      props: { lineHeight: 'loose' },
    })
    expect(wrapper.classes()).toContain('leading-loose')
  })

  it('正确应用对齐方式', () => {
    const wrapper = mount(JvParagraph, {
      props: { align: 'center' },
    })
    expect(wrapper.classes()).toContain('text-center')
  })

  it('正确应用文本溢出设置', () => {
    // 布尔值
    const wrapper1 = mount(JvParagraph, {
      props: { ellipsis: true },
    })
    expect(wrapper1.classes()).toContain('jv-paragraph__ellipsis')

    // 数字
    const wrapper2 = mount(JvParagraph, {
      props: { ellipsis: 3 },
    })
    expect(wrapper2.classes()).toContain('ellipsis-3')
  })

  it('正确应用首行缩进', () => {
    const wrapper = mount(JvParagraph, {
      props: { indent: 2 },
    })
    expect(wrapper.attributes('style')).toContain('text-indent: 2em')
  })

  it('正确应用行数限制', () => {
    const wrapper = mount(JvParagraph, {
      props: { lines: 5 },
    })
    expect(wrapper.classes()).toContain('jv-paragraph__lines')
    expect(wrapper.attributes('style')).toContain('--jv-paragraph-lines: 5')
  })

  // 样式和CSS变量测试
  it('具有正确的默认样式', () => {
    const wrapper = mount(JvParagraph)
    expect(wrapper.classes()).toContain('jv-paragraph')
    // 默认justify对齐
    expect(wrapper.classes()).toContain('text-justify')
  })

  // 组合功能测试
  it('可以组合使用多个props', () => {
    const wrapper = mount(JvParagraph, {
      props: {
        size: 16,
        color: 'primary',
        align: 'left',
        indent: 2,
        lines: 3,
        ellipsis: true,
        text: '这是一段测试文本',
      },
    })

    expect(wrapper.text()).toBe('这是一段测试文本')
    expect(wrapper.classes()).toContain('jv-paragraph')
    expect(wrapper.classes()).toContain('text-primary')
    expect(wrapper.classes()).toContain('text-left')
    expect(wrapper.classes()).toContain('jv-paragraph__ellipsis')
    expect(wrapper.classes()).toContain('jv-paragraph__lines')

    const style = wrapper.attributes('style')
    expect(style).toContain('font-size: 16px')
    expect(style).toContain('text-indent: 2em')
    expect(style).toContain('--jv-paragraph-lines: 3')
  })
})
