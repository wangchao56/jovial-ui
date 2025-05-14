import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvProgress from '../src/JvProgress.vue'

describe('jvProgress', () => {
  // 测试默认渲染
  it('renders correctly with default props', () => {
    const wrapper = mount(JvProgress)
    expect(wrapper.classes()).toContain('jv-progress')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  // 测试线性进度条
  it('renders line progress bar by default', () => {
    const wrapper = mount(JvProgress)
    expect(wrapper.find('.jv-progress__track').exists()).toBe(true)
    expect(wrapper.find('.jv-progress__progress').exists()).toBe(true)
  })

  // 测试自定义进度值
  it('shows correct progress value', () => {
    const progress = 75
    const wrapper = mount(JvProgress, {
      props: { progress },
    })

    // 检查aria属性
    expect(wrapper.attributes('aria-valuenow')).toBe(progress.toString())

    // 检查通过SVG展示的进度
    const progressEl = wrapper.find('.jv-progress__progress')
    expect(progressEl.attributes('width')).toBe(`${progress}`)
  })

  // 测试不同颜色
  it('applies custom color', () => {
    const color = '#ff0000'
    const wrapper = mount(JvProgress, {
      props: { color },
    })

    const progressEl = wrapper.find('.jv-progress__progress')
    expect(progressEl.attributes('fill')).toBe(color)
  })

  // 测试自定义尺寸
  it('applies custom width and height', () => {
    const width = 200
    const height = 10
    const wrapper = mount(JvProgress, {
      props: { width, height },
    })

    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe(width.toString())
    expect(svg.attributes('height')).toBe(height.toString())
  })

  // 测试不确定模式
  it('renders in indeterminate mode', () => {
    const wrapper = mount(JvProgress, {
      props: { indeterminate: true },
    })

    expect(wrapper.classes()).toContain('jv-progress--indeterminate')
    expect(wrapper.find('.jv-progress__indeterminate-progress').exists()).toBe(true)

    // 不确定模式下不显示普通进度条
    expect(wrapper.find('.jv-progress__progress').exists()).toBe(false)
  })

  // 测试缓冲条
  it('shows buffer bar when buffer is enabled', () => {
    const wrapper = mount(JvProgress, {
      props: {
        buffer: true,
        bufferProgress: 80,
      },
    })

    const bufferEl = wrapper.find('.jv-progress__buffer')
    expect(bufferEl.exists()).toBe(true)
    expect(bufferEl.attributes('width')).toBe('80')
  })

  // 测试圆形进度条
  it('renders circle progress when shape is set to circle', () => {
    const wrapper = mount(JvProgress, {
      props: { shape: 'circle' },
    })

    expect(wrapper.classes()).toContain('jv-progress--circle')

    // 检查圆形元素是否存在
    const circleEl = wrapper.find('circle.jv-progress__progress')
    expect(circleEl.exists()).toBe(true)

    // 圆形进度条使用stroke-dashoffset来显示进度
    expect(circleEl.attributes('stroke-dasharray')).toBeTruthy()
    expect(circleEl.attributes('stroke-dashoffset')).toBeTruthy()
  })

  // 测试无障碍属性
  it('has correct accessibility attributes', () => {
    const wrapper = mount(JvProgress, {
      props: { progress: 50 },
    })

    expect(wrapper.attributes('role')).toBe('progressbar')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('100')
    expect(wrapper.attributes('aria-valuenow')).toBe('50')
    expect(wrapper.attributes('aria-busy')).toBe('true')
  })

  // 测试aria-busy在进度为100%时变为false
  it('sets aria-busy to false when progress is 100%', () => {
    const wrapper = mount(JvProgress, {
      props: { progress: 100 },
    })

    expect(wrapper.attributes('aria-busy')).toBe('false')
  })

  // 测试圆环内容插槽
  it('renders content in the circle progress', () => {
    const wrapper = mount(JvProgress, {
      props: { shape: 'circle' },
      slots: {
        default: '<span class="test-content">75%</span>',
      },
    })

    expect(wrapper.find('.jv-progress__content').exists()).toBe(true)
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('75%')
  })
})
