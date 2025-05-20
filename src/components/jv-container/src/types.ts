import type { CSSProperties, InjectionKey, Ref } from 'vue'
import { createNamespace } from '@/utils'

export const JVCONTAINER_NAME = 'JvContainer'
export const JVASIDE_NAME = 'JvAside'
export const JVHEADER_NAME = 'JvHeader'
export const JVMAN_NAME = 'JvMain'
export const JVFOOTER_NAME = 'JvFooter'
export const c_bem = createNamespace(JVCONTAINER_NAME)
export const c_aside_bem = createNamespace(JVASIDE_NAME)
export const c_header_bem = createNamespace(JVHEADER_NAME)
export const c_main_bem = createNamespace(JVMAN_NAME)
export const c_footer_bem = createNamespace(JVFOOTER_NAME)

export type ContainerStateKey = 'asideWidth' | 'headerHeight' | 'footerHeight' | 'leftAsideWidth' | 'rightAsideWidth'

export interface JvContainerProps {
  fluid?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | false
  tag?: string
  gridTemplate?: string
  spacing?: 'xs' | 'sm' | 'md' | 'lg'
  asideWidth?: number
  headerHeight?: number
  footerHeight?: number
}

export interface JvAsideProps {
  tag?: string
  width?: number | string
  fixed?: boolean
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  position?: 'left' | 'right'
  class?: string
  style?: CSSProperties
}

export interface JvHeaderProps {
  tag?: string
  height?: number | string
  fixed?: boolean
}

export interface JvMainProps {
  tag?: string
  padding?: boolean
}

export interface JvFooterProps {
  tag?: string
  height?: number | string
  fixed?: boolean
}

// 与子组件共享的类型
export interface JvContainercontext {
  leftAsideWidth: Ref<number>
  rightAsideWidth: Ref<number>
  headerHeight: Ref<number>
  footerHeight: Ref<number>
  updateState: (key: ContainerStateKey, value: number) => void
}

export const JvContainerContextKey: InjectionKey<JvContainercontext> = Symbol('JvContainerContext')
