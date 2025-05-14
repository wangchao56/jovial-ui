import { withInstall } from '@/utils'
import JvAffix from './src/JvAffix.vue'

export const _JvAffix = withInstall(JvAffix)
export default _JvAffix

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvAffix: typeof _JvAffix
  }
}
