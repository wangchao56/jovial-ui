import { withInstall } from '@/utils'
import JvAvatarComponent from './src/JvAvatar.vue'

export const JvAvatar = withInstall(JvAvatarComponent)
export default JvAvatar

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvAvatar: typeof JvAvatar
  }
}
