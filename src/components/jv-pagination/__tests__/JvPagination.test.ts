import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JvSelect from '../../jv-select'
import JvPagination from '../index'

// 创建一个模拟的国际化适配器
vi.mock('@/locale/adapters/jovial', () => ({
  useLocale: () => ({
    current: { value: 'zh-Hans' },
    t: (key: string, value?: any) => {
      const messages: Record<string, string> = {
        '$jv.pagination.prev': '上一页',
        '$jv.pagination.next': '下一页',
        '$jv.pagination.total': `共 ${value} 条`,
        '$jv.pagination.itemsPerPage': '条/页',
        '$jv.pagination.jumpTo': '前往',
        '$jv.pagination.page': `第${value}页`
      }
      return messages[key] || key
    }
  })
}))

describe('jvPagination', () => {
  // 测试基本渲染
  it('正确渲染分页组件', () => {
    const wrapper = mount(JvPagination, {
      props: {
        modelValue: 1,
        total: 100,
        pageSize: 10
      }
    })

    expect(wrapper.find('.jv-pagination').exists()).toBe(true)
    expect(wrapper.findAll('.jv-pagination__btn').length).toBeGreaterThan(2)
    expect(wrapper.find('.jv-pagination__total').exists()).toBe(true)
  })

  // 测试页码变更
  it('可以切换页码', async () => {
    const wrapper = mount(JvPagination, {
      props: {
        modelValue: 1,
        total: 100,
        pageSize: 10
      }
    })

    // 找到"下一页"按钮（第一个按钮是"上一页"，最后一个是"下一页"）
    const buttons = wrapper.findAll('.jv-pagination__btn')
    const nextBtn = buttons[buttons.length - 1]

    // 点击下一页
    await nextBtn.trigger('click')

    // 检查是否触发了update:modelValue事件，值为2
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(2)

    // 检查是否触发了change事件
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0][0]).toBe(2) // 页码
    expect(wrapper.emitted('change')?.[0][1]).toBe(10) // 每页条数
  })

  // 测试JvSelect组件集成
  it('集成JvSelect组件来选择每页条数', async () => {
    const wrapper = mount(JvPagination, {
      props: {
        modelValue: 1,
        total: 100,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100]
      }
    })

    // 检查是否渲染了JvSelect组件
    expect(wrapper.findComponent(JvSelect).exists()).toBe(true)

    // 模拟选择每页显示20条
    await wrapper.findComponent(JvSelect).vm.$emit('change', 20)

    // 检查是否触发了update:pageSize事件
    expect(wrapper.emitted('update:pageSize')).toBeTruthy()
    expect(wrapper.emitted('update:pageSize')?.[0][0]).toBe(20)

    // 检查是否触发了change事件
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0][0]).toBe(1) // 页码
    expect(wrapper.emitted('change')?.[0][1]).toBe(20) // 每页条数
  })

  // 测试简洁模式
  it('简洁模式下只显示必要元素', () => {
    const wrapper = mount(JvPagination, {
      props: {
        modelValue: 1,
        total: 100,
        pageSize: 10,
        simple: true
      }
    })

    // 简洁模式下，页码按钮应该只有上一页和下一页
    const pageButtons = wrapper.findAll('.jv-pagination__btn')
    expect(pageButtons.length).toBe(2)

    // 跳转到指定页码的输入框不应该显示
    expect(wrapper.find('.jv-pagination__jump').exists()).toBe(false)
  })

  // 测试当页码改变时model值的更新
  it('当页码改变时更新model值', async () => {
    const wrapper = mount(JvPagination, {
      props: {
        modelValue: 1,
        total: 100,
        pageSize: 10
      }
    })

    // 模拟点击特定页码按钮 (第三个按钮是页码"3")
    const buttons = wrapper.findAll('.jv-pagination__btn')
    // 找到第3页的按钮 (通常是第4个按钮，第1个是上一页，然后是页码1,2,3...)
    let page3Button = null
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].text().includes('3')) {
        page3Button = buttons[i]
        break
      }
    }

    if (page3Button) {
      await page3Button.trigger('click')

      // 检查是否触发了update:modelValue事件
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(3)
    }
  })

  // 测试禁用状态
  it('到达首页或末页时禁用对应按钮', async () => {
    const wrapper = mount(JvPagination, {
      props: {
        modelValue: 1, // 首页
        total: 100,
        pageSize: 10
      }
    })

    // 在首页时，上一页按钮应该被禁用
    const prevButton = wrapper.findAll('.jv-pagination__btn')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()

    // 切换到最后一页
    await wrapper.setProps({ modelValue: 10 }) // 总共10页

    // 在末页时，下一页按钮应该被禁用
    const buttons = wrapper.findAll('.jv-pagination__btn')
    const nextButton = buttons[buttons.length - 1]
    expect(nextButton.attributes('disabled')).toBeDefined()
  })
})
