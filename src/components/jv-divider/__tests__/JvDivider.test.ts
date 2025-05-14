import type { JvDividerProps } from '../src/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvDivider from '../src/JvDivider.vue'

describe('jv-divider', () => {
  // 基础渲染测试
  it('应该正确渲染基础分割线', () => {
    const wrapper = mount(JvDivider)
    expect(wrapper.element.tagName).toBe('HR')
    expect(wrapper.classes()).toContain('jv-divider')
  })

  // Props 测试
  describe('props', () => {
    // 颜色测试
    it('应该正确应用自定义颜色', () => {
      const color = '#ff0000'
      const wrapper = mount(JvDivider, {
        props: { color },
      })
      expect(wrapper.attributes('style')).toContain(`--jv-divider-color: ${color}`)
    })

    // 尺寸测试
    it('应该正确应用自定义尺寸', () => {
      const size = '2px'
      const wrapper = mount(JvDivider, {
        props: { size },
      })
      expect(wrapper.attributes('style')).toContain(`--jv-divider-size: ${size}`)
    })

    // 透明度测试
    it('应该正确应用自定义透明度', () => {
      const opacity = 0.5
      const wrapper = mount(JvDivider, {
        props: { opacity },
      })
      expect(wrapper.attributes('style')).toContain(`--jv-divider-opacity: ${opacity}`)
    })

    // 变体测试
    it('应该正确应用不同的变体样式', () => {
      const variants: JvDividerProps['variant'][] = ['solid', 'dashed', 'dotted', 'double']
      variants.forEach((variant) => {
        const wrapper = mount(JvDivider, {
          props: { variant },
        })
        expect(wrapper.classes()).toContain(`variant-${variant}`)
      })
    })

    // 间距测试
    it('应该正确应用不同的间距', () => {
      const spacings: JvDividerProps['spacing'][] = ['xs', 'sm', 'md', 'lg', 'xl']
      spacings.forEach((spacing) => {
        const wrapper = mount(JvDivider, {
          props: { spacing },
        })
        expect(wrapper.classes()).toContain(`spacing-${spacing}`)
      })
    })

    // 垂直分割线测试
    it('应该正确渲染垂直分割线', () => {
      const wrapper = mount(JvDivider, {
        props: { vertical: true },
      })
      expect(wrapper.classes()).toContain('is-vertical')
    })

    // 虚线测试
    it('应该正确渲染虚线', () => {
      const wrapper = mount(JvDivider, {
        props: { dashed: true },
      })
      expect(wrapper.classes()).toContain('is-dashed')
    })

    // 内嵌测试
    it('应该正确渲染内嵌分割线', () => {
      const wrapper = mount(JvDivider, {
        props: { inset: true },
      })
      expect(wrapper.classes()).toContain('is-inset')
    })

    // 长度测试
    it('应该正确应用自定义长度', () => {
      const length = '50%'
      const wrapper = mount(JvDivider, {
        props: { length },
      })
      expect(wrapper.attributes('style')).toContain(`width: ${length}`)
    })

    // 垂直分割线长度测试
    it('应该正确应用垂直分割线的自定义长度', () => {
      const length = '100px'
      const wrapper = mount(JvDivider, {
        props: { length, vertical: true },
      })
      expect(wrapper.attributes('style')).toContain(`height: ${length}`)
    })
  })

  // 可访问性测试
  describe('可访问性', () => {
    it('应该包含正确的 ARIA 属性', () => {
      const wrapper = mount(JvDivider)
      expect(wrapper.attributes('role')).toBe('separator')
      expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
    })

    it('垂直分割线应该包含正确的 ARIA 属性', () => {
      const wrapper = mount(JvDivider, {
        props: { vertical: true },
      })
      expect(wrapper.attributes('role')).toBe('separator')
      expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
    })
  })

  // 样式测试
  describe('样式', () => {
    it('应该应用正确的过渡效果', () => {
      const wrapper = mount(JvDivider)
      const style = window.getComputedStyle(wrapper.element)
      expect(style.transition).toContain('all 0.3s ease')
    })

    it('应该应用正确的边框样式', () => {
      const wrapper = mount(JvDivider)
      const style = window.getComputedStyle(wrapper.element)
      expect(style.borderTopStyle).toBe('solid')
    })
  })
})
