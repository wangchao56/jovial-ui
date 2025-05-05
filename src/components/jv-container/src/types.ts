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
  // 定义组件属性
}

export interface JvAsideProps {
  // 定义组件属性
}

export interface JvHeaderProps {
  // 定义组件属性
}

export interface JvMainProps {
  // 定义组件属性
}

export interface JvFooterProps {
  // 定义组件属性
}
