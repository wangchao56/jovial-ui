import { withInstall } from '@/utils'
import JvDropdownComponent from './src/JvDropdown.vue'

export const JvDropdown = withInstall(JvDropdownComponent)
export default JvDropdown

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvDropdown: typeof JvDropdown
  }
}
