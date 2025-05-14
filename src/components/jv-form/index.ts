import { withInstall } from '@/utils'
import _JvForm from './src/JvForm.vue'
import _JvFormItem from './src/JvFormItem.vue'

export const JvForm = withInstall(_JvForm)
export const JvFormItem = withInstall(_JvFormItem)

// 显式导出helper.ts中的内容
export {
  computeLabelWidthStyle,
  filterRulesByTrigger,
  getNestedValue,
  isRequiredField,
  mergeRules,
  setNestedValue,
  validateField,
} from './src/helper'
// 显式导出item.ts中的内容
export { JVFORMITEM_NAME } from './src/item'
export type { JvFormItemEmits, JvFormItemProps } from './src/item'
// 导出类型定义
export * from './src/types'

export default JvForm

// 类型声明
declare module 'vue' {
  export interface GlobalComponents {
    JvForm: typeof JvForm
    JvFormItem: typeof JvFormItem
  }
}
