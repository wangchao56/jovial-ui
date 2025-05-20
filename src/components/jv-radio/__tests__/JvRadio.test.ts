import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvRadio from '../src/JvRadio.vue'

describe('jvRadio', () => {
  // 基本渲染测试
  it('renders correctly with default props', () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('jv-radio')
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
  })

  // 标签内容测试
  it('renders label content correctly', () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
      },
    })

    expect(wrapper.find('.jv-radio__label').text()).toBe('option1')

    // 使用插槽测试
    const slotWrapper = mount(JvRadio, {
      props: {
        label: 'option1',
      },
      slots: {
        default: 'Custom Label',
      },
    })

    expect(slotWrapper.find('.jv-radio__label').text()).toBe('Custom Label')
  })

  // 尺寸测试
  it('applies different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg']

    sizes.forEach((size) => {
      const wrapper = mount(JvRadio, {
        props: {
          label: 'option1',
          size: size as 'sm' | 'md' | 'lg',
        },
      })

      expect(wrapper.classes()).toContain(`jv-radio--size-${size}`)
    })
  })

  // 禁用状态测试
  it('handles disabled state correctly', () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('jv-radio--is-disabled')
    expect(wrapper.find('input[type="radio"]').attributes('disabled')).toBeDefined()

    // 尝试点击禁用的单选框
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  // 选中状态测试
  it('handles checked state correctly', async () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
        modelValue: 'option1',
      },
    })

    expect(wrapper.classes()).toContain('jv-radio--is-checked')
    expect((wrapper.find('input[type="radio"]').element as HTMLInputElement).checked).toBe(true)

    // 更改modelValue
    await wrapper.setProps({ modelValue: 'option2' })
    expect(wrapper.classes()).not.toContain('jv-radio--is-checked')
  })

  // 点击事件测试
  it('emits events correctly when clicked', async () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
      },
    })

    await wrapper.find('.jv-radio__inner').trigger('click')

    expect(wrapper.emitted('click')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option1'])
  })

  // 键盘事件测试
  it('handles keyboard events correctly', async () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
      },
    })

    // 回车键
    await wrapper.find('input[type="radio"]').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option1'])

    // 空格键
    await wrapper.find('input[type="radio"]').trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['option1'])
  })

  // 焦点处理测试
  it('handles focus and blur events correctly', async () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
      },
    })

    await wrapper.find('input[type="radio"]').trigger('focus')
    expect(wrapper.emitted('focus')).toBeDefined()
    expect(wrapper.classes()).toContain('jv-radio--is-focused')

    await wrapper.find('input[type="radio"]').trigger('blur')
    expect(wrapper.emitted('blur')).toBeDefined()
    expect(wrapper.classes()).not.toContain('jv-radio--is-focused')
  })

  // 颜色自定义测试
  it('applies custom color correctly', () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
        color: '#ff0000',
      },
    })

    const innerEl = wrapper.find('.jv-radio__inner')
    expect(innerEl.attributes('style')).toContain('border-color: #ff0000')
  })

  // 标签位置测试
  it('applies label position correctly', () => {
    const leftLabelWrapper = mount(JvRadio, {
      props: {
        label: 'option1',
        labelPosition: 'left',
      },
    })

    expect(leftLabelWrapper.classes()).toContain('jv-radio--label-left')

    const rightLabelWrapper = mount(JvRadio, {
      props: {
        label: 'option1',
        labelPosition: 'right',
      },
    })

    expect(rightLabelWrapper.classes()).toContain('jv-radio--label-right')
  })

  // 错误状态测试
  it('displays error state correctly', () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
        error: true,
        errorMessage: 'Error message',
      },
    })

    expect(wrapper.classes()).toContain('jv-radio--is-error')
    expect(wrapper.find('.jv-radio__error').text()).toBe('Error message')
  })

  // 方法测试
  it('exposes methods correctly', async () => {
    const wrapper = mount(JvRadio, {
      props: {
        label: 'option1',
      },
    })

    const radioInstance = wrapper.vm as any

    // Check method
    radioInstance.check()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option1'])

    // IsChecked method
    await wrapper.setProps({ modelValue: 'option1' })
    expect(radioInstance.isChecked()).toBe(true)

    // Focus method - mock focus
    const focusSpy = vi.spyOn(wrapper.find('input[type="radio"]').element as HTMLInputElement, 'focus')
    radioInstance.focus()
    expect(focusSpy).toHaveBeenCalled()

    // Blur method - mock blur
    const blurSpy = vi.spyOn(wrapper.find('input[type="radio"]').element as HTMLInputElement, 'blur')
    radioInstance.blur()
    expect(blurSpy).toHaveBeenCalled()
  })
})
