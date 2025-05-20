import type { App } from 'vue'
import JvAlert from './src/JvAlert.vue'
import { JVALERT_NAME } from './src/types'

// 导出组件
export { JvAlert }

// 导出组件属性类型
export * from './src/types'

// 注册组件
export function install(app: App) {
  app.component(JVALERT_NAME, JvAlert)
  return app
}

export default {
  install,
}

declare module 'vue' {
  export interface GlobalComponents {
    JvAlert: typeof JvAlert
  }
}
