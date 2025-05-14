import type { VNode } from 'vue'
import { isVNode } from 'vue'

/**
 * 获取VNode的组件名称
 * @param vnode Vue虚拟节点
 * @returns 组件名称，如果不是组件则返回undefined
 */
export function getComponentName(vnode: VNode): string | undefined {
  if (!isVNode(vnode))
    return undefined

  const type = vnode.type

  // 处理组件类型
  if (typeof type === 'object' && type !== null && 'name' in type) {
    return type.name as string
  }

  // 处理函数式组件
  if (typeof type === 'function' && 'name' in type) {
    return type.name
  }

  // 处理异步组件
  if (typeof type === 'object' && type !== null && '__asyncLoader' in type) {
    const asyncComp = type as { name?: string }
    return asyncComp.name
  }

  return undefined
}

/**
 * 判断VNode是否是指定组件
 * @param vnode Vue虚拟节点
 * @param componentName 组件名称
 * @returns 是否是指定组件
 */
export function isComponentByName(vnode: VNode, componentName: string): boolean {
  const name = getComponentName(vnode)
  return name === componentName
}
