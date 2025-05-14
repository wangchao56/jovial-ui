import { describe, expect, it } from 'vitest'
import { defaultSizeMap, useSize } from '../useSize'

describe('useSize', () => {
  // 测试预设尺寸
  it('应该正确处理预设尺寸字符串', () => {
    const { computedSize, sizeWithUnit } = useSize('medium')
    expect(computedSize.value).toBe(40)
    expect(sizeWithUnit.value).toBe('40px')
  })

  // 测试数字尺寸
  it('应该正确处理数字尺寸', () => {
    const { computedSize, sizeWithUnit } = useSize(50)
    expect(computedSize.value).toBe(50)
    expect(sizeWithUnit.value).toBe('50px')
  })

  // 测试带单位尺寸
  it('应该正确处理带单位的尺寸字符串', () => {
    const { computedSize, sizeWithUnit } = useSize('2rem')
    expect(computedSize.value).toBe('2rem')
    expect(sizeWithUnit.value).toBe('2rem')
  })

  // 测试提取像素值
  it('应该能够从CSS尺寸中提取像素值', () => {
    const { sizeInPx } = useSize('16px')
    expect(sizeInPx.value).toBe(16)
  })

  // 测试无效值
  it('应该对无效值使用默认值', () => {
    const { computedSize, sizeWithUnit } = useSize('invalid')
    expect(computedSize.value).toBe(40)
    expect(sizeWithUnit.value).toBe('40px')
  })

  // 测试自定义默认值
  it('应该使用提供的默认值', () => {
    const { computedSize, sizeWithUnit } = useSize(undefined, defaultSizeMap, 60)
    expect(computedSize.value).toBe(60)
    expect(sizeWithUnit.value).toBe('60px')
  })

  // 测试自定义尺寸映射
  it('应该使用自定义尺寸映射', () => {
    const customSizeMap = {
      small: 100,
      large: 200,
    }
    const { computedSize, sizeWithUnit } = useSize('small', customSizeMap)
    expect(computedSize.value).toBe(100)
    expect(sizeWithUnit.value).toBe('100px')
  })
})
