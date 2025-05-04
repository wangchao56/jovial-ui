import { withInstall } from '@/utils'
import _JvOverlay from './src/JvOverlay.vue'

export const JvOverlay = withInstall(_JvOverlay)
export default JvOverlay

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvOverlay: typeof JvOverlay
  }
}
