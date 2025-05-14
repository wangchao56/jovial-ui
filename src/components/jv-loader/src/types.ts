import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVLOADER_NAME = 'JvLoader'
export const bem = createNamespace(JVLOADER_NAME)

export type LoaderType = 'circle' | 'line'

/**
 * loader 属性
 * 用于显示loader
 */
export interface JvLoaderProps {
  /**
   * 加载器目标 父级、自身、视口
   */
  target?: 'parent' | 'self' | 'viewport'
  /**
   * 位置 top默认显示 line 加载器，center 默认显示 circle 加载器
   */
  placement?: 'top' | 'center'
  /**
   * 是否显示加载器
   * @default false
   */
  loading?: boolean
  /**
   * 加载器颜色
   */
  color?: string
  /**
   * 加载器大小
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
}

export interface JvLoaderSlots {
  /**
   * 默认插槽
   */
  default?: Slot
}

export interface JvLoaderEmits {
  (e: 'update:loading', loading: boolean): void
}
