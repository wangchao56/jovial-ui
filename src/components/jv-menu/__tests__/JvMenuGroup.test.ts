import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvMenuGroup from '../src/JvMenuGroup.vue'
import JvMenuItem from '../src/JvMenuItem.vue'

describe('jvMenuGroup 组件', () => {
  // 基础渲染测试
  it('基础渲染测试', () => {
    const wrapper = mount(JvMenuGroup, {
      props: {
        title: '分组标题',
      },
    })

    expect(wrapper.classes()).toContain('jv-menu-group')
    expect(wrapper.find('.jv-menu-group__title').text()).toBe('分组标题')
    expect(wrapper.find('.jv-menu-group__content').exists()).toBe(true)
  })

  // 自定义标题插槽测试
  it('自定义标题插槽测试', () => {
    const wrapper = mount(JvMenuGroup, {
      slots: {
        title: '<span class="custom-title">自定义标题</span>',
      },
    })

    expect(wrapper.find('.jv-menu-group__title').find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  // 默认插槽渲染子内容测试
  it('默认插槽渲染子内容测试', () => {
    const wrapper = mount(JvMenuGroup, {
      slots: {
        default: '<div class="test-content">测试内容</div>',
      },
    })

    expect(wrapper.find('.jv-menu-group__content').find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('测试内容')
  })

  // 禁用状态测试
  it('禁用状态测试', () => {
    const wrapper = mount(JvMenuGroup, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.attributes('data-disabled')).toBe('true')
    expect(wrapper.find('.jv-menu-group__title').attributes('aria-disabled')).toBe('true')
  })

  // 集成测试：与JvMenuItem一起使用
  it('集成测试：与JvMenuItem一起使用', () => {
    const wrapper = mount(JvMenuGroup, {
      props: {
        title: '分组标题',
      },
      slots: {
        default: [
          '<JvMenuItem title="菜单项1" />',
          '<JvMenuItem title="菜单项2" />',
        ],
      },
      global: {
        components: {
          JvMenuItem,
        },
      },
    })

    expect(wrapper.findAll('.jv-menu-item').length).toBe(2)
    expect(wrapper.findAll('.jv-menu-item')[0].text()).toBe('菜单项1')
    expect(wrapper.findAll('.jv-menu-item')[1].text()).toBe('菜单项2')
  })

  // 样式类测试
  it('样式类测试', () => {
    const wrapper = mount(JvMenuGroup)

    // 检查基础类名
    expect(wrapper.classes()).toContain('jv-menu-group')
    expect(wrapper.find('.jv-menu-group__title').exists()).toBe(true)
    expect(wrapper.find('.jv-menu-group__content').exists()).toBe(true)
  })

  // 可访问性测试
  it('可访问性测试', () => {
    const wrapper = mount(JvMenuGroup, {
      props: {
        title: '分组标题',
      },
    })

    // 角色和状态检查
    expect(wrapper.find('.jv-menu-group__title').attributes('role')).toBe('presentation')
  })
})
