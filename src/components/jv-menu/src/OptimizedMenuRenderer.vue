<script setup lang="ts">
import type { MenuItem } from './types'
import { createNamespace } from '@/utils'
import { h, onMounted } from 'vue'
import { useMenuFlatten } from './hooks/useMenuFlatten'
import JvMenuDivider from './JvMenuDivider.vue'
import JvMenuGroup from './JvMenuGroup.vue'
import JvMenuItem from './JvMenuItem.vue'
import JvSubMenu from './JvSubMenu.vue'

const props = withDefaults(defineProps<OptimizedMenuRendererProps>(), {
  items: () => [],
  preloadLevel: 1,
  lazyLoad: true,
  defaultExpandedIds: () => [],
})
const emit = defineEmits<OptimizedMenuRendererEmits>()
const COMPONENT_NAME = 'OptimizedMenuRenderer'
const bem = createNamespace(COMPONENT_NAME)

interface OptimizedMenuRendererProps {
  /**
   * 菜单项数据
   */
  items?: MenuItem[]
  /**
   * 预加载层级
   */
  preloadLevel?: number
  /**
   * 是否启用懒加载
   */
  lazyLoad?: boolean
  /**
   * 默认展开的菜单项ID
   */
  defaultExpandedIds?: string[]
}

interface OptimizedMenuRendererEmits {
  (e: 'itemClick', item: MenuItem): void
  (e: 'expand', item: MenuItem): void
  (e: 'collapse', item: MenuItem): void
}

// 使用菜单扁平化hook
const {
  flattenedItems,
  rootItemIds,
  expandedIds,
  toggleExpand,
  getChildrenByParentId,
} = useMenuFlatten(
  () => props.items,
  {
    preloadAll: !props.lazyLoad,
    maxPreloadLevel: props.preloadLevel,
  },
)

// 处理菜单项点击
function handleItemClick(item: MenuItem) {
  emit('itemClick', item)
}

// 处理子菜单展开/折叠
function handleSubmenuToggle(item: MenuItem, isExpanded: boolean) {
  if (!item.id)
    return

  if (isExpanded) {
    emit('expand', item)
  }
  else {
    emit('collapse', item)
  }
}

// 渲染单个菜单项
function renderMenuItem(item: MenuItem) {
  if (!item)
    return null

  // 渲染分割线
  if (item.type === 'divider') {
    return h(JvMenuDivider)
  }

  // 渲染普通菜单项
  if (item.type === 'item') {
    return h(JvMenuItem, {
      id: item.id,
      title: item.title,
      icon: item.icon,
      disabled: item.disabled,
      active: item.active,
      data: item.data,
      onClick: () => handleItemClick(item),
    })
  }

  // 渲染分组
  if (item.type === 'group') {
    return h(JvMenuGroup, {
      title: item.title,
      disabled: item.disabled,
    }, {
      default: () => item.id ? renderMenuChildren(item.id) : null,
    })
  }

  // 渲染子菜单
  if (item.type === 'submenu') {
    const isExpanded = item.id ? expandedIds.has(item.id) : false

    return h(JvSubMenu, {
      'title': item.title,
      'icon': item.icon,
      'disabled': item.disabled,
      'expanded': isExpanded,
      'showArrow': item.showArrow !== false,
      'lazy': props.lazyLoad,
      'onUpdate:expanded': (val: boolean) => {
        if (item.id) {
          toggleExpand(item.id)
          handleSubmenuToggle(item, val)
        }
      },
    }, {
      default: () => item.id ? renderMenuChildren(item.id) : null,
    })
  }

  return null
}

// 递归渲染子菜单项
function renderMenuChildren(parentId: string) {
  const children = getChildrenByParentId(parentId)

  if (!children || children.length === 0) {
    return h('div', { class: bem.e('empty') }, '暂无菜单项')
  }

  return children.map(child =>
    h('div', {
      key: child.id,
      class: bem.e('menu-item'),
    }, [renderMenuItem(child)]),
  )
}

// 初始化默认展开的菜单项
onMounted(() => {
  if (props.defaultExpandedIds && props.defaultExpandedIds.length > 0) {
    props.defaultExpandedIds.forEach((id) => {
      const item = flattenedItems.get(id)
      if (item && item.type === 'submenu') {
        toggleExpand(id)
      }
    })
  }
})
</script>

<template>
  <div :class="bem.b()">
    <!-- 根级菜单项渲染 -->
    <template v-for="id in rootItemIds" :key="id">
      <div :class="bem.e('menu-item')">
        <component :is="renderMenuItem(flattenedItems.get(id) as MenuItem)" />
      </div>
    </template>

    <!-- 无菜单项时的空状态 -->
    <div v-if="rootItemIds.length === 0" :class="bem.e('empty')">
      <slot name="empty">
        <div :class="bem.e('empty-text')">
          暂无菜单项
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@include b(optimized-menu-renderer) {
  width: 100%;

  @include e(menu-item) {
    width: 100%;
  }

  @include e(empty) {
    padding: 16px;
    text-align: center;
  }

  @include e(empty-text) {
    color: var(--jv-text-secondary, rgb(0 0 0 / 0.6));
    font-size: 14px;
  }
}
</style>
