import { withInstall } from '@/utils'
import _JvBadge from './src/JvBadge.vue'

export const JvBadge = withInstall(_JvBadge)
export default JvBadge

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvBadge: typeof JvBadge
  }
}
