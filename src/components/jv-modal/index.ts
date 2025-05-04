import { withInstall } from '@/utils'
import _JvModal from './src/JvModal.vue'

export const JvModal = withInstall(_JvModal)
export default JvModal

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvModal: typeof JvModal
  }
}
