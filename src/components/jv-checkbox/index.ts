import { withInstall } from '@/utils'
import _JvCheckbox from './src/JvCheckbox.vue'

export const JvCheckbox = withInstall(_JvCheckbox)
export default JvCheckbox

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvCheckbox: typeof JvCheckbox
  }
}
