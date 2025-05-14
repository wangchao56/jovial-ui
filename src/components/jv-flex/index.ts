import { withInstall } from '@/utils'
import _JvFlex from './src/JvFlex.vue'

const JvFlex = withInstall(_JvFlex)
export default JvFlex

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvFlex: typeof JvFlex
  }
}
