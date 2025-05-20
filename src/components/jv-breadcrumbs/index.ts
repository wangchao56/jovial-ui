import { withInstall } from '@/utils'
import JvBreadcrumbItemComponent from './src/JvBreadcrumbItem.vue'
import JvBreadcrumbsComponent from './src/JvBreadcrumbs.vue'

export const JvBreadcrumbs = withInstall(JvBreadcrumbsComponent)
export const JvBreadcrumbItem = withInstall(JvBreadcrumbItemComponent)

export default JvBreadcrumbs

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvBreadcrumbs: typeof JvBreadcrumbs
  }
}
