import { withInstall } from '@/utils'
import JvLinkComponent from './src/JvLink.vue'
import JvParagraphComponent from './src/JvParagraph.vue'
import JvTextComponent from './src/JvText.vue'
import JvTitleComponent from './src/JvTitle.vue'
import JvTypographyComponent from './src/JvTypography.vue'

export const JvTypography = withInstall(JvTypographyComponent)
export const JvTitle = withInstall(JvTitleComponent)
export const JvText = withInstall(JvTextComponent)
export const JvParagraph = withInstall(JvParagraphComponent)
export const JvLink = withInstall(JvLinkComponent)
export default JvTypography

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    JvTypography: typeof JvTypography
    JvTitle: typeof JvTitle
    JvText: typeof JvText
    JvParagraph: typeof JvParagraph
    JvLink: typeof JvLink
  }
}
