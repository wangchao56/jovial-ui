import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTabs from '../src/JvTabs.vue'

describe('jvTabs', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvTabs)

    expect(wrapper.classes()).toContain('jv-tabs')
    expect(wrapper.classes()).toContain('jv-tabs--default')
    expect(wrapper.classes()).toContain('jv-tabs--primary')
    expect(wrapper.classes()).toContain('jv-tabs--align-start')
    expect(wrapper.classes()).not.toContain('jv-tabs--grow')
    expect(wrapper.classes()).not.toContain('jv-tabs--vertical')
    expect(wrapper.classes()).toContain('jv-tabs--animated')
  })

  it('renders with custom props', () => {
    const wrapper = mount(JvTabs, {
      props: {
        variant: 'pills',
        color: 'secondary',
        alignTabs: 'center',
        grow: true,
        vertical: true,
        animated: false,
      },
    })

    expect(wrapper.classes()).toContain('jv-tabs--pills')
    expect(wrapper.classes()).toContain('jv-tabs--secondary')
    expect(wrapper.classes()).toContain('jv-tabs--align-center')
    expect(wrapper.classes()).toContain('jv-tabs--grow')
    expect(wrapper.classes()).toContain('jv-tabs--vertical')
    expect(wrapper.classes()).not.toContain('jv-tabs--animated')
  })

  it('emits update:modelValue event when activeTab changes', async () => {
    const wrapper = mount(JvTabs, {
      props: {
        modelValue: 'tab1',
      },
    })

    // 获取provide的上下文
    const vm = wrapper.vm as any
    const updateActiveTab = vm.$.provides.tabs.updateActiveTab

    // 调用updateActiveTab方法
    updateActiveTab('tab2')

    // 验证事件是否被触发
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['tab2'])

    // 验证change事件是否被触发
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual(['tab2', 'tab1'])
  })

  it('updates activeTab when modelValue prop changes', async () => {
    const wrapper = mount(JvTabs, {
      props: {
        modelValue: 'tab1',
      },
    })

    // 获取provide的上下文
    const vm = wrapper.vm as any
    const activeTab = vm.$.provides.tabs.activeTab

    // 验证初始值
    expect(activeTab.value).toBe('tab1')

    // 更新modelValue
    await wrapper.setProps({ modelValue: 'tab2' })

    // 验证activeTab是否更新
    expect(activeTab.value).toBe('tab2')
  })

  it('renders default slot content', () => {
    const wrapper = mount(JvTabs, {
      slots: {
        default: '<div class="test-content">Tab Content</div>',
      },
    })

    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Tab Content')
  })
})
