import type { MenuItem } from './types'

// 扁平化菜单项接口
export interface FlatMenuItem extends MenuItem {
  parentId?: string
  path: string[]
  level: number
  childrenLoaded: boolean
  rawChildren?: MenuItem[]
}

// 菜单扁平化Hook返回值类型
export interface UseMenuFlattenReturn {
  rawItems: Ref<MenuItem[]>
  flattenedItems: Map<string, FlatMenuItem>
  rootItemIds: Ref<string[]>
  expandedIds: Set<string>
  visibleItems: ComputedRef<FlatMenuItem[]>
  toggleExpand: (itemId: string) => boolean | undefined
  loadChildren: (itemId: string) => void
  getItemById: (id: string) => FlatMenuItem | undefined
  getChildrenByParentId: (parentId: string) => FlatMenuItem[]
  reloadMenu: (newItems?: MenuItem[]) => void
}

// 菜单懒加载Hook返回值类型
export interface UseLazyMenuReturn {
  loadedMenuIds: Ref<Set<string>>
  expandedMenuIds: Ref<Set<string>>
  shouldRenderSubmenu: ComputedRef<(id: string, level: number) => boolean>
  toggleSubmenu: (id: string, forceState?: boolean) => boolean
  markAsLoaded: (id: string) => void
  isExpanded: (id: string) => boolean
  isLoaded: (id: string) => boolean
  expandMenuPath: (itemId: string, menuItemsMap: Map<string, MenuItem & { parentId?: string }>) => void
  initializeMenu: (items: MenuItem[]) => void
}

// 扁平化菜单Hook选项接口
export interface UseMenuFlattenOptions {
  preloadAll?: boolean
  idPrefix?: string
  maxPreloadLevel?: number
}

// 懒加载菜单Hook选项接口
export interface UseLazyMenuOptions {
  defaultExpandedIds?: string[]
  lazyLoad?: boolean
  preRenderLevel?: number
}
