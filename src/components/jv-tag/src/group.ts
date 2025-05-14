import type { JvTagProps, TagType } from './types'
import { createNamespace } from '@/utils'

export const JVTAGGROUP_NAME = 'JvTagGroup'
export const bem = createNamespace('jv-tag-group')

export interface JvTagGroupProps {
  tags?: JvTagItemProps[]
  collapsible?: boolean
  maxCollapse?: number
  closable?: boolean
  addable?: boolean
  selectable?: boolean
  multiple?: boolean
  searchable?: boolean
  defaultTagType?: TagType
  defaultTagSize?: 'small' | 'medium' | 'large'
  defaultTagVariant?: 'filled' | 'outlined' | 'tonal'
  defaultTagShape?: 'square' | 'pill'
}

export interface JvTagItemProps {
  id?: string | number
  selected?: boolean
  props?: JvTagProps
}

export interface JvTagGroupEmits {
  (e: 'close', tag: JvTagItemProps, index: number): void
  (e: 'add'): void
  (e: 'update:tags', tags: JvTagItemProps[]): void
  (e: 'select', tag: JvTagItemProps, index: number): void
  (e: 'search', keyword: string): void
}
