import { withInstall } from '@/utils'
import _JvTextarea from './src/JvTextarea.vue'

export const JvTextarea = withInstall(_JvTextarea)
export default JvTextarea

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvTextarea: typeof JvTextarea
  }
}
