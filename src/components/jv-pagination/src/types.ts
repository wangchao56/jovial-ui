import { createNamespace } from '@/utils'

export const JVPAGINATION_NAME = 'JvPagination'

export const bem = createNamespace(JVPAGINATION_NAME)

export interface JvPaginationProps {
  /** 当前页码，支持 v-model */
  modelValue?: number
  /** 总条数 */
  total: number
  /** 每页条数，支持 v-model:pageSize */
  pageSize?: number
  /** 可选的每页条数 */
  pageSizes?: number[]
  /** 简洁模式 */
  simple?: boolean
}

export interface JvPaginationEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'update:pageSize', value: number): void
  (e: 'change', page: number, pageSize: number): void
}
