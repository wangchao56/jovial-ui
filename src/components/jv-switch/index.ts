import { withInstall } from '@/utils'
import JvSwitchComponent from './src/JvSwitch.vue'

export const JvSwitch = withInstall(JvSwitchComponent)
export default JvSwitch

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvSwitch: typeof JvSwitch
  }
}
