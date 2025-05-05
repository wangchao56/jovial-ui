import { withInstall } from '@/utils'
import _JvAside from './src/JvAside.vue'
import _JvContainer from './src/JvContainer.vue'
import _JvFooter from './src/JvFooter.vue'
import _JvHeader from './src/JvHeader.vue'
import _JvMain from './src/JvMain.vue'

const JvContainer = withInstall(_JvContainer)
export const JvAside = withInstall(_JvAside)
export const JvHeader = withInstall(_JvHeader)
export const JvMain = withInstall(_JvMain)
export const JvFooter = withInstall(_JvFooter)
export default JvContainer

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvContainer: typeof JvContainer
    JvAside: typeof JvAside
    JvHeader: typeof JvHeader
    JvMain: typeof JvMain
    JvFooter: typeof JvFooter
  }
}
