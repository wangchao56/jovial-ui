import type { App } from 'vue'
import * as components from './components/components'

// 导出所有组件
export * from './components/components'

// 导出Vue插件
export default {
  install: (app: App): void => {
    Object.entries(components).forEach(([key, value]) => {
      app.component(key, value)
    })
  }
}
