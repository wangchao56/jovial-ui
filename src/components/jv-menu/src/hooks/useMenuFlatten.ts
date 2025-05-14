import type { MenuItem } from '../types'
import { computed, reactive, ref, watch } from 'vue'

interface FlatMenuItem extends MenuItem {
  /**
   * 父菜单ID
   */
  parentId?: string
  /**
   * 菜单路径（从根到当前项）
   */
  path: string[]
  /**
   * 菜单层级
   */
  level: number
  /**
   * 子菜单是否已加载
   */
  childrenLoaded: boolean
  /**
   * 原始子菜单数据
   */
  rawChildren?: MenuItem[]
}

interface UseMenuFlattenOptions {
  /**
   * 是否预加载所有子菜单（默认只加载第一级）
   */
  preloadAll?: boolean
  /**
   * 菜单ID前缀
   */
  idPrefix?: string
  /**
   * 最大预加载层级
   */
  maxPreloadLevel?: number
}

/**
 * 菜单扁平化与懒加载处理
 */
export function useMenuFlatten(
  menuItems: MenuItem[] | (() => MenuItem[]),
  options: UseMenuFlattenOptions = {},
) {
  // 配置项默认值
  const {
    preloadAll = false,
    idPrefix = 'menu-',
    maxPreloadLevel = 1,
  } = options

  // 原始菜单数据
  const rawItems = ref<MenuItem[]>(typeof menuItems === 'function' ? menuItems() : menuItems)

  // 扁平化后的菜单数据
  const flattenedItems = reactive(new Map<string, FlatMenuItem>())

  // 根级菜单项ID列表
  const rootItemIds = ref<string[]>([])

  // 当前展开的子菜单ID集合
  const expandedIds = reactive(new Set<string>())

  // 为菜单项生成唯一ID
  function generateId(item: MenuItem, parentId?: string, index: number = 0): string {
    if (item.id)
      return item.id

    const baseId = parentId
      ? `${parentId}-${index}`
      : `${idPrefix}${index}`

    return baseId
  }

  // 拍平菜单结构并标记层级关系
  function flattenMenu(
    items: MenuItem[] = [],
    parentId?: string,
    level: number = 0,
    path: string[] = [],
  ) {
    // 清空之前的数据
    if (!parentId) {
      flattenedItems.clear()
      rootItemIds.value = []
    }

    items.forEach((item, index) => {
      const id = generateId(item, parentId, index)
      const currentPath = [...path, id]

      // 当为根级菜单项时，保存ID
      if (!parentId) {
        rootItemIds.value.push(id)
      }

      // 处理子菜单
      const hasChildren = item.children && item.children.length > 0
      const shouldPreloadChildren = preloadAll || level < maxPreloadLevel

      // 扁平化菜单项
      const flatItem: FlatMenuItem = {
        ...item,
        id,
        parentId,
        level,
        path: currentPath,
        // 根据预加载设置决定是否加载子菜单
        childrenLoaded: hasChildren ? shouldPreloadChildren : true,
        rawChildren: hasChildren ? [...item.children!] : undefined,
      }

      // 保存到Map中
      flattenedItems.set(id, flatItem)

      // 如果需要预加载子菜单，则递归处理
      if (hasChildren && shouldPreloadChildren) {
        flattenMenu(item.children!, id, level + 1, currentPath)
      }
    })
  }

  // 加载特定菜单项的子菜单
  function loadChildren(itemId: string) {
    const item = flattenedItems.get(itemId)
    if (!item || !item.rawChildren || item.childrenLoaded)
      return

    // 标记为已加载
    item.childrenLoaded = true

    // 递归拍平子菜单
    flattenMenu(item.rawChildren, itemId, item.level + 1, item.path)
  }

  // 切换子菜单展开状态
  function toggleExpand(itemId: string) {
    if (!flattenedItems.has(itemId))
      return

    const item = flattenedItems.get(itemId)!

    if (item.type !== 'submenu')
      return

    // 加载子菜单（如果尚未加载）
    if (!item.childrenLoaded) {
      loadChildren(itemId)
    }

    // 切换展开状态
    if (expandedIds.has(itemId)) {
      expandedIds.delete(itemId)
    }
    else {
      expandedIds.add(itemId)

      // 更新组件的expanded属性
      item.expanded = true
    }

    // 返回新的展开状态
    return expandedIds.has(itemId)
  }

  // 获取指定ID的所有子菜单ID（已加载的）
  function getChildrenIds(itemId: string): string[] {
    const children: string[] = []

    for (const [id, item] of flattenedItems.entries()) {
      if (item.parentId === itemId) {
        children.push(id)

        // 如果该子项也是已展开的submenu，递归获取其子项
        if (item.type === 'submenu' && expandedIds.has(id)) {
          children.push(...getChildrenIds(id))
        }
      }
    }

    return children
  }

  // 根据展开状态获取可见的菜单项
  const visibleItems = computed(() => {
    const visibleIds = new Set<string>([...rootItemIds.value])

    // 添加所有展开子菜单的子项ID
    expandedIds.forEach((id) => {
      getChildrenIds(id).forEach((childId) => {
        visibleIds.add(childId)
      })
    })

    // 返回可见项的数组
    return Array.from(visibleIds)
      .map(id => flattenedItems.get(id))
      .filter(Boolean) as FlatMenuItem[]
  })

  // 通过ID获取菜单项
  function getItemById(id: string): FlatMenuItem | undefined {
    return flattenedItems.get(id)
  }

  // 获取某菜单项的所有子项
  function getChildrenByParentId(parentId: string): FlatMenuItem[] {
    const children: FlatMenuItem[] = []

    for (const [, item] of flattenedItems.entries()) {
      if (item.parentId === parentId) {
        children.push(item)
      }
    }

    return children
  }

  // 重新加载菜单数据
  function reloadMenu(newItems?: MenuItem[]) {
    rawItems.value = newItems || (typeof menuItems === 'function' ? menuItems() : menuItems)
    expandedIds.clear()
    flattenMenu(rawItems.value)
  }

  // 初始化
  flattenMenu(rawItems.value)

  // 监听菜单数据变化
  watch(() => typeof menuItems === 'function' ? menuItems() : menuItems, (newItems) => {
    if (newItems && newItems !== rawItems.value) {
      reloadMenu(newItems)
    }
  }, { deep: true })

  return {
    rawItems,
    flattenedItems,
    rootItemIds,
    expandedIds,
    visibleItems,
    toggleExpand,
    loadChildren,
    getItemById,
    getChildrenByParentId,
    reloadMenu,
  }
}
