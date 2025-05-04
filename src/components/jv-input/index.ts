import { withInstall } from '@/utils'
import _JvInput from './src/JvInput.vue'

export const JvInput = withInstall(_JvInput)
export default JvInput

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvInput: typeof JvInput
  }
}
