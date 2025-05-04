import { withInstall } from '@/utils'
import _JvRadio from './src/JvRadio.vue'

export const JvRadio = withInstall(_JvRadio)
export default JvRadio

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvRadio: typeof JvRadio
  }
}
