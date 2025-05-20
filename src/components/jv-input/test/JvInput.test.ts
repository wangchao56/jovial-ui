import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ThemeSymbol } from '@/theme/config'
import JvInput from '../src/JvInput.vue'

const mockTheme = {
  name: { value: 'light' },
  current: { value: { colors: {}, darkMode: false } },
  themeClasses: { value: 'jv-theme-light' },
  isDisabled: false,
  themes: { value: {} },
}

describe('jvInput组件', () => {
  // 基础渲染测试
  it('基础渲染', () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: 'test value',
        placeholder: '请输入',
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').element.value).toBe('test value')
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入')
  })

  // 尺寸变体测试
  it('尺寸和变体适配', () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: '',
        size: 'large',
        variant: 'outlined',
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    expect(wrapper.classes()).toContain('jv-input--size-large')
    expect(wrapper.classes()).toContain('jv-input--variant-outlined')
  })

  // 输入事件测试
  it('输入事件正确触发', async () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: '',
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    await wrapper.find('input').setValue('new value')
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual(['new value'])
  })

  // 聚焦和失焦事件测试
  it('聚焦和失焦事件', async () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: '',
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    await wrapper.find('input').trigger('focus')
    expect(wrapper.classes()).toContain('is-focused')
    expect(wrapper.emitted().focus).toBeTruthy()

    await wrapper.find('input').trigger('blur')
    expect(wrapper.classes()).not.toContain('is-focused')
    expect(wrapper.emitted().blur).toBeTruthy()
  })

  // 禁用状态测试
  it('禁用状态', () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: '',
        disabled: true,
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  // 清除功能测试
  it('清除功能', async () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: 'test value',
        clearable: true,
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    expect(wrapper.find('.jv-input__clear-icon').exists()).toBe(true)
    await wrapper.find('.jv-input__clear-icon').trigger('click')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual([''])
    expect(wrapper.emitted().clear).toBeTruthy()
  })

  // 密码切换功能测试
  it('密码切换功能', async () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: 'password',
        type: 'password',
        showPassword: true,
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    expect(wrapper.find('input').attributes('type')).toBe('password')
    expect(wrapper.find('.jv-input__password-icon').exists()).toBe(true)

    await wrapper.find('.jv-input__password-icon').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')

    await wrapper.find('.jv-input__password-icon').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  // 主题测试
  it('主题样式类应用正确', () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: '',
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    expect(wrapper.classes()).toContain('jv-theme-light')
  })

  // 测试不同主题模式
  it('更改主题', async () => {
    const darkTheme = {
      name: { value: 'dark' },
      current: { value: { colors: {}, darkMode: true } },
      themeClasses: { value: 'jv-theme-dark' },
      isDisabled: false,
      themes: { value: {} },
    }

    const wrapper = mount(JvInput, {
      props: {
        modelValue: '',
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: darkTheme,
        },
      },
    })

    expect(wrapper.classes()).toContain('jv-theme-dark')
  })

  // 插槽测试
  it('插槽正确渲染', () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: '',
      },
      slots: {
        prepend: '<div class="test-prepend">前置内容</div>',
        append: '<div class="test-append">后置内容</div>',
        prefix: '<div class="test-prefix">前缀图标</div>',
        suffix: '<div class="test-suffix">后缀图标</div>',
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    expect(wrapper.find('.test-prepend').exists()).toBe(true)
    expect(wrapper.find('.test-append').exists()).toBe(true)
    expect(wrapper.find('.test-prefix').exists()).toBe(true)
    expect(wrapper.find('.test-suffix').exists()).toBe(true)
  })

  // 暴露方法测试
  it('暴露的方法正确执行', () => {
    const wrapper = mount(JvInput, {
      props: {
        modelValue: 'test',
        clearable: true,
      },
      global: {
        provide: {
          [ThemeSymbol as symbol]: mockTheme,
        },
      },
    })

    const inputElement = wrapper.find('input').element
    const focusSpy = vi.spyOn(inputElement, 'focus')
    const blurSpy = vi.spyOn(inputElement, 'blur')

    // 测试focus方法
    wrapper.vm.focus()
    expect(focusSpy).toHaveBeenCalled()

    // 测试blur方法
    wrapper.vm.blur()
    expect(blurSpy).toHaveBeenCalled()

    // 测试clear方法
    wrapper.vm.clear()
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual([''])
  })
})
