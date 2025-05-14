import type { MenuItem } from '../types'
import { computed, ref } from 'vue'

// 扩展MenuItem接口，用于内部处理
interface InternalMenuItem extends MenuItem {
  /**
   * 父菜单ID，在内部使用
   */
  parentId?: string
}

export interface UseLazyMenuOptions {
  /**
   * 默认展开的子菜单ID
   */
  defaultExpandedIds?: string[]
  /**
   * 是否懒加载子菜单内容
   */
  lazyLoad?: boolean
  /**
   * 预先渲染的层级数
   */
  preRenderLevel?: number
}

/**
 * 子菜单懒加载 hook
 * 优化菜单渲染性能，仅在子菜单被展开时渲染其内容
 */
export function useLazyMenu(options: UseLazyMenuOptions = {}) {
  const {
    defaultExpandedIds = [],
    lazyLoad = true,
    preRenderLevel = 1,
  } = options

  // 已加载的子菜单ID集合
  const loadedMenuIds = ref<Set<string>>(new Set())

  // 已展开的子菜单ID集合
  const expandedMenuIds = ref<Set<string>>(new Set(defaultExpandedIds))

  // 判断某个子菜单是否应该渲染
  const shouldRenderSubmenu = computed(() => {
    return (id: string, level: number) => {
      // 如果不需要懒加载，则总是渲染
      if (!lazyLoad)
        return true

      // 如果在预渲染层级内，直接渲染
      if (level <= preRenderLevel)
        return true

      // 如果已经加载过，继续渲染
      if (loadedMenuIds.value.has(id))
        return true

      // 如果已展开，则标记为已加载并渲染
      if (expandedMenuIds.value.has(id)) {
        loadedMenuIds.value.add(id)
        return true
      }

      return false
    }
  })

  // 切换子菜单展开状态
  function toggleSubmenu(id: string, forceState?: boolean) {
    const isCurrentlyExpanded = expandedMenuIds.value.has(id)
    const newState = forceState !== undefined ? forceState : !isCurrentlyExpanded

    if (newState) {
      expandedMenuIds.value.add(id)
      loadedMenuIds.value.add(id)
    }
    else {
      expandedMenuIds.value.delete(id)
    }

    return newState
  }

  // 标记子菜单为已加载
  function markAsLoaded(id: string) {
    loadedMenuIds.value.add(id)
  }

  // 递归预加载指定层级的菜单
  function preloadMenuLevel(items: MenuItem[], currentLevel: number = 0) {
    if (currentLevel >= preRenderLevel)
      return

    items.forEach((item) => {
      if (item.id && (item.type === 'submenu' || item.type === 'group') && item.children?.length) {
        loadedMenuIds.value.add(item.id)

        // 如果设置了默认展开并且是子菜单，则展开它
        if (item.expanded && item.type === 'submenu') {
          expandedMenuIds.value.add(item.id)
        }

        // 递归加载下一层
        preloadMenuLevel(item.children, currentLevel + 1)
      }
    })
  }

  // 检查菜单项是否展开
  function isExpanded(id: string) {
    return expandedMenuIds.value.has(id)
  }

  // 检查菜单项是否已加载
  function isLoaded(id: string) {
    return loadedMenuIds.value.has(id)
  }

  // 展开菜单项及其所有父级
  function expandMenuPath(itemId: string, menuItemsMap: Map<string, InternalMenuItem>) {
    // 已经被展开就不用处理
    if (expandedMenuIds.value.has(itemId))
      return

    const item = menuItemsMap.get(itemId)
    if (!item)
      return

    // 如果有parentId并且是子菜单，需要先展开父级
    if (item.parentId) {
      const parent = menuItemsMap.get(item.parentId)
      if (parent && parent.type === 'submenu') {
        expandMenuPath(item.parentId, menuItemsMap)
      }
    }

    // 展开当前菜单
    if (item.type === 'submenu') {
      toggleSubmenu(itemId, true)
    }
  }

  // 初始化，预加载指定层级的菜单
  function initializeMenu(items: MenuItem[]) {
    // 重置状态
    loadedMenuIds.value = new Set()
    expandedMenuIds.value = new Set(defaultExpandedIds)

    // 预加载指定层级
    preloadMenuLevel(items)
  }

  return {
    loadedMenuIds,
    expandedMenuIds,
    shouldRenderSubmenu,
    toggleSubmenu,
    markAsLoaded,
    isExpanded,
    isLoaded,
    expandMenuPath,
    initializeMenu,
  }
}
