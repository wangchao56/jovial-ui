import { withInstall } from '@/utils'
import _JvTable from './src/JvTable.vue'
import _JvTableColumn from './src/JvTableColumn.vue'

const JvTable = withInstall(_JvTable)
const JvTableColumn = withInstall(_JvTableColumn)

export default JvTable
export { JvTableColumn }

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvTable: typeof JvTable
    JvTableColumn: typeof JvTableColumn
  }
}
