import { withInstall } from '@/utils'
import _JvButton from './src/JvButton.vue'
import _JvButtonGroup from './src/JvButtonGroup.vue'

const JvButton = withInstall(_JvButton)
const JvButtonGroup = withInstall(_JvButtonGroup)

export { JvButtonGroup }
export default JvButton

declare module 'vue' {
  export interface GlobalComponents {
    JvButton: typeof JvButton
    JvButtonGroup: typeof JvButtonGroup
  }
}
