import type { App } from 'vue'
import * as components from '@/components/components'
import { createJovialUI } from '@/core/framework'

const Jovial = createJovialUI({
  components,
  locale: {
    locale: 'zh-Hans',
  },
})
export default {
  install: (app: App) => {
    app.use(Jovial)
  },
}
