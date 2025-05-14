import type { Component, ComputedRef, Slot, Slots, VNode } from 'vue'
// src/hooks/useSlotComponent.ts
import { computed } from 'vue'

export interface InternalSlots {
  [name: string]: Slot | undefined
}
/**
 * 检测默认插槽中是否包含指定组件
 * @param slots Vue插槽对象
 * @param componentToFind 要查找的组件
 * @param slotName 要检查的插槽名称，默认为'default'
 * @returns ComputedRef<boolean> 表示是否找到了指定组件
 */
export function useSlotComponent(
  slots: Slots,
  componentToFind: Component | string,
  slotName: string = 'default',
): ComputedRef<boolean> {
  return computed(() => {
    // 检查指定的插槽是否存在
    if (!slots[slotName])
      return false

    // 获取插槽内容
    const slotContent = slots[slotName]()
    if (!slotContent || !slotContent.length)
      return false

    // 检查插槽内容中是否包含指定的组件
    return slotContent.some((vnode) => {
      // 如果componentToFind是字符串，则检查组件名称
      if (typeof componentToFind === 'string') {
        return getComponentName(vnode) === componentToFind
      }
      // 否则直接比较组件对象
      return vnode.type === componentToFind
    })
  })
}

/**
 * 检测所有插槽中是否包含指定组件
 * @param slots Vue插槽对象
 * @param componentToFind 要查找的组件
 * @returns ComputedRef<boolean> 表示是否找到了指定组件
 */
export function useAnySlotComponent(
  slots: Slots,
  componentToFind: Component | string,
): ComputedRef<boolean> {
  return computed(() => {
    // 获取所有插槽名称
    const slotNames = Object.keys(slots)

    // 检查任何插槽是否包含指定组件
    return slotNames.some((slotName) => {
      const slotContent = slots[slotName]?.()
      if (!slotContent || !slotContent.length)
        return false

      return slotContent.some((vnode) => {
        if (typeof componentToFind === 'string') {
          return getComponentName(vnode) === componentToFind
        }
        return vnode.type === componentToFind
      })
    })
  })
}

// 获取组件名称的辅助函数
function getComponentName(vnode: VNode): string | undefined {
  return typeof vnode.type === 'object' && vnode.type !== null
    ? (vnode.type as any).name || (vnode.type as any).__name
    : undefined
}
// 添加新的函数用于获取插槽中指定组件的props
export function useSlotComponentProps<P = any>(
  slots: Slots,
  componentToFind: Component | string,
  slotName: string = 'default',
): ComputedRef<P | undefined> {
  return computed(() => {
    // 检查指定的插槽是否存在
    if (!slots[slotName])
      return undefined

    // 获取插槽内容
    const slotContent = slots[slotName]()
    if (!slotContent || !slotContent.length)
      return undefined

    // 查找指定组件
    const foundNode = slotContent.find((vnode) => {
      if (typeof componentToFind === 'string') {
        return getComponentName(vnode) === componentToFind
      }
      return vnode.type === componentToFind
    })

    // 如果找到了组件，返回其props
    if (foundNode) {
      return foundNode.props as P
    }

    return undefined
  })
}
