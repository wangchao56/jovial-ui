import { withInstall } from '@/utils'
import _JvDivider from './src/JvDivider.vue'

export const JvDivider = withInstall(_JvDivider)
export default JvDivider

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvDivider: typeof JvDivider
  }
}
