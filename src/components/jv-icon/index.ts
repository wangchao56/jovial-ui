import { withInstall } from '@/utils'
import _JvIcon from './src/JvIcon.vue'

const JvIcon = withInstall(_JvIcon)

export default JvIcon

declare module 'vue' {
  export interface GlobalComponents {
    JvIcon: typeof JvIcon
  }
}
