import { withInstall } from '@/utils'
import _JvCard from './src/JvCard.vue'
import _JvCardActions from './src/JvCardActions.vue'
import _JvCardContent from './src/JvCardContent.vue'
import _JvCardFooter from './src/JvCardFooter.vue'
import _JvCardHeader from './src/JvCardHeader.vue'

const JvCard = withInstall(_JvCard)
const JvCardActions = withInstall(_JvCardActions)
const JvCardContent = withInstall(_JvCardContent)
const JvCardFooter = withInstall(_JvCardFooter)
const JvCardHeader = withInstall(_JvCardHeader)
export default JvCard
export { JvCardActions, JvCardContent, JvCardFooter, JvCardHeader }
export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvCard: typeof JvCard
    JvCardActions: typeof JvCardActions
    JvCardContent: typeof JvCardContent
    JvCardFooter: typeof JvCardFooter
    JvCardHeader: typeof JvCardHeader
  }
}
