import type { App } from 'vue'
import * as components from '@/components/components'
import { createJovialUI } from '@/core/framework'

// 测试
const jovial = createJovialUI({
  components,
  //   theme: {
  //     defaultTheme: 'light',
  //     themes: {
  //       light: {
  //         darkMode: false,
  //         colors: {
  //           primary: '#067d75',
  //         },
  //       },
  //       dark: {
  //         darkMode: true,
  //         colors: {
  //           primary: '#067d75',
  //         },
  //       },
  //     },
  //   },
  locale: {
    locale: 'zh-Hans',
  },
})

export default {
  install: (app: App) => {
    app.use(jovial)
  },
}
