import { createApp } from 'vue'
import App from './App.vue'
import jovial from './config'
import { setupDirectives } from './directives'
import './theme/styles/index.scss'

const app = createApp(App)
app.use(jovial)
setupDirectives(app)
app.mount('#app')
