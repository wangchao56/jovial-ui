import { withInstall } from '@/utils'
import JvProgressComponent from './src/JvProgress.vue'

export const JvProgress = withInstall(JvProgressComponent)
export default JvProgress

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvProgress: typeof JvProgress
  }
}
