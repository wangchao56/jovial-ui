import type { VNode, VNodeArrayChildren } from 'vue'

/**
 * 检查节点是否为插槽节点
 */
export function isSlotNode(node: VNode | undefined): boolean {
  if (!node)
    return false

  // 插槽节点通常有children属性，且type不是具体的组件或HTML标签
  return (
    !!node.children
    && typeof node.type !== 'string'
    && typeof node.type !== 'object'
  )
}

/**
 * 确保返回单一子节点
 * 如果children是数组且只有一个元素，返回该元素
 * 否则返回原始节点
 */
export function ensureOnlyChild(children: VNodeArrayChildren): VNode {
  if (Array.isArray(children) && children.length === 1) {
    return children[0] as VNode
  }

  // 如果没有子节点或有多个子节点，抛出错误
  if (!Array.isArray(children) || children.length === 0) {
    throw new Error('期望有且只有一个子节点')
  }

  if (children.length > 1) {
    throw new Error('插槽中有多个子节点，但期望只有一个')
  }

  return children[0] as VNode
}
