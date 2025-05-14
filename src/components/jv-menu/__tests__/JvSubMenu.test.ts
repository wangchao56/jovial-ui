import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvMenuItem from '../src/JvMenuItem.vue'
import JvSubMenu from '../src/JvSubMenu.vue'

// 模拟JvCollapse组件，避免测试依赖
vi.mock('@/components/jv-collapse/src/JvCollapse.vue', () => ({
  default: {
    name: 'JvCollapse',
    props: ['modelValue', 'title', 'icon', 'disabled', 'showArrow', 'lazy', 'customClass'],
    template: `
      <div class="jv-collapse" :data-expanded="modelValue" :data-disabled="disabled">
        <div class="jv-collapse__header" @click="$emit('update:model-value', !modelValue)">
          <div class="jv-collapse__icon" v-if="$slots.icon"><slot name="icon"></slot></div>
          <div class="jv-collapse__title"><slot name="header" :expanded="modelValue">{{ title }}</slot></div>
          <div class="jv-collapse__arrow" v-if="showArrow"><slot name="arrow"></slot></div>
        </div>
        <div class="jv-collapse__content" v-if="modelValue || !lazy">
          <div class="jv-collapse__inner"><slot></slot></div>
        </div>
      </div>
    `,
    emits: ['update:model-value'],
  },
}))

describe('jvSubMenu 组件', () => {
  // 基础渲染测试
  it('基础渲染测试', () => {
    const wrapper = mount(JvSubMenu, {
      props: {
        title: '子菜单标题',
      },
    })

    expect(wrapper.classes()).toContain('jv-submenu')
    expect(wrapper.find('.jv-submenu__title-wrapper').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'JvCollapse' }).exists()).toBe(true)
  })

  // 展开/折叠状态测试
  it('展开/折叠状态测试', async () => {
    const wrapper = mount(JvSubMenu, {
      props: {
        title: '子菜单标题',
        expanded: false,
      },
    })

    expect(wrapper.attributes('data-expanded')).toBe('false')

    await wrapper.setProps({ expanded: true })
    expect(wrapper.attributes('data-expanded')).toBe('true')
  })

  // 禁用状态测试
  it('禁用状态测试', () => {
    const wrapper = mount(JvSubMenu, {
      props: {
        title: '子菜单标题',
        disabled: true,
      },
    })

    expect(wrapper.attributes('data-disabled')).toBe('true')
    expect(wrapper.find('.jv-submenu__title-wrapper').attributes('aria-disabled')).toBe('true')
  })

  // 事件测试
  it('事件测试', async () => {
    const wrapper = mount(JvSubMenu, {
      props: {
        title: '子菜单标题',
      },
    })

    // 点击测试
    await wrapper.find('.jv-collapse__header').trigger('click')

    // 检查事件触发
    expect(wrapper.emitted('update:expanded')).toBeTruthy()
    expect(wrapper.emitted('expand')).toBeTruthy()

    // 再次点击折叠
    await wrapper.setProps({ expanded: true })
    await wrapper.find('.jv-collapse__header').trigger('click')

    expect(wrapper.emitted('update:expanded')?.[1]).toEqual([false])
    expect(wrapper.emitted('collapse')).toBeTruthy()
  })

  // 自定义标题插槽测试
  it('自定义标题插槽测试', () => {
    const wrapper = mount(JvSubMenu, {
      slots: {
        title: '<span class="custom-title">自定义标题</span>',
      },
    })

    expect(wrapper.find('.jv-submenu__title-wrapper').find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  // 自定义图标插槽测试
  it('自定义图标插槽测试', () => {
    const wrapper = mount(JvSubMenu, {
      slots: {
        icon: '<span class="custom-icon">图标</span>',
      },
    })

    expect(wrapper.find('.jv-submenu__icon').exists()).toBe(true)
    expect(wrapper.find('.custom-icon').text()).toBe('图标')
  })

  // 自定义箭头插槽测试
  it('自定义箭头插槽测试', () => {
    const wrapper = mount(JvSubMenu, {
      slots: {
        arrow: '<span class="custom-arrow">箭头</span>',
      },
    })

    expect(wrapper.find('.jv-submenu__arrow').exists()).toBe(true)
    expect(wrapper.find('.custom-arrow').text()).toBe('箭头')
  })

  // 集成测试：与JvMenuItem一起使用
  it('集成测试：与JvMenuItem一起使用', async () => {
    const wrapper = mount(JvSubMenu, {
      props: {
        title: '子菜单',
        expanded: true,
      },
      slots: {
        default: [
          '<JvMenuItem title="子菜单项1" />',
          '<JvMenuItem title="子菜单项2" />',
        ],
      },
      global: {
        components: {
          JvMenuItem,
        },
      },
    })

    expect(wrapper.findAll('.jv-menu-item').length).toBe(2)
  })

  // 可访问性测试
  it('可访问性测试', () => {
    const wrapper = mount(JvSubMenu, {
      props: {
        title: '子菜单',
        expanded: false,
      },
    })

    // 检查ARIA属性
    const titleWrapper = wrapper.find('.jv-submenu__title-wrapper')
    expect(titleWrapper.attributes('role')).toBe('menuitem')
    expect(titleWrapper.attributes('aria-haspopup')).toBe('true')
    expect(titleWrapper.attributes('aria-expanded')).toBe('false')

    // 内容区域
    expect(wrapper.find('.jv-submenu__content').attributes('role')).toBe('group')
  })

  // 懒加载功能测试
  it('懒加载功能测试', async () => {
    const wrapper = mount(JvSubMenu, {
      props: {
        title: '子菜单',
        lazy: true,
        expanded: false,
      },
      slots: {
        default: '<div class="lazy-content">懒加载内容</div>',
      },
    })

    // 应该通过JvCollapse传递lazy属性
    expect(wrapper.findComponent({ name: 'JvCollapse' }).props('lazy')).toBe(true)
  })
})
