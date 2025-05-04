import { withInstall } from '@/utils'
import _JvSelect from './src/JvSelect.vue'

export const JvSelect = withInstall(_JvSelect)
export default JvSelect

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvSelect: typeof JvSelect
  }
}
