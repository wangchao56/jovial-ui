import { withInstall } from '@/utils'
import _JvSpace from './src/JvSpace.vue'

export const JvSpace = withInstall(_JvSpace)
export default JvSpace

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvSpace: typeof JvSpace
  }
}
