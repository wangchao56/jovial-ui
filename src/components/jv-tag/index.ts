import { withInstall } from '@/utils'
import _JvTag from './src/JvTag.vue'

export const JvTag = withInstall(_JvTag)
export default JvTag

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvTag: typeof JvTag
  }
}
