import type { JvSelectOption } from '../src/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvSelect from '../index'

const baseOptions: JvSelectOption[] = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]

describe('jvSelect', () => {
  // 测试基本渲染
  it('正确渲染选择器组件', () => {
    const wrapper = mount(JvSelect, {
      props: {
        modelValue: '',
        options: baseOptions,
      },
    })
    expect(wrapper.find('.jv-select').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'JvInput' }).exists()).toBe(true)
  })

  // 测试下拉显示和选项选择
  it('点击时显示下拉菜单并可选择选项', async () => {
    const wrapper = mount(JvSelect, {
      props: {
        modelValue: '',
        options: baseOptions,
      },
    })

    // 点击打开下拉菜单
    await wrapper.findComponent({ name: 'JvInput' }).trigger('click')

    // 检查下拉菜单是否显示
    expect(wrapper.find('.jv-select__dropdown').exists()).toBe(true)

    // 选中一个选项
    await wrapper.find('.jv-select__option').trigger('mousedown')

    // 检查是否触发了update:modelValue事件
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('1')
  })

  // 测试选中状态
  it('正确显示选中值', async () => {
    const wrapper = mount(JvSelect, {
      props: {
        modelValue: '2',
        options: baseOptions,
      },
    })

    // 检查输入框中的值是否正确显示选中项的label
    const input = wrapper.findComponent({ name: 'JvInput' })
    expect(input.props('modelValue')).toBe('选项2')

    // 打开下拉菜单
    await input.trigger('click')

    // 检查选中项是否有选中样式
    const options = wrapper.findAll('.jv-select__option')
    expect(options[1].classes()).toContain('is-selected')
  })

  // 测试多选功能
  it('支持多选模式', async () => {
    const wrapper = mount(JvSelect, {
      props: {
        modelValue: ['1'],
        options: baseOptions,
        multiple: true,
      },
    })

    // 打开下拉菜单
    await wrapper.findComponent({ name: 'JvInput' }).trigger('click')

    // 选择第二个选项
    const options = wrapper.findAll('.jv-select__option')
    await options[1].trigger('mousedown')

    // 检查是否触发了update:modelValue事件，且值为多选数组
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(['1', '2'])

    // 再次点击已选项，应该移除该选项
    await wrapper.setProps({ modelValue: ['1', '2'] })
    await options[0].trigger('mousedown')

    expect(wrapper.emitted('update:modelValue')?.[1][0]).toEqual(['2'])
  })

  // 测试禁用状态
  it('禁用状态下不能打开下拉菜单', async () => {
    const wrapper = mount(JvSelect, {
      props: {
        modelValue: '',
        options: baseOptions,
        disabled: true,
      },
    })

    // 尝试点击打开下拉菜单
    await wrapper.findComponent({ name: 'JvInput' }).trigger('click')

    // 检查下拉菜单是否显示（应该不显示）
    expect(wrapper.find('.jv-select__dropdown').exists()).toBe(false)
  })

  // 测试禁用选项
  it('禁用选项不可选择', async () => {
    const disabledOptions: JvSelectOption[] = [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2', disabled: true },
      { label: '选项3', value: '3' },
    ]

    const wrapper = mount(JvSelect, {
      props: {
        modelValue: '',
        options: disabledOptions,
      },
    })

    // 打开下拉菜单
    await wrapper.findComponent({ name: 'JvInput' }).trigger('click')

    // 尝试点击禁用选项
    const options = wrapper.findAll('.jv-select__option')
    await options[1].trigger('mousedown')

    // 不应该触发update:modelValue事件
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 测试清空功能
  it('支持清空选择', async () => {
    const wrapper = mount(JvSelect, {
      props: {
        modelValue: '1',
        options: baseOptions,
        clearable: true,
      },
    })

    // 模拟清空事件
    await wrapper.findComponent({ name: 'JvInput' }).vm.$emit('clear')

    // 检查是否触发了update:modelValue事件和clear事件
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  // 测试点击外部关闭下拉菜单
  it('点击外部应关闭下拉菜单', async () => {
    const wrapper = mount(JvSelect, {
      props: {
        modelValue: '',
        options: baseOptions,
      },
      attachTo: document.body,
    })

    // 打开下拉菜单
    await wrapper.findComponent({ name: 'JvInput' }).trigger('click')
    expect(wrapper.find('.jv-select__dropdown').exists()).toBe(true)

    // 模拟点击外部
    const clickEvent = new MouseEvent('click')
    document.dispatchEvent(clickEvent)

    // 等待关闭动画
    await new Promise(resolve => setTimeout(resolve, 200))

    // 下拉菜单应该关闭
    expect(wrapper.find('.jv-select__dropdown').exists()).toBe(false)
  })
})
