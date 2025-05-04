import { withInstall } from '@/utils'
import _JvTagGroup from './src/JvTagGroup.vue'

export const JvTagGroup = withInstall(_JvTagGroup)
export default JvTagGroup

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvTagGroup: typeof JvTagGroup
  }
}
