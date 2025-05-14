import { withInstall } from '@/utils'
import JvTextfieldComponent from './src/JvTextfield.vue'

export const JvTextfield = withInstall(JvTextfieldComponent)
export default JvTextfield

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvTextfield: typeof JvTextfield
  }
}
