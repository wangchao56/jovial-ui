import { withInstall } from '@/utils'
import _JvPopover from './src/JvPopover.vue'

export const JvPopover = withInstall(_JvPopover)
export default JvPopover

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvPopover: typeof JvPopover
  }
}
