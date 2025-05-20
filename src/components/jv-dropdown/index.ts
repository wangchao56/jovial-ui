import { withInstall } from '@/utils'
import JvDropdownComponent from './src/JvDropdown.vue'
import JvDropdownItemComponent from './src/JvDropdownItem.vue'

export const JvDropdown = withInstall(JvDropdownComponent)
export const JvDropdownItem = withInstall(JvDropdownItemComponent)
export default JvDropdown

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvDropdown: typeof JvDropdown
    JvDropdownItem: typeof JvDropdownItem
  }
}
