import { withInstall } from '@/utils'
import _JvTooltip from './src/JvTooltip.vue'

export const JvTooltip = withInstall(_JvTooltip)
export default JvTooltip

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvTooltip: typeof JvTooltip
  }
}
