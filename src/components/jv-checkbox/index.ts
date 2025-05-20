import { withInstall } from '@/utils'
import _JvCheckbox from './src/JvCheckbox.vue'
import _JvCheckboxGroup from './src/JvCheckboxGroup.vue'

export const JvCheckbox = withInstall(_JvCheckbox)
export const JvCheckboxGroup = withInstall(_JvCheckboxGroup)

export default JvCheckbox

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvCheckbox: typeof JvCheckbox
    JvCheckboxGroup: typeof JvCheckboxGroup
  }
}
