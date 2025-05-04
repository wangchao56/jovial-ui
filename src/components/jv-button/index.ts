import { withInstall } from '@/utils'
import _JvButton from './src/JvButton.vue'

const JvButton = withInstall(_JvButton)

export default JvButton

declare module 'vue' {
  export interface GlobalComponents {
    JvButton: typeof JvButton
  }
}
