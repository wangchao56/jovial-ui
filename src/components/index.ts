import type { App } from 'vue'
import * as jovialui from './components'

export default {
  install: (app: App): void => {
    Object.entries(jovialui).forEach(([key, value]) => {
      app.component(key, value)
    })
  }
}
