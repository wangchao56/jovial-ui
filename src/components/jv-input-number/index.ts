import { withInstall } from '@/utils'
import _JvInputNumber from './src/JvInputNumber.vue'

export const JvInputNumber = withInstall(_JvInputNumber)
export default JvInputNumber

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvInputNumber: typeof JvInputNumber
  }
}
