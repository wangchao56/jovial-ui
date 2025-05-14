import { withInstall } from '@/utils'
import JvImageComponent from './src/JvImage.vue'

export const JvImage = withInstall(JvImageComponent)
export default JvImage

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvImage: typeof JvImage
  }
}
