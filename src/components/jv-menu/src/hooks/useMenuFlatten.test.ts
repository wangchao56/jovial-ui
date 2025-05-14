import type { MenuItem } from '../types'
import { beforeEach, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useMenuFlatten } from './useMenuFlatten'

describe('useMenuFlatten', () => {
  // 测试数据
  let menuItems: MenuItem[]

  beforeEach(() => {
    // 每个测试前重置菜单数据
    menuItems = [
      {
        type: 'item',
        id: 'item1',
        title: '菜单项1',
      },
      {
        type: 'group',
        id: 'group1',
        title: '分组1',
        children: [
          {
            type: 'item',
            id: 'item2',
            title: '菜单项2',
          },
          {
            type: 'item',
            id: 'item3',
            title: '菜单项3',
          },
        ],
      },
      {
        type: 'submenu',
        id: 'submenu1',
        title: '子菜单1',
        children: [
          {
            type: 'item',
            id: 'item4',
            title: '子菜单项1',
          },
          {
            type: 'submenu',
            id: 'submenu2',
            title: '嵌套子菜单',
            children: [
              {
                type: 'item',
                id: 'item5',
                title: '嵌套菜单项',
              },
            ],
          },
        ],
      },
      {
        type: 'divider',
        id: 'divider1',
      },
    ]
  })

  // 测试初始化扁平化
  it('正确初始化扁平化菜单', () => {
    const { flattenedItems, rootItemIds } = useMenuFlatten(menuItems)

    // 检查根级菜单项
    expect(rootItemIds.value.length).toBe(4)
    expect(rootItemIds.value).toContain('item1')
    expect(rootItemIds.value).toContain('group1')
    expect(rootItemIds.value).toContain('submenu1')
    expect(rootItemIds.value).toContain('divider1')

    // 检查第一级菜单项是否正确扁平化
    expect(flattenedItems.size).toBeGreaterThan(0)
    expect(flattenedItems.has('item1')).toBe(true)
    expect(flattenedItems.has('group1')).toBe(true)
    expect(flattenedItems.has('submenu1')).toBe(true)
    expect(flattenedItems.has('divider1')).toBe(true)

    // 检查分组子项是否被扁平化（默认第一级）
    expect(flattenedItems.has('item2')).toBe(true)
    expect(flattenedItems.has('item3')).toBe(true)

    // 检查子菜单子项是否被扁平化（默认第一级）
    expect(flattenedItems.has('item4')).toBe(true)
    expect(flattenedItems.has('submenu2')).toBe(true)

    // 检查嵌套子菜单子项是否没有被扁平化（超出默认层级）
    expect(flattenedItems.has('item5')).toBe(false)
  })

  // 测试预加载所有层级
  it('预加载所有层级', () => {
    const { flattenedItems } = useMenuFlatten(menuItems, { preloadAll: true })

    // 检查所有层级是否都被加载
    expect(flattenedItems.has('item1')).toBe(true)
    expect(flattenedItems.has('item2')).toBe(true)
    expect(flattenedItems.has('item3')).toBe(true)
    expect(flattenedItems.has('item4')).toBe(true)
    expect(flattenedItems.has('submenu2')).toBe(true)
    expect(flattenedItems.has('item5')).toBe(true) // 第三级菜单项
  })

  // 测试自定义预加载层级
  it('自定义预加载层级', () => {
    const { flattenedItems } = useMenuFlatten(menuItems, { maxPreloadLevel: 0 })

    // 只有第一级菜单项被扁平化
    expect(flattenedItems.has('item1')).toBe(true)
    expect(flattenedItems.has('group1')).toBe(true)
    expect(flattenedItems.has('submenu1')).toBe(true)
    expect(flattenedItems.has('divider1')).toBe(true)

    // 第二级菜单项未被加载
    expect(flattenedItems.has('item2')).toBe(false)
    expect(flattenedItems.has('item3')).toBe(false)
    expect(flattenedItems.has('item4')).toBe(false)
    expect(flattenedItems.has('submenu2')).toBe(false)
  })

  // 测试加载子菜单
  it('按需加载子菜单', () => {
    const { flattenedItems, loadChildren } = useMenuFlatten(menuItems, { maxPreloadLevel: 0 })

    // 初始时只有第一级菜单项被扁平化
    expect(flattenedItems.has('submenu2')).toBe(false)

    // 加载子菜单
    loadChildren('submenu1')

    // 检查子菜单是否被加载
    expect(flattenedItems.has('item4')).toBe(true)
    expect(flattenedItems.has('submenu2')).toBe(true)

    // 嵌套子菜单项仍未加载
    expect(flattenedItems.has('item5')).toBe(false)

    // 继续加载嵌套子菜单
    loadChildren('submenu2')

    // 检查嵌套子菜单项是否被加载
    expect(flattenedItems.has('item5')).toBe(true)
  })

  // 测试切换展开状态
  it('切换展开状态', () => {
    const { expandedIds, toggleExpand } = useMenuFlatten(menuItems, { maxPreloadLevel: 0 })

    // 初始时没有展开的菜单
    expect(expandedIds.size).toBe(0)

    // 展开子菜单
    toggleExpand('submenu1')

    // 检查展开状态
    expect(expandedIds.has('submenu1')).toBe(true)

    // 再次调用应该折叠菜单
    toggleExpand('submenu1')

    // 检查折叠状态
    expect(expandedIds.has('submenu1')).toBe(false)
  })

  // 测试获取子菜单ID
  it('获取子菜单ID', () => {
    const { getChildrenByParentId } = useMenuFlatten(menuItems)

    // 获取分组的子菜单
    const groupChildren = getChildrenByParentId('group1')
    expect(groupChildren.length).toBe(2)
    expect(groupChildren[0].id).toBe('item2')
    expect(groupChildren[1].id).toBe('item3')

    // 获取子菜单的子项
    const submenuChildren = getChildrenByParentId('submenu1')
    expect(submenuChildren.length).toBe(2)
    expect(submenuChildren[0].id).toBe('item4')
    expect(submenuChildren[1].id).toBe('submenu2')
  })

  // 测试可见菜单项
  it('根据展开状态获取可见菜单项', () => {
    const { visibleItems, toggleExpand } = useMenuFlatten(menuItems, { maxPreloadLevel: 0 })

    // 初始时只有根级菜单项可见
    expect(visibleItems.value.length).toBe(4)

    // 展开子菜单
    toggleExpand('submenu1')

    // 检查可见菜单项是否增加
    expect(visibleItems.value.length).toBeGreaterThan(4)

    // 获取可见菜单项的ID
    const visibleIds = visibleItems.value.map(item => item.id)
    expect(visibleIds).toContain('item4')
    expect(visibleIds).toContain('submenu2')
  })

  // 测试重新加载菜单
  it('重新加载菜单', () => {
    const { reloadMenu, flattenedItems, rootItemIds } = useMenuFlatten(menuItems)

    // 初始状态
    expect(rootItemIds.value.length).toBe(4)

    // 修改菜单数据
    const newMenuItems: MenuItem[] = [
      {
        type: 'item',
        id: 'new-item',
        title: '新菜单项',
      },
    ]

    // 重新加载
    reloadMenu(newMenuItems)

    // 检查更新后的状态
    expect(rootItemIds.value.length).toBe(1)
    expect(rootItemIds.value[0]).toBe('new-item')
    expect(flattenedItems.size).toBe(1)
    expect(flattenedItems.has('new-item')).toBe(true)
  })

  // 测试响应式数据源
  it('使用响应式数据源', () => {
    // 创建响应式数据源
    const reactiveMenuItems = ref<MenuItem[]>(menuItems)

    const { rootItemIds, reloadMenu } = useMenuFlatten(() => reactiveMenuItems.value)

    // 初始状态
    expect(rootItemIds.value.length).toBe(4)

    // 修改响应式数据
    reactiveMenuItems.value = [
      {
        type: 'item',
        id: 'reactive-item',
        title: '响应式菜单项',
      },
    ]

    // 手动触发重新加载（在实际使用中应由监听器触发）
    reloadMenu()

    // 检查更新后的状态
    expect(rootItemIds.value.length).toBe(1)
    expect(rootItemIds.value[0]).toBe('reactive-item')
  })
})
