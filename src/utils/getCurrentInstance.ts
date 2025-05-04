// Types
import type { ComponentInternalInstance } from 'vue'
// Utilities
import { getCurrentInstance as _getCurrentInstance } from 'vue'

import { toKebabCase } from './common'

/**
 * 获取当前组件实例
 * @param name - 调用该函数的函数名，用于错误信息
 * @param message - 可选的错误信息，默认为 'must be called from inside a setup function'
 * @returns 当前组件实例
 * @throws 如果当前组件实例不存在，则抛出错误
 */
export function getCurrentInstance(name: string, message?: string) {
  // 使用 Vue 的 getCurrentInstance 函数获取当前组件实例
  const vm = _getCurrentInstance()

  // 如果当前组件实例不存在，则抛出错误
  if (!vm) {
    throw new Error(
      `[Vuetify] ${name} ${message || 'must be called from inside a setup function'}`
    )
  }

  // 返回当前组件实例
  return vm
}

/**
 * 获取当前组件实例的名称
 * @param name - 组件实例的名称，默认为 'composables'
 * @returns 当前组件实例的名称，格式为 kebab-case
 */
export function getCurrentInstanceName(name = 'composables') {
  // 获取当前组件实例
  const vm = getCurrentInstance(name).type

  // 返回组件实例的名称，格式为 kebab-case
  return toKebabCase((vm as any)?.aliasName || vm?.name)
}

let _uid = 0
let _map = new WeakMap<ComponentInternalInstance, number>()
/**
 * 为当前组件实例生成唯一的ID
 * @returns 当前组件实例的唯一ID
 */
export function getUid() {
  // 获取当前组件实例
  const vm = getCurrentInstance('getUid')

  // 如果当前组件实例已经有了ID，则直接返回该ID
  if (_map.has(vm)) {
    return _map.get(vm)!
  } else {
    // 否则，生成一个新的ID，并将其存储在_map中
    const uid = _uid++
    _map.set(vm, uid)
    return uid
  }
}

/**
 * 重置_uid和_map，用于测试
 */
getUid.reset = () => {
  // 重置_uid和_map
  _uid = 0
  _map = new WeakMap()
}
