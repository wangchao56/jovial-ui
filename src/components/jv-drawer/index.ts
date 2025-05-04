import { withInstall } from '@/utils'
import _JvDrawer from './src/JvDrawer.vue'

export const JvDrawer = withInstall(_JvDrawer)
export default JvDrawer

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvDrawer: typeof JvDrawer
  }
}
