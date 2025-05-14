import Jovial from '@/config/index'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './blog/router'
import { createLocale } from './locale'
// 导入全局样式和组件
import '@/theme/styles/index.scss'

/// 创建Vue应用实例
const app = createApp(App)

// 添加全局组件库
app.use(Jovial)

// 创建并使用Pinia状态管理
const pinia = createPinia()
app.use(pinia)

// 创建并使用Vue I18n
const i18n = createLocale()
app.use(i18n)
app.use(router)

// 使用路由 - 放在最后初始化
// 挂载应用
app.mount('#app')
