import { withInstall } from '@/utils'
import _JvRadio from './src/JvRadio.vue'
import _JvRadioGroup from './src/JvRadioGroup.vue'

export const JvRadio = withInstall(_JvRadio)
export const JvRadioGroup = withInstall(_JvRadioGroup)
export default JvRadio

export type {
  JvRadioGroupEmits,
  JvRadioGroupExpose,
  JvRadioGroupProps,
  JvRadioGroupSlots
} from './src/group'
// 导出类型
export * from './src/types'

// 类型声明
declare module 'vue' {
  export interface GlobalComponents {
    JvRadio: typeof JvRadio
    JvRadioGroup: typeof JvRadioGroup
  }
}
