import type { VNode } from 'vue'
import type { MenuItem } from './types'
import { h } from 'vue'
import JvMenuDivider from './JvMenuDivider.vue'
import JvMenuGroup from './JvMenuGroup.vue'
import JvMenuItem from './JvMenuItem.vue'
import JvSubMenu from './JvSubMenu.vue'

/**
 * 根据菜单项数据递归渲染菜单
 * @param items 菜单项数组
 * @param slots 自定义插槽
 * @param onItemClick 菜单项点击回调
 * @returns 渲染的VNode数组
 */
export function renderMenuItems(
  items: MenuItem[] = [],
  slots: Record<string, any> = {},
  onItemClick: (item: MenuItem) => void = () => {},
): VNode[] {
  if (!items || items.length === 0) {
    // 没有菜单项，渲染空状态
    return slots.empty ? [slots.empty()] : []
  }

  return items.map((item) => {
    // 处理分割线
    if (item.type === 'divider') {
      return slots.divider ? slots.divider({ item }) : h(JvMenuDivider)
    }

    // 处理普通菜单项
    if (item.type === 'item') {
      const handleClick = () => {
        if (item.onClick) {
          item.onClick(item)
        }
        onItemClick(item)
      }

      if (slots.item) {
        return slots.item({
          item,
          onClick: handleClick,
        })
      }

      return h(JvMenuItem, {
        id: item.id,
        title: item.title,
        icon: item.icon,
        disabled: item.disabled,
        active: item.active,
        data: item.data,
        onClick: handleClick,
      })
    }

    // 处理菜单分组
    if (item.type === 'group') {
      const groupContent = renderMenuItems(item.children || [], slots, onItemClick)

      if (slots.group) {
        return slots.group({
          item,
          children: groupContent,
        })
      }

      return h(JvMenuGroup, {
        title: item.title,
        disabled: item.disabled,
      }, {
        default: () => groupContent,
        title: item.title && slots.groupTitle
          ? () => slots.groupTitle({ title: item.title })
          : undefined,
      })
    }

    // 处理子菜单
    if (item.type === 'submenu') {
      const submenuContent = renderMenuItems(item.children || [], slots, onItemClick)

      if (slots.submenu) {
        return slots.submenu({
          item,
          children: submenuContent,
        })
      }

      return h(JvSubMenu, {
        title: item.title,
        icon: item.icon,
        disabled: item.disabled,
        expanded: item.expanded,
        showArrow: item.showArrow !== false,
      }, {
        default: () => submenuContent,
        title: item.title && slots.submenuTitle
          ? () => slots.submenuTitle({ title: item.title })
          : undefined,
        arrow: slots.arrow ? () => slots.arrow() : undefined,
      })
    }

    // 默认当作普通菜单项处理
    return h(JvMenuItem, {
      title: String(item.title || '未知菜单项'),
      disabled: true,
    })
  })
}
