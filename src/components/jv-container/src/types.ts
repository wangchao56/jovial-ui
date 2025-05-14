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

export interface JvContainerProps {
  fluid?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | false
  tag?: string
}

export interface JvAsideProps {
  tag?: string
  width?: number
  fixed?: boolean
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export interface JvHeaderProps {
  tag?: string
  height?: number
}

export interface JvMainProps {
  tag?: string
  padding?: boolean
}

export interface JvFooterProps {
  tag?: string
  height?: number
  fixed?: boolean
}
