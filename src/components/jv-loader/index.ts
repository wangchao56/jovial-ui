import { withInstall } from '@/utils'
import JvLoaderComponent from './src/JvLoader.vue'

export const JvLoader = withInstall(JvLoaderComponent)
export default JvLoader

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvLoader: typeof JvLoader
  }
}
