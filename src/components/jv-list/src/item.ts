import type { JvCardHeaderSlots } from '@/components/jv-card/src/types'

export const JVLISTITEM_NAME = 'JvListItem'

export interface JvListItemProps {
  /**
   * 列表项的标题
   */
  title?: string
  /**
   * 列表项的副标题
   */
  subtitle?: string
  /**
   * 列表项的描述
   */
  description?: string
  /**
   * 列表项的图标
   */
  icon?: string
  /**
   * 列表项的链接
   */
  link?: string

}

export interface JvListItemSlots extends JvCardHeaderSlots {

}
