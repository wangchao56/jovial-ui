import { withInstall } from '@/utils'
import JvMenuComponent from './src/JvMenu.vue'
import JvMenuDividerComponent from './src/JvMenuDivider.vue'
import JvMenuGroupComponent from './src/JvMenuGroup.vue'
import JvMenuItemComponent from './src/JvMenuItem.vue'
import JvSubMenuComponent from './src/JvSubMenu.vue'

export const JvMenu = withInstall(JvMenuComponent)
export const JvMenuItem = withInstall(JvMenuItemComponent)
export const JvMenuGroup = withInstall(JvMenuGroupComponent)
export const JvSubMenu = withInstall(JvSubMenuComponent)
export const JvMenuDivider = withInstall(JvMenuDividerComponent)

export * from './src/types'
export default JvMenu
declare module 'vue' {
  export interface GlobalComponents {
    JvMenu: typeof JvMenu
    JvMenuItem: typeof JvMenuItem
    JvMenuGroup: typeof JvMenuGroup
    JvSubMenu: typeof JvSubMenu
    JvMenuDivider: typeof JvMenuDivider
  }
}
