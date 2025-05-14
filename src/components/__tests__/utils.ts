import type { Component } from 'vue'
// 编写一个注入主题的挂载测试工具
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import JvThemeProvider from '../internal/JvThemeProvider.vue'

/**
 * 带主题注入的组件挂载函数
 * @param component 要挂载的组件
 * @param options 挂载选项
 * @returns 组件包装器
 */
export function mountWithTheme(component: Component, options = {}) {
  const render = h(JvThemeProvider, [h(component)])
  return mount(render, {
    ...options,
  })
}
