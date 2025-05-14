import type { JvGridItemPosition, JvGridProps } from './src/types'
import { withInstall } from '@/utils'
import _JvGrid from './src/JvGrid.vue'
import _JvGridItem from './src/JvGridItem.vue'

export const JvGrid = withInstall(_JvGrid)
export const JvGridItem = withInstall(_JvGridItem)

export type { JvGridItemPosition, JvGridProps }
export default JvGrid
