import { describe, expect, it } from 'vitest'
import { useStringOrObjectProps } from '../useStringOrObjectProps'

describe('useStringOrObjectProps', () => {
  // 基础功能测试
  it('应该正确处理字符串类型的prop', () => {
    const stringValue = 'Hello World'
    const props = useStringOrObjectProps(stringValue)
    expect(props.value).toEqual({ text: 'Hello World' })
  })

  it('应该正确处理数字类型的prop', () => {
    const numberValue = 123
    const props = useStringOrObjectProps(numberValue)
    expect(props.value).toEqual({ text: 123 })
  })

  it('应该正确处理对象类型的prop', () => {
    const objectValue = { text: 'Hello', color: 'red' }
    const props = useStringOrObjectProps(objectValue)
    expect(props.value).toEqual({ text: 'Hello', color: 'red' })
  })

  it('应该正确处理undefined类型的prop', () => {
    const props = useStringOrObjectProps(undefined)
    expect(props.value).toEqual({})
  })

  it('应该正确处理自定义属性名', () => {
    const stringValue = 'user'
    const props = useStringOrObjectProps(stringValue, 'name')
    expect(props.value).toEqual({ name: 'user' })
  })

  it('应该正确处理组合情况', () => {
    interface TestProps {
      name?: string
      size?: number
      color?: string
    }

    const objectValue: TestProps = { color: 'blue', size: 16 }
    const props = useStringOrObjectProps<TestProps>(objectValue, 'name')
    expect(props.value).toEqual({ color: 'blue', size: 16 })
  })

  it('应该正确处理布尔值为true的情况', () => {
    const defaultOptions = { placement: 'top-right', dot: true }
    const props = useStringOrObjectProps(true, defaultOptions)
    expect(props.value).toEqual(defaultOptions)
  })

  it('应该正确处理布尔值为false的情况', () => {
    const defaultOptions = { placement: 'top-right', dot: true }
    const props = useStringOrObjectProps(false, defaultOptions)
    expect(props.value).toEqual({})
  })

  it('应该正确合并对象和默认选项', () => {
    interface BadgeProps {
      placement?: string
      dot?: boolean
      color?: string
      size?: string
    }

    const defaultOptions: BadgeProps = { placement: 'top-right', dot: true, color: 'primary' }
    const customOptions: BadgeProps = { color: 'secondary', size: 'small' }
    const props = useStringOrObjectProps(customOptions, defaultOptions)
    expect(props.value).toEqual({
      placement: 'top-right',
      dot: true,
      color: 'secondary',
      size: 'small',
    })
  })
})
