import type { App, Component, Plugin } from 'vue'
import { toCamelCase } from './common'

export type SFCWithInstall<T> = T & Plugin

/**
 *  将组件封装成一个插件
 * @param comp   组件
 * @returns      返回一个插件
 */
export function withInstall<T>(comp: T) {
  ;(comp as SFCWithInstall<T>).install = function (app: App) {
    const componentName = (comp as unknown as Component).name

    if (typeof componentName === 'string') {
      // 注册组件
      app.component(componentName, comp as Component)
      // 注册组件库 'jv-icon' -> 'JvIcon'
      app.component(toCamelCase(componentName), comp as Component)
    }
  }
  return comp as SFCWithInstall<T>
}
