import { withInstall } from '@/utils'
import JvCollapseComponent from './src/JvCollapse.vue'

const JvCollapse = withInstall(JvCollapseComponent)

export * from './src/types'
export default JvCollapse
declare module 'vue' {
  export interface GlobalComponents {
    JvCollapse: typeof JvCollapse
  }
}
