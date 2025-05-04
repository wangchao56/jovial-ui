import type { App } from 'vue'
import * as components from '@/components/components'
import { createJovialUI } from '@/core/framework'

const jovial = createJovialUI({
  components,
  locale: {
    locale: 'zh-Hans',
    fallback: 'en',
  },
})

export default {
  install: (app: App) => {
    app.use(jovial)
  },
}
