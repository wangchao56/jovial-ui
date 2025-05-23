import { withInstall } from '@/utils'
import JvTabNavComponent from './src/JvTabNav.vue'
import JvTabPanelComponent from './src/JvTabPanel.vue'
import JvTabsComponent from './src/JvTabs.vue'

export const JvTabs = withInstall(JvTabsComponent)
export const JvTabNav = withInstall(JvTabNavComponent)
export const JvTabPanel = withInstall(JvTabPanelComponent)

export default JvTabs

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvTabs: typeof JvTabs
  }
}
