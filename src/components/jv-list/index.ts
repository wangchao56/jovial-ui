import { withInstall } from '@/utils'
import JvListComponent from './src/JvList.vue'
import JvListItemComponent from './src/JvListItem.vue'

export const JvList = withInstall(JvListComponent)
export const JvListItem = withInstall(JvListItemComponent)
export default JvList

export * from './src/item'
export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvList: typeof JvList
    JvListItem: typeof JvListItem
  }
}
