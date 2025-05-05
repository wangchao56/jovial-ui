import { withInstall } from '@/utils'
import _JvTag from './src/JvTag.vue'
import _JvTagGroup from './src/JvTagGroup.vue'

export const JvTag = withInstall(_JvTag)
export const JvTagGroup = withInstall(_JvTagGroup)
export default JvTag

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvTag: typeof JvTag
    JvTagGroup: typeof JvTagGroup
  }
}
