import { withInstall } from '@/utils'
import JvPopperComponent from './src/JvPopper.vue'

export const JvPopper = withInstall(JvPopperComponent)
export default JvPopper

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvPopper: typeof JvPopper
  }
}
