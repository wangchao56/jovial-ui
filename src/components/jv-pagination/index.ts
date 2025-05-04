import { withInstall } from '@/utils'
import _JvPagination from './src/JvPagination.vue'

export const JvPagination = withInstall(_JvPagination)
export default JvPagination

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvPagination: typeof JvPagination
  }
}
