import { withInstall } from '@/utils'
import _JvMessage from './src/JvMessage.vue'

export const JvMessage = withInstall(_JvMessage)
export default JvMessage

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvMessage: typeof JvMessage
  }
}
