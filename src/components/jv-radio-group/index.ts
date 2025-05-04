import { withInstall } from '@/utils'
import _JvRadioGroup from './src/JvRadioGroup.vue'

export const JvRadioGroup = withInstall(_JvRadioGroup)
export default JvRadioGroup

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvRadioGroup: typeof JvRadioGroup
  }
}
