import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvRadio from '../src/JvRadio.vue'
import JvRadioGroup from '../src/JvRadioGroup.vue'

describe('jvRadioGroup', () => {
  // 基本渲染测试
  it('renders correctly with default props', () => {
    const wrapper = mount(JvRadioGroup)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('jv-radio-group')
    expect(wrapper.find('fieldset').exists()).toBe(true)
  })

  // 标题渲染测试
  it('renders legend correctly', () => {
    const wrapper = mount(JvRadioGroup, {
      props: {
        label: 'Test Group',
      },
    })

    expect(wrapper.find('legend').text()).toBe('Test Group')

    // 使用插槽
    const slotWrapper = mount(JvRadioGroup, {
      slots: {
        legend: 'Custom Legend',
      },
    })

    expect(slotWrapper.find('legend').text()).toBe('Custom Legend')
  })

  // 子组件渲染测试
  it('renders radio children correctly', () => {
    const wrapper = mount(JvRadioGroup, {
      slots: {
        default: [
          '<jv-radio label="option1">Option 1</jv-radio>',
          '<jv-radio label="option2">Option 2</jv-radio>',
        ],
      },
      global: {
        components: { JvRadio },
      },
    })

    const radios = wrapper.findAllComponents(JvRadio)
    expect(radios.length).toBe(2)
  })

  // 布局测试
  it('applies correct layout options', () => {
    // 列布局
    const columnWrapper = mount(JvRadioGroup, {
      props: {
        column: true,
      },
    })

    expect(columnWrapper.classes()).toContain('jv-radio-group--is-column')

    // 内联布局
    const inlineWrapper = mount(JvRadioGroup, {
      props: {
        inline: true,
      },
    })

    expect(inlineWrapper.classes()).toContain('jv-radio-group--is-inline')

    // 边框布局
    const borderedWrapper = mount(JvRadioGroup, {
      props: {
        bordered: true,
      },
    })

    expect(borderedWrapper.classes()).toContain('jv-radio-group--is-bordered')

    // 紧凑布局
    const compactWrapper = mount(JvRadioGroup, {
      props: {
        compact: true,
      },
    })

    expect(compactWrapper.classes()).toContain('jv-radio-group--is-compact')
  })

  // 禁用状态测试
  it('handles disabled state correctly', () => {
    const wrapper = mount(JvRadioGroup, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('jv-radio-group--is-disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  // 选项数据测试
  it('renders options data correctly', () => {
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ]

    const wrapper = mount(JvRadioGroup, {
      props: {
        options,
      },
    })

    const radios = wrapper.findAllComponents(JvRadio)
    expect(radios.length).toBe(2)
    expect(radios[0].text()).toBe('Option 1')
    expect(radios[1].text()).toBe('Option 2')
  })

  // 值变化测试
  it('handles value changes correctly', async () => {
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ]

    const wrapper = mount(JvRadioGroup, {
      props: {
        options,
        modelValue: 'option1',
      },
    })

    const radios = wrapper.findAllComponents(JvRadio)

    // 初始值
    expect(wrapper.props().modelValue).toBe('option1')

    // 点击第二个选项
    await radios[1].find('.jv-radio__inner').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option2'])
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change')?.[0]).toEqual(['option2'])
  })

  // 列数配置测试
  it('applies columns configuration correctly', () => {
    // 数字列数
    const numberColumnsWrapper = mount(JvRadioGroup, {
      props: {
        columns: 3,
      },
    })

    expect(numberColumnsWrapper.find('.jv-radio-group__wrapper').attributes('style'))
      .toContain('grid-template-columns: repeat(3, minmax(0, 1fr))')

    // 响应式配置
    const responsiveColumnsWrapper = mount(JvRadioGroup, {
      props: {
        columns: { xs: 1, md: 2, lg: 3 },
      },
    })

    const style = responsiveColumnsWrapper.find('.jv-radio-group__wrapper').attributes('style')
    expect(style).toContain('grid-template-columns: repeat(1, minmax(0, 1fr))')
    expect(style).toContain('--grid-columns-media')
  })

  // 错误状态测试
  it('displays error state correctly', () => {
    const wrapper = mount(JvRadioGroup, {
      props: {
        error: true,
        errorMessage: 'Error message',
      },
    })

    expect(wrapper.classes()).toContain('jv-radio-group--is-error')
    expect(wrapper.find('.jv-radio-group__error').text()).toBe('Error message')
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })

  // 远程加载测试
  it('handles remote loading correctly', async () => {
    // 模拟远程方法
    const mockRemoteMethod = vi.fn().mockResolvedValue([
      { label: 'Remote 1', value: 'remote1' },
      { label: 'Remote 2', value: 'remote2' },
    ])

    const wrapper = mount(JvRadioGroup, {
      props: {
        remote: true,
        remoteMethod: mockRemoteMethod,
      },
    })

    // 确认加载方法被调用
    expect(mockRemoteMethod).toHaveBeenCalled()

    // 等待加载完成
    await vi.waitFor(() => {
      const radios = wrapper.findAllComponents(JvRadio)
      return radios.length === 2
    })

    // 验证加载的选项
    const radios = wrapper.findAllComponents(JvRadio)
    expect(radios.length).toBe(2)
    expect(radios[0].text()).toBe('Remote 1')
    expect(radios[1].text()).toBe('Remote 2')

    // 验证事件
    expect(wrapper.emitted('load-success')).toBeDefined()
  })

  // 方法测试
  it('exposes methods correctly', async () => {
    const wrapper = mount(JvRadioGroup, {
      props: {
        modelValue: 'option1',
      },
    })

    const instance = wrapper.vm as any

    // 获取值
    expect(instance.getValue()).toBe('option1')

    // 设置值
    instance.setValue('option2')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option2'])

    // 重置
    instance.reset()
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([undefined])

    // 验证
    expect(instance.validate()).toBe(false) // 因为重置后值为undefined

    // 刷新远程数据
    const mockRefresh = vi.fn().mockResolvedValue([])
    wrapper.vm.refreshRemoteData = mockRefresh
    await instance.refreshRemoteData()
    expect(mockRefresh).toHaveBeenCalled()
  })
})
