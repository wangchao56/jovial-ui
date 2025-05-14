import type { Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVIMAGE_NAME = 'JvImage'
export const bem = createNamespace(JVIMAGE_NAME)

/**
 * 指定图像的 MIME 媒体类型或其他媒体类型，可选择包含媒体查询
 * https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source
 */
export interface SourcesElementProps {
  /**
   * 指定图像的 MIME 媒体类型或其他媒体类型，可选择包含媒体查询
   */
  type: string
  /**
   * 指定图像的 URL
   */
  src: string
  /**
   * 指定图像的 srcset
   */
  srcset: string
  /**
   * 指定图像的 sizes
   */
  sizes: string
  /**
   * 指定图像的媒体查询
   */
  media: string
  /**
   * 指定图像的宽度
   */
  width: string
  /**
   * 指定图像的高度
   */
  height: string
}

/**
 * image 属性
 * 用于显示图片
 */
export interface JvImageProps {
  /**
   * 图片源
   */
  src?: string
  /**
   * 图片替代文本
   */
  alt?: string
  /**
   * 图片宽度
   */
  width?: string | number
  /**
   * 图片高度
   */
  height?: string | number
  /**
   * 图片宽高比
   */
  aspectRatio?: string
  /**
   * 是否懒加载
   */
  lazy?: boolean
  /**
   * 图片适应方式
   */
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  /**
   * 加载中显示的图片
   */
  loadingImg?: string
  /**
   * 加载失败显示的图片
   */
  errorImg?: string
  /**
   * 是否为圆形
   */
  rounded?: RoundedType
  /**
   * 边框样式
   */
  borderStyle?: string
  /**
   * 边框宽度
   */
  borderWidth?: string
  /**
   * 边框颜色
   */
  borderColor?: string

  /**
   * 自定义 sources 元素，用于响应式图片
   */
  sources?: SourcesElementProps[]
}

export interface JvImageEmits {
  /**
   * 图片加载事件
   */
  (e: 'load', event: Event): void
  /**
   * 图片加载失败事件
   */
  (e: 'error', event: Event): void
}

export interface JvImageSlots {
  /**
   * 默认插槽，用于放置 <source> 元素实现响应式图片
   */
  default?: Slot
  /**
   * 加载中显示的内容
   */
  loading?: Slot
  /**
   * 加载失败显示的内容
   */
  error?: Slot
  /**
   * 自定义覆盖层
   */
  overlay?: Slot
}
