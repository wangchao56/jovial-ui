import { withInstall } from '@/utils'
import JvEditerComponent from './src/JvEditer.vue'

export const JvEditer = withInstall(JvEditerComponent)
export default JvEditer

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvEditer: typeof JvEditer
  }
}
