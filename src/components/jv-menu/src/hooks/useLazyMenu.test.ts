import type { MenuItem } from '../types'
import { describe, expect, it } from 'vitest'
import { useLazyMenu } from './useLazyMenu'

describe('useLazyMenu', () => {
  // 测试默认选项
  it('使用默认选项初始化', () => {
    const { loadedMenuIds, expandedMenuIds, shouldRenderSubmenu } = useLazyMenu()

    // 检查初始状态
    expect(loadedMenuIds.value.size).toBe(0)
    expect(expandedMenuIds.value.size).toBe(0)

    // 测试默认渲染逻辑
    expect(shouldRenderSubmenu.value('test-submenu', 1)).toBe(true) // 层级1以内应该渲染
    expect(shouldRenderSubmenu.value('test-submenu', 2)).toBe(false) // 层级2应该懒加载
  })

  // 测试自定义默认展开项
  it('使用自定义默认展开项初始化', () => {
    const { expandedMenuIds, loadedMenuIds } = useLazyMenu({
      defaultExpandedIds: ['submenu1', 'submenu2'],
    })

    // 验证默认展开项
    expect(expandedMenuIds.value.size).toBe(2)
    expect(expandedMenuIds.value.has('submenu1')).toBe(true)
    expect(expandedMenuIds.value.has('submenu2')).toBe(true)

    // 默认展开但未加载
    expect(loadedMenuIds.value.size).toBe(0)
  })

  // 测试禁用懒加载
  it('禁用懒加载', () => {
    const { shouldRenderSubmenu } = useLazyMenu({
      lazyLoad: false,
    })

    // 不论层级如何，都应该渲染
    expect(shouldRenderSubmenu.value('test-submenu', 1)).toBe(true)
    expect(shouldRenderSubmenu.value('test-submenu', 2)).toBe(true)
    expect(shouldRenderSubmenu.value('test-submenu', 5)).toBe(true)
  })

  // 测试自定义预渲染层级
  it('自定义预渲染层级', () => {
    const { shouldRenderSubmenu } = useLazyMenu({
      preRenderLevel: 2,
    })

    // 层级2以内应该渲染
    expect(shouldRenderSubmenu.value('test-submenu', 1)).toBe(true)
    expect(shouldRenderSubmenu.value('test-submenu', 2)).toBe(true)
    expect(shouldRenderSubmenu.value('test-submenu', 3)).toBe(false)
  })

  // 测试切换子菜单
  it('切换子菜单状态', () => {
    const { toggleSubmenu, expandedMenuIds, loadedMenuIds } = useLazyMenu()

    // 展开子菜单
    const result = toggleSubmenu('submenu1')

    // 检查返回值和状态
    expect(result).toBe(true)
    expect(expandedMenuIds.value.has('submenu1')).toBe(true)
    expect(loadedMenuIds.value.has('submenu1')).toBe(true)

    // 折叠子菜单
    const result2 = toggleSubmenu('submenu1')

    // 检查状态变化
    expect(result2).toBe(false)
    expect(expandedMenuIds.value.has('submenu1')).toBe(false)

    // 加载状态应该保持不变
    expect(loadedMenuIds.value.has('submenu1')).toBe(true)
  })

  // 测试强制展开/折叠
  it('强制展开/折叠子菜单', () => {
    const { toggleSubmenu, expandedMenuIds } = useLazyMenu()

    // 强制展开
    toggleSubmenu('submenu1', true)
    expect(expandedMenuIds.value.has('submenu1')).toBe(true)

    // 尝试再次强制展开（状态不应改变）
    toggleSubmenu('submenu1', true)
    expect(expandedMenuIds.value.has('submenu1')).toBe(true)

    // 强制折叠
    toggleSubmenu('submenu1', false)
    expect(expandedMenuIds.value.has('submenu1')).toBe(false)
  })

  // 测试手动标记为已加载
  it('手动标记为已加载', () => {
    const { markAsLoaded, loadedMenuIds, shouldRenderSubmenu } = useLazyMenu()

    // 初始状态
    expect(loadedMenuIds.value.has('submenu1')).toBe(false)
    expect(shouldRenderSubmenu.value('submenu1', 3)).toBe(false)

    // 标记为已加载
    markAsLoaded('submenu1')

    // 检查状态变化
    expect(loadedMenuIds.value.has('submenu1')).toBe(true)
    expect(shouldRenderSubmenu.value('submenu1', 3)).toBe(true)
  })

  // 测试状态检查方法
  it('测试状态检查方法', () => {
    const { toggleSubmenu, isExpanded, isLoaded } = useLazyMenu()

    // 初始状态
    expect(isExpanded('submenu1')).toBe(false)
    expect(isLoaded('submenu1')).toBe(false)

    // 展开子菜单
    toggleSubmenu('submenu1')

    // 检查状态
    expect(isExpanded('submenu1')).toBe(true)
    expect(isLoaded('submenu1')).toBe(true)
  })

  // 测试菜单路径展开
  it('展开菜单路径', () => {
    // 准备菜单项映射
    const menuItemsMap = new Map()
    menuItemsMap.set('item1', { id: 'item1', type: 'item' })
    menuItemsMap.set('submenu1', { id: 'submenu1', type: 'submenu' })
    menuItemsMap.set('submenu2', {
      id: 'submenu2',
      type: 'submenu',
      parentId: 'submenu1',
    })
    menuItemsMap.set('item2', {
      id: 'item2',
      type: 'item',
      parentId: 'submenu2',
    })

    const { expandMenuPath, expandedMenuIds } = useLazyMenu()

    // 展开到深层菜单项
    expandMenuPath('item2', menuItemsMap)

    // 检查整个路径是否已展开
    expect(expandedMenuIds.value.has('submenu1')).toBe(true)
    expect(expandedMenuIds.value.has('submenu2')).toBe(true)
  })

  // 测试初始化菜单
  it('初始化菜单', () => {
    // 模拟菜单数据
    const menuItems: MenuItem[] = [
      {
        type: 'submenu',
        id: 'submenu1',
        expanded: true,
        children: [
          {
            type: 'item',
            id: 'item1',
          },
          {
            type: 'submenu',
            id: 'submenu2',
            children: [
              {
                type: 'item',
                id: 'item2',
              },
            ],
          },
        ],
      },
    ]

    const { initializeMenu, loadedMenuIds, expandedMenuIds } = useLazyMenu({
      preRenderLevel: 1,
    })

    // 初始化菜单
    initializeMenu(menuItems)

    // 检查加载状态
    expect(loadedMenuIds.value.has('submenu1')).toBe(true)
    expect(loadedMenuIds.value.has('submenu2')).toBe(false) // 第二级未预加载

    // 检查展开状态（默认展开项应该保持）
    expect(expandedMenuIds.value.size).toBe(0) // 没有默认展开项
  })

  // 测试带默认展开项的初始化
  it('带默认展开项的初始化', () => {
    // 模拟菜单数据
    const menuItems: MenuItem[] = [
      {
        type: 'submenu',
        id: 'submenu1',
        children: [],
      },
      {
        type: 'submenu',
        id: 'submenu2',
        children: [],
      },
    ]

    const { initializeMenu, expandedMenuIds } = useLazyMenu({
      defaultExpandedIds: ['submenu1'],
    })

    // 初始化菜单
    initializeMenu(menuItems)

    // 检查展开状态（默认展开项应该保持）
    expect(expandedMenuIds.value.size).toBe(1)
    expect(expandedMenuIds.value.has('submenu1')).toBe(true)
  })
})
