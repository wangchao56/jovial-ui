import type { ExtractPropTypes, InjectionKey, PropType, Ref, Slot } from 'vue'
import { createNamespace } from '@/utils'

export const JVRADIOGROUP_NAME = 'JvRadioGroup'
export const bem = createNamespace(JVRADIOGROUP_NAME)

export const jvRadioGroupProps = {
  /** 单选框组的值 */
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: undefined
  },
  /** 是否禁用整个单选框组 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 单选框组的 name 属性 */
  name: String,
  /** 是否为垂直布局 */
  column: {
    type: Boolean,
    default: false
  },
  /** 是否为内联布局 */
  inline: {
    type: Boolean,
    default: false
  },
  /** 单选框组的标签 */
  label: String,
  /** 是否显示边框 */
  bordered: {
    type: Boolean,
    default: false
  },
  /** 是否使用紧凑模式 */
  compact: {
    type: Boolean,
    default: false
  },
  /** 自定义颜色 */
  color: String,
  /** 切换时是否有动画效果 */
  animated: {
    type: Boolean,
    default: true
  }
} as const

export type JvRadioGroupProps = ExtractPropTypes<typeof jvRadioGroupProps>

export interface JvRadioGroupEmits {
  /**
   * 更新单选框组的值
   * @param {string | number | boolean} value - 选中的值
   */
  (e: 'update:modelValue', value?: string | number | boolean): void

  /**
   * 选中值变化时触发
   * @param {string | number | boolean} value - 新的选中值
   */
  (e: 'change', value?: string | number | boolean): void
}

export interface JvRadioGroupSlots {
  /** 默认插槽，用于放置 Radio 组件 */
  default: Slot
  /** 标签插槽，用于自定义标签内容 */
  label: Slot
  /** 标题插槽，用于自定义标题内容 */
  legend: Slot
}

export interface JvRadioGroupExpose {
  /**
   * 重置单选框组
   */
  reset: () => void
  /**
   * 获取当前选中的值
   */
  getValue: () => string | number | boolean | undefined
}

/**
 * Radio 组上下文接口
 * @description 用于向子组件注入的上下文数据
 */
export interface JvRadioGroupContext {
  /** 单选框组的 name 属性 */
  name?: string
  /** 单选框组的值 */
  modelValue?: Ref<string | number | boolean | undefined>
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义颜色 */
  color?: string
  /** 是否有动画 */
  animated?: boolean
  /**
   * 派发事件方法
   * @param {string} event - 事件名称
   * @param {any} args - 事件参数
   * @param {string} valueType - 值类型
   */
  dispatch: (
    event: 'change' | 'update:modelValue',
    args: any,
    valueType: string
  ) => void
}

/** Radio 组注入的 key */
export const JvRadioGroupContextKey: InjectionKey<JvRadioGroupContext> =
  Symbol.for('radioGroupContextKey')
