import { withInstall } from '@/utils'
import _JvCard from './src/JvCard.vue'
import _JvCardActions from './src/JvCardActions.vue'
import _JvCardContent from './src/JvCardContent.vue'
import _JvCardHeader from './src/JvCardHeader.vue'
import _JvCardMedia from './src/JvCardMedia.vue'

const JvCard = withInstall(_JvCard)
const JvCardActions = withInstall(_JvCardActions)
const JvCardContent = withInstall(_JvCardContent)
const JvCardHeader = withInstall(_JvCardHeader)
const JvCardMedia = withInstall(_JvCardMedia)
export default JvCard
export { JvCardActions, JvCardContent, JvCardHeader, JvCardMedia }
export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvCard: typeof JvCard
    JvCardHeader: typeof JvCardHeader
    JvCardContent: typeof JvCardContent
    JvCardActions: typeof JvCardActions
    JvCardMedia: typeof JvCardMedia
  }
}
