import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvTextfield from '../src/JvTextfield.vue'

describe('jvTextfield', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: '',
      },
    })
    expect(wrapper.classes()).toContain('jv-textfield')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders with placeholder', () => {
    const placeholder = '请输入内容'
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: '',
        placeholder,
      },
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder)
  })

  it('renders in disabled state', () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: '',
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('renders in readonly state', () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: '',
        readonly: true,
      },
    })
    expect(wrapper.classes()).toContain('is-readonly')
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('shows clear button when clearable and has value', async () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: 'test value',
        clearable: true,
      },
    })
    expect(wrapper.find('.jv-textfield__clear-icon').exists()).toBe(true)
  })

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
  })

  it('emits focus event when input is focused', async () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('emits blur event when input is blurred', async () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('emits clear event when clear button is clicked', async () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: 'test value',
        clearable: true,
      },
    })
    await wrapper.find('.jv-textfield__clear-icon').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
  })

  it('toggles password visibility when showPassword is true', async () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: 'password',
        type: 'password',
        showPassword: true,
      },
    })
    expect(wrapper.find('input').attributes('type')).toBe('password')
    await wrapper.find('.jv-textfield__password-icon').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large', 'xlarge'] as const
    sizes.forEach((size) => {
      const wrapper = mount(JvTextfield, {
        props: {
          modelValue: '',
          size,
        },
      })
      expect(wrapper.classes()).toContain(`jv-textfield--size-${size}`)
    })
  })

  it('renders with different variants', () => {
    const variants = ['outlined', 'default'] as const
    variants.forEach((variant) => {
      const wrapper = mount(JvTextfield, {
        props: {
          modelValue: '',
          variant,
        },
      })
      expect(wrapper.classes()).toContain(`jv-textfield--variant-${variant}`)
    })
  })

  it('shows character count when showCount is true', () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: 'test',
        showCount: true,
      },
    })
    expect(wrapper.find('.jv-textfield__count').exists()).toBe(true)
    expect(wrapper.find('.jv-textfield__count').text()).toBe('4')
  })

  it('shows character count with maxLength when both are set', () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: 'test',
        showCount: true,
        maxLength: 10,
      },
    })
    expect(wrapper.find('.jv-textfield__count').text()).toBe('4/10')
  })

  it('renders prefix and suffix icons', () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: '',
        prefixIcon: 'user',
        suffixIcon: 'search',
      },
    })
    expect(wrapper.find('.jv-textfield__prefix').exists()).toBe(true)
    expect(wrapper.find('.jv-textfield__suffix').exists()).toBe(true)
  })

  it('exposes focus, blur and clear methods', () => {
    const wrapper = mount(JvTextfield, {
      props: {
        modelValue: 'test',
      },
    })

    const inputEl = wrapper.find('input').element
    const focusSpy = vi.spyOn(inputEl, 'focus')
    const blurSpy = vi.spyOn(inputEl, 'blur')

    // 调用暴露的方法
    wrapper.vm.focus()
    expect(focusSpy).toHaveBeenCalled()

    wrapper.vm.blur()
    expect(blurSpy).toHaveBeenCalled()

    wrapper.vm.clear()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })
})
